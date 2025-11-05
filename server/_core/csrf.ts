/**
 * CSRF Protection Middleware
 * حماية من هجمات Cross-Site Request Forgery
 */

import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

// ⚠️ WARNING: In-memory token storage
// This is NOT suitable for production with multiple server instances
// For production, use Redis or a database to store CSRF tokens
// تخزين CSRF tokens (في الإنتاج استخدم Redis أو Database)
const csrfTokens = new Map<string, { token: string; expires: number }>();

// Log warning in production
if (process.env.NODE_ENV === "production") {
  console.warn(
    "⚠️  CSRF tokens are stored in memory. " +
      "This will not work correctly with multiple server instances. " +
      "Consider using Redis or a database for production."
  );
}

// مدة صلاحية الـ token (ساعة واحدة)
const TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * توليد CSRF token جديد
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Middleware لتوليد وإضافة CSRF token للـ session
 */
export function csrfProtection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // تخطي الحماية للطلبات GET, HEAD, OPTIONS
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }

  // تخطي الحماية للـ API endpoints المحددة
  const exemptPaths = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/refresh",
  ];

  if (exemptPaths.some(path => req.path.startsWith(path))) {
    return next();
  }

  // استرجاع CSRF token من الـ header أو body
  const token = (req.headers["x-csrf-token"] as string) || req.body._csrf;

  if (!token) {
    return res.status(403).json({
      error: "CSRF token missing",
      message: "لم يتم العثور على رمز الحماية (CSRF token)",
    });
  }

  // التحقق من صحة الـ token
  const sessionId =
    (req as any).session?.id || (req.headers["x-session-id"] as string);

  if (!sessionId) {
    return res.status(403).json({
      error: "Invalid session",
      message: "جلسة غير صالحة",
    });
  }

  const storedToken = csrfTokens.get(sessionId);

  if (!storedToken) {
    return res.status(403).json({
      error: "CSRF token not found",
      message: "رمز الحماية غير موجود",
    });
  }

  // التحقق من انتهاء صلاحية الـ token
  if (Date.now() > storedToken.expires) {
    csrfTokens.delete(sessionId);
    return res.status(403).json({
      error: "CSRF token expired",
      message: "انتهت صلاحية رمز الحماية",
    });
  }

  // التحقق من تطابق الـ token
  if (token !== storedToken.token) {
    return res.status(403).json({
      error: "Invalid CSRF token",
      message: "رمز حماية غير صحيح",
    });
  }

  // الـ token صحيح، السماح بالمرور
  next();
}

/**
 * Endpoint للحصول على CSRF token جديد
 */
export function getCsrfToken(req: Request, res: Response) {
  const sessionId =
    (req as any).session?.id || (req.headers["x-session-id"] as string);

  if (!sessionId) {
    return res.status(400).json({
      error: "No session found",
      message: "لم يتم العثور على جلسة",
    });
  }

  // توليد token جديد
  const token = generateCsrfToken();
  const expires = Date.now() + TOKEN_EXPIRY;

  // حفظ الـ token
  csrfTokens.set(sessionId, { token, expires });

  // إرجاع الـ token
  res.json({
    csrfToken: token,
    expires,
  });
}

/**
 * Middleware لإضافة CSRF token تلقائياً للردود
 */
export function attachCsrfToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sessionId =
    (req as any).session?.id || (req.headers["x-session-id"] as string);

  if (sessionId && !csrfTokens.has(sessionId)) {
    const token = generateCsrfToken();
    const expires = Date.now() + TOKEN_EXPIRY;
    csrfTokens.set(sessionId, { token, expires });

    // إضافة الـ token للـ response header
    res.setHeader("X-CSRF-Token", token);
  }

  next();
}

/**
 * تنظيف الـ tokens المنتهية صلاحيتها (يجب تشغيله دورياً)
 */
export function cleanupExpiredTokens() {
  const now = Date.now();
  const entries = Array.from(csrfTokens.entries());
  for (const [sessionId, data] of entries) {
    if (now > data.expires) {
      csrfTokens.delete(sessionId);
    }
  }
}

// تشغيل التنظيف كل 10 دقائق
setInterval(cleanupExpiredTokens, 10 * 60 * 1000);

/**
 * Middleware مُبسّط للـ double-submit cookie pattern
 * يُنشئ CSRF token ويُرسله في cookie و header
 */
export function doubleSubmitCsrfProtection(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // GET requests: إنشاء وإرسال token
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    const token = generateCsrfToken();

    // إرسال token في cookie (httpOnly=false ليمكن قراءته من JavaScript)
    res.cookie("XSRF-TOKEN", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: TOKEN_EXPIRY,
    });

    return next();
  }

  // POST/PUT/DELETE requests: التحقق من token
  const cookieToken = req.cookies["XSRF-TOKEN"];
  const headerToken =
    req.headers["x-xsrf-token"] || req.headers["x-csrf-token"];

  if (!cookieToken || !headerToken) {
    return res.status(403).json({
      error: "CSRF protection: Token missing",
      message: "رمز الحماية مفقود",
    });
  }

  if (cookieToken !== headerToken) {
    return res.status(403).json({
      error: "CSRF protection: Token mismatch",
      message: "رمز الحماية غير متطابق",
    });
  }

  next();
}
