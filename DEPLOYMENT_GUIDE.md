# 🚀 دليل الإطلاق والنشر - رابِط

> **دليل شامل لنشر منصة رابِط على الإنتاج**

---

## 📋 قائمة التحقق قبل الإطلاق

### ✅ الفحوصات الفنية

- [ ] جميع الاختبارات تمر بنجاح (`pnpm test`)
- [ ] لا توجد أخطاء TypeScript (`pnpm build`)
- [ ] جميع المتغيرات البيئية محددة
- [ ] قاعدة البيانات مُهيأة وتعمل
- [ ] الـ APIs الخارجية متصلة (Manus, Moyasar, Tap)
- [ ] شهادات SSL جاهزة
- [ ] النسخ الاحتياطية مُفعلة

### ✅ الفحوصات الأمنية

- [ ] تم تفعيل HTTPS
- [ ] تم إضافة Security Headers
- [ ] تم تفعيل Rate Limiting
- [ ] تم تفعيل CORS بشكل صحيح
- [ ] تم إخفاء المتغيرات الحساسة
- [ ] تم تفعيل WAF (Web Application Firewall)
- [ ] تم فحص الثغرات الأمنية

### ✅ الفحوصات الوظيفية

- [ ] اختبار التسجيل والدخول
- [ ] اختبار جميع الأدوات
- [ ] اختبار الدفع
- [ ] اختبار الاستشارات
- [ ] اختبار الإشعارات
- [ ] اختبار الترجمة (عربي/إنجليزي)
- [ ] اختبار الأداء

---

## 🏗️ خيارات الإطلاق

### الخيار 1: Vercel (الأسهل)

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# نشر المشروع
vercel
```

### الخيار 2: AWS EC2

```bash
# تحديث النظام
sudo apt update && sudo apt upgrade -y

# تثبيت Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# تثبيت pnpm
npm install -g pnpm

# تثبيت MySQL
sudo apt install -y mysql-server

# تثبيت Nginx
sudo apt install -y nginx
```

### الخيار 3: Docker

```bash
# بناء الصورة
docker build -t rabit:latest .

# تشغيل الحاوية
docker run -d -p 3000:3000 --env-file .env rabit:latest
```

---

## 🔒 إعدادات الأمان

### 1. Security Headers

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

### 2. HTTPS/SSL

```bash
# استخدام Let's Encrypt
sudo certbot certonly --standalone -d your-domain.com
```

### 3. Rate Limiting

```nginx
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;
```

---

## 📊 المراقبة والتحليلات

### Google Analytics

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Sentry (معالجة الأخطاء)

```bash
npm install @sentry/react @sentry/tracing
```

---

## 🔄 النسخ الاحتياطية

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups/rabit"
DATE=$(date +%Y%m%d_%H%M%S)

# نسخ قاعدة البيانات
mysqldump -u root -p$DB_PASSWORD rabit_hr_platform > $BACKUP_DIR/db_$DATE.sql

# ضغط النسخة
gzip $BACKUP_DIR/db_$DATE.sql

# حذف النسخ القديمة
find $BACKUP_DIR -name "db_*.sql.gz" -mtime +30 -delete
```

---

## 📈 التوسع والأداء

### تحسين الأداء

```bash
# تفعيل caching
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m;

location /api {
    proxy_cache api_cache;
    proxy_cache_valid 200 10m;
}
```

### CDN

استخدم:
- **Cloudflare** (مجاني)
- **AWS CloudFront**
- **Bunny CDN**

---

## 📝 سجل الإطلاق

| التاريخ | الإصدار | الملاحظات |
|--------|---------|---------|
| 2025-11-02 | 1.0.0 | الإطلاق الأول |

---

## 🆘 استكشاف الأخطاء

### مشكلة: الموقع بطيء

```bash
# تحليل الأداء
pnpm build --analyze

# تحسين الصور
npx imagemin client/public/images/* --out-dir=client/public/images
```

### مشكلة: أخطاء قاعدة البيانات

```bash
# التحقق من الاتصال
mysql -u root -p -h localhost rabit_hr_platform -e "SELECT 1;"
```

---

## 📞 الدعم

- 📧 support@rabit.com
- 💬 https://rabit.com/chat
- 📱 +966 XX XXX XXXX

---

**آخر تحديث:** 2025-11-02  
**الإصدار:** 1.0.0

صُنع بـ ❤️ بواسطة فريق رابِط
