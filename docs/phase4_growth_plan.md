# Phase 4: Strategic Growth & AI Integration Plan

## خطة النمو الاستراتيجي وتكامل الذكاء الاصطناعي

**التاريخ**: 2025-11-05  
**الحالة**: 📋 تخطيط  
**المشروع**: RabitHR Platform - تحويل إلى منصة SaaS ذكية

---

## 🎯 الرؤية العامة

تحويل منصة RabitHR من نظام HR تقليدي إلى منصة SaaS ذكية متعددة المستأجرين مع قدرات ذكاء اصطناعي متقدمة.

---

## 📊 المحاور الاستراتيجية الخمسة

### 1️⃣ HR AI Assistant Module (HRBot)

**الهدف**: مساعد ذكاء اصطناعي خاص للاستشارات HR

#### الميزات الأساسية

- 💬 **محادثة ذكية**: الإجابة على استفسارات HR (سياسات، قوانين العمل السعودي)
- 📝 **توليد الوثائق**: إنشاء خطابات، عقود، شهادات تلقائياً
- 📊 **تحليل البيانات**: تحليل بيانات الموظفين وتقديم رؤى
- 🔒 **الخصوصية**: عزل كامل للبيانات السرية

#### التقنيات المقترحة

```typescript
// Stack
- OpenAI GPT-4 API أو Azure OpenAI
- LangChain للـ context management
- Vector DB (Pinecone/Supabase) للـ embeddings
- Redis للـ caching

// Architecture
server/ai/
  ├── chatbot/
  │   ├── assistant.ts       // Main AI assistant
  │   ├── prompts.ts          // System prompts
  │   └── context.ts          // Context management
  ├── document-generator/
  │   ├── templates.ts        // AI-powered templates
  │   └── generator.ts        // Document generation
  └── analytics/
      └── insights.ts         // Data analysis AI
```

#### خطة التنفيذ

**المرحلة 1** (أسبوع 1-2):

- [ ] إعداد OpenAI API integration
- [ ] إنشاء prompts أساسية بالعربية والإنجليزية
- [ ] بناء chat interface بسيط

**المرحلة 2** (أسبوع 3-4):

- [ ] إضافة context من قاعدة البيانات
- [ ] تكامل مع Saudi Labor Law knowledge base
- [ ] Rate limiting وأمان API

**المرحلة 3** (أسبوع 5-6):

- [ ] توليد الوثائق بالـ AI
- [ ] تحليلات متقدمة
- [ ] Testing شامل

#### الأمان والخصوصية

```typescript
// Data isolation
- لا إرسال بيانات حساسة للـ OpenAI
- استخدام anonymization للبيانات الإحصائية
- Audit log لجميع استعلامات AI
- Rate limiting per user/company
```

---

### 2️⃣ HR Analytics Dashboard

**الهدف**: لوحة تحكم BI متقدمة للمقاييس HR

#### المقاييس الرئيسية (KPIs)

1. **التوطين (Saudization)**
   - نسبة السعوديين مقابل الأجانب
   - توزيع حسب الإدارات
   - تقدم تحقيق أهداف التوطين

2. **معدل دوران الموظفين (Turnover)**
   - معدل الاستقالات شهرياً/سنوياً
   - تحليل أسباب المغادرة
   - Cost of turnover

3. **الإجازات والحضور**
   - متوسط رصيد الإجازات
   - معدل التغيب
   - Attendance trends

4. **الأداء والإنتاجية**
   - Performance ratings distribution
   - Training completion rates
   - Employee satisfaction scores

#### التصميم التقني

```typescript
// Component Structure
client/src/pages/analytics/
  ├── AnalyticsDashboard.tsx    // Main dashboard
  ├── widgets/
  │   ├── SaudizationWidget.tsx
  │   ├── TurnoverWidget.tsx
  │   ├── LeaveWidget.tsx
  │   └── PerformanceWidget.tsx
  ├── charts/
  │   ├── TrendChart.tsx
  │   └── DonutChart.tsx
  └── filters/
      └── DateRangeFilter.tsx

// Libraries
- Recharts للرسوم البيانية
- TanStack Query للـ data fetching
- Date-fns للتواريخ
```

