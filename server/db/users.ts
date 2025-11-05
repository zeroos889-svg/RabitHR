/**
 * User Database Operations Module
 * Handles all user-related database queries
 */

import { eq } from "drizzle-orm";
import { users, passwords, InsertUser } from "../../drizzle/schema";
import { getDb } from "./index";
import { logger } from "../_core/logger";
import { ENV } from "../_core/env";
import bcrypt from "bcryptjs";

// ==========================================
// User CRUD Operations
// ==========================================

/**
 * Upsert user - insert or update based on openId
 */
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    logger.warn("Cannot upsert user: database not available", {
      context: "Database",
    });
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
    } else if (user.openId === (ENV as any).ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
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
    logger.error("Failed to upsert user", { error, context: "Database" });
    throw error;
  }
}

/**
 * Get user by OpenID
 */
export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    logger.warn("Cannot get user: database not available", {
      context: "Database",
    });
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get user by numeric id
 */
export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create a lightweight user (used by auth/register)
 * Returns the new user id
 */
export async function createUser(data: {
  email: string;
  name?: string | null;
  role?: string | null;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(users).values({
    email: data.email,
    name: data.name ?? null,
    role: (data.role ?? "user") as "user" | "admin",
    loginMethod: "email",
    emailVerified: false,
    profileCompleted: false,
    openId: null,
  } as any);

  // Drizzle returns insertId in different shapes depending on driver
  const insertedId = Number(
    (result as any).insertId || (result as any)[0]?.insertId || 0
  );
  return insertedId;
}

/**
 * Update user's lastSignedIn timestamp
 */
export async function updateUserLastSignedIn(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(users)
    .set({ lastSignedIn: new Date() })
    .where(eq(users.id, userId));
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
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
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
  userType?: "employee" | "individual" | "company";
}) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    // Check if email already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email))
      .limit(1);
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
      loginMethod: "email",
      emailVerified: false,
      profileCompleted: false,
      openId: null,
    });

    const userId = Number((userResult as any).insertId || 0);

    // Save password
    await db.insert(passwords).values({
      userId,
      passwordHash,
    });

    // Get created user
    const newUser = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    return newUser[0];
  } catch (error) {
    logger.error("Failed to create user", { error, context: "Database" });
    throw error;
  }
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
    const passwordRecord = await db
      .select()
      .from(passwords)
      .where(eq(passwords.userId, user.id))
      .limit(1);
    if (passwordRecord.length === 0) {
      throw new Error("هذا الحساب مسجل عبر OAuth");
    }

    // Verify password
    const isValid = await verifyPassword(
      password,
      passwordRecord[0].passwordHash
    );
    if (!isValid) {
      throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

    // Update last signed in
    await db
      .update(users)
      .set({ lastSignedIn: new Date() })
      .where(eq(users.id, user.id));

    return user;
  } catch (error) {
    logger.error("Failed to verify login", { error, context: "Database" });
    throw error;
  }
}

/**
 * Get password record by user id.
 * This helper returns an object containing `hashedPassword` to match
 * the expectations of `server/_core/auth.ts` which reads `hashedPassword`.
 */
export async function getPasswordByUserId(userId: number) {
  const db = await getDb();
  if (!db) {
    logger.warn("Cannot get password: database not available", {
      context: "Database",
    });
    return undefined;
  }

  const result = await db
    .select()
    .from(passwords)
    .where(eq(passwords.userId, userId))
    .limit(1);
  if (result.length === 0) return undefined;

  const row: any = result[0];
  // normalize column names: some DB dumps use `hashedPassword`, drizzle schema uses `passwordHash`.
  const hashed =
    row.hashedPassword ?? row.passwordHash ?? row.password ?? null;
  return { ...row, hashedPassword: hashed };
}

/**
 * Save password hash for a user
 */
export async function savePassword(userId: number, passwordHash: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(passwords).values({ userId, passwordHash } as any);
}
