import { Request, Response, NextFunction } from "express";

/**
 * Security Middleware
 */

// إضافة Security Headers
export function securityHeaders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // منع XSS
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Content Security Policy
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
  );

  // Strict Transport Security (HTTPS)
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );

  // Referrer Policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions Policy
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );

  next();
}

// التحقق من البيانات المدخلة
export function validateInput(
  data: any,
  schema: Record<string, any>
): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  for (const [key, rules] of Object.entries(schema)) {
    const value = data[key];
    const rulesArray = Array.isArray(rules) ? rules : [rules];

    for (const rule of rulesArray) {
      if (typeof rule === "function") {
        const result = rule(value);
        if (result !== true) {
          errors[key] = result || `${key} is invalid`;
        }
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// تنظيف البيانات من XSS
export function sanitizeString(str: string): string {
  if (typeof str !== "string") return "";

  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// التحقق من البريد الإلكتروني
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// التحقق من كلمة المرور
export function isValidPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

// ⚠️ WARNING: In-memory rate limiting
// This is NOT suitable for production with multiple server instances
// For production, use Redis or express-rate-limit with Redis store
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Log warning once in production
if (process.env.NODE_ENV === "production") {
  console.warn(
    "⚠️  Rate limiting is using in-memory storage. " +
      "This will not work correctly across multiple server instances. " +
      "Consider using Redis with express-rate-limit for production."
  );
}

export function rateLimitMiddleware(
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || "unknown";
    const now = Date.now();
    const record = requestCounts.get(ip);

    if (!record || now > record.resetTime) {
      requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
      next();
    } else if (record.count < maxRequests) {
      record.count++;
      next();
    } else {
      res.status(429).json({
        error: "Too many requests, please try again later.",
      });
    }
  };
}
