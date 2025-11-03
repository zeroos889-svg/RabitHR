import { eq, desc, and } from "drizzle-orm";
import { getDb } from "./db";
import { 
  chatConversations, 
  chatMessages,
  InsertChatConversation,
  InsertChatMessage,
  ChatConversation,
  ChatMessage
} from "../drizzle/schema";

/**
 * إنشاء محادثة جديدة
 */
export async function createConversation(data: {
  userId?: number;
  visitorName?: string;
  visitorEmail?: string;
}): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(chatConversations).values({
    userId: data.userId,
    visitorName: data.visitorName,
    visitorEmail: data.visitorEmail,
    status: "open",
    lastMessageAt: new Date(),
  });

  return Number((result as any).insertId || (result as any)[0]?.insertId || 0);
}

/**
 * إرسال رسالة
 */
export async function sendMessage(data: {
  conversationId: number;
  senderType: "visitor" | "admin";
  senderName?: string;
  message: string;
}): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // إضافة الرسالة
  await db.insert(chatMessages).values({
    conversationId: data.conversationId,
    senderType: data.senderType,
    senderName: data.senderName,
    message: data.message,
    isRead: false,
  });

  // تحديث وقت آخر رسالة في المحادثة
  await db
    .update(chatConversations)
    .set({ lastMessageAt: new Date() })
    .where(eq(chatConversations.id, data.conversationId));
}

/**
 * جلب جميع المحادثات (للمدير)
 */
export async function getAllConversations(): Promise<ChatConversation[]> {
  const db = await getDb();
  if (!db) return [];

  const conversations = await db
    .select()
    .from(chatConversations)
    .orderBy(desc(chatConversations.lastMessageAt));

  return conversations;
}

/**
 * جلب محادثة محددة
 */
export async function getConversationById(id: number): Promise<ChatConversation | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(chatConversations)
    .where(eq(chatConversations.id, id))
    .limit(1);

  return result[0];
}

/**
 * جلب رسائل محادثة
 */
export async function getConversationMessages(conversationId: number): Promise<ChatMessage[]> {
  const db = await getDb();
  if (!db) return [];

  const messages = await db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.conversationId, conversationId))
    .orderBy(chatMessages.createdAt);

  return messages;
}

/**
 * تحديث حالة المحادثة
 */
export async function updateConversationStatus(
  id: number,
  status: "open" | "closed"
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(chatConversations)
    .set({ status })
    .where(eq(chatConversations.id, id));
}

/**
 * تحديث حالة قراءة الرسائل
 */
export async function markMessagesAsRead(conversationId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(chatMessages)
    .set({ isRead: true })
    .where(
      and(
        eq(chatMessages.conversationId, conversationId),
        eq(chatMessages.isRead, false)
      )
    );
}

/**
 * عدد الرسائل غير المقروءة
 */
export async function getUnreadMessagesCount(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;

  const result = await db
    .select()
    .from(chatMessages)
    .where(
      and(
        eq(chatMessages.senderType, "visitor"),
        eq(chatMessages.isRead, false)
      )
    );

  return result.length;
}

/**
 * جلب محادثة مستخدم معين
 */
export async function getUserConversation(userId: number): Promise<ChatConversation | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(chatConversations)
    .where(eq(chatConversations.userId, userId))
    .orderBy(desc(chatConversations.lastMessageAt))
    .limit(1);

  return result[0];
}
