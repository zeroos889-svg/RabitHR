/**
 * Environment Variables Configuration
 * Centralized environment variable management
 */

export const ENV = {
  // Node Environment
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  
  // Database
  databaseUrl: process.env.DATABASE_URL ?? "",
  
  // Authentication & Security
  jwtSecret: process.env.JWT_SECRET ?? "",
  sessionSecret: process.env.SESSION_SECRET ?? "",
  sessionMaxAge: parseInt(process.env.SESSION_MAX_AGE ?? "604800000"),
  
  // Admin Configuration
  adminEmail: process.env.ADMIN_EMAIL ?? "",
  adminPassword: process.env.ADMIN_PASSWORD ?? "",
  
  // Application
  appUrl: process.env.VITE_APP_URL ?? "http://localhost:3000",
  appTitle: process.env.VITE_APP_TITLE ?? "رابِط - منصة إدارة الموارد البشرية",
  appLogo: process.env.VITE_APP_LOGO ?? "/logo.png",
  port: parseInt(process.env.PORT ?? "3000"),
  
  // Analytics
  analyticsEndpoint: process.env.VITE_ANALYTICS_ENDPOINT ?? "",
  analyticsWebsiteId: process.env.VITE_ANALYTICS_WEBSITE_ID ?? "",
  
  // AWS S3
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  awsRegion: process.env.AWS_REGION ?? "us-east-1",
  awsS3Bucket: process.env.AWS_S3_BUCKET ?? "",
  
  // Payment Gateways
  moyasarApiKey: process.env.MOYASAR_API_KEY ?? "",
  moyasarSecretKey: process.env.MOYASAR_SECRET_KEY ?? "",
  tapApiKey: process.env.TAP_API_KEY ?? "",
  tapSecretKey: process.env.TAP_SECRET_KEY ?? "",
  
  // Email Service
  smtpHost: process.env.SMTP_HOST ?? "",
  smtpPort: parseInt(process.env.SMTP_PORT ?? "587"),
  smtpUser: process.env.SMTP_USER ?? "",
  smtpPassword: process.env.SMTP_PASSWORD ?? "",
  smtpFrom: process.env.SMTP_FROM ?? "noreply@rabit.sa",
  
  // SMS Service
  smsApiKey: process.env.SMS_API_KEY ?? "",
  smsSenderId: process.env.SMS_SENDER_ID ?? "Rabit",
  
  // Google Maps
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY ?? "",
  
  // OpenAI
  openaiApiKey: process.env.OPENAI_API_KEY ?? "",
};

/**
 * Validate required environment variables
 */
export function validateEnv(): { valid: boolean; missing: string[] } {
  const required = [
    "DATABASE_URL",
    "JWT_SECRET",
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Check if environment is properly configured
 */
export function checkEnv(): void {
  const { valid, missing } = validateEnv();
  
  if (!valid) {
    console.error("❌ Missing required environment variables:");
    missing.forEach(key => console.error(`   - ${key}`));
    console.error("\n💡 Please check your .env file");
    
    if (!ENV.isProduction) {
      console.warn("\n⚠️  Running in development mode with missing variables");
    } else {
      process.exit(1);
    }
  } else {
    console.log("✅ Environment variables loaded successfully");
  }
}
