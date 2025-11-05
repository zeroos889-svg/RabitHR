# 🔌 دليل تفعيل الخدمات - منصة رابِط HR

## 📋 نظرة عامة

هذا الدليل يشرح كيفية تفعيل جميع الخدمات المطلوبة للمشروع.

---

## 1. Email Service (SMTP) ⭐⭐⭐

### الخيار 1: Resend (موصى به)

```bash
# 1. سجل في https://resend.com
# 2. احصل على API key
# 3. أضف في .env:

SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_USER=resend
SMTP_PASSWORD=re_xxxxxxxxxxxxx
SMTP_FROM=noreply@rabithr.com
SMTP_SECURE=true
```

### الخيار 2: SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SG.xxxxxxxxxxxxx
SMTP_FROM=noreply@rabithr.com
```

### الخيار 3: AWS SES

```env
SMTP_HOST=email-smtp.me-south-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=AKIAxxxxxxxxxxxxx
SMTP_PASSWORD=xxxxxxxxxxxxx
SMTP_FROM=noreply@rabithr.com
```

### اختبار الإرسال:

```bash
# في Docker container
docker exec rabithr-app node -e "
  const { sendEmail } = require('./dist/server/_core/email');
  sendEmail({
    to: 'test@example.com',
    subject: 'Test',
    html: '<h1>It works!</h1>'
  }).then(console.log);
"
```

---

## 2. SMS Service (Twilio/Unifonic) ⭐⭐

### الخيار 1: Unifonic (للسعودية - موصى به)

```bash
# 1. سجل في https://www.unifonic.com
# 2. احصل على App SID
# 3. أضف في .env:

SMS_PROVIDER=unifonic
UNIFONIC_APP_SID=xxxxxxxxxxxxx
UNIFONIC_SENDER_ID=RABITHR
```

### الخيار 2: Twilio (عالمي)

```env
SMS_PROVIDER=twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+966xxxxxxxxx
```

### اختبار الإرسال:

```bash
docker exec rabithr-app node -e "
  const { sendSMS } = require('./dist/server/_core/sms');
  sendSMS({
    to: '+966xxxxxxxxx',
    message: 'Test SMS'
  }).then(console.log);
"
```

---

## 3. AWS S3 Storage ⭐⭐

### خطوات التفعيل:

#### 1. إنشاء S3 Bucket

```bash
# في AWS Console أو CLI
aws s3 mb s3://rabithr-storage --region me-south-1

