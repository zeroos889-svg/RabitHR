import { eq, and, or, like, desc, sql } from "drizzle-orm";
import { getDb } from "./db";
import { 
  users, 
  subscriptions, 
  consultingTickets, 
  consultingPackages,
  auditLogs,
  InsertUser,
  payments
} from "../drizzle/schema";

// Admin Statistics
export async function getAdminStats() {
  const db = await getDb();
  if (!db) return null;

  try {
    const [totalUsers] = await db.select({ count: sql<number>`COUNT(*)` }).from(users);
    const [activeSubscriptions] = await db.select({ count: sql<number>`COUNT(*)` }).from(subscriptions).where(eq(subscriptions.status, 'active'));
    const [pendingBookings] = await db.select({ count: sql<number>`COUNT(*)` }).from(consultingTickets).where(eq(consultingTickets.status, 'pending'));
    const [totalRevenue] = await db.select({ sum: sql<number>`COALESCE(SUM(finalAmount), 0)` }).from(payments).where(eq(payments.status, 'paid'));

    return {
      totalUsers: Number(totalUsers?.count) || 0,
      activeSubscriptions: Number(activeSubscriptions?.count) || 0,
      pendingBookings: Number(pendingBookings?.count) || 0,
      totalRevenue: Number(totalRevenue?.sum) || 0,
    };
  } catch (error) {
    console.error("[Database] Failed to get admin stats:", error);
    return null;
  }
}

// Get all users with pagination and filters
export async function getAllUsersAdmin(params: {
  page: number;
  limit: number;
  search?: string;
  role?: "admin" | "user";
  userType?: "employee" | "individual" | "company";
}) {
  const db = await getDb();
  if (!db) return { users: [], total: 0, page: 1, limit: 20, totalPages: 0 };

  try {
    const { page, limit, search, role, userType } = params;
    const offset = (page - 1) * limit;

    const conditions = [];
    if (search) {
      conditions.push(or(
        like(users.name, `%${search}%`),
        like(users.email, `%${search}%`)
      ));
    }
    if (role) {
      conditions.push(eq(users.role, role));
    }
    if (userType) {
      conditions.push(eq(users.userType, userType));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [result, [countResult]] = await Promise.all([
      db.select().from(users)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(users.createdAt)),
      db.select({ count: sql<number>`COUNT(*)` }).from(users).where(whereClause),
    ]);

    const total = Number(countResult?.count) || 0;

    return {
      users: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("[Database] Failed to get all users:", error);
    return { users: [], total: 0, page: 1, limit: 20, totalPages: 0 };
  }
}

// Get user by ID
export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user || null;
  } catch (error) {
    console.error("[Database] Failed to get user by ID:", error);
    return null;
  }
}

// Update user
export async function updateUser(id: number, data: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) return;

  try {
    await db.update(users).set(data).where(eq(users.id, id));
  } catch (error) {
    console.error("[Database] Failed to update user:", error);
    throw error;
  }
}

// Delete user
export async function deleteUser(id: number) {
  const db = await getDb();
  if (!db) return;

  try {
    await db.delete(users).where(eq(users.id, id));
  } catch (error) {
    console.error("[Database] Failed to delete user:", error);
    throw error;
  }
}

// Get all subscriptions
export async function getAllSubscriptions(params: {
  page: number;
  limit: number;
  status?: "active" | "inactive" | "trial" | "cancelled";
}) {
  const db = await getDb();
  if (!db) return { subscriptions: [], total: 0, page: 1, limit: 20, totalPages: 0 };

  try {
    const { page, limit, status } = params;
    const offset = (page - 1) * limit;

    const whereClause = status ? eq(subscriptions.status, status) : undefined;

    const [result, [countResult]] = await Promise.all([
      db.select({
        subscription: subscriptions,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      }).from(subscriptions)
        .leftJoin(users, eq(subscriptions.userId, users.id))
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(subscriptions.createdAt)),
      db.select({ count: sql<number>`COUNT(*)` }).from(subscriptions).where(whereClause),
    ]);

    const total = Number(countResult?.count) || 0;

    return {
      subscriptions: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("[Database] Failed to get all subscriptions:", error);
    return { subscriptions: [], total: 0, page: 1, limit: 20, totalPages: 0 };
  }
}

// Update subscription
export async function updateSubscription(id: number, data: { status?: "active" | "inactive" | "trial" | "cancelled"; endDate?: string }) {
  const db = await getDb();
  if (!db) return;

  try {
    await db.update(subscriptions).set(data as any).where(eq(subscriptions.id, id));
  } catch (error) {
    console.error("[Database] Failed to update subscription:", error);
    throw error;
  }
}

// Get all bookings (consulting tickets)
export async function getAllBookings(params: {
  page: number;
  limit: number;
  status?: "pending" | "assigned" | "in-progress" | "completed" | "cancelled";
}) {
  const db = await getDb();
  if (!db) return { bookings: [], total: 0, page: 1, limit: 20, totalPages: 0 };

  try {
    const { page, limit, status } = params;
    const offset = (page - 1) * limit;

    const whereClause = status ? eq(consultingTickets.status, status) : undefined;

    const [result, [countResult]] = await Promise.all([
      db.select({
        booking: consultingTickets,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
        package: consultingPackages,
      }).from(consultingTickets)
        .leftJoin(users, eq(consultingTickets.userId, users.id))
        .leftJoin(consultingPackages, eq(consultingTickets.packageId, consultingPackages.id))
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(consultingTickets.createdAt)),
      db.select({ count: sql<number>`COUNT(*)` }).from(consultingTickets).where(whereClause),
    ]);

    const total = Number(countResult?.count) || 0;

    return {
      bookings: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("[Database] Failed to get all bookings:", error);
    return { bookings: [], total: 0, page: 1, limit: 20, totalPages: 0 };
  }
}

// Update booking
export async function updateBooking(id: number, data: { status?: "pending" | "assigned" | "in-progress" | "completed" | "cancelled"; consultantId?: number }) {
  const db = await getDb();
  if (!db) return;

  try {
    await db.update(consultingTickets).set(data as any).where(eq(consultingTickets.id, id));
  } catch (error) {
    console.error("[Database] Failed to update booking:", error);
    throw error;
  }
}

// Create audit log
export async function createAuditLog(data: {
  userId: number;
  action: string;
  entityType: string;
  entityId: number;
  changes: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  const db = await getDb();
  if (!db) return;

  try {
    await db.insert(auditLogs).values(data as any);
  } catch (error) {
    console.error("[Database] Failed to create audit log:", error);
  }
}

// Get audit logs
export async function getAuditLogs(params: {
  page: number;
  limit: number;
  userId?: number;
  action?: string;
}) {
  const db = await getDb();
  if (!db) return { logs: [], total: 0, page: 1, limit: 50, totalPages: 0 };

  try {
    const { page, limit, userId, action } = params;
    const offset = (page - 1) * limit;

    const conditions = [];
    if (userId) {
      conditions.push(eq(auditLogs.userId, userId));
    }
    if (action) {
      conditions.push(eq(auditLogs.action, action));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [result, [countResult]] = await Promise.all([
      db.select({
        log: auditLogs,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      }).from(auditLogs)
        .leftJoin(users, eq(auditLogs.userId, users.id))
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(auditLogs.createdAt)),
      db.select({ count: sql<number>`COUNT(*)` }).from(auditLogs).where(whereClause),
    ]);

    const total = Number(countResult?.count) || 0;

    return {
      logs: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("[Database] Failed to get audit logs:", error);
    return { logs: [], total: 0, page: 1, limit: 50, totalPages: 0 };
  }
}