#### API Endpoints

```typescript
// Backend APIs
GET /api/analytics/saudization
GET /api/analytics/turnover
GET /api/analytics/attendance
GET /api/analytics/performance
GET /api/analytics/overview

// Response format
{
  period: "2024-Q4",
  data: {
    current: 75.5,
    previous: 73.2,
    target: 80,
    trend: "up"
  },
  breakdown: [...]
}
```

---

### 3️⃣ Smart Event & Notification Engine

**الهدف**: نظام تنبيهات ذكي استباقي

#### أنواع التنبيهات

1. **العقود**
   - انتهاء صلاحية العقد (30/60/90 يوم)
   - انتهاء فترة التجربة
   - تجديد العقود المطلوبة

2. **الرواتب**
   - تأخر معالجة الرواتب
   - Salary anomalies (زيادة/نقصان غير متوقع)
   - تذكير بمواعيد الدفع

3. **الحضور**
   - تأخر متكرر
   - غياب بدون إذن
   - أنماط حضور غير عادية

4. **الامتثال (Compliance)**
   - انتهاء صلاحية الوثائق (إقامة، رخصة عمل)
   - نقص في نسبة التوطين
   - مخالفات محتملة

#### البنية التقنية

```typescript
// Cron Jobs (Vercel Cron)
api/cron/
  ├── check-contracts.ts      // Daily at 9 AM
  ├── process-attendance.ts   // Hourly
  ├── salary-alerts.ts        // Weekly
  └── compliance-check.ts     // Daily

// Database Schema
CREATE TABLE events_log (
  id INT PRIMARY KEY,
  company_id INT,
  event_type VARCHAR(50),
  severity ENUM('info', 'warning', 'critical'),
  title VARCHAR(255),
  description TEXT,
  related_entity_type VARCHAR(50),
  related_entity_id INT,
  status ENUM('pending', 'acknowledged', 'resolved'),
  created_at TIMESTAMP,
  acknowledged_at TIMESTAMP,
  resolved_at TIMESTAMP,
  metadata JSON
);

// Notification channels
- In-app notifications
- Email alerts
- SMS (critical only)
- WhatsApp Business API (optional)
```

#### Implementation Plan

```typescript
// Event Engine Core
server/events/
  ├── engine.ts              // Main event processor
  ├── rules/
  │   ├── contract-rules.ts
  │   ├── salary-rules.ts
  │   └── attendance-rules.ts
  ├── notifiers/
  │   ├── email-notifier.ts
  │   └── sms-notifier.ts
  └── scheduler.ts           // Cron job manager
```

---

### 4️⃣ Multi-Tenant Architecture

**الهدف**: دعم شركات متعددة في نفس المنصة

#### المفاهيم الأساسية

```typescript
// Tenant Isolation Strategies
1. Schema per tenant (أثقل، أكثر عزلاً)
2. Shared schema with tenant_id (أخف، مشاركة)
3. Hybrid approach (موصى به)

// Recommended: Shared schema with RLS
- كل جدول يحتوي على company_id
- Row-Level Security في MySQL
- Application-level filtering
```

#### Database Schema Updates

```sql
-- Add company_id to all tables
ALTER TABLE users ADD COLUMN company_id INT NOT NULL;
ALTER TABLE employees ADD COLUMN company_id INT NOT NULL;
ALTER TABLE contracts ADD COLUMN company_id INT NOT NULL;
-- ... etc

-- Companies table
CREATE TABLE companies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  domain VARCHAR(255) UNIQUE,
  logo_url VARCHAR(500),
  settings JSON,
  subscription_plan VARCHAR(50),
  subscription_status ENUM('active', 'trial', 'suspended'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Company settings example
{
  "language": "ar",
  "timezone": "Asia/Riyadh",
  "currency": "SAR",
  "policies": {
    "annual_leave_days": 21,
    "probation_period_days": 90
  },
  "branding": {
    "primary_color": "#3B82F6",
    "logo_url": "/logos/company-123.png"
  }
}
```

#### Authentication Updates

