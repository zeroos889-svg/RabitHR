# ⚡ دليل النشر السريع على Vercel

> **للدليل الكامل والمفصّل بالعربية:** اقرأ [VERCEL_DEPLOYMENT_AR.md](./VERCEL_DEPLOYMENT_AR.md)  
> **للدليل بالإنجليزية:** اقرأ [VERCEL_SETUP.md](./VERCEL_SETUP.md)

---

## 🚀 خطوات النشر (5 دقائق)

### 1. جهّز قاعدة البيانات

**على Railway** (الأسهل):

1. سجّل على [railway.app](https://railway.app)
2. أنشئ مشروع جديد → اختر **MySQL**
3. انسخ `DATABASE_URL`

### 2. انشر على Vercel

1. **افتح** [vercel.com/new](https://vercel.com/new)
2. **اربط** مستودع GitHub
3. **اختر** Framework: **Vite**
4. **أضف** المتغيرات التالية:

```env
# ✅ مطلوبة
DATABASE_URL=mysql://...من Railway
JWT_SECRET=أنشئ مفتاح قوي (32 حرف+)
NODE_ENV=production
VITE_APP_TITLE=رابِط - منصة إدارة الموارد البشرية
VITE_APP_URL=https://your-app.vercel.app

# ⭐ موصى بها
REDIS_URL=redis://...من Railway (اختياري)
OPENAI_API_KEY=sk-... (للميزات الذكية)
RESEND_API_KEY=re_... (للبريد الإلكتروني)
```

5. **انقر** Deploy ✨

### 3. شغّل الهجرات

```bash
# من جهازك
git clone https://github.com/your-username/RabitHR
cd RabitHR
echo "DATABASE_URL=mysql://..." > .env
pnpm install
pnpm db:push
```

---

## ✅ اختبر المشروع

افتح رابط المشروع وجرّب:

```
الموظف: employee@test.com / password123
الشركة: company@test.com / password123
المستشار: consultant@test.com / password123
```

---

## 🐛 مشاكل شائعة؟

### ❌ Build Failed

```bash
# تأكد من أن Install Command هو:
pnpm install
# و Build Command هو:
pnpm build
```

### ❌ Database Error

```bash
# تحقق من DATABASE_URL
# يجب أن يبدأ بـ: mysql://
```

### ❌ الصفحات لا تعمل

```bash
# تأكد من أن vercel.json موجود في الجذر
# أعد النشر من Vercel Dashboard
```

---

## 📚 موارد مفيدة

- [الدليل الكامل بالعربية](./VERCEL_DEPLOYMENT_AR.md) - كل التفاصيل
- [استكشاف الأخطاء](./VERCEL_TROUBLESHOOTING_AR.md) - حل المشاكل
- [فهرس الوثائق](./docs/ARABIC_DOCS_INDEX.md) - جميع المراجع
- [متغيرات البيئة](./.env.example) - جميع الخيارات
- [حسابات الاختبار](./TEST_USERS.md) - للتجربة

---

## 💬 محتاج مساعدة؟

- 📧 info@rbithr.com
- 📱 0570700355
- 🌐 [rabit.sa](https://rabit.sa)

---

**صُنع بـ ❤️ في السعودية 🇸🇦**
