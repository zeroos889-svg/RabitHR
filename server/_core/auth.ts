/**
 * Authentication Module
 * Handles user authentication and session management
 */

import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { createSessionToken, verifySessionToken } from "./jwt";
import { hashPassword, verifyPassword } from "./password";

/**
 * Register authentication routes
 */
export function registerAuthRoutes(app: Express, authLimiter?: any) {
  // Login with email and password
  const loginMiddleware = authLimiter ? [authLimiter] : [];
  app.post(
    "/api/auth/login",
    ...loginMiddleware,
    async (req: Request, res: Response) => {
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          res.status(400).json({ error: "Email and password are required" });
          return;
        }

        // Get user by email
        const user = await db.getUserByEmail(email);
        if (!user) {
          res.status(401).json({ error: "Invalid email or password" });
          return;
        }

        // Get password from database
        const userPassword = await db.getPasswordByUserId(user.id);
        if (!userPassword) {
          res.status(401).json({ error: "Invalid email or password" });
          return;
        }

        // Verify password
        const isValid = await verifyPassword(
          password,
          userPassword.hashedPassword
        );
        if (!isValid) {
          res.status(401).json({ error: "Invalid email or password" });
          return;
        }

        // Update last signed in
        await db.updateUserLastSignedIn(user.id);

        // Create session token
        const sessionToken = await createSessionToken({
          userId: user.id,
          email: user.email || "",
          role: user.role,
        });

        // Set cookie
        const cookieOptions = getSessionCookieOptions(req);
        res.cookie(COOKIE_NAME, sessionToken, {
          ...cookieOptions,
          maxAge: ONE_YEAR_MS,
        });

        res.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        });
      } catch (error) {
        console.error("[Auth] Login failed", error);
        res.status(500).json({ error: "Login failed" });
      }
    }
  );

  // Register new user
  app.post(
    "/api/auth/register",
    ...loginMiddleware,
    async (req: Request, res: Response) => {
      try {
        const { email, password, name } = req.body;

        if (!email || !password) {
          res.status(400).json({ error: "Email and password are required" });
          return;
        }

        // Check if user already exists
        const existingUser = await db.getUserByEmail(email);
        if (existingUser) {
          res.status(409).json({ error: "User already exists" });
          return;
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const userId = await db.createUser({
          email,
          name: name || null,
          role: "user",
        });

        // Save password
        await db.savePassword(userId, hashedPassword);

        // Save privacy consent
        const ipAddress =
          (req.headers["x-forwarded-for"] as string) ||
          (req.headers["x-real-ip"] as string) ||
          req.socket.remoteAddress ||
          "unknown";
        const userAgent = req.headers["user-agent"] || "unknown";

        await db.saveUserConsent({
          userId,
          policyVersion: "1.0",
          ipAddress,
          userAgent,
        });

        // Create session token
        const sessionToken = await createSessionToken({
          userId,
          email,
          role: "user",
        });

        // Set cookie
        const cookieOptions = getSessionCookieOptions(req);
        res.cookie(COOKIE_NAME, sessionToken, {
          ...cookieOptions,
          maxAge: ONE_YEAR_MS,
        });

        res.json({
          success: true,
          user: {
            id: userId,
            email,
            name: name || null,
            role: "user",
          },
        });
      } catch (error) {
        console.error("[Auth] Registration failed", error);
        res.status(500).json({ error: "Registration failed" });
      }
    }
  );

  // Logout
  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    try {
      const cookieOptions = getSessionCookieOptions(req);
      res.clearCookie(COOKIE_NAME, cookieOptions);
      res.json({ success: true });
    } catch (error) {
      console.error("[Auth] Logout failed", error);
      res.status(500).json({ error: "Logout failed" });
    }
  });

  // Get current user
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      const token = req.cookies[COOKIE_NAME];
      if (!token) {
        res.status(401).json({ error: "Not authenticated" });
        return;
      }

      const payload = await verifySessionToken(token);
      if (!payload) {
        res.status(401).json({ error: "Invalid session" });
        return;
      }

      const user = await db.getUserById(payload.userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });
    } catch (error) {
      console.error("[Auth] Get user failed", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });
}

/**
 * Authentication middleware
 */
export async function requireAuth(req: Request, res: Response, next: Function) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    res.status(401).json({ error: "Invalid session" });
    return;
  }

  // Attach user info to request
  (req as any).user = payload;
  next();
}

/**
 * Admin authentication middleware
 */
export async function requireAdmin(
  req: Request,
  res: Response,
  next: Function
) {
  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const payload = await verifySessionToken(token);
  if (!payload || payload.role !== "admin") {
    res.status(403).json({ error: "Admin access required" });
    return;
  }

  // Attach user info to request
  (req as any).user = payload;
  next();
}
