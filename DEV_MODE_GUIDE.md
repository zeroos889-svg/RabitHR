# 🔧 وضع المطور - Developer Mode Guide

## نظرة عامة | Overview

**عربي:**
وضع المطور يسمح للمطورين بتسجيل الدخول كأي نوع من المستخدمين بدون الحاجة لإدخال بيانات تسجيل الدخول. هذا الوضع مفيد جداً للاختبار والتطوير.

**English:**
Developer Mode allows developers to log in as any type of user without entering credentials. This mode is extremely useful for testing and development.

## ⚠️ تحذير أمني | Security Warning

**عربي:**
⚠️ **هام جداً:** هذا الوضع للتطوير فقط! يجب تعطيله تماماً في بيئة الإنتاج.

**English:**
⚠️ **Very Important:** This mode is for development only! Must be completely disabled in production.

---

## 🚀 التفعيل | Activation

### الخطوة 1: تفعيل في Environment Variables

```env
# في ملف .env
NODE_ENV=development
DEV_MODE_ENABLED=true

# في Production يجب أن يكون
NODE_ENV=production
DEV_MODE_ENABLED=false
```

### الخطوة 2: إعادة تشغيل الخادم

```bash
npm run dev
```

---

## 👥 أنواع المستخدمين المتاحة | Available User Types

### 1. شركة (Company) 🏢

**الصلاحيات:**

- إدارة الموظفين
- نظام ATS (إدارة الوظائف)
- التذاكر والدعم
- التقارير والإحصائيات
- إعدادات الشركة

**الوصول إلى:**

- `/dashboard`
- `/dashboard/employees`
- `/dashboard/ats`
- `/dashboard/tickets`
- `/dashboard/reports`

### 2. مستشار (Consultant) 👨‍💼

**الصلاحيات:**

- عرض الاستشارات المعينة
- الرد على الاستشارات
- تتبع الإحصائيات
- إدارة الملف الشخصي

**الوصول إلى:**

- `/consultant-dashboard`
- `/my-consultations`
- `/consultation-chat/:id`

### 3. موظف (Employee) 👤

**الصلاحيات:**

- عرض البيانات الشخصية
- طلب الإجازات
- تسجيل الحضور
- تحميل المستندات
- استخدام الأدوات

**الوصول إلى:**

- `/employee/dashboard`
- `/employee/profile`
- `/employee/leaves`
- `/documents`

### 4. مسؤول النظام (Admin) 👨‍💻

**الصلاحيات:**

- إدارة جميع المستخدمين
- إدارة الاشتراكات
- مراجعة سجلات النظام
- إشعارات PDPL
- إعدادات النظام

**الوصول إلى:**

- `/admin`
- `/admin/users`
- `/admin/subscriptions`
- `/admin/audit-logs`
- `/admin/settings`

### 5. ضيف (Guest) 🌐

**الصلاحيات:**

- تصفح الخدمات
- عرض المعلومات العامة
- حجز استشارة

**الوصول إلى:**

- `/`
- `/consulting`
- `/about`
- `/contact`

---

## 🎨 واجهة المستخدم | User Interface

### صفحة وضع المطور

عند الضغط على زر "المطور" في صفحة تسجيل الدخول، ستظهر صفحة تحتوي على:

```
┌─────────────────────────────────────┐
│     🔧 وضع المطور - Dev Mode       │
├─────────────────────────────────────┤
│                                     │
│  اختر نوع المستخدم للاختبار:       │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  🏢 شركة (Company)           │  │
│  │  صاحب عمل، HR Manager       │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  👨‍💼 مستشار (Consultant)   │  │
│  │  مستشار قانوني، محاسب       │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  👤 موظف (Employee)          │  │
│  │  موظف عادي في شركة          │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  👨‍💻 مسؤول (Admin)         │  │
│  │  مسؤول النظام                │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  🌐 ضيف (Guest)              │  │
│  │  زائر بدون حساب              │  │
│  └──────────────────────────────┘  │
│                                     │
│  ⚠️ للتطوير فقط - Dev Only      │
└─────────────────────────────────────┘
```

---

## 💻 أمثلة الكود | Code Examples

### 1. Server-side Implementation

```typescript
// server/auth.ts

export function setupDevMode(app: Express) {
  // Only enable in development
  if (
    process.env.NODE_ENV !== "development" ||
    process.env.DEV_MODE_ENABLED !== "true"
  ) {
    return;
  }

  // Dev login endpoint
  app.post("/api/dev-login", async (req, res) => {
    const { userType } = req.body;

    // Create mock user based on type
    const mockUser = createMockUser(userType);

    // Generate token
    const token = jwt.sign(
      { id: mockUser.id, role: mockUser.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ user: mockUser, token });
  });
}

function createMockUser(userType: string) {
  const users = {
    company: {
      id: "dev-company-1",
      email: "dev-company@test.com",
      name: "شركة تجريبية",
      role: "company",
      companyId: "dev-company-1",
    },
    consultant: {
      id: "dev-consultant-1",
      email: "dev-consultant@test.com",
      name: "مستشار تجريبي",
      role: "consultant",
      specialization: "قانوني",
    },
    employee: {
      id: "dev-employee-1",
      email: "dev-employee@test.com",
      name: "موظف تجريبي",
      role: "employee",
      companyId: "dev-company-1",
    },
    admin: {
      id: "dev-admin-1",
      email: "dev-admin@test.com",
      name: "مسؤول النظام",
      role: "admin",
    },
    guest: {
      id: "dev-guest-1",
      email: "dev-guest@test.com",
      name: "ضيف",
      role: "guest",
    },
  };

  return users[userType] || users.guest;
}
```

### 2. Client-side Component

