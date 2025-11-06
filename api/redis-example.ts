/**
 * Redis Example API Endpoint for Vercel
 * مثال على استخدام Redis في Vercel Serverless Functions
 *
 * Endpoint: /api/redis-example
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "redis";

// Create Redis client (singleton pattern for serverless)
let redis: ReturnType<typeof createClient> | null = null;

/**
 * Get or create Redis connection
 * الحصول على اتصال Redis أو إنشاء واحد جديد
 */
async function getRedisClient() {
  if (!redis || !redis.isOpen) {
    redis = createClient({
      url: process.env.REDIS_URL,
    });

    redis.on("error", err => console.error("❌ Redis Client Error:", err));

    await redis.connect();
    console.log("✅ Redis connected successfully");
  }

  return redis;
}

/**
 * POST Handler - Set data in Redis
 * معالج POST - حفظ البيانات في Redis
 */
async function handlePost(req: VercelRequest, res: VercelResponse) {
  try {
    const client = await getRedisClient();

    // Get data from request body
    const { key, value } = req.body || {};

    if (!key || !value) {
      return res.status(400).json({
        error: "Missing key or value in request body",
        errorAr: "مفتاح أو قيمة مفقودة في البيانات المرسلة",
      });
    }

    // Save data to Redis
    await client.set(key, JSON.stringify(value));

    return res.status(200).json({
      success: true,
      message: "Data saved successfully",
      messageAr: "تم حفظ البيانات بنجاح",
      key,
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return res.status(500).json({
      error: "Failed to save data to Redis",
      errorAr: "فشل حفظ البيانات في Redis",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * GET Handler - Fetch data from Redis
 * معالج GET - استرجاع البيانات من Redis
 */
async function handleGet(req: VercelRequest, res: VercelResponse) {
  try {
    const client = await getRedisClient();

    // Get key from query parameter
    const { key } = req.query;

    if (!key || typeof key !== "string") {
      return res.status(400).json({
        error: "Missing or invalid key parameter",
        errorAr: "مفتاح مفقود أو غير صحيح",
      });
    }

    // Fetch data from Redis
    const result = await client.get(key);

    if (!result) {
      return res.status(404).json({
        error: "Key not found",
        errorAr: "المفتاح غير موجود",
        key,
      });
    }

    // Parse and return the result
    const parsedResult = JSON.parse(result);

    return res.status(200).json({
      success: true,
      key,
      result: parsedResult,
    });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return res.status(500).json({
      error: "Failed to fetch data from Redis",
      errorAr: "فشل استرجاع البيانات من Redis",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * Main Handler - Route requests based on HTTP method
 * المعالج الرئيسي - توجيه الطلبات حسب نوع HTTP
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Check if Redis URL is configured
  if (!process.env.REDIS_URL) {
    return res.status(503).json({
      error: "Redis URL not configured",
      errorAr: "عنوان Redis غير مُعرّف",
      message: "Please set REDIS_URL environment variable in Vercel",
    });
  }

  // Route based on HTTP method
  switch (req.method) {
    case "GET":
      return handleGet(req, res);

    case "POST":
      return handlePost(req, res);

    default:
      return res.status(405).json({
        error: "Method not allowed",
        errorAr: "الطريقة غير مسموحة",
        allowedMethods: ["GET", "POST"],
      });
  }
}
