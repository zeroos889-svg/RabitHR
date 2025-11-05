/**
 * JWT Token Management
 * Handles creation and verification of JWT tokens
 */

import * as jose from "jose";
import { ENV } from "./env";

export interface SessionPayload {
  userId: number;
  email: string;
  role: string;
}

/**
 * Create a session token
 */
export async function createSessionToken(
  payload: SessionPayload
): Promise<string> {
  const secret = new TextEncoder().encode(ENV.jwtSecret);

  return await new jose.SignJWT({
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

/**
 * Verify a session token
 */
export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const secret = new TextEncoder().encode(ENV.jwtSecret);
    const { payload } = await jose.jwtVerify(token, secret);

    return {
      userId: payload.userId as number,
      email: payload.email as string,
      role: payload.role as string,
    };
  } catch (error) {
    console.error("[JWT] Token verification failed", error);
    return null;
  }
}