# تعيين CORS
aws s3api put-bucket-cors --bucket rabithr-storage --cors-configuration file://s3-cors.json
```

#### 2. s3-cors.json

```json
{
  "CORSRules": [
    {
      "AllowedOrigins": ["https://rabithr.com", "http://localhost:3000"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}
```

#### 3. IAM Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::rabithr-storage/*"
    }
  ]
}
```

#### 4. Environment Variables

```env
AWS_ACCESS_KEY_ID=AKIAxxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxx
AWS_REGION=me-south-1
AWS_S3_BUCKET=rabithr-storage
```

---

## 4. Payment Gateway ⭐⭐⭐

### الخيار 1: Moyasar (للسعودية - موصى به)

```bash
# 1. سجل في https://moyasar.com
# 2. فعّل الحساب
# 3. احصل على API keys

# Test Mode (للتطوير)
MOYASAR_API_KEY=sk_test_xxxxxxxxxxxxx
MOYASAR_SECRET_KEY=xxxxxxxxxxxxx
PAYMENT_MODE=test

# Production Mode
MOYASAR_API_KEY=sk_live_xxxxxxxxxxxxx
MOYASAR_SECRET_KEY=xxxxxxxxxxxxx
PAYMENT_MODE=live
```

### الخيار 2: Tap Payment

```env
TAP_SECRET_KEY=sk_live_xxxxxxxxxxxxx
TAP_PUBLIC_KEY=pk_live_xxxxxxxxxxxxx
```

### Webhook Setup:

```bash
# أضف في Moyasar Dashboard:
Webhook URL: https://rabithr.com/api/webhooks/moyasar
Events: payment.paid, payment.failed
```

---

## 5. SSL Certificates (Let's Encrypt) ⭐⭐⭐

### تلقائي مع Certbot:

#### 1. إعداد DNS

```bash
# تأكد من أن النطاق يشير إلى السيرفر
A Record: rabithr.com -> YOUR_SERVER_IP
A Record: www.rabithr.com -> YOUR_SERVER_IP
```

#### 2. الحصول على الشهادة

```bash
# تشغيل certbot
docker-compose -f docker-compose.yml -f docker-compose.ssl.yml up -d

# أول مرة: احصل على الشهادة
docker run -it --rm \
  -v ./ssl/certbot/conf:/etc/letsencrypt \
  -v ./ssl/certbot/www:/var/www/certbot \
  certbot/certbot certonly --webroot \
  -w /var/www/certbot \
  -d rabithr.com \
  -d www.rabithr.com \
  --email admin@rabithr.com \
  --agree-tos \
  --no-eff-email
```

#### 3. التجديد التلقائي

الشهادة ستتجدد تلقائياً كل 12 ساعة.

---

## 6. OpenAI API (للذكاء الاصطناعي) ⭐⭐

```bash
# 1. سجل في https://platform.openai.com
# 2. احصل على API key
# 3. أضف في .env:

OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
OPENAI_MODEL=gpt-4o-mini
AI_MAX_TOKENS=2000
AI_TEMPERATURE=0.7
```

### اختبار:

```bash
docker exec rabithr-app node -e "
  const { invokeLLM } = require('./dist/server/_core/llm');
  invokeLLM({
    systemPrompt: 'You are a helpful assistant',
    userMessage: 'Hello!'
  }).then(console.log);
"
```

---

## 7. Backup Automation ⭐⭐⭐

### التفعيل:

```bash
# 1. تشغيل خدمة النسخ الاحتياطي
docker-compose -f docker-compose.yml -f docker-compose.backup.yml up -d

# 2. فحص السجلات
docker logs rabithr-backup-cron

# 3. اختبار يدوي
docker exec rabithr-backup-cron /scripts/backup.sh
```

### الجدول الزمني (افتراضي):

- **النسخ الاحتياطي:** كل يوم الساعة 2:00 صباحاً
- **التنظيف:** كل أحد الساعة 3:00 صباحاً

### تعديل الجدول:

```env
# في docker-compose.backup.yml
# صيغة Cron: minute hour day month weekday
# مثال: كل 6 ساعات
BACKUP_SCHEDULE=0 */6 * * *
```

---

## 8. Push Notifications (Firebase) ⭐

### الخطوات:

#### 1. إنشاء Firebase Project

```bash
# 1. اذهب إلى https://console.firebase.google.com
# 2. أنشئ مشروع جديد
# 3. فعّل Cloud Messaging
# 4. احصل على Service Account Key
```

#### 2. Environment Variables

```env
FIREBASE_PROJECT_ID=rabithr-xxxxx
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nxxxxx\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@rabithr-xxxxx.iam.gserviceaccount.com
```

---

## 9. Monitoring (Grafana) ✅

### الوصول:

```
URL: http://localhost:3001
Username: admin
Password: admin (غيّره فوراً!)
```

### إعداد Dashboard:

```bash
# 1. سجّل الدخول إلى Grafana
# 2. أضف Prometheus كـ data source:
URL: http://prometheus:9090

# 3. استورد Dashboards:
- Node Exporter Dashboard (ID: 1860)
- Docker Dashboard (ID: 893)
- MySQL Dashboard (ID: 7362)
```

---

## 10. فحص الخدمات

### اختبار شامل:

```bash
# 1. Health Check
make health

# 2. فحص الخدمات الفردية
curl http://localhost:3000/health
curl http://localhost:9090/-/healthy  # Prometheus
curl http://localhost:3001/api/health # Grafana

# 3. فحص قاعدة البيانات
docker exec rabithr-db mysqladmin ping -h localhost

# 4. فحص Redis
docker exec rabithr-redis redis-cli ping
```

---

## 📋 Checklist النشر

### قبل الإنتاج:

- [ ] SSL Certificates مفعّلة
- [ ] Email Service يعمل
- [ ] SMS Service يعمل (اختياري)
- [ ] Payment Gateway في Production mode
- [ ] Backup Automation مفعّل
- [ ] AWS S3 جاهز (اختياري)
- [ ] Monitoring يعمل
- [ ] جميع Passwords تم تغييرها
- [ ] Environment variables محدّثة
- [ ] DNS configured صحيح
- [ ] Firewall rules مضبوطة

### بعد النشر:

- [ ] اختبر جميع الخدمات
- [ ] راقب الـ logs
- [ ] فحص النسخ الاحتياطية
- [ ] اختبر الـ SSL
- [ ] اختبر الدفع
- [ ] فحص الإشعارات

---

## 🆘 المساعدة والدعم

### المشاكل الشائعة:

**Email لا يُرسل:**

```bash
# فحص الـ logs
docker logs rabithr-app | grep -i email

# اختبار SMTP
telnet smtp.resend.com 587
```

**Payment يفشل:**

```bash
# فحص الـ webhook
docker logs rabithr-app | grep -i payment

# تأكد من الـ API keys
echo $MOYASAR_API_KEY
```

**Backup لا يعمل:**

```bash
# فحص cron logs
docker logs rabithr-backup-cron

# تشغيل يدوي
docker exec rabithr-backup-cron /scripts/backup.sh
```

---

## 📞 الدعم

للمزيد من المساعدة، راجع:

- `FINAL_AUDIT_REPORT.md` - تقرير الفحص الشامل
- `DEPLOYMENT_GUIDE_FULL.md` - دليل النشر
- `DOCKER.md` - دليل Docker

---

**آخر تحديث:** 4 نوفمبر 2025  
**الحالة:** ✅ جاهز للتطبيق
