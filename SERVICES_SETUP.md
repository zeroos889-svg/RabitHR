# 🔧 دليل تفعيل الخدمات - RabitHR

## 📋 ملخص الخدمات

| الخدمة                | الحالة  | الوقت المطلوب | الأولوية |
| --------------------- | ------- | ------------- | -------- |
| Email (Resend)        | 🟡 جاهز | 5 دقائق       | ⭐⭐⭐   |
| SMS (Twilio/Unifonic) | 🟡 جاهز | 10 دقائق      | ⭐⭐     |
| Payment (Moyasar)     | 🟡 جاهز | 15 دقيقة      | ⭐⭐⭐   |
| AWS S3                | 🟡 جاهز | 10 دقائق      | ⭐⭐     |
| AI/LLM (OpenAI)       | 🟡 جاهز | 5 دقائق       | ⭐       |

---

## 1. Email Service (أولوية عالية ⭐⭐⭐)

### لماذا مهم؟

- ✅ إشعارات المستخدمين
- ✅ تأكيد الحجوزات
- ✅ استرجاع كلمة المرور
- ✅ رسائل الاستشارات

### الخيار 1: Resend (موصى به للسعودية)

**المميزات:**

- ✅ سهل جداً
- ✅ 100 email/يوم مجاناً
- ✅ دعم عربي
- ✅ سرعة عالية

**خطوات التفعيل:**

1. **التسجيل**

   ```
   https://resend.com/signup
   ```

2. **إنشاء API Key**
   - اذهب إلى API Keys
   - اضغط "Create API Key"
   - اسمه: RabitHR Production
   - انسخ المفتاح: `re_xxxxxxxxxxxxx`

3. **إضافة في `.env`**

   ```env
   EMAIL_SERVICE=resend
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   EMAIL_FROM=noreply@rabithr.com
   EMAIL_FROM_NAME=رابِط HR
   ```

4. **Verify Domain (اختياري)**
   - اذهب إلى Domains
   - أضف rabithr.com
   - أضف DNS records

5. **اختبار**
   ```bash
   # في terminal
   curl -X POST http://localhost:3000/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"to":"your@email.com"}'
   ```

### الخيار 2: SendGrid (بديل)

```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
EMAIL_FROM=noreply@rabithr.com
```

---

## 2. SMS Service (أولوية متوسطة ⭐⭐)

### لماذا مهم؟

- ✅ OTP للتحقق
- ✅ تذكير بالمواعيد
- ✅ إشعارات عاجلة

### الخيار 1: Unifonic (للسعودية)

**المميزات:**

- ✅ متخصص في السعودية
- ✅ أسعار مناسبة
- ✅ دعم عربي

**خطوات التفعيل:**

1. **التسجيل**

   ```
   https://www.unifonic.com/ar
   ```

2. **إنشاء APP**
   - Console → Create App
   - احصل على App SID

3. **إضافة في `.env`**

   ```env
   SMS_SERVICE=unifonic
   UNIFONIC_APP_SID=xxxxxxxxxxxxx
   SMS_FROM_NAME=RabitHR
   ```

4. **اختبار**
   ```bash
   curl -X POST http://localhost:3000/api/test-sms \
     -H "Content-Type: application/json" \
     -d '{"to":"+966xxxxxxxxx","message":"Test"}'
   ```

### الخيار 2: Twilio (عالمي)

```env
SMS_SERVICE=twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+966xxxxxxxxx
```

---

## 3. Payment Gateway (أولوية عالية ⭐⭐⭐)

### لماذا مهم؟

- ✅ الاشتراكات
- ✅ حجز الاستشارات
- ✅ الدفع الإلكتروني

### الخيار 1: Moyasar (للسعودية)

**المميزات:**

- ✅ متوافق مع البنوك السعودية
- ✅ Mada, Visa, Mastercard
- ✅ Apple Pay, STC Pay
- ✅ دعم فواتير

**خطوات التفعيل:**

1. **التسجيل**

   ```
   https://moyasar.com/signup
   ```

2. **التحقق**
   - رفع السجل التجاري
   - معلومات البنك
   - انتظر الموافقة (1-3 أيام)

3. **إضافة في `.env`**

   ```env
   PAYMENT_SERVICE=moyasar
   MOYASAR_API_KEY=sk_live_xxxxxxxxxxxxx
   MOYASAR_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
   PAYMENT_RETURN_URL=https://rabithr.com/payment/success
   PAYMENT_CALLBACK_URL=https://rabithr.com/api/payment/webhook
   ```

4. **Webhook Setup**
   - Moyasar Dashboard → Webhooks
   - أضف: `https://rabithr.com/api/payment/webhook`
   - Events: payment.paid, payment.failed

5. **Test Mode أولاً**

   ```env
   # للتجربة
   MOYASAR_API_KEY=sk_test_xxxxxxxxxxxxx
   MOYASAR_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
   ```

   Test Cards:

   ```
   Visa: 4111 1111 1111 1111
   Mastercard: 5200 0000 0000 0000
   CVV: أي 3 أرقام
   ```

