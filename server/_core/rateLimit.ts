import rateLimit from 'express-rate-limit';

/**
 * Rate Limiting Middleware
 * Protects APIs from abuse and DDoS attacks
 */

// General API rate limiter: 100 requests per 15 minutes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'تم تجاوز الحد المسموح من الطلبات. يرجى المحاولة لاحقاً.',
    retryAfter: '15 دقيقة'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip rate limiting for admin users (optional)
  skip: (req) => {
    // You can implement admin check here
    // return req.user?.role === 'admin';
    return false;
  },
});

// Strict limiter for sensitive endpoints (login, registration): 5 requests per 15 minutes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: 'تم تجاوز عدد محاولات تسجيل الدخول. يرجى المحاولة بعد 15 دقيقة.',
    retryAfter: '15 دقيقة'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Payment limiter: 10 requests per hour
export const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: {
    error: 'تم تجاوز عدد محاولات الدفع. يرجى المحاولة بعد ساعة.',
    retryAfter: 'ساعة واحدة'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Document generation limiter: 20 requests per hour
export const documentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: {
    error: 'تم تجاوز عدد محاولات توليد المستندات. يرجى المحاولة بعد ساعة.',
    retryAfter: 'ساعة واحدة'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