```tsx
// client/src/pages/DevMode.tsx

import { useState } from "react";
import { useNavigate } from "wouter";
import { useAuth } from "@/hooks/useAuth";

const userTypes = [
  {
    type: "company",
    icon: "🏢",
    title: "شركة (Company)",
    description: "صاحب عمل، HR Manager",
    color: "bg-blue-500",
  },
  {
    type: "consultant",
    icon: "👨‍💼",
    title: "مستشار (Consultant)",
    description: "مستشار قانوني، محاسب",
    color: "bg-green-500",
  },
  {
    type: "employee",
    icon: "👤",
    title: "موظف (Employee)",
    description: "موظف عادي في شركة",
    color: "bg-purple-500",
  },
  {
    type: "admin",
    icon: "👨‍💻",
    title: "مسؤول (Admin)",
    description: "مسؤول النظام",
    color: "bg-red-500",
  },
  {
    type: "guest",
    icon: "🌐",
    title: "ضيف (Guest)",
    description: "زائر بدون حساب",
    color: "bg-gray-500",
  },
];

export function DevModePage() {
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  const { devLogin } = useAuth();

  const handleLogin = async (userType: string) => {
    setLoading(userType);

    try {
      await devLogin(userType);

      // Navigate based on user type
      const routes = {
        company: "/dashboard",
        consultant: "/consultant-dashboard",
        employee: "/employee/dashboard",
        admin: "/admin",
        guest: "/",
      };

      navigate(routes[userType] || "/");
    } catch (error) {
      console.error("Dev login failed:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🔧 وضع المطور</h1>
          <p className="text-gray-600 dark:text-gray-400">
            اختر نوع المستخدم للاختبار
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg">
            ⚠️ للتطوير فقط - Development Only
          </div>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userTypes.map(user => (
            <button
              key={user.type}
              onClick={() => handleLogin(user.type)}
              disabled={loading !== null}
              className={`
                p-6 rounded-xl shadow-lg 
                ${user.color} 
                text-white
                hover:shadow-xl 
                transform hover:scale-105 
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <div className="text-6xl mb-4">{user.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{user.title}</h3>
              <p className="text-white/90">{user.description}</p>

              {loading === user.type && (
                <div className="mt-4">
                  <div className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full mx-auto" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← رجوع إلى تسجيل الدخول
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 3. useAuth Hook Update

```typescript
// client/src/hooks/useAuth.ts

export function useAuth() {
  const [user, setUser] = useState(null);

  // ... existing code ...

  const devLogin = async (userType: string) => {
    try {
      const response = await fetch("/api/dev-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userType }),
      });

      const data = await response.json();

      // Store token
      localStorage.setItem("token", data.token);

      // Set user
      setUser(data.user);

      return data.user;
    } catch (error) {
      console.error("Dev login error:", error);
      throw error;
    }
  };

  return {
    user,
    login,
    logout,
    devLogin, // New method
    // ... other methods
  };
}
```

---

## 🔒 الأمان | Security

### الحماية المطبقة

1. **Environment Check:**

   ```typescript
   if (process.env.NODE_ENV !== "development") {
     return res.status(403).json({ error: "Dev mode disabled" });
   }
   ```

2. **Warning Banner:**
   - تنبيه واضح في الواجهة
   - لون تحذيري
   - نص واضح

3. **Production Disabled:**
   - تلقائياً معطل في production
   - لا يمكن تفعيله بالخطأ
   - Environment variables control

### Checklist قبل Production

- [ ] تأكد أن `NODE_ENV=production`
- [ ] تأكد أن `DEV_MODE_ENABLED=false` أو غير موجود
- [ ] احذف `/dev-mode` route من production build
- [ ] راجع جميع dev endpoints
- [ ] اختبر أنه غير متاح

---

## 📊 حالات الاستخدام | Use Cases

### 1. اختبار الصلاحيات

```bash
# اختبر كشركة
Dev Login → Company → Navigate to /dashboard/employees
✅ يجب أن يعمل

# اختبر كموظف
Dev Login → Employee → Navigate to /dashboard/employees
❌ يجب أن يرفض الوصول
```

### 2. اختبار UI لكل دور

```bash
Dev Login → Company → Check dashboard layout
Dev Login → Consultant → Check consultant dashboard
Dev Login → Admin → Check admin panel
```

### 3. اختبار التدفقات

```bash
Dev Login → Company → Create Job → Add Employee → Assign
Dev Login → Consultant → View Consultations → Reply
```

---

## 🛠️ Troubleshooting

### المشكلة: زر "المطور" لا يظهر

**الحل:**

1. تأكد من `NODE_ENV=development`
2. تأكد من `DEV_MODE_ENABLED=true`
3. أعد تشغيل الخادم
4. امسح cache المتصفح

### المشكلة: خطأ 403 Forbidden

**الحل:**

1. تأكد من environment variables
2. راجع server logs
3. تأكد من dev endpoint enabled

### المشكلة: لا يتم التوجيه بعد Login

**الحل:**

1. راجع console للأخطاء
2. تأكد من token storage
3. تأكد من routing configuration

---

## ✅ Best Practices

1. **استخدم فقط في Development**
2. **لا تنشر credentials حقيقية**
3. **احذف dev code قبل production**
4. **استخدم mock data واضحة**
5. **وثّق كل user type**

---

## 📝 ملخص | Summary

**عربي:**
وضع المطور يسهل الاختبار بشكل كبير. ببساطة اضغط على زر "المطور" واختر نوع المستخدم وابدأ الاختبار!

**English:**
Developer Mode makes testing much easier. Simply click "Developer" button, choose user type, and start testing!

**⚠️ تذكر:** فقط للتطوير - Never in production!
