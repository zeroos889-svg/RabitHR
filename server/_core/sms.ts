import * as db from '../db';

/**
 * SMS Service
 * Supports multiple providers: Twilio, Unifonic, etc.
 */

interface SMSOptions {
  to: string;
  message: string;
  userId?: number;
}

/**
 * Send SMS
 */
export async function sendSMS(options: SMSOptions): Promise<boolean> {
  const { to, message, userId } = options;

  try {
    // Log the SMS attempt
    await db.logSMS({
      userId,
      toPhone: to,
      message,
      status: 'pending',
    });

    // TODO: Integrate with actual SMS service (Twilio, Unifonic, etc.)
    console.log('[SMS Service] Sending SMS:', { to, message });
    
    // Simulate SMS sending
    // In production, replace with actual API call:
    // 
    // For Twilio:
    // const twilio = require('twilio');
    // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    // await client.messages.create({
    //   body: message,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: to
    // });
    //
    // For Unifonic:
    // await fetch('https://api.unifonic.com/rest/SMS/messages', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     AppSid: process.env.UNIFONIC_APP_SID,
    //     SenderID: 'RABIT-HR',
    //     Recipient: to,
    //     Body: message,
    //   }),
    // });

    // Update log as sent
    await db.logSMS({
      userId,
      toPhone: to,
      message,
      status: 'sent',
    });

    return true;
  } catch (error: any) {
    console.error('[SMS Service] Error:', error);
    
    // Log the error
    await db.logSMS({
      userId,
      toPhone: to,
      message,
      status: 'failed',
      errorMessage: error.message,
    });

    return false;
  }
}

/**
 * SMS Templates
 */

export function getBookingReminderSMS(data: {
  name: string;
  packageName: string;
  date: string;
}): string {
  return `مرحباً ${data.name}، تذكير بموعد استشارتك "${data.packageName}" في ${data.date}. منصة رابِط`;
}

export function getBookingConfirmationSMS(data: {
  name: string;
  packageName: string;
}): string {
  return `مرحباً ${data.name}، تم تأكيد حجزك "${data.packageName}" بنجاح. سيتم التواصل معك قريباً. منصة رابِط`;
}

export function getResponseNotificationSMS(data: {
  name: string;
  ticketTitle: string;
}): string {
  return `مرحباً ${data.name}، لديك رد جديد على استشارتك "${data.ticketTitle}". تفقد حسابك على منصة رابِط`;
}
