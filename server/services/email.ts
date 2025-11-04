/**
 * Email Service using Resend
 * 
 * This service handles all email sending functionality using Resend API.
 * Resend provides 3,000 free emails per month.
 * 
 * Setup:
 * 1. Get API key from https://resend.com
 * 2. Add RESEND_API_KEY to .env file
 * 3. Verify your domain (optional but recommended for production)
 */

import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@rabit.sa';

// Initialize Resend client
let resend: Resend | null = null;

if (resendApiKey) {
  resend = new Resend(resendApiKey);
  console.log('✅ Resend email service initialized');
} else {
  console.warn('⚠️  RESEND_API_KEY not found in environment variables');
  console.warn('⚠️  Email sending will be disabled. Add RESEND_API_KEY to enable.');
}

/**
 * Email templates
 */
export const emailTemplates = {
  welcome: (name: string, loginUrl: string) => ({
    subject: `مرحباً بك في منصة رابِط ${name}`,
    html: `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #2563eb; text-align: center;">مرحباً بك في منصة رابِط</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            عزيزنا <strong>${name}</strong>،
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            نرحب بك في منصة رابِط لإدارة الموارد البشرية. تم إنشاء حسابك بنجاح!
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${loginUrl}" style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              تسجيل الدخول الآن
            </a>
          </div>
          <p style="font-size: 14px; color: #666; margin-top: 20px;">
            إذا لم تقم بإنشاء هذا الحساب، يرجى تجاهل هذه الرسالة.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">
            © 2025 رابِط - منصة إدارة الموارد البشرية. جميع الحقوق محفوظة.
          </p>
        </div>
      </body>
      </html>
    `,
  }),

  passwordReset: (name: string, resetUrl: string, expiresIn: string) => ({
    subject: 'إعادة تعيين كلمة المرور - منصة رابِط',
    html: `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #dc2626; text-align: center;">إعادة تعيين كلمة المرور</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            عزيزنا <strong>${name}</strong>،
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              إعادة تعيين كلمة المرور
            </a>
          </div>
          <p style="font-size: 14px; color: #666;">
            هذا الرابط صالح لمدة <strong>${expiresIn}</strong> فقط.
          </p>
          <p style="font-size: 14px; color: #666;">
            إذا لم تطلب إعادة تعيين كلمة المرور، يرجى تجاهل هذه الرسالة.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">
            © 2025 رابِط - منصة إدارة الموارد البشرية. جميع الحقوق محفوظة.
          </p>
        </div>
      </body>
      </html>
    `,
  }),

  notification: (name: string, title: string, message: string) => ({
    subject: `إشعار: ${title}`,
    html: `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #2563eb; text-align: center;">${title}</h1>
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            عزيزنا <strong>${name}</strong>،
          </p>
          <div style="background-color: #f0f9ff; border-right: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0;">
              ${message}
            </p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">
            © 2025 رابِط - منصة إدارة الموارد البشرية. جميع الحقوق محفوظة.
          </p>
        </div>
      </body>
      </html>
    `,
  }),
};

/**
 * Send email using Resend
 */
export async function sendEmail(params: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}) {
  if (!resend) {
    console.error('❌ Cannot send email: Resend is not initialized');
    console.error('💡 Add RESEND_API_KEY to .env file to enable email sending');
    return {
      success: false,
      error: 'Email service is not configured',
    };
  }

  try {
    const { to, subject, html, from = fromEmail } = params;

    const result = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    console.log(`✅ Email sent successfully to ${Array.isArray(to) ? to.join(', ') : to}`);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(params: {
  to: string;
  name: string;
  loginUrl: string;
}) {
  const { subject, html } = emailTemplates.welcome(params.name, params.loginUrl);
  return sendEmail({
    to: params.to,
    subject,
    html,
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(params: {
  to: string;
  name: string;
  resetUrl: string;
  expiresIn?: string;
}) {
  const { subject, html } = emailTemplates.passwordReset(
    params.name,
    params.resetUrl,
    params.expiresIn || '1 ساعة'
  );
  return sendEmail({
    to: params.to,
    subject,
    html,
  });
}

/**
 * Send notification email
 */
export async function sendNotificationEmail(params: {
  to: string;
  name: string;
  title: string;
  message: string;
}) {
  const { subject, html } = emailTemplates.notification(
    params.name,
    params.title,
    params.message
  );
  return sendEmail({
    to: params.to,
    subject,
    html,
  });
}

export default {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendNotificationEmail,
  emailTemplates,
};
