import { eq, and, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, passwords, InsertPassword, discountCodes, discountCodeUsage, notifications, notificationPreferences, emailLogs, smsLogs } from "../drizzle/schema";
import bcrypt from 'bcryptjs';
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ==========================================
// Authentication Helpers
// ==========================================

/**
 * Hash password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create new user with email/password
 */
export async function createUserWithPassword(data: {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  userType?: 'employee' | 'individual' | 'company';
}) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    // Check if email already exists
    const existingUser = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
    if (existingUser.length > 0) {
      throw new Error("البريد الإلكتروني مستخدم بالفعل");
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create user
    const userResult = await db.insert(users).values({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber || null,
      userType: data.userType || null,
      loginMethod: 'email',
      emailVerified: false,
      profileCompleted: false,
      openId: null,
    });

    const userId = Number(userResult.insertId);

    // Save password
    await db.insert(passwords).values({
      userId,
      passwordHash,
    });

    // Get created user
    const newUser = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    return newUser[0];
  } catch (error) {
    console.error("[Database] Failed to create user:", error);
    throw error;
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Verify user login with email/password
 */
export async function verifyUserLogin(email: string, password: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    // Get user
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    // Get password hash
    const passwordRecord = await db.select().from(passwords).where(eq(passwords.userId, user.id)).limit(1);
    if (passwordRecord.length === 0) {
      throw new Error("هذا الحساب مسجل عبر OAuth");
    }

    // Verify password
    const isValid = await verifyPassword(password, passwordRecord[0].passwordHash);
    if (!isValid) {
      throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    // Update last signed in
    await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));

    return user;
  } catch (error) {
    console.error("[Database] Failed to verify login:", error);
    throw error;
  }
}

// TODO: add feature queries here as your schema grows.

// ==========================================
// Template & Document Helpers
// ==========================================

import { 
  templates, 
  generatedDocuments,
  Template,
  GeneratedDocument 
} from "../drizzle/schema";
import { desc } from "drizzle-orm";

/**
 * Get all active templates
 */
export async function getAllTemplates() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(templates)
    .where(eq(templates.isActive, true))
    .orderBy(templates.category, templates.titleAr);
}

/**
 * Get template by code
 */
