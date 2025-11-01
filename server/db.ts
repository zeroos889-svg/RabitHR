import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
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
