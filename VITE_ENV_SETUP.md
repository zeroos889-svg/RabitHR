# إعداد متغيرات البيئة لـ Vite
# Vite Environment Variables Setup

## نظرة عامة | Overview

هذا الدليل يشرح كيفية إعداد `VITE_APP_TITLE` و `VITE_APP_LOGO` في بيئات مختلفة.

This guide explains how to set up `VITE_APP_TITLE` and `VITE_APP_LOGO` in different environments.

---

## 📝 المتغيرات المطلوبة | Required Variables

| المتغير | القيمة الافتراضية | الوصف |
|---------|-------------------|--------|
| `VITE_APP_TITLE` | `رابِط - منصة إدارة الموارد البشرية` | عنوان التطبيق |
| `VITE_APP_LOGO` | `/logo.png` | مسار شعار التطبيق |

---

## 🏠 التطوير المحلي | Local Development

### الخطوة 1: إنشاء ملف `.env`

قم بإنشاء ملف `.env` في جذر المشروع:

```bash
# انسخ من .env.example
cp .env.example .env

# أو أنشئ ملف جديد
cat > .env << 'EOF'
VITE_APP_TITLE=رابِط - منصة إدارة الموارد البشرية
VITE_APP_LOGO=/logo.png
EOF
```

**ملاحظة:** ملف `.env` موجود في `.gitignore` ولن يتم رفعه إلى git.

### الخطوة 2: التحقق من التحميل

```bash
# تشغيل التطبيق
pnpm dev

# التحقق من المتغيرات في Console
console.log(import.meta.env.VITE_APP_TITLE)
console.log(import.meta.env.VITE_APP_LOGO)
```

---

## ☁️ Vercel Deployment

### الطريقة 1: عبر Dashboard (موصى به)

1. اذهب إلى: **Project → Settings → Environment Variables**

2. أضف المتغيرات التالية:

   **المتغير الأول:**
   - **Name**: `VITE_APP_TITLE`
   - **Value**: `رابِط - منصة إدارة الموارد البشرية`
   - **Environment**: ✅ Production ✅ Preview ✅ Development

   **المتغير الثاني:**
   - **Name**: `VITE_APP_LOGO`
   - **Value**: `/logo.png`
   - **Environment**: ✅ Production ✅ Preview ✅ Development

3. احفظ التغييرات

4. أعد نشر التطبيق:
   ```bash
   vercel --prod
   ```

### الطريقة 2: عبر Vercel CLI

```bash
# إضافة VITE_APP_TITLE
vercel env add VITE_APP_TITLE
# أدخل القيمة: رابِط - منصة إدارة الموارد البشرية
# اختر البيئات: Production, Preview, Development

# إضافة VITE_APP_LOGO
vercel env add VITE_APP_LOGO
# أدخل القيمة: /logo.png
# اختر البيئات: Production, Preview, Development
```

### الطريقة 3: عبر ملف `.env.production`

في مجلد المشروع على Vercel:

```bash
# .env.production
VITE_APP_TITLE=رابِط - منصة إدارة الموارد البشرية
VITE_APP_LOGO=/logo.png
```

---

## 🔧 GitHub Actions

إذا كنت تستخدم GitHub Actions للنشر:

### 1. إضافة Repository Secrets

اذهب إلى: **Settings → Secrets and variables → Actions**

أضف:
- `VITE_APP_TITLE` = `رابِط - منصة إدارة الموارد البشرية`
- `VITE_APP_LOGO` = `/logo.png`

### 2. تحديث Workflow

```yaml
# .github/workflows/deploy.yml
env:
  VITE_APP_TITLE: ${{ secrets.VITE_APP_TITLE }}
  VITE_APP_LOGO: ${{ secrets.VITE_APP_LOGO }}
```

---

## ✅ التحقق من الإعداد | Verification

### 1. التحقق من البناء

```bash
pnpm build
```

يجب ألا ترى تحذيرات مثل:
- ❌ `%VITE_APP_LOGO% is not defined`
- ❌ `%VITE_APP_TITLE% is not defined`

### 2. التحقق من `index.html` المبني

```bash
# عرض الملف المبني
cat dist/public/index.html | grep -E "VITE_APP|title|icon"
```

يجب أن ترى:
- ✅ `<title>رابِط - منصة إدارة الموارد البشرية - مساعد الموارد البشرية الذكي</title>`
- ✅ `<link rel="icon" type="image/png" href="/logo.png" />`

### 3. التحقق في المتصفح

بعد النشر:
1. افتح التطبيق في المتصفح
2. افتح DevTools → Console
3. نفذ:
   ```javascript
   console.log(import.meta.env.VITE_APP_TITLE);
   console.log(import.meta.env.VITE_APP_LOGO);
   ```

---

## 🎯 استخدام المتغيرات في الكود | Using Variables in Code

### في TypeScript/JavaScript

```typescript
// client/src/const.ts
export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "App";
export const APP_LOGO = import.meta.env.VITE_APP_LOGO || "/logo.png";
```

### في HTML (index.html)

```html
<!-- يتم استبدالها تلقائياً أثناء البناء -->
<title>%VITE_APP_TITLE% - مساعد الموارد البشرية الذكي</title>
<link rel="icon" href="%VITE_APP_LOGO%" />
<meta property="og:title" content="%VITE_APP_TITLE%" />
<meta property="og:image" content="%VITE_APP_LOGO%" />
```

---

## 🔍 استكشاف الأخطاء | Troubleshooting

### خطأ: "VITE_APP_TITLE is not defined"

**الحل:**
1. تأكد من وجود ملف `.env` في جذر المشروع
2. تأكد من أن اسم المتغير يبدأ بـ `VITE_`
3. أعد تشغيل dev server: `pnpm dev`

### خطأ: "Variables not replaced in built HTML"

**الحل:**
1. تأكد من استخدام `%VARIABLE_NAME%` في HTML (وليس `${VARIABLE_NAME}`)
2. نفذ: `pnpm build` من جديد
3. تحقق من `dist/public/index.html`

### المتغيرات تعمل محلياً لكن ليس في Vercel

**الحل:**
1. تأكد من إضافة المتغيرات في Vercel Dashboard
2. اختر جميع البيئات: Production, Preview, Development
3. أعد النشر: `vercel --prod`

---

## 📚 المراجع | References

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

## ✅ Checklist

- [x] إنشاء ملف `.env` مع `VITE_APP_TITLE` و `VITE_APP_LOGO`
- [x] تحديث `index.html` لاستخدام `%VITE_APP_TITLE%` و `%VITE_APP_LOGO%`
- [ ] إضافة المتغيرات في Vercel Dashboard
- [ ] إعادة النشر على Vercel
- [ ] التحقق من عدم وجود تحذيرات في البناء
- [ ] التحقق من عمل المتغيرات في المتصفح

---

🎉 **تم الإعداد بنجاح!**