---

## 4. AWS S3 للملفات (أولوية متوسطة ⭐⭐)

### لماذا مهم؟

- ✅ تخزين السير الذاتية
- ✅ صور الملفات الشخصية
- ✅ المستندات
- ✅ الشهادات

### خطوات التفعيل

1. **إنشاء حساب AWS**

   ```
   https://aws.amazon.com/
   ```

2. **إنشاء S3 Bucket**

   ```bash
   Region: me-south-1 (البحرين - الأقرب للسعودية)
   Bucket name: rabithr-files-prod

   # Block public access: OFF للصور العامة فقط
   # Versioning: ON (موصى به)
   ```

3. **إنشاء IAM User**
   - IAM → Users → Add User
   - Access type: Programmatic access
   - Permissions: AmazonS3FullAccess
   - حفظ Access Key ID & Secret

4. **إضافة في `.env`**

   ```env
   AWS_REGION=me-south-1
   AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxxx
   AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxx
   AWS_S3_BUCKET=rabithr-files-prod
   AWS_S3_PUBLIC_URL=https://rabithr-files-prod.s3.me-south-1.amazonaws.com
   ```

5. **CORS Configuration**
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedOrigins": ["https://rabithr.com"],
       "ExposeHeaders": ["ETag"]
     }
   ]
   ```

---

## 5. AI/LLM (أولوية منخفضة ⭐)

### لماذا مهم؟

- ✅ مساعدة المستشار في الردود
- ✅ مولد الخطابات الذكي
- ✅ تحليل البيانات

### خطوات التفعيل

1. **التسجيل في OpenAI**

   ```
   https://platform.openai.com/signup
   ```

2. **إنشاء API Key**
   - API Keys → Create new secret key
   - انسخ: `sk-xxxxxxxxxxxxx`

3. **إضافة في `.env`**

   ```env
   OPENAI_API_KEY=sk-xxxxxxxxxxxxx
   OPENAI_MODEL=gpt-4-turbo-preview
   AI_ENABLED=true
   AI_MAX_TOKENS=1000
   AI_TEMPERATURE=0.7
   ```

4. **التكلفة**

   ```
   GPT-4 Turbo: $0.01 / 1K tokens input
                $0.03 / 1K tokens output

   متوسط استعلام: $0.05
   100 استعلام/يوم = $5/شهر
   ```

---

## 🔐 الأمان

### Environment Variables

**⚠️ لا تضع المفاتيح في Git!**

```bash
# ✅ الطريقة الصحيحة
1. أضف في .env المحلي
2. لا تعمل commit للـ .env
3. استخدم GitHub Secrets للإنتاج
```

### Production Checklist

```bash
✅ كل المفاتيح في Secrets
✅ HTTPS فعّال
✅ Rate Limiting نشط
✅ Firewall مفعّل
✅ Backup يومي
✅ Monitoring نشط
```

---

## 📊 التكاليف المتوقعة

| الخدمة       | Free Tier | بعد Free      | شهرياً (متوقع) |
| ------------ | --------- | ------------- | -------------- |
| **Resend**   | 100/يوم   | $0.40/1K      | $20-50         |
| **Unifonic** | -         | 0.05 SAR/SMS  | 500-1000 SAR   |
| **Moyasar**  | -         | 2.9% + 1 SAR  | حسب المبيعات   |
| **AWS S3**   | 5GB       | $0.023/GB     | $10-30         |
| **OpenAI**   | $5 credit | حسب الاستخدام | $50-100        |
| **المجموع**  | -         | -             | **~700 SAR**   |

---

## 🚀 الإطلاق السريع

### الحد الأدنى للبدء (15 دقيقة)

```bash
# 1. Email فقط
EMAIL_SERVICE=resend
RESEND_API_KEY=re_xxxxxxxxxxxxx

# 2. الباقي اختياري
# يمكن إضافتهم لاحقاً
```

### الإنتاج الكامل (1 ساعة)

```bash
# جميع الخدمات نشطة
✅ Email: Resend
✅ SMS: Unifonic
✅ Payment: Moyasar
✅ Storage: AWS S3
✅ AI: OpenAI
```

---

## 🆘 المساعدة

### مشاكل شائعة

**1. Email لا يصل**

```bash
✅ تحقق من API key
✅ تحقق من EMAIL_FROM
✅ تحقق من spam folder
✅ راجع Resend logs
```

**2. SMS لا يصل**

```bash
✅ تحقق من رصيد الحساب
✅ تحقق من رقم المرسل
✅ تحقق من صيغة الرقم (+966...)
```

**3. Payment يفشل**

```bash
✅ استخدم Test Mode أولاً
✅ تحقق من Webhook URL
✅ راجع Moyasar Dashboard
```

---

**للدعم الفني:**

- 📧 Email: support@rabithr.com
- 💬 Chat: داخل المنصة
- 📱 WhatsApp: +966xxxxxxxxx

---

**آخر تحديث:** 2025-01-04
**الحالة:** ✅ جميع الخدمات جاهزة للتفعيل
