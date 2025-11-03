import { z } from "zod";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import {
  createConversation,
  sendMessage,
  getAllConversations,
  getConversationById,
  getConversationMessages,
  updateConversationStatus,
  markMessagesAsRead,
  getUnreadMessagesCount,
  getUserConversation,
} from "./chatDb";

export const chatRouter = router({
  /**
   * إنشاء محادثة جديدة (للزوار والمستخدمين)
   */
  createConversation: publicProcedure
    .input(
      z.object({
        visitorName: z.string().optional(),
        visitorEmail: z.string().email().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const conversationId = await createConversation({
        userId: ctx.user?.id,
        visitorName: input.visitorName,
        visitorEmail: input.visitorEmail,
      });

      return { conversationId };
    }),

  /**
   * إرسال رسالة
   */
  sendMessage: publicProcedure
    .input(
      z.object({
        conversationId: z.number(),
        message: z.string().min(1),
        senderName: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await sendMessage({
        conversationId: input.conversationId,
        senderType: ctx.user?.role === "admin" ? "admin" : "visitor",
        senderName: input.senderName || ctx.user?.name || "زائر",
        message: input.message,
      });

      return { success: true };
    }),

  /**
   * جلب محادثة المستخدم الحالي
   */
  getMyConversation: protectedProcedure.query(async ({ ctx }) => {
    const conversation = await getUserConversation(ctx.user.id);
    return conversation || null;
  }),

  /**
   * جلب رسائل محادثة
   */
  getMessages: publicProcedure
    .input(z.object({ conversationId: z.number() }))
    .query(async ({ input }) => {
      const messages = await getConversationMessages(input.conversationId);
      return messages;
    }),

  /**
   * تحديث قراءة الرسائل
   */
  markAsRead: publicProcedure
    .input(z.object({ conversationId: z.number() }))
    .mutation(async ({ input }) => {
      await markMessagesAsRead(input.conversationId);
      return { success: true };
    }),

  /**
   * جلب جميع المحادثات (للمدير فقط)
   */
  getAllConversations: adminProcedure.query(async () => {
    const conversations = await getAllConversations();
    return conversations;
  }),

  /**
   * جلب محادثة محددة (للمدير فقط)
   */
  getConversation: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const conversation = await getConversationById(input.id);
      return conversation;
    }),

  /**
   * تحديث حالة المحادثة (للمدير فقط)
   */
  updateStatus: adminProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["open", "closed"]),
      })
    )
    .mutation(async ({ input }) => {
      await updateConversationStatus(input.id, input.status);
      return { success: true };
    }),

  /**
   * عدد الرسائل غير المقروءة (للمدير فقط)
   */
  getUnreadCount: adminProcedure.query(async () => {
    const count = await getUnreadMessagesCount();
    return { count };
  }),
});
