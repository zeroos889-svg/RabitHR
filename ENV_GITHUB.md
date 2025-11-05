# 🐙 متغيرات GitHub - CI/CD والأسرار

## نظرة عامة

GitHub Secrets تُستخدم في **GitHub Actions** للـ CI/CD والتكامل المستمر. يجب إضافة هذه المتغيرات في:

```
GitHub Repository → Settings → Secrets and variables → Actions
```

---

## 📦 أنواع الأسرار في GitHub

### 1. Repository Secrets

تُستخدم في workflows الخاصة بهذا المستودع فقط

### 2. Environment Secrets

تُستخدم في بيئات محددة (production, staging, development)

### 3. Organization Secrets

تُستخدم عبر جميع مستودعات المنظمة

---

## ✅ الأسرار المطلوبة للـ CI/CD

### 🔐 للاختبارات (Testing)

```env
DATABASE_URL=mysql://user:password@host:3306/test_db
JWT_SECRET=test-jwt-secret-for-ci-min-32-characters
SESSION_SECRET=test-session-secret-for-ci
```

**ملاحظة:** استخدم قاعدة بيانات اختبار منفصلة

### 🚀 للنشر التلقائي

#### Vercel

```env
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

**كيفية الحصول عليها:**

1. **VERCEL_TOKEN**: Vercel Dashboard → Settings → Tokens → Create
2. **VERCEL_ORG_ID** و **VERCEL_PROJECT_ID**: من ملف `.vercel/project.json`

#### Railway

```env
RAILWAY_TOKEN=your_railway_token
```

**كيفية الحصول عليها:**

1. Railway Dashboard → Account Settings → Tokens
2. أنشئ Token جديد واحفظه في GitHub Secrets

---

## 📊 أسرار للخدمات الخارجية

### Sentry (تتبع الأخطاء)

```env
SENTRY_AUTH_TOKEN=your_sentry_auth_token
SENTRY_ORG=your_org_name
SENTRY_PROJECT=your_project_name
```

**الاستخدام:** لرفع Source Maps تلقائياً

### CodeCov (تغطية الاختبارات)

```env
CODECOV_TOKEN=your_codecov_token
```

### SonarCloud (تحليل الكود)

```env
SONAR_TOKEN=your_sonar_token
```

---

## 📋 كيفية إضافة الأسرار في GitHub

### من Dashboard

1. افتح المستودع في GitHub
2. اذهب إلى **Settings** → **Secrets and variables** → **Actions**
3. اضغط **New repository secret**
4. أضف:
   - **Name**: اسم السر (مثل `DATABASE_URL`)
   - **Secret**: القيمة
5. اضغط **Add secret**

### من CLI (GitHub CLI)

```bash
# تسجيل الدخول
gh auth login

# إضافة سر
gh secret set DATABASE_URL -b"mysql://user:pass@host:3306/db"
gh secret set JWT_SECRET -b"your-secret-key"

# إضافة من ملف
gh secret set DATABASE_URL < .env.ci
```

---

## 🔧 استخدام الأسرار في GitHub Actions

### مثال: Workflow للاختبارات

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    env:
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
      JWT_SECRET: ${{ secrets.JWT_SECRET }}
      SESSION_SECRET: ${{ secrets.SESSION_SECRET }}
      NODE_ENV: test

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: pnpm install

      - name: Run tests
        run: pnpm test
```

### مثال: Workflow للنشر على Vercel

```yaml
# .github/workflows/deploy-vercel.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

### مثال: Workflow للنشر على Railway

```yaml
# .github/workflows/deploy-railway.yml
name: Deploy to Railway

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up --service backend
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## 📝 قائمة الأسرار الموصى بها

### للاختبارات والتطوير

- [ ] `DATABASE_URL` (قاعدة بيانات الاختبار)
- [ ] `JWT_SECRET` (للاختبارات)
- [ ] `SESSION_SECRET` (للاختبارات)

### للنشر التلقائي

- [ ] `VERCEL_TOKEN`
- [ ] `VERCEL_ORG_ID`
- [ ] `VERCEL_PROJECT_ID`
- [ ] `RAILWAY_TOKEN`

### للمراقبة والتحليل

- [ ] `SENTRY_AUTH_TOKEN`
- [ ] `CODECOV_TOKEN` (اختياري)
- [ ] `SONAR_TOKEN` (اختياري)

---

## 🔒 أفضل الممارسات الأمنية

### ✅ افعل:

1. **استخدم أسرار منفصلة** للاختبار والإنتاج
2. **قلل الصلاحيات** - أعط كل Token أقل صلاحيات ممكنة
3. **راجع الأسرار بانتظام** - احذف الأسرار غير المستخدمة
4. **استخدم Environment secrets** للبيئات المختلفة
5. **فعّل Required reviewers** للـ production environment

### ❌ لا تفعل:

