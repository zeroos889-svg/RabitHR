/**
 * CSRF Protection Middleware
 * حماية من هجمات Cross-Site Request Forgery
 *
 * Following OWASP best practices:
 * - Double Submit Cookie Pattern with Redis storage
 * - Stateless token validation
 * - Automatic token rotation
 * - Secure token generation using crypto
 */

import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { redis } from "./redisClient";

// Configuration constants
const TOKEN_EXPIRY = parseInt(process.env.CSRF_TOKEN_EXPIRY || "3600000"); // 1 hour in milliseconds
const TOKEN_LENGTH = 32; // 256-bit tokens (32 bytes = 64 hex characters)
const REDIS_PREFIX = "csrf:";

// In-memory fallback for development (not recommended for production)
const memoryTokens = new Map<string, { token: string; expires: number }>();
let useRedis = true;

/**
 * Initialize CSRF storage
 * يتحقق من توفر Redis ويستخدم fallback إذا لزم الأمر
 */
async function initializeStorage(): Promise<void> {
  try {
    if (redis && redis.isOpen) {
      await redis.ping();
      useRedis = true;
      console.log("✅ CSRF Protection: Using Redis storage");
    } else {
      throw new Error("Redis not connected");
    }
  } catch (error) {
    useRedis = false;
    console.warn(
      "⚠️  CSRF Protection: Redis unavailable, falling back to in-memory storage. " +
        "This is NOT suitable for production with multiple server instances."
    );
  }
}

// Initialize on module load
initializeStorage();

/**
 * توليد CSRF token آمن
 * Generates cryptographically secure random token
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(TOKEN_LENGTH).toString("hex");
}

/**
 * Store CSRF token in Redis or memory
 */
async function storeCsrfToken(
  sessionId: string,
  token: string,
  expiryMs: number
): Promise<void> {
  if (useRedis && redis && redis.isOpen) {
    try {
      const key = `${REDIS_PREFIX}${sessionId}`;
      await redis.set(key, token, { PX: expiryMs });
    } catch (error) {
      console.error("❌ Failed to store CSRF token in Redis:", error);
      // Fallback to memory
      memoryTokens.set(sessionId, { token, expires: Date.now() + expiryMs });
    }
  } else {
    memoryTokens.set(sessionId, { token, expires: Date.now() + expiryMs });
  }
}

/**
 * Get CSRF token from Redis or memory
 */
async function getCsrfToken(sessionId: string): Promise<string | null> {
  if (useRedis && redis && redis.isOpen) {
    try {
      const key = `${REDIS_PREFIX}${sessionId}`;
      return await redis.get(key);
    } catch (error) {
      console.error("❌ Failed to get CSRF token from Redis:", error);
      // Fallback to memory
      const stored = memoryTokens.get(sessionId);
      if (stored && Date.now() <= stored.expires) {
        return stored.token;
      }
      return null;
    }
  } else {
    const stored = memoryTokens.get(sessionId);
    if (stored && Date.now() <= stored.expires) {
      return stored.token;
    }
    return null;
  }
}

/**
 * Delete CSRF token from Redis or memory
 */
async function deleteCsrfToken(sessionId: string): Promise<void> {
  if (useRedis && redis && redis.isOpen) {
    try {
      const key = `${REDIS_PREFIX}${sessionId}`;
      await redis.del(key);
    } catch (error) {
      console.error("❌ Failed to delete CSRF token from Redis:", error);
    }
  }
  memoryTokens.delete(sessionId);
}

/**
 * CSRF Protection Middleware (async)
 * Following OWASP recommendations for CSRF prevention
 */
export async function csrfProtection(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Skip protection for safe methods (OWASP recommendation)
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
      return next();
    }

    // Exempt paths for authentication endpoints
    const exemptPaths = [
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/refresh",
    ];

    if (exemptPaths.some(path => req.path.startsWith(path))) {
      return next();
    }

    // Extract token from header or body (multiple sources for flexibility)
    const token = (req.headers["x-csrf-token"] as string) || req.body._csrf;

    if (!token) {
      res.status(403).json({
        error: "CSRF token missing",
        message: "لم يتم العثور على رمز الحماية (CSRF token)",
      });
      return;
    }

    // Get session ID from request
    const sessionId =
      (req as any).session?.id || (req.headers["x-session-id"] as string);

    if (!sessionId) {
      res.status(403).json({
        error: "Invalid session",
        message: "جلسة غير صالحة",
      });
      return;
    }

    // Retrieve stored token (from Redis or memory)
    const storedToken = await getCsrfToken(sessionId);

    if (!storedToken) {
      res.status(403).json({
        error: "CSRF token not found",
        message: "رمز الحماية غير موجود أو منتهي الصلاحية",
      });
      return;
    }

    // Constant-time comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(Buffer.from(token), Buffer.from(storedToken))) {
      res.status(403).json({
        error: "Invalid CSRF token",
        message: "رمز حماية غير صحيح",
      });
      return;
    }

    // Token is valid, allow request to proceed
    next();
  } catch (error) {
    console.error("❌ CSRF Protection Error:", error);
    res.status(500).json({
      error: "CSRF validation error",
      message: "خطأ في التحقق من رمز الحماية",
    });
  }
}

