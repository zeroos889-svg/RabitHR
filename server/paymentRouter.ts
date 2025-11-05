/**
 * Payment Router - tRPC routes for payment processing
 * Handles Moyasar and Tap Payment integrations
 */

import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import {
  createMoyasarPayment,
  getMoyasarPayment,
  refundMoyasarPayment,
  createTapPayment,
  verifyMoyasarWebhook,
} from "./_core/payment";
import { getDb } from "./db/index";
import { payments } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// Plan mapping
const PLANS = {
  basic: { amount: 799, name: "Basic Plan" },
  pro: { amount: 1499, name: "Professional Plan" },
  enterprise: { amount: 2999, name: "Enterprise Plan" },
} as const;

type PlanKey = keyof typeof PLANS;

export const paymentRouter = router({
  /**
   * Create Moyasar payment
   */
  createMoyasarPayment: protectedProcedure
    .input(
      z.object({
        planKey: z.enum(["basic", "pro", "enterprise"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const plan = PLANS[input.planKey];
        const baseUrl = process.env.BASE_URL || process.env.VITE_APP_URL || "http://localhost:3000";
        const callbackUrl = `${baseUrl}/payment/moyasar/callback`;

        const payment = await createMoyasarPayment({
          amount: plan.amount,
          description: `RabitHR subscription – ${input.planKey}`,
          callbackUrl,
          metadata: {
            userId: ctx.user?.id,
            planKey: input.planKey,
            planName: plan.name,
          },
        });

        // Save payment record to database
        const db = await getDb();
        if (db) {
          await db.insert(payments).values({
            userId: ctx.user!.id,
            amount: plan.amount * 100, // Convert to halalas
            currency: "SAR",
            status: "pending",
            gateway: "moyasar",
            gatewayPaymentId: payment.id,
            description: `RabitHR subscription – ${input.planKey}`,
            itemType: "subscription",
            finalAmount: plan.amount * 100,
            metadata: JSON.stringify({ planKey: input.planKey }),
          });
        }

        return {
          success: true,
          redirectUrl: payment.source?.transactionUrl,
          paymentId: payment.id,
        };
      } catch (error: any) {
        console.error("[Payment] Moyasar creation error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "فشل إنشاء الدفع",
        });
      }
    }),

  /**
   * Create Tap payment
   */
  createTapPayment: protectedProcedure
    .input(
      z.object({
        planKey: z.enum(["basic", "pro", "enterprise"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const plan = PLANS[input.planKey];
        const baseUrl = process.env.BASE_URL || process.env.VITE_APP_URL || "http://localhost:3000";
        const callbackUrl = `${baseUrl}/payment/tap/callback`;

        const payment = await createTapPayment({
          amount: plan.amount,
          description: `RabitHR subscription – ${input.planKey}`,
          callbackUrl,
          metadata: {
            userId: ctx.user?.id,
            planKey: input.planKey,
            planName: plan.name,
          },
        });

        // Save payment record to database
        const db = await getDb();
        if (db) {
          await db.insert(payments).values({
            userId: ctx.user!.id,
            amount: plan.amount * 100,
            currency: "SAR",
            status: "pending",
            gateway: "tap",
            gatewayPaymentId: payment.id,
            description: `RabitHR subscription – ${input.planKey}`,
            itemType: "subscription",
            finalAmount: plan.amount * 100,
            metadata: JSON.stringify({ planKey: input.planKey }),
          });
        }

        return {
          success: true,
          redirectUrl: payment.transaction?.url,
          paymentId: payment.id,
        };
      } catch (error: any) {
        console.error("[Payment] Tap creation error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "فشل إنشاء الدفع",
        });
      }
    }),

  /**
   * Get payment by ID from database
   */
  getPaymentById: protectedProcedure
    .input(
      z.object({
        paymentId: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const db = await getDb();
        if (!db) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "قاعدة البيانات غير متاحة",
          });
        }

        const [payment] = await db
          .select()
          .from(payments)
          .where(eq(payments.id, input.paymentId))
          .limit(1);

        if (!payment) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "الدفع غير موجود",
          });
        }

        // Verify ownership
        if (payment.userId !== ctx.user!.id) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "غير مصرح لك بالوصول لهذا الدفع",
          });
        }

        return {
          success: true,
          payment: {
            id: payment.id,
            amount: payment.amount / 100, // Convert from halalas to SAR
            currency: payment.currency,
            status: payment.status,
            gateway: payment.gateway,
            description: payment.description,
            paidAt: payment.paidAt,
            createdAt: payment.createdAt,
            metadata: payment.metadata ? JSON.parse(payment.metadata) : null,
          },
        };
      } catch (error: any) {
        console.error("[Payment] Fetch error:", error);
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "فشل جلب معلومات الدفع",
        });
      }
    }),

  /**
   * Request refund
   */
  requestRefund: protectedProcedure
    .input(
      z.object({
        paymentId: z.string(),
        amount: z.number().positive().optional(),
        reason: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // Check if user owns this payment
        // TODO: Implement payment ownership check

        const refund = await refundMoyasarPayment(
          input.paymentId,
          input.amount
        );

        return {
          success: true,
          refund: {
            id: refund.id,
            status: refund.status,
            refunded: refund.refunded,
            refundedAt: refund.refundedAt,
          },
        };
      } catch (error: any) {
        console.error("[Payment] Refund error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "فشل طلب الاسترجاع",
        });
      }
    }),

  /**
   * Webhook handler for payment notifications
   * This should be called from a separate API endpoint, not directly from frontend
   */
  handleWebhook: publicProcedure
    .input(
      z.object({
        gateway: z.enum(["moyasar", "tap"]),
        payload: z.string(),
        signature: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        if (input.gateway === "moyasar") {
          const isValid = verifyMoyasarWebhook(
            input.payload,
            input.signature
          );

          if (!isValid) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Invalid webhook signature",
            });
          }

          const event = JSON.parse(input.payload);

          // Handle different event types
          switch (event.type) {
            case "payment_paid":
              // TODO: Update payment status in database
              // TODO: Activate subscription
              // TODO: Send confirmation email
              console.log("[Webhook] Payment paid:", event.data.id);
              break;

            case "payment_failed":
              // TODO: Update payment status
              // TODO: Send failure notification
              console.log("[Webhook] Payment failed:", event.data.id);
              break;

            case "payment_refunded":
              // TODO: Update payment status
              // TODO: Deactivate subscription
              // TODO: Send refund confirmation
              console.log("[Webhook] Payment refunded:", event.data.id);
              break;

            default:
              console.log("[Webhook] Unknown event type:", event.type);
          }

          return { success: true };
        } else {
          // TODO: Implement Tap webhook verification
          throw new TRPCError({
            code: "NOT_IMPLEMENTED",
            message: "Tap webhook handling not implemented yet",
          });
        }
      } catch (error: any) {
        console.error("[Webhook] Processing error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "فشل معالجة الإشعار",
        });
      }
    }),

  /**
   * Get user's payment history
   */
  getPaymentHistory: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        // TODO: Implement db.getUserPayments()
        // const payments = await db.getUserPayments(ctx.user!.id, input.limit, input.offset);

        return {
          success: true,
          payments: [],
          total: 0,
        };
      } catch (error: any) {
        console.error("[Payment] History fetch error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "فشل جلب سجل المدفوعات",
        });
      }
    }),
});

export type PaymentRouter = typeof paymentRouter;
