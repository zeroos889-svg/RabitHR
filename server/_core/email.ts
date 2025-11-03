import * as db from '../db';

/**
 * Email Service using Resend API
 * Note: This is a placeholder. In production, you would use a real email service like Resend, SendGrid, etc.
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  template?: string;
  userId?: number;
}

/**
 * Send email
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const { to, subject, html, template, userId } = options;

  try {
    // Log the email attempt
    await db.logEmail({
      userId,
      toEmail: to,
      subject,
      template,
      status: 'pending',
    });

    // TODO: Integrate with actual email service (Resend, SendGrid, etc.)
    // For now, we'll just log it
    console.log('[Email Service] Sending email:', { to, subject });
    
    // Simulate email sending
    // In production, replace this with actual API call:
    // const response = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: 'Rabit HR <noreply@rabit-hr.com>',
    //     to: [to],
    //     subject,
    //     html,
    //   }),
    // });

    // Update log as sent
    await db.logEmail({
      userId,
      toEmail: to,
      subject,
      template,
      status: 'sent',
    });

    return true;
  } catch (error: any) {
    console.error('[Email Service] Error:', error);
    
    // Log the error
    await db.logEmail({
      userId,
      toEmail: to,
      subject,
      template,
      status: 'failed',
      errorMessage: error.message,
    });

    return false;
  }
}

/**
 * Email Templates
 */

export function getWelcomeEmailHTML(name: string): string {
  return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>مرحباً بك في رابِط</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">مرحباً بك في رابِط! 🎉</h1>
    </div>
    <div style="padding: 40px 30px;">
      <p style="font-size: 18px; color: #333; margin-bottom: 20px;">مرحباً ${name}،</p>
      <p style="font-size: 16px; color: #666; line-height: 1.6; margin-bottom: 20px;">
        نحن سعداء بانضمامك إلى منصة رابِط - مساعدك الذكي للموارد البشرية!
      </p>
      <p style="font-size: 16px; color: #666; line-height: 1.6; margin-bottom: 30px;">
        يمكنك الآن الاستفادة من جميع الأدوات والخدمات المتاحة:
      </p>
      <ul style="font-size: 16px; color: #666; line-height: 1.8; margin-bottom: 30px;">
        <li>حاسبة نهاية الخدمة</li>
        <li>مولّد النماذج الذكي</li>
        <li>استشارات الموارد البشرية</li>
        <li>المساعد الذكي</li>
      </ul>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.VITE_APP_URL || 'https://rabit-hr.com'}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
          ابدأ الآن
        </a>
      </div>
      <p style="font-size: 14px; color: #999; text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        إذا كان لديك أي استفسار، لا تتردد في التواصل معنا
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export function getBookingConfirmationHTML(data: {
  userName: string;
  packageName: string;
  price: number;
  bookingDate: string;
}): string {
  return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <title>تأكيد الحجز</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">✅ تم تأكيد حجزك</h1>
    </div>
    <div style="padding: 40px 30px;">
      <p style="font-size: 18px; color: #333; margin-bottom: 20px;">مرحباً ${data.userName}،</p>
      <p style="font-size: 16px; color: #666; line-height: 1.6; margin-bottom: 30px;">
        تم تأكيد حجزك بنجاح! إليك تفاصيل الحجز:
      </p>
      <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
        <table style="width: 100%; font-size: 16px; color: #333;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>الباقة:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: left;">${data.packageName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>السعر:</strong></td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: left;">${data.price} ريال</td>
          </tr>
          <tr>
            <td style="padding: 10px 0;"><strong>تاريخ الحجز:</strong></td>
            <td style="padding: 10px 0; text-align: left;">${data.bookingDate}</td>
          </tr>
        </table>
      </div>
      <p style="font-size: 16px; color: #666; line-height: 1.6; margin-bottom: 20px;">
        سيتم التواصل معك قريباً من قبل المستشار المختص.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.VITE_APP_URL || 'https://rabit-hr.com'}/my-consultations" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
          عرض حجوزاتي
        </a>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

export function getResponseNotificationHTML(data: {
  userName: string;
  ticketTitle: string;
  responsePreview: string;
  ticketId: number;
}): string {
  return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <title>رد جديد على استشارتك</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 28px;">💬 رد جديد على استشارتك</h1>
    </div>
    <div style="padding: 40px 30px;">
      <p style="font-size: 18px; color: #333; margin-bottom: 20px;">مرحباً ${data.userName}،</p>
      <p style="font-size: 16px; color: #666; line-height: 1.6; margin-bottom: 20px;">
        لديك رد جديد على استشارتك: <strong>${data.ticketTitle}</strong>
      </p>
      <div style="background-color: #f0f9ff; border-right: 4px solid #3b82f6; padding: 20px; margin: 20px 0; border-radius: 5px;">
        <p style="font-size: 15px; color: #1e40af; margin: 0; line-height: 1.6;">
          ${data.responsePreview}...
        </p>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.VITE_APP_URL || 'https://rabit-hr.com'}/consultations/${data.ticketId}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
          عرض الرد الكامل
        </a>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}


/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(data: { to: string; name: string }): Promise<boolean> {
  return sendEmail({
    to: data.to,
    subject: 'مرحباً بك في رابِط - مساعدك الذكي للموارد البشرية',
    html: getWelcomeEmailHTML(data.name),
    template: 'welcome',
  });
}

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmationEmail(data: {
  to: string;
  userName: string;
  packageName: string;
  price: number;
  bookingDate: string;
}): Promise<boolean> {
  return sendEmail({
    to: data.to,
    subject: 'تأكيد حجز الاستشارة - رابِط',
    html: getBookingConfirmationHTML(data),
    template: 'booking_confirmation',
  });
}

/**
 * Send response notification email
 */
export async function sendResponseNotificationEmail(data: {
  to: string;
  userName: string;
  ticketTitle: string;
  ticketId: number;
  responsePreview: string;
}): Promise<boolean> {
  return sendEmail({
    to: data.to,
    subject: 'رد جديد على استشارتك - رابِط',
    html: getResponseNotificationHTML(data),
    template: 'response_notification',
  });
}