export async function getTemplateByCode(code: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(templates)
    .where(eq(templates.code, code))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

/**
 * Create a new generated document
 */
export async function createGeneratedDocument(data: {
  userId: number;
  templateCode: string;
  outputHtml: string;
  outputText: string;
  lang: "ar" | "en" | "both";
  inputData: string; // JSON string
  companyLogo?: string;
  companyName?: string;
  isSaved?: boolean;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(generatedDocuments).values(data);
  return result;
}

/**
 * Get user's generated documents
 */
export async function getUserDocuments(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(generatedDocuments)
    .where(eq(generatedDocuments.userId, userId))
    .orderBy(desc(generatedDocuments.createdAt))
    .limit(limit);
}

/**
 * Get document by ID
 */
export async function getDocumentById(documentId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(generatedDocuments)
    .where(eq(generatedDocuments.id, documentId))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

/**
 * Get user's saved documents only
 */
export async function getUserSavedDocuments(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(generatedDocuments)
    .where(
      and(
        eq(generatedDocuments.userId, userId),
        eq(generatedDocuments.isSaved, true)
      )
    )
    .orderBy(desc(generatedDocuments.createdAt));
}

/**
 * Update document saved status
 */
export async function updateDocumentSavedStatus(documentId: number, isSaved: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(generatedDocuments)
    .set({ isSaved, updatedAt: new Date() })
    .where(eq(generatedDocuments.id, documentId));
}

/**
 * Delete a generated document
 */
export async function deleteGeneratedDocument(documentId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .delete(generatedDocuments)
    .where(
      and(
        eq(generatedDocuments.id, documentId),
        eq(generatedDocuments.userId, userId)
      )
    );
}


// ==========================================
// Consulting Packages & Tickets Helpers
// ==========================================

import { 
  consultingPackages,
  consultingTickets,
  consultingResponses,
  ConsultingPackage,
  ConsultingTicket,
  ConsultingResponse
} from "../drizzle/schema";

/**
 * Get all active consulting packages
 */
export async function getActiveConsultingPackages() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(consultingPackages)
    .where(eq(consultingPackages.isActive, true))
    .orderBy(consultingPackages.orderIndex, consultingPackages.priceSAR);
}

/**
 * Get package by ID
 */
export async function getConsultingPackageById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(consultingPackages)
    .where(eq(consultingPackages.id, id))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

/**
 * Create a new consulting ticket
 */
export async function createConsultingTicket(data: {
  userId: number;
  packageId: number;
  subject: string;
  description: string;
  submittedFormJson?: string;
  attachments?: string;
  priority?: "low" | "medium" | "high" | "urgent";
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Generate ticket number
  const ticketNumber = `CONS-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  
  // Get package to calculate SLA deadline
  const pkg = await getConsultingPackageById(data.packageId);
  const slaHours = pkg?.slaHours || 24;
  const slaDeadline = new Date();
  slaDeadline.setHours(slaDeadline.getHours() + slaHours);
  
  const result = await db.insert(consultingTickets).values({
    ...data,
    ticketNumber,
    status: "pending",
    priority: data.priority || "medium",
    slaDeadline,
  });
  
  return { ticketNumber, insertId: result[0].insertId };
}

/**
 * Get user's consulting tickets
 */
export async function getUserConsultingTickets(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(consultingTickets)
    .where(eq(consultingTickets.userId, userId))
    .orderBy(desc(consultingTickets.createdAt));
}

/**
 * Get ticket by ID
 */
export async function getConsultingTicketById(ticketId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(consultingTickets)
    .where(eq(consultingTickets.id, ticketId))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

/**
 * Get ticket by ticket number
 */
export async function getConsultingTicketByNumber(ticketNumber: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(consultingTickets)
    .where(eq(consultingTickets.ticketNumber, ticketNumber))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

/**
 * Update ticket status
 */
export async function updateConsultingTicketStatus(
  ticketId: number,
  status: "pending" | "assigned" | "in-progress" | "completed" | "cancelled"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const updateData: any = { status, updatedAt: new Date() };
  
  if (status === "completed") {
    updateData.completedAt = new Date();
  }
  
  await db
    .update(consultingTickets)
    .set(updateData)
    .where(eq(consultingTickets.id, ticketId));
}

/**
 * Assign ticket to consultant
 */
export async function assignConsultingTicket(ticketId: number, consultantId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(consultingTickets)
    .set({ 
      consultantId,
      status: "assigned",
      updatedAt: new Date(),
    })
    .where(eq(consultingTickets.id, ticketId));
}

/**
 * Add response to ticket
 */
export async function addConsultingResponse(data: {
  ticketId: number;
  userId: number;
  message: string;
  attachments?: string;
  isInternal?: boolean;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(consultingResponses).values(data);
  
  // Update ticket status to in-progress if it was pending
  const ticket = await getConsultingTicketById(data.ticketId);
  if (ticket?.status === "pending" || ticket?.status === "assigned") {
    await updateConsultingTicketStatus(data.ticketId, "in-progress");
  }
  
  return result;
}

/**
 * Get ticket responses
 */
export async function getConsultingTicketResponses(ticketId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(consultingResponses)
    .where(eq(consultingResponses.ticketId, ticketId))
    .orderBy(consultingResponses.createdAt);
}

/**
 * Rate consulting ticket
 */
export async function rateConsultingTicket(ticketId: number, rating: number, feedback?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(consultingTickets)
    .set({ 
      rating,
      feedback,
      updatedAt: new Date(),
    })
    .where(eq(consultingTickets.id, ticketId));
}

/**
 * Get consultant's assigned tickets
 */
export async function getConsultantTickets(consultantId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(consultingTickets)
    .where(eq(consultingTickets.consultantId, consultantId))
    .orderBy(desc(consultingTickets.createdAt));
}

/**
 * Get pending tickets (for admin/consultant assignment)
 */
export async function getPendingConsultingTickets() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(consultingTickets)
    .where(eq(consultingTickets.status, "pending"))
    .orderBy(consultingTickets.priority, desc(consultingTickets.createdAt));
}


// ============================================
// Discount Codes Functions
// ============================================

/**
 * Create a new discount code
 */
export async function createDiscountCode(data: {
  code: string;
  description?: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  maxUses?: number;
  validFrom?: Date;
  validUntil?: Date;
  createdBy: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(discountCodes).values({
    ...data,
    usedCount: 0,
    isActive: true,
  });
  return result;
}

/**
 * Get discount code by code string
 */
export async function getDiscountCodeByCode(code: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(discountCodes)
    .where(eq(discountCodes.code, code))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

/**
 * Get all discount codes
 */
export async function getAllDiscountCodes() {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(discountCodes)
    .orderBy(desc(discountCodes.createdAt));
}

/**
 * Update discount code
 */
export async function updateDiscountCode(id: number, data: Partial<{
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  maxUses: number | null;
  validFrom: Date | null;
  validUntil: Date | null;
  isActive: boolean;
}>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(discountCodes)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(discountCodes.id, id));
}

/**
 * Delete discount code
 */
export async function deleteDiscountCode(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .delete(discountCodes)
    .where(eq(discountCodes.id, id));
}

/**
 * Increment discount code usage count
 */
export async function incrementDiscountCodeUsage(codeId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db
    .update(discountCodes)
    .set({ 
      usedCount: sql`${discountCodes.usedCount} + 1`,
      updatedAt: new Date()
    })
    .where(eq(discountCodes.id, codeId));
}

/**
 * Record discount code usage
 */
export async function recordDiscountCodeUsage(data: {
  codeId: number;
  userId: number;
  orderId?: string;
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(discountCodeUsage).values(data);
}

/**
 * Get discount code usage history
 */
export async function getDiscountCodeUsageHistory(codeId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(discountCodeUsage)
    .where(eq(discountCodeUsage.codeId, codeId))
    .orderBy(desc(discountCodeUsage.createdAt));
}


// ==================== Notifications ====================

/**
 * Create a new notification
 */
export async function createNotification(data: {
  userId: number;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  link?: string;
  icon?: string;
}) {
  const db = await getDb();
  if (!db) return null;

  await db.insert(notifications).values(data);
}

/**
 * Get all notifications for a user
 */
export async function getUserNotifications(userId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(sql`${notifications.createdAt} DESC`)
    .limit(limit);
}

/**
 * Get unread notifications count
 */
export async function getUnreadNotificationsCount(userId: number) {
  const db = await getDb();
  if (!db) return 0;

  const result = await db
    .select({ count: sql`COUNT(*)` })
    .from(notifications)
    .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));

  return Number(result[0]?.count || 0);
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: number) {
  const db = await getDb();
  if (!db) return;

  await db
    .update(notifications)
    .set({ isRead: true, readAt: new Date() })
    .where(eq(notifications.id, notificationId));
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllNotificationsAsRead(userId: number) {
  const db = await getDb();
  if (!db) return;

  await db
    .update(notifications)
    .set({ isRead: true, readAt: new Date() })
    .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));
}

/**
 * Delete a notification
 */
export async function deleteNotification(notificationId: number) {
  const db = await getDb();
  if (!db) return;

  await db.delete(notifications).where(eq(notifications.id, notificationId));
}

/**
 * Delete all notifications for a user
 */
export async function deleteAllNotifications(userId: number) {
  const db = await getDb();
  if (!db) return;

  await db.delete(notifications).where(eq(notifications.userId, userId));
}

// ==================== Notification Preferences ====================

/**
 * Get user notification preferences
 */
export async function getNotificationPreferences(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(notificationPreferences)
    .where(eq(notificationPreferences.userId, userId))
    .limit(1);

  // Create default preferences if not exists
  if (result.length === 0) {
    await db.insert(notificationPreferences).values({ userId });
    return {
      userId,
      inAppEnabled: true,
      emailEnabled: true,
      pushEnabled: false,
      smsEnabled: false,
      notifyOnBooking: true,
      notifyOnResponse: true,
      notifyOnReminder: true,
      notifyOnPromotion: false,
    };
  }

  return result[0];
}

/**
 * Update notification preferences
 */
export async function updateNotificationPreferences(
  userId: number,
  preferences: Partial<{
    inAppEnabled: boolean;
    emailEnabled: boolean;
    pushEnabled: boolean;
    smsEnabled: boolean;
    notifyOnBooking: boolean;
    notifyOnResponse: boolean;
    notifyOnReminder: boolean;
    notifyOnPromotion: boolean;
  }>
) {
  const db = await getDb();
  if (!db) return;

  // Check if preferences exist
  const existing = await db
    .select()
    .from(notificationPreferences)
    .where(eq(notificationPreferences.userId, userId))
    .limit(1);

  if (existing.length === 0) {
    // Create with provided preferences
    await db.insert(notificationPreferences).values({ userId, ...preferences });
  } else {
    // Update existing
    await db
      .update(notificationPreferences)
      .set(preferences)
      .where(eq(notificationPreferences.userId, userId));
  }
}

// ==================== Email Logs ====================

/**
 * Log email send attempt
 */
export async function logEmail(data: {
  userId?: number;
  toEmail: string;
  subject: string;
  template?: string;
  status: 'pending' | 'sent' | 'failed';
  errorMessage?: string;
}) {
  const db = await getDb();
  if (!db) return;

  await db.insert(emailLogs).values({
    ...data,
    sentAt: data.status === 'sent' ? new Date() : undefined,
  });
}

// ==================== SMS Logs ====================

/**
 * Log SMS send attempt
 */
export async function logSMS(data: {
  userId?: number;
  toPhone: string;
  message: string;
  status: 'pending' | 'sent' | 'failed';
  errorMessage?: string;
}) {
  const db = await getDb();
  if (!db) return;

  await db.insert(smsLogs).values({
    ...data,
    sentAt: data.status === 'sent' ? new Date() : undefined,
  });
}


// ==========================================
// User Profile Helpers
// ==========================================

/**
 * Update user profile information
 */
export async function updateUserProfile(
  openId: string,
  data: {
    name?: string;
    email?: string;
  }
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: any = {
    updatedAt: new Date(),
  };

  if (data.name !== undefined) {
    updateData.name = data.name;
  }
  if (data.email !== undefined) {
    updateData.email = data.email;
  }

  await db
    .update(users)
    .set(updateData)
    .where(eq(users.openId, openId));

  // Return updated user
  return await getUserByOpenId(openId);
}

/**
 * Update user profile picture
 */
export async function updateUserProfilePicture(openId: string, imageUrl: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(users)
    .set({
      profilePicture: imageUrl,
      updatedAt: new Date(),
    })
    .where(eq(users.openId, openId));

  // Return updated user
  return await getUserByOpenId(openId);
}


// ==========================================
// Consultant System Helpers
// ==========================================

import {
  consultants,
  consultantDocuments,
  specializations,
  consultationTypes,
  consultationBookings,
  consultantEarnings,
  consultantAvailability,
  consultantBlockedDates,
  consultantReviews,
  Consultant,
  InsertConsultant,
  ConsultantDocument,
  InsertConsultantDocument,
} from "../drizzle/schema";

/**
 * Create a new consultant application
 */
export async function createConsultant(data: Omit<InsertConsultant, 'id'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(consultants).values(data);
  return result[0].insertId;
}

/**
 * Get consultant by userId
 */
export async function getConsultantByUserId(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(consultants)
    .where(eq(consultants.userId, userId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Get consultant by id
 */
export async function getConsultantById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(consultants)
    .where(eq(consultants.id, id))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * Update consultant
 */
export async function updateConsultant(id: number, data: Partial<Consultant>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(consultants)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(consultants.id, id));

  return await getConsultantById(id);
}

/**
 * Upload consultant document
 */
export async function createConsultantDocument(data: Omit<InsertConsultantDocument, 'id'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(consultantDocuments).values(data);
  return result[0].insertId;
}

/**
 * Get consultant documents
 */
export async function getConsultantDocuments(consultantId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(consultantDocuments)
    .where(eq(consultantDocuments.consultantId, consultantId))
    .orderBy(consultantDocuments.createdAt);
}

/**
 * Get all specializations
 */
export async function getAllSpecializations() {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(specializations)
    .where(eq(specializations.isActive, true))
    .orderBy(specializations.orderIndex);
}

/**
 * Get all consultation types
 */
export async function getAllConsultationTypes() {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(consultationTypes)
    .where(eq(consultationTypes.isActive, true))
    .orderBy(consultationTypes.orderIndex);
}

/**
 * Get pending consultants (for admin approval)
 */
export async function getPendingConsultants() {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(consultants)
    .where(eq(consultants.status, "pending"))
    .orderBy(desc(consultants.createdAt));
}

/**
 * Get approved consultants
 */
export async function getApprovedConsultants() {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(consultants)
    .where(eq(consultants.status, "approved"))
    .orderBy(desc(consultants.averageRating));
}

/**
 * Approve consultant
 */
export async function approveConsultant(id: number, approvedBy: number, commissionRate?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const updateData: any = {
    status: "approved",
    approvedAt: new Date(),
    approvedBy,
    updatedAt: new Date(),
  };

  if (commissionRate !== undefined) {
    updateData.commissionRate = commissionRate;
  }

  await db
    .update(consultants)
    .set(updateData)
    .where(eq(consultants.id, id));

  return await getConsultantById(id);
}

/**
 * Reject consultant
 */
export async function rejectConsultant(id: number, rejectionReason: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(consultants)
    .set({
      status: "rejected",
      rejectionReason,
      updatedAt: new Date(),
    })
    .where(eq(consultants.id, id));

  return await getConsultantById(id);
}


// ============================================
// Consultation Messages Functions
// ============================================

/**
 * إرسال رسالة في الاستشارة
 */
export async function sendConsultationMessage(data: {
  bookingId: number;
  senderId: number;
  senderType: "client" | "consultant";
  message: string;
  attachments?: string;
  isAiAssisted?: boolean;
  aiSuggestion?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(consultationMessages).values({
    bookingId: data.bookingId,
    senderId: data.senderId,
    senderType: data.senderType,
    message: data.message,
    attachments: data.attachments || null,
    isAiAssisted: data.isAiAssisted || false,
    aiSuggestion: data.aiSuggestion || null,
    isRead: false,
  });

  return Number((result as any).insertId || (result as any)[0]?.insertId || 0);
}

/**
 * جلب رسائل الاستشارة
 */
export async function getConsultationMessages(bookingId: number) {
  const db = await getDb();
  if (!db) return [];

  const messages = await db
    .select()
    .from(consultationMessages)
    .where(eq(consultationMessages.bookingId, bookingId))
    .orderBy(consultationMessages.createdAt);

  return messages;
}

/**
 * تحديث حالة القراءة
 */
export async function markMessageAsRead(messageId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(consultationMessages)
    .set({ isRead: true, readAt: new Date() })
    .where(eq(consultationMessages.id, messageId));
}

/**
 * تحديث حالة الاستشارة
 */
export async function updateConsultationStatus(
  bookingId: number,
  status: "pending" | "confirmed" | "in-progress" | "completed" | "cancelled"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(consultationBookings)
    .set({ status, updatedAt: new Date() })
    .where(eq(consultationBookings.id, bookingId));
}

/**
 * جلب تفاصيل الحجز
 */
export async function getConsultationBookingById(bookingId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(consultationBookings)
    .where(eq(consultationBookings.id, bookingId))
    .limit(1);

  return result[0] || null;
}

/**
 * تقييم الاستشارة
 */
export async function rateConsultation(data: {
  bookingId: number;
  consultantId: number;
  clientId: number;
  rating: number;
  comment?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // إضافة التقييم
  await db.insert(consultantReviews).values({
    consultantId: data.consultantId,
    clientId: data.clientId,
    bookingId: data.bookingId,
    rating: data.rating,
    comment: data.comment || null,
    isVerified: true,
    isVisible: true,
  });

  // تحديث متوسط التقييم للمستشار
  const reviews = await db
    .select()
    .from(consultantReviews)
    .where(eq(consultantReviews.consultantId, data.consultantId));

  const avgRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;
  const totalReviews = reviews.length;

  await db
    .update(consultants)
    .set({ 
      averageRating: avgRating,
      totalReviews: totalReviews,
      updatedAt: new Date(),
    })
    .where(eq(consultants.id, data.consultantId));
}


// ============================================
// PDPL Functions (حماية البيانات الشخصية)
// ============================================

/**
 * حفظ موافقة المستخدم على سياسة الخصوصية
 */
export async function saveUserConsent(data: {
  userId: number;
  policyVersion: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  const db = await getDb();
  if (!db) return null;

  const { users, userConsents } = await import("../drizzle/schema");
  
  const result = await db.insert(userConsents).values({
    userId: data.userId,
    policyVersion: data.policyVersion,
    ipAddress: data.ipAddress,
    userAgent: data.userAgent,
    consentedAt: new Date(),
  });

  return result;
}

/**
 * سحب الموافقة
 */
export async function withdrawConsent(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const { userConsents } = await import("../drizzle/schema");
  const { eq, isNull } = await import("drizzle-orm");

  await db.update(userConsents)
    .set({ withdrawnAt: new Date() })
    .where(eq(userConsents.userId, userId));

  return true;
}

/**
 * الحصول على حالة الموافقة
 */
export async function getConsentStatus(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const { userConsents } = await import("../drizzle/schema");
  const { eq, isNull, desc } = await import("drizzle-orm");

  const result = await db.select()
    .from(userConsents)
    .where(eq(userConsents.userId, userId))
    .orderBy(desc(userConsents.consentedAt))
    .limit(1);

  if (result.length === 0) return null;

  const consent = result[0];
  return {
    hasConsent: !consent.withdrawnAt,
    policyVersion: consent.policyVersion,
    consentedAt: consent.consentedAt,
    withdrawnAt: consent.withdrawnAt,
  };
}

/**
 * إنشاء طلب حقوق البيانات (DSR)
 */
export async function createDataSubjectRequest(data: {
  userId: number;
  type: "access" | "correct" | "delete" | "withdraw" | "object";
  payloadJson?: string;
}) {
  const db = await getDb();
  if (!db) return null;

  const { dataSubjectRequests } = await import("../drizzle/schema");

  const result = await db.insert(dataSubjectRequests).values({
    userId: data.userId,
    type: data.type,
    payloadJson: data.payloadJson,
    status: "new",
  });

  return result;
}

/**
 * الحصول على جميع بيانات المستخدم (لحق الوصول)
 */
export async function getUserAllData(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const { users } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");

  // جلب بيانات المستخدم الأساسية
  const userData = await db.select().from(users).where(eq(users.id, userId)).limit(1);

  if (userData.length === 0) return null;

  // يمكن إضافة المزيد من البيانات هنا (الاستشارات، المستندات، إلخ)
  return {
    user: userData[0],
    // TODO: إضافة بيانات إضافية حسب الحاجة
  };
}

/**
 * تسجيل حادث أمني
 */
export async function createSecurityIncident(data: {
  description: string;
  cause?: string;
  affectedDataCategories?: string;
  affectedUsersCount?: number;
  riskLevel: "low" | "medium" | "high";
}) {
  const db = await getDb();
  if (!db) return null;

  const { securityIncidents } = await import("../drizzle/schema");

  const result = await db.insert(securityIncidents).values({
    detectedAt: new Date(),
    description: data.description,
    cause: data.cause,
    affectedDataCategories: data.affectedDataCategories,
    affectedUsersCount: data.affectedUsersCount,
    riskLevel: data.riskLevel,
    status: "new",
  });

  return result;
}

/**
 * تحديث حالة حادث أمني
 */
export async function updateSecurityIncident(
  incidentId: number,
  updates: {
    reportedToSdaiaAt?: Date;
    reportedToUsersAt?: Date;
    status?: "new" | "investigating" | "reported" | "resolved";
    isLate?: boolean;
  }
) {
  const db = await getDb();
  if (!db) return null;

  const { securityIncidents } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");

  await db.update(securityIncidents)
    .set(updates)
    .where(eq(securityIncidents.id, incidentId));

  return true;
}

/**
 * تسجيل نقل بيانات
 */
export async function createDataTransfer(data: {
  customerId?: number;
  legalBasis: "adequacy" | "scc" | "explicit_consent" | "vital_interest" | "central_processing";
  destinationCountry: string;
  dataCategories?: string;
  riskAssessmentRef?: string;
}) {
  const db = await getDb();
  if (!db) return null;

  const { dataTransfers } = await import("../drizzle/schema");

  const result = await db.insert(dataTransfers).values(data);

  return result;
}


// Create consultation booking
export async function createConsultationBooking(data: {
  userId: number;
  consultantId: number;
  consultationTypeId: number;
  scheduledDate: string;
  scheduledTime: string;
  description: string;
  requiredInfo?: string;
  attachments?: string;
  status: string;
}) {
  const database = await getDb();
  if (!database) {
    throw new Error('Database not available');
  }

  const result = await database.insert(consultationBookings).values({
    userId: data.userId,
    consultantId: data.consultantId,
    consultationTypeId: data.consultationTypeId,
    scheduledDate: new Date(data.scheduledDate),
    scheduledTime: data.scheduledTime,
    description: data.description,
    requiredInfo: data.requiredInfo || null,
    attachments: data.attachments || null,
    status: data.status,
  });

  return Number(result.insertId);
}