1. **لا تطبع الأسرار** في Logs - استخدم `echo "***"` بدلاً من `echo $SECRET`
2. **لا تشارك Tokens** - كل مطور يجب أن يكون له Token خاص
3. **لا تستخدم نفس الأسرار** للتطوير والإنتاج
4. **لا تضع أسرار في الكود** - استخدم GitHub Secrets فقط

---

## 🎯 إعداد البيئات (Environments)

### إنشاء بيئات

1. اذهب إلى **Settings** → **Environments**
2. أنشئ بيئات: `production`, `staging`, `development`
3. أضف Protection rules لـ `production`:
   - ✅ Required reviewers
   - ✅ Wait timer
   - ✅ Deployment branches (main only)

### أسرار لكل بيئة

#### Production Environment

```env
DATABASE_URL=mysql://prod-user:prod-pass@prod-host:3306/prod_db
JWT_SECRET=production-jwt-secret-very-secure-min-32-chars
SESSION_SECRET=production-session-secret-very-secure
VERCEL_TOKEN=prod_token
RAILWAY_TOKEN=prod_railway_token
```

#### Staging Environment

```env
DATABASE_URL=mysql://staging-user:staging-pass@staging-host:3306/staging_db
JWT_SECRET=staging-jwt-secret-min-32-chars
SESSION_SECRET=staging-session-secret
VERCEL_TOKEN=staging_token
RAILWAY_TOKEN=staging_railway_token
```

#### Development Environment

```env
DATABASE_URL=mysql://dev-user:dev-pass@dev-host:3306/dev_db
JWT_SECRET=dev-jwt-secret-min-32-chars
SESSION_SECRET=dev-session-secret
```

---

## 🔄 تدوير الأسرار (Secret Rotation)

### متى يجب تغيير الأسرار؟

- كل 90 يوم (الأسرار الحساسة)
- عند مغادرة عضو من الفريق
- عند الاشتباه في تسريب
- بعد اكتشاف خرق أمني

### كيفية تدوير السر:

1. أنشئ سر جديد في الخدمة
2. حدّث GitHub Secret
3. أعد نشر التطبيق
4. أحذف السر القديم من الخدمة

---

## 🔍 تدقيق الأسرار

### مراجعة دورية

```bash
# عرض جميع الأسرار (الأسماء فقط)
gh secret list

# حذف سر غير مستخدم
gh secret delete OLD_SECRET
```

### مراقبة الاستخدام

1. اذهب إلى **Settings** → **Actions** → **General**
2. افحص **Workflow permissions**
3. راجع **Deployment protection rules**

---

## 📚 ملفات Workflow الموصى بها

### 1. CI/CD الأساسي

```
.github/workflows/
├── ci.yml              # الاختبارات على كل push
├── deploy-vercel.yml   # نشر Frontend
├── deploy-railway.yml  # نشر Backend
└── security.yml        # فحص الأمان
```

### 2. الأسرار المطلوبة لكل Workflow

**ci.yml:**

- `DATABASE_URL`
- `JWT_SECRET`
- `SESSION_SECRET`

**deploy-vercel.yml:**

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

**deploy-railway.yml:**

- `RAILWAY_TOKEN`

**security.yml:**

- `SENTRY_AUTH_TOKEN`
- `SONAR_TOKEN`

---

## 🆘 استكشاف الأخطاء

### المشكلة: Workflow يفشل بسبب missing secret

**الحل:**

1. تحقق من اسم السر صحيح (case-sensitive)
2. تأكد أن السر موجود في البيئة الصحيحة
3. افحص صلاحيات الـ Workflow

### المشكلة: لا يمكن الوصول للسر

**الحل:**

1. تحقق من Workflow permissions
2. تأكد أن Fork ليس محاولاً الوصول للأسرار
3. راجع Environment protection rules

### المشكلة: السر لا يعمل

**الحل:**

1. تأكد أن القيمة لا تحتوي على spaces في البداية/النهاية
2. جرب تحديث السر
3. تحقق من صلاحيات Token في الخدمة الخارجية

---

## ✅ قائمة التحقق الشاملة

### الإعداد الأولي

- [ ] إنشاء Environments (production, staging)
- [ ] إضافة Protection rules للـ production
- [ ] إضافة الأسرار الأساسية للاختبارات
- [ ] إضافة Deployment tokens

### المراجعة الدورية (كل شهر)

- [ ] مراجعة قائمة الأسرار
- [ ] حذف الأسرار غير المستخدمة
- [ ] تحديث Tokens منتهية الصلاحية
- [ ] مراجعة Workflow permissions

### عند إضافة عضو جديد

- [ ] شرح نظام الأسرار
- [ ] منح الصلاحيات المناسبة
- [ ] التأكد من فهم أفضل الممارسات

### عند مغادرة عضو

- [ ] تدوير جميع Tokens المشتركة
- [ ] مراجعة الصلاحيات
- [ ] تحديث أسرار الإنتاج

---

## 🔗 روابط مفيدة

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Encrypted Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Using Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- [Security Hardening](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