```typescript
// Middleware للـ tenant resolution
server / middleware / tenant.ts;

export function resolveTenant(req: Request, res: Response, next: NextFunction) {
  // Method 1: Subdomain (company1.rabithr.com)
  const subdomain = req.hostname.split(".")[0];

  // Method 2: Custom domain
  const customDomain = req.hostname;

  // Method 3: Header (for API)
  const tenantId = req.headers["x-tenant-id"];

  // Load company and attach to request
  req.company = await getCompanyBySlugOrDomain(subdomain || customDomain);
  next();
}

// All DB queries must filter by company_id
const employees = await db.query(
  "SELECT * FROM employees WHERE company_id = ?",
  [req.company.id]
);
```

#### UI/UX Updates

```typescript
// Dynamic branding
client/src/hooks/useCompany.ts

export function useCompany() {
  const { data: company } = useQuery(['company'], fetchCompany);

  return {
    name: company?.name,
    logo: company?.logo_url,
    primaryColor: company?.settings?.branding?.primary_color,
    // ... etc
  };
}

// Apply branding
<div style={{ '--primary-color': company.primaryColor }}>
  <img src={company.logo} alt={company.name} />
</div>
```

---

### 5️⃣ Public HR API (v1)

**الهدف**: واجهة برمجية عامة للتكامل الخارجي

#### Endpoints الأساسية

```typescript
// Authentication
POST /api/v1/auth/token           // Get JWT token
POST /api/v1/auth/refresh         // Refresh token

// Employees
GET    /api/v1/employees          // List employees
GET    /api/v1/employees/:id      // Get employee details
POST   /api/v1/employees          // Create employee
PUT    /api/v1/employees/:id      // Update employee
DELETE /api/v1/employees/:id      // Delete employee

// Attendance
GET  /api/v1/attendance           // Get attendance records
POST /api/v1/attendance/check-in  // Check-in
POST /api/v1/attendance/check-out // Check-out

// Contracts
GET  /api/v1/contracts            // List contracts
GET  /api/v1/contracts/:id        // Get contract
POST /api/v1/contracts            // Create contract

// Analytics
GET /api/v1/analytics/overview    // Company overview
GET /api/v1/analytics/saudization // Saudization metrics
```

#### Security Implementation

```typescript
// JWT-based authentication
server / api / v1 / auth.ts;

export async function generateAPIToken(companyId: number, scope: string[]) {
  const token = jwt.sign(
    {
      company_id: companyId,
      scope: scope,
      type: "api_token",
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  return token;
}

// Rate limiting (per API key)
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  keyGenerator: req => req.apiKey,
  message: "Too many requests from this API key",
});

// Scope validation
function requireScope(scope: string) {
  return (req, res, next) => {
    if (!req.token.scope.includes(scope)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
}

// Usage
router.get(
  "/employees",
  authenticateAPIToken,
  requireScope("employees:read"),
  apiLimiter,
  getEmployees
);
```

#### API Documentation

```typescript
// OpenAPI/Swagger
docs/api/
  ├── openapi.yaml          // API specification
  └── README.md             // Getting started guide

// Auto-generate docs
- استخدام @nestjs/swagger أو tsoa
- تشغيل docs على /api/v1/docs
- Interactive API testing (Swagger UI)
```

---

## 🏗️ خطة التنفيذ الشاملة

### Timeline (12 أسبوع)

#### Sprint 1-2 (أسبوع 1-2): Foundation

- [ ] إعداد multi-tenant architecture
- [ ] تحديث database schema
- [ ] Tenant middleware وauthentication

#### Sprint 3-4 (أسبوع 3-4): AI Integration

- [ ] HR AI Assistant - المرحلة 1
- [ ] OpenAI integration
- [ ] Basic chat interface

#### Sprint 5-6 (أسبوع 5-6): Analytics

- [ ] Analytics dashboard UI
- [ ] KPIs implementation
- [ ] Real-time data fetching

#### Sprint 7-8 (أسبوع 7-8): Events & Notifications

- [ ] Event engine core
- [ ] Cron jobs setup
- [ ] Notification system

#### Sprint 9-10 (أسبوع 9-10): Public API

