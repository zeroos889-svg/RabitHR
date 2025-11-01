/**
 * Payment Service - Moyasar & Tap Payment
 * Saudi payment gateways integration
 */

export interface PaymentOptions {
  amount: number; // in SAR
  currency?: string;
  description: string;
  callbackUrl: string;
  source?: {
    type: 'creditcard' | 'applepay' | 'stcpay' | 'mada';
    number?: string;
    name?: string;
    month?: string;
    year?: string;
    cvc?: string;
  };
  metadata?: Record<string, any>;
}

export interface PaymentResult {
  id: string;
  status: 'initiated' | 'paid' | 'failed' | 'refunded';
  amount: number;
  fee: number;
  currency: string;
  refunded: number;
  refundedAt?: Date;
  capturedAt?: Date;
  voidedAt?: Date;
  description: string;
  amountFormat: string;
  feeFormat: string;
  refundedFormat: string;
  source: {
    type: string;
    company: string;
    name: string;
    number: string;
    gatewayId: string;
    referenceNumber: string;
    token: string;
    message: string;
    transactionUrl: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Create Moyasar Payment
 * https://moyasar.com/docs/api/
 */
export async function createMoyasarPayment(
  options: PaymentOptions
): Promise<PaymentResult> {
  const apiKey = process.env.MOYASAR_API_KEY;
  
  if (!apiKey) {
    throw new Error('MOYASAR_API_KEY is not configured');
  }

  try {
    const response = await fetch('https://api.moyasar.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
      },
      body: JSON.stringify({
        amount: options.amount * 100, // Convert to halalas
        currency: options.currency || 'SAR',
        description: options.description,
        callback_url: options.callbackUrl,
        source: options.source,
        metadata: options.metadata,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Payment creation failed');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('[Moyasar] Payment creation error:', error);
    throw error;
  }
}

/**
 * Get Moyasar Payment Status
 */
export async function getMoyasarPayment(paymentId: string): Promise<PaymentResult> {
  const apiKey = process.env.MOYASAR_API_KEY;
  
  if (!apiKey) {
    throw new Error('MOYASAR_API_KEY is not configured');
  }

  try {
    const response = await fetch(`https://api.moyasar.com/v1/payments/${paymentId}`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payment status');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('[Moyasar] Payment fetch error:', error);
    throw error;
  }
}

/**
 * Refund Moyasar Payment
 */
export async function refundMoyasarPayment(
  paymentId: string,
  amount?: number
): Promise<PaymentResult> {
  const apiKey = process.env.MOYASAR_API_KEY;
  
  if (!apiKey) {
    throw new Error('MOYASAR_API_KEY is not configured');
  }

  try {
    const response = await fetch(`https://api.moyasar.com/v1/payments/${paymentId}/refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
      },
      body: JSON.stringify({
        amount: amount ? amount * 100 : undefined, // Partial refund if amount specified
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Refund failed');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('[Moyasar] Refund error:', error);
    throw error;
  }
}

/**
 * Create Tap Payment
 * https://developers.tap.company/reference/create-a-charge
 */
export async function createTapPayment(
  options: PaymentOptions
): Promise<any> {
  const apiKey = process.env.TAP_API_KEY;
  
  if (!apiKey) {
    throw new Error('TAP_API_KEY is not configured');
  }

  try {
    const response = await fetch('https://api.tap.company/v2/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        amount: options.amount,
        currency: options.currency || 'SAR',
        description: options.description,
        redirect: {
          url: options.callbackUrl,
        },
        metadata: options.metadata,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Payment creation failed');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('[Tap] Payment creation error:', error);
    throw error;
  }
}

/**
 * Verify Payment Webhook Signature
 * Moyasar uses HMAC SHA256
 */
export function verifyMoyasarWebhook(
  payload: string,
  signature: string
): boolean {
  const crypto = require('crypto');
  const secret = process.env.MOYASAR_WEBHOOK_SECRET;
  
  if (!secret) {
    console.warn('[Moyasar] Webhook secret not configured');
    return false;
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const calculatedSignature = hmac.digest('hex');

  return calculatedSignature === signature;
}
