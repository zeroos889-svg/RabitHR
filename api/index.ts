/**
 * Vercel Serverless Function Entry Point
 * This file serves as the main API handler for Vercel deployment
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import startServer from "../server/_core/index";

let app: any = null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Initialize app once and reuse for subsequent requests
  if (!app) {
    app = await startServer();
  }

  // Handle the request with Express app
  return app(req, res);
}