/**
 * Generate and store a new CSRF token for a session
 * توليد وحفظ token جديد للجلسة
 */
export async function generateCsrfTokenForSession(
  sessionId: string
): Promise<string> {
  const token = generateCsrfToken();
  await storeCsrfToken(sessionId, token, TOKEN_EXPIRY);
  return token;
}

/**
 * Endpoint للحصول على CSRF token جديد
 * API endpoint to get a new CSRF token
 */
export async function getCsrfTokenEndpoint(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const sessionId =
      (req as any).session?.id || (req.headers["x-session-id"] as string);

    if (!sessionId) {
      res.status(400).json({
        error: "No session found",
        message: "لم يتم العثور على جلسة",
      });
      return;
    }

    // Generate and store new token
    const token = await generateCsrfTokenForSession(sessionId);
    const expires = Date.now() + TOKEN_EXPIRY;

    // Return token to client
    res.json({
      csrfToken: token,
      expires,
      expiresIn: TOKEN_EXPIRY,
    });
  } catch (error) {
    console.error("❌ Error generating CSRF token:", error);
    res.status(500).json({
      error: "Failed to generate CSRF token",
      message: "فشل في إنشاء رمز الحماية",
    });
  }
}

/**
 * Middleware لإضافة CSRF token تلقائياً للردود
 * Automatically attaches CSRF token to responses
 */
export async function attachCsrfToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const sessionId =
      (req as any).session?.id || (req.headers["x-session-id"] as string);

    if (sessionId) {
      // Check if token exists for this session
      const existingToken = await getCsrfToken(sessionId);

      if (!existingToken) {
        // Generate and store new token
        const token = await generateCsrfTokenForSession(sessionId);
        res.setHeader("X-CSRF-Token", token);
      } else {
        // Return existing token
        res.setHeader("X-CSRF-Token", existingToken);
      }
    }

    next();
  } catch (error) {
    console.error("❌ Error attaching CSRF token:", error);
    // Don't fail the request, just log the error
    next();
  }
}

/**
 * تنظيف الـ tokens المنتهية صلاحيتها من الذاكرة
 * Cleanup expired tokens from memory (Redis handles expiry automatically)
 */
export function cleanupExpiredTokens(): void {
  const now = Date.now();
  const entries = Array.from(memoryTokens.entries());
  let cleaned = 0;

  for (const [sessionId, data] of entries) {
    if (now > data.expires) {
      memoryTokens.delete(sessionId);
      cleaned++;
    }
  }

  if (cleaned > 0) {
    console.log(`🧹 Cleaned up ${cleaned} expired CSRF tokens from memory`);
  }
}

// Cleanup every 10 minutes (only affects memory storage, Redis auto-expires)
const CLEANUP_INTERVAL = parseInt(
  process.env.CSRF_CLEANUP_INTERVAL || "600000"
); // 10 minutes
setInterval(cleanupExpiredTokens, CLEANUP_INTERVAL);

/**
 * Double-Submit Cookie Pattern (Stateless CSRF Protection)
 * Following OWASP best practices for stateless CSRF protection
 *
 * This is a simplified version that doesn't require server-side storage
 * but provides good protection against CSRF attacks.
 */
export async function doubleSubmitCsrfProtection(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Safe methods: generate and send token
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
      const token = generateCsrfToken();

      // Send token in cookie (httpOnly=false to allow JavaScript access)
      res.cookie("XSRF-TOKEN", token, {
        httpOnly: false, // Must be false for double-submit pattern
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // Strict to prevent CSRF
        maxAge: TOKEN_EXPIRY,
        path: "/",
      });

      return next();
    }

    // Unsafe methods: verify token
    const cookieToken = req.cookies["XSRF-TOKEN"];
    const headerToken =
      req.headers["x-xsrf-token"] || req.headers["x-csrf-token"];

    if (!cookieToken || !headerToken) {
      res.status(403).json({
        error: "CSRF protection: Token missing",
        message: "رمز الحماية مفقود",
      });
      return;
    }

    // Ensure both tokens are strings for comparison
    const cookieTokenStr =
      typeof cookieToken === "string" ? cookieToken : String(cookieToken);
    const headerTokenStr =
      typeof headerToken === "string" ? headerToken : String(headerToken);

    // Constant-time comparison to prevent timing attacks
    if (
      !crypto.timingSafeEqual(
        Buffer.from(cookieTokenStr),
        Buffer.from(headerTokenStr)
      )
    ) {
      res.status(403).json({
        error: "CSRF protection: Token mismatch",
        message: "رمز الحماية غير متطابق",
      });
      return;
    }

    next();
  } catch (error) {
    console.error("❌ Double-submit CSRF protection error:", error);
    res.status(500).json({
      error: "CSRF validation error",
      message: "خطأ في التحقق من رمز الحماية",
    });
  }
}

/**
 * Graceful shutdown: cleanup resources
 */
export async function shutdownCsrfProtection(): Promise<void> {
  try {
    memoryTokens.clear();
    console.log("✅ CSRF Protection: Cleaned up resources");
  } catch (error) {
    console.error("❌ Error during CSRF protection shutdown:", error);
  }
}
