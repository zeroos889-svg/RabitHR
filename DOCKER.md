# دليل Docker - منصة رابِط HR

## 🐳 نظرة عامة

هذا الدليل يشرح كيفية تشغيل منصة رابِط HR باستخدام Docker و Docker Compose.

## 📋 المتطلبات

- Docker Engine 20.10 أو أحدث
- Docker Compose 2.0 أو أحدث
- 2GB RAM على الأقل
- 10GB مساحة تخزين

## 🚀 البدء السريع

### 1. استخدام Docker Compose (موصى به)

```bash
# نسخ ملف البيئة
cp .env.example .env

# تحرير المتغيرات البيئية
nano .env

# بناء وتشغيل الخدمات
docker-compose up -d

# متابعة السجلات
docker-compose logs -f app
```

### 2. استخدام Docker مباشرة

```bash
# بناء الصورة
docker build -t rabithr:latest .

# تشغيل الحاوية
docker run -d \
  --name rabithr-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL=mysql://user:pass@host:3306/db \
  rabithr:latest
```

## 🔧 التكوين

### متغيرات البيئة المطلوبة

```env
# قاعدة البيانات
DATABASE_URL=mysql://rabithr:password@db:3306/rabithr

# الأمان
JWT_SECRET=your-jwt-secret-here
SESSION_SECRET=your-session-secret-here

# MySQL
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=rabithr
MYSQL_USER=rabithr
MYSQL_PASSWORD=password
```

## 📊 أوامر Docker Compose المفيدة

```bash
# بدء الخدمات
docker-compose up -d

# إيقاف الخدمات
docker-compose down

# إيقاف وحذف البيانات
docker-compose down -v

# إعادة بناء الصور
docker-compose build --no-cache

# متابعة السجلات
docker-compose logs -f

# عرض حالة الخدمات
docker-compose ps

# الدخول إلى حاوية التطبيق
docker-compose exec app sh

# الدخول إلى قاعدة البيانات
docker-compose exec db mysql -u rabithr -p
```

## 🏗️ بناء الصورة للإنتاج

```bash
# بناء صورة محسّنة
docker build -t rabithr:latest --target production .

# بناء صورة متعددة المنصات
docker buildx build --platform linux/amd64,linux/arm64 -t rabithr:latest .
```

## 🔍 فحص الصحة (Health Check)

التطبيق يتضمن فحص صحة تلقائي يعمل كل 30 ثانية:

```bash
# فحص حالة الصحة
docker inspect --format='{{.State.Health.Status}}' rabithr-app

# عرض تفاصيل الفحص
docker inspect rabithr-app | jq '.[0].State.Health'
```

## 🔐 الأمان

### إعدادات الأمان المطبقة:

1. **مستخدم غير root**: التطبيق يعمل بمستخدم `nodejs` (UID 1001)
2. **فحص الصحة**: فحص تلقائي لضمان عمل التطبيق
3. **متغيرات البيئة**: جميع الأسرار يجب أن تكون في متغيرات البيئة
4. **شبكة معزولة**: استخدام شبكة Docker خاصة

## 🐛 حل المشاكل

### التطبيق لا يبدأ

```bash
# عرض السجلات
docker-compose logs app

# فحص متغيرات البيئة
docker-compose config

# إعادة بناء الصور
docker-compose build --no-cache
docker-compose up -d
```

### قاعدة البيانات لا تتصل

```bash
# فحص حالة قاعدة البيانات
docker-compose ps db

# الدخول إلى قاعدة البيانات
docker-compose exec db mysql -u root -p

# إعادة تشغيل قاعدة البيانات
docker-compose restart db
```

### مشاكل الذاكرة

```bash
# زيادة حد الذاكرة في docker-compose.yml
services:
  app:
    mem_limit: 2g
    memswap_limit: 2g
```

## 📦 النشر إلى الإنتاج

### استخدام GitHub Container Registry

يتم بناء ودفع الصورة تلقائياً عند الدفع إلى branch main:

```bash
# سحب الصورة
docker pull ghcr.io/zeroos889-svg/rabithr:latest

# تشغيل الصورة
docker run -d \
  --name rabithr \
  -p 3000:3000 \
  --env-file .env \
  ghcr.io/zeroos889-svg/rabithr:latest
```

### استخدام Docker Hub

```bash
# تسجيل الدخول
docker login

# وضع tag للصورة
docker tag rabithr:latest username/rabithr:latest

# دفع الصورة
docker push username/rabithr:latest
```

## 🔄 التحديثات

```bash
# سحب التحديثات
docker-compose pull

# إعادة إنشاء الحاويات
docker-compose up -d --force-recreate

# تنظيف الصور القديمة
docker image prune -a
```

## 📈 المراقبة

### عرض استخدام الموارد

```bash
# عرض استخدام CPU والذاكرة
docker stats rabithr-app

# عرض سجلات التطبيق مع الوقت
docker-compose logs -f --timestamps app
```

## 🔗 الروابط المفيدة

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Best Practices for Docker](https://docs.docker.com/develop/dev-best-practices/)

## 💡 نصائح الأداء

1. **استخدام multi-stage builds**: الـ Dockerfile الحالي يستخدم بناء متعدد المراحل لتقليل حجم الصورة
2. **تخزين مؤقت للطبقات**: استخدام `.dockerignore` لتحسين سرعة البناء
3. **استخدام Alpine Linux**: صورة أصغر وأسرع
4. **تفعيل BuildKit**: لتحسين أداء البناء

```bash
# تفعيل BuildKit
export DOCKER_BUILDKIT=1
docker build -t rabithr:latest .
```

## 📞 الدعم

إذا واجهت أي مشاكل، يرجى:

1. التحقق من السجلات: `docker-compose logs`
2. التحقق من الـ issues في GitHub
3. التواصل مع فريق الدعم
