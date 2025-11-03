import { z } from "zod";
import { adminProcedure, router } from "./_core/trpc";
import * as adminDb from "./adminDb";

export const adminRouter = router({
  // Dashboard Statistics
  getStats: adminProcedure.query(async () => {
    const stats = await adminDb.getAdminStats();
    return stats;
  }),

  // Users Management
  getAllUsers: adminProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(20),
      search: z.string().optional(),
      role: z.enum(["admin", "user"]).optional(),
      userType: z.enum(["employee", "individual", "company"]).optional(),
    }))
    .query(async ({ input }) => {
      const users = await adminDb.getAllUsersAdmin(input);
      return users;
    }),

  getUserById: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const user = await adminDb.getUserById(input.id);
      return user;
    }),

  updateUser: adminProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      email: z.string().optional(),
      role: z.enum(["admin", "user"]).optional(),
      userType: z.enum(["employee", "individual", "company"]).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      await adminDb.updateUser(input.id, input);
      await adminDb.createAuditLog({
        userId: ctx.user.id,
        action: "update_user",
        entityType: "user",
        entityId: input.id,
        changes: JSON.stringify(input),
      });
      return { success: true };
    }),

  deleteUser: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await adminDb.deleteUser(input.id);
      await adminDb.createAuditLog({
        userId: ctx.user.id,
        action: "delete_user",
        entityType: "user",
        entityId: input.id,
        changes: JSON.stringify({ deleted: true }),
      });
      return { success: true };
    }),

  // Subscriptions Management
  getAllSubscriptions: adminProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(20),
      status: z.enum(["active", "inactive", "trial", "cancelled"]).optional(),
    }))
    .query(async ({ input }) => {
      const subscriptions = await adminDb.getAllSubscriptions(input);
      return subscriptions;
    }),

  updateSubscription: adminProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["active", "inactive", "trial", "cancelled"]).optional(),
      endDate: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      await adminDb.updateSubscription(input.id, input);
      await adminDb.createAuditLog({
        userId: ctx.user.id,
        action: "update_subscription",
        entityType: "subscription",
        entityId: input.id,
        changes: JSON.stringify(input),
      });
      return { success: true };
    }),

  // Bookings Management
  getAllBookings: adminProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(20),
      status: z.enum(["pending", "assigned", "in-progress", "completed", "cancelled"]).optional(),
    }))
    .query(async ({ input }) => {
      const bookings = await adminDb.getAllBookings(input);
      return bookings;
    }),

  updateBooking: adminProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "assigned", "in-progress", "completed", "cancelled"]).optional(),
      consultantId: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      await adminDb.updateBooking(input.id, input);
      await adminDb.createAuditLog({
        userId: ctx.user.id,
        action: "update_booking",
        entityType: "booking",
        entityId: input.id,
        changes: JSON.stringify(input),
      });
      return { success: true };
    }),

  // Audit Logs
  getAuditLogs: adminProcedure
    .input(z.object({
      page: z.number().default(1),
      limit: z.number().default(50),
      userId: z.number().optional(),
      action: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const logs = await adminDb.getAuditLogs(input);
      return logs;
    }),
});