- [ ] API endpoints development
- [ ] Authentication & authorization
- [ ] Rate limiting & security

#### Sprint 11-12 (أسبوع 11-12): Testing & Documentation

- [ ] Integration testing
- [ ] API documentation
- [ ] User guides (Arabic/English)
- [ ] Performance optimization

---

## 📋 المتطلبات التقنية

### Dependencies الجديدة

```json
{
  "dependencies": {
    "openai": "^4.0.0",
    "langchain": "^0.1.0",
    "@pinecone-database/pinecone": "^1.0.0",
    "recharts": "^2.5.0",
    "node-cron": "^3.0.0",
    "@sendgrid/mail": "^7.7.0",
    "twilio": "^4.0.0",
    "swagger-ui-express": "^5.0.0",
    "express-rate-limit": "^7.0.0"
  }
}
```

### Infrastructure Updates

```yaml
# vercel.json - Add cron jobs
{
  "crons":
    [
      { "path": "/api/cron/check-contracts", "schedule": "0 9 * * *" },
      { "path": "/api/cron/process-attendance", "schedule": "0 * * * *" },
    ],
}
```

### Environment Variables

```env
# AI Services
OPENAI_API_KEY=sk-...
PINECONE_API_KEY=...
PINECONE_ENVIRONMENT=...

# Notifications
SENDGRID_API_KEY=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...

# Multi-tenant
ENABLE_MULTI_TENANT=true
DEFAULT_TENANT_SLUG=default

# API
PUBLIC_API_ENABLED=true
API_RATE_LIMIT=100
```

---

## 🔒 الأمان والخصوصية

### Data Privacy

1. **AI Data Handling**
   - Anonymize personal data قبل إرسالها للـ AI
   - No storing of AI conversations مع بيانات حساسة
   - Audit log لجميع AI interactions

2. **Multi-tenant Isolation**
   - Row-level security في DB
   - Company-id validation في كل request
   - Separate file storage per tenant

3. **API Security**
   - JWT tokens مع expiration
   - Rate limiting per API key
   - IP whitelisting (optional)
   - Webhook signature verification

---

## 📊 Success Metrics

### KPIs لقياس النجاح

1. **AI Assistant**
   - عدد الاستفسارات المعالجة يومياً
   - معدل رضا المستخدمين (feedback)
   - وقت الاستجابة المتوسط

2. **Analytics Dashboard**
   - عدد المستخدمين النشطين
   - Most viewed reports
   - Insights acted upon

3. **Notifications**
   - Alert accuracy (true positive rate)
   - Response time to critical alerts
   - User engagement rate

4. **Multi-tenant**
   - عدد الشركات المسجلة
   - Tenant isolation incidents (should be 0)
   - Performance per tenant

5. **Public API**
   - عدد API calls شهرياً
   - API uptime %
   - Partner integrations count

---

## 🚀 Next Steps

### للبدء في Phase 4:

1. **إنشاء Branch جديد**

   ```bash
   git checkout -b feature/phase4-ai-integration
   ```

2. **إنشاء Issues في GitHub**
   - Issue #1: Multi-tenant Architecture Setup
   - Issue #2: AI Assistant Integration
   - Issue #3: Analytics Dashboard
   - Issue #4: Event & Notification Engine
   - Issue #5: Public API v1

3. **إنشاء Project Board**
   - Planning
   - In Progress
   - Review
   - Done

4. **أول PR**: Multi-tenant Foundation
   - Database schema updates
   - Tenant middleware
   - Authentication updates

---

## 📚 المراجع والموارد

### Documentation

- OpenAI API: https://platform.openai.com/docs
- LangChain: https://js.langchain.com/docs
- Vercel Cron: https://vercel.com/docs/cron-jobs
- Multi-tenancy patterns: https://docs.microsoft.com/en-us/azure/architecture/

### Best Practices

- GDPR compliance for AI
- Saudi Data Protection Law
- API security standards (OWASP)
- Multi-tenant security checklist

---

**نهاية المستند**

**Status**: 📋 Ready for implementation  
**Next**: Create GitHub issues and start Sprint 1
