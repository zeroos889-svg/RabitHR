# Phase 4: GitHub Issues Templates

## قوالب Issues للمرحلة 4

استخدم هذه القوالب لإنشاء Issues في GitHub.

---

## 🏢 Issue #1: Multi-Tenant Architecture

**Title**: `[Phase 4-Sprint 1] Multi-Tenant Architecture Foundation`

**Labels**: `phase4`, `architecture`, `multi-tenant`, `priority-high`

**Assignees**: @zeroos889-svg

**Milestone**: Phase 4 - Sprint 1-2

**Description**:

````markdown
## 🎯 الهدف

تجهيز البنية التحتية لدعم شركات متعددة (tenants) في نفس المنصة مع عزل كامل للبيانات.

## 📋 المهام الرئيسية

### Database Schema Updates

- [ ] إنشاء `companies` table
  ```sql
  CREATE TABLE companies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    domain VARCHAR(255) UNIQUE,
    logo_url VARCHAR(500),
    settings JSON,
    subscription_plan VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
````

- [ ] إضافة `company_id` لجميع الجداول الموجودة
- [ ] إضافة indexes على `company_id`
- [ ] إنشاء migration scripts

### Middleware & Authentication

- [ ] إنشاء `server/middleware/tenant.ts`
- [ ] Tenant resolution (subdomain/domain/header)
- [ ] تحديث authentication للتحقق من company_id
- [ ] إضافة company context لجميع requests

### Application Layer

- [ ] تحديث جميع DB queries لتصفية بـ company_id
- [ ] إنشاء `useCompany()` hook في React
- [ ] Dynamic branding per company
- [ ] Company settings management UI

### Testing

- [ ] Unit tests للـ tenant middleware
- [ ] Integration tests للـ data isolation
- [ ] Performance testing مع multiple tenants
- [ ] Security audit للـ tenant isolation

## ✅ معايير القبول (Acceptance Criteria)

- [ ] يمكن إنشاء شركات جديدة عبر admin panel
- [ ] كل company لديه عزل كامل للبيانات
- [ ] Subdomain routing يعمل (company1.rabithr.com)
- [ ] Custom domains مدعومة
- [ ] Zero data leakage بين companies
- [ ] جميع الـ tests تنجح

## 📊 تقدير الوقت

**2 أسابيع** (Sprint 1-2)

## 🔗 ملفات ذات صلة

- `docs/phase4_growth_plan.md` - Section 4: Multi-Tenant Architecture
- `server/db.ts` - سيحتاج تحديث
- `server/middleware/` - مجلد جديد

## 📝 ملاحظات

- استخدام shared schema approach (company_id في كل جدول)
- Row-Level Security في MySQL
- Testing شامل ضروري للتأكد من data isolation

````

---

## 🤖 Issue #2: HR AI Assistant

**Title**: `[Phase 4-Sprint 3] HR AI Assistant (HRBot) Integration`

**Labels**: `phase4`, `AI`, `chatbot`, `openai`, `priority-high`

**Assignees**: @zeroos889-svg

**Milestone**: Phase 4 - Sprint 3-4

**Description**:
```markdown
## 🎯 الهدف
دمج مساعد ذكاء اصطناعي لمساعدة مستخدمي HR في:
- الإجابة على أسئلة السياسات HR
- توليد الخطابات والوثائق
- تحليل بيانات الموظفين

## 📋 المهام الرئيسية

### OpenAI Integration
- [ ] إعداد OpenAI API key
- [ ] إنشاء `server/ai/chatbot/assistant.ts`
- [ ] بناء system prompts بالعربية والإنجليزية
- [ ] Context management للمحادثات
- [ ] Rate limiting للـ AI requests

### Chat Interface
- [ ] تصميم `ChatInterface.tsx` component
- [ ] Message history management
- [ ] Typing indicators
- [ ] Error handling UI
- [ ] Mobile-responsive design

### Document Generation
- [ ] AI-powered letter templates
- [ ] Contract generation
- [ ] Certificate generation
- [ ] PDF export functionality

### Data Privacy
- [ ] Anonymization للبيانات الحساسة
- [ ] No external data sharing
- [ ] Audit log لجميع AI interactions
- [ ] User consent management

### Knowledge Base
- [ ] Saudi Labor Law integration
- [ ] Company policies indexing
- [ ] Vector database (Pinecone) setup
- [ ] Semantic search

## ✅ معايير القبول
- [ ] Users يمكنهم طرح أسئلة بالعربية والإنجليزية
- [ ] AI يجيب بدقة على أسئلة HR policies
- [ ] توليد الوثائق يعمل بشكل صحيح
- [ ] Response time < 3 ثوانٍ
- [ ] لا تسريب للبيانات الحساسة
- [ ] Rate limiting يعمل

## 📊 تقدير الوقت
**2 أسابيع** (Sprint 3-4)

## 🔗 Dependencies
- openai ^4.0.0
- langchain ^0.1.0
- @pinecone-database/pinecone ^1.0.0

## 📝 ملاحظات
- استخدام GPT-4 للدقة العالية
- Caching للإجابات المكررة
- Fallback للأخطاء
````

---

## 📊 Issue #3: Analytics Dashboard

**Title**: `[Phase 4-Sprint 5] HR Analytics Dashboard - KPIs & Insights`

**Labels**: `phase4`, `analytics`, `dashboard`, `BI`, `priority-medium`

**Assignees**: @zeroos889-svg

**Milestone**: Phase 4 - Sprint 5-6

**Description**:

```markdown
## 🎯 الهدف

لوحة تحكم تحليلية متقدمة لعرض مؤشرات الأداء الرئيسية HR.

## 📋 المهام الرئيسية

### KPIs Implementation

- [ ] **Saudization Metrics**
  - نسبة السعوديين/الأجانب
  - توزيع حسب الأقسام
  - تقدم نحو الأهداف
- [ ] **Employee Turnover**
  - معدل الدوران شهرياً/سنوياً
  - تحليل أسباب المغادرة
  - Cost of turnover

- [ ] **Leave & Attendance**
  - متوسط رصيد الإجازات
  - معدل التغيب
  - Attendance trends

- [ ] **Performance Metrics**
  - Performance ratings distribution
  - Training completion rates
  - Employee satisfaction

### UI Components

- [ ] `AnalyticsDashboard.tsx` main page
- [ ] `SaudizationWidget.tsx`
- [ ] `TurnoverWidget.tsx`
- [ ] `LeaveWidget.tsx`
- [ ] `PerformanceWidget.tsx`
- [ ] Date range filter
- [ ] Export to PDF/Excel

### Backend APIs

- [ ] `GET /api/analytics/saudization`
- [ ] `GET /api/analytics/turnover`
- [ ] `GET /api/analytics/attendance`
- [ ] `GET /api/analytics/performance`
- [ ] `GET /api/analytics/overview`
- [ ] Caching للـ heavy queries

### Charts & Visualization

- [ ] Line charts للـ trends
- [ ] Donut charts للـ distribution
- [ ] Bar charts للـ comparisons
- [ ] Heatmaps للـ attendance
- [ ] Interactive tooltips

## ✅ معايير القبول

- [ ] جميع KPIs تعرض بيانات دقيقة
- [ ] Real-time updates (أو near real-time)
- [ ] Charts responsive على mobile
- [ ] Export functionality تعمل
- [ ] Loading states واضحة
- [ ] Performance optimized (< 2s load time)

## 📊 تقدير الوقت

**2 أسابيع** (Sprint 5-6)

## 🔗 Dependencies

- recharts ^2.5.0
- date-fns ^2.30.0

## 📝 ملاحظات

- استخدام TanStack Query للـ data fetching
- Memoization للـ expensive calculations
```

---

## 🔔 Issue #4: Event & Notification Engine

**Title**: `[Phase 4-Sprint 7] Smart Event & Notification Engine`

**Labels**: `phase4`, `notifications`, `events`, `automation`, `priority-medium`

**Assignees**: @zeroos889-svg

**Milestone**: Phase 4 - Sprint 7-8

**Description**:

````markdown
## 🎯 الهدف

نظام تنبيهات ذكي استباقي لمراقبة العقود، الرواتب، الحضور والامتثال.

## 📋 المهام الرئيسية

### Database Schema

- [ ] إنشاء `events_log` table
  ```sql
  CREATE TABLE events_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    event_type VARCHAR(50),
    severity ENUM('info', 'warning', 'critical'),
    title VARCHAR(255),
    description TEXT,
    related_entity_type VARCHAR(50),
    related_entity_id INT,
    status ENUM('pending', 'acknowledged', 'resolved'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
````

### Cron Jobs (Vercel Cron)

- [ ] `api/cron/check-contracts.ts` - يومياً 9 صباحاً
- [ ] `api/cron/process-attendance.ts` - كل ساعة
- [ ] `api/cron/salary-alerts.ts` - أسبوعياً
- [ ] `api/cron/compliance-check.ts` - يومياً

### Event Rules

- [ ] **Contract Events**
  - انتهاء صلاحية (30/60/90 يوم)
  - انتهاء فترة التجربة
  - تجديد مطلوب

- [ ] **Salary Events**
  - تأخر المعالجة
  - Anomalies detection
  - تذكير بمواعيد الدفع

- [ ] **Attendance Events**
  - تأخر متكرر
  - غياب بدون إذن
  - أنماط غير عادية

- [ ] **Compliance Events**
  - انتهاء الوثائق (إقامة، رخصة)
  - نقص التوطين
  - مخالفات محتملة

### Notification Channels

- [ ] In-app notifications UI
- [ ] Email notifications (SendGrid)
- [ ] SMS notifications (Twilio) - للحرج فقط
- [ ] Notification preferences per user

### Event Dashboard

- [ ] Events list view
- [ ] Filter by severity/type
- [ ] Acknowledge/Resolve actions
- [ ] Event history
- [ ] Statistics & charts

## ✅ معايير القبول

- [ ] Cron jobs تعمل بشكل موثوق
- [ ] Events يتم اكتشافها بدقة
- [ ] Notifications تُرسل في الوقت المناسب
- [ ] No false positives
- [ ] Users يمكنهم إدارة preferences
- [ ] Dashboard واضح وسهل الاستخدام

## 📊 تقدير الوقت

**2 أسابيع** (Sprint 7-8)

## 🔗 Dependencies

- @sendgrid/mail ^7.7.0
- twilio ^4.0.0

## 📝 ملاحظات

- Vercel Cron limitations: max 12 jobs
- استخدام database queue للـ heavy processing

````

---

## 🔌 Issue #5: Public API v1

**Title**: `[Phase 4-Sprint 9] Public HR API v1 - REST & Auth`

**Labels**: `phase4`, `API`, `integration`, `JWT`, `priority-low`

**Assignees**: @zeroos889-svg

**Milestone**: Phase 4 - Sprint 9-10

**Description**:
```markdown
## 🎯 الهدف
واجهة برمجية عامة آمنة للتكامل مع أنظمة خارجية.

## 📋 المهام الرئيسية

### API Endpoints
- [ ] **Authentication**
  - `POST /api/v1/auth/token` - Get JWT
  - `POST /api/v1/auth/refresh` - Refresh token

- [ ] **Employees**
  - `GET /api/v1/employees` - List
  - `GET /api/v1/employees/:id` - Get one
  - `POST /api/v1/employees` - Create
  - `PUT /api/v1/employees/:id` - Update
  - `DELETE /api/v1/employees/:id` - Delete

- [ ] **Attendance**
  - `GET /api/v1/attendance` - List records
  - `POST /api/v1/attendance/check-in` - Check-in
  - `POST /api/v1/attendance/check-out` - Check-out

- [ ] **Contracts**
  - `GET /api/v1/contracts` - List
  - `GET /api/v1/contracts/:id` - Get one
  - `POST /api/v1/contracts` - Create

- [ ] **Analytics**
  - `GET /api/v1/analytics/overview` - Overview
  - `GET /api/v1/analytics/saudization` - Saudization

### Authentication & Security
- [ ] JWT token generation
- [ ] API key management UI
- [ ] Scope-based permissions
- [ ] Rate limiting (100 req/15min per key)
- [ ] IP whitelisting (optional)
- [ ] Request signing (optional)

### Documentation
- [ ] OpenAPI 3.0 specification
- [ ] Swagger UI at `/api/v1/docs`
- [ ] Getting started guide
- [ ] Code examples (cURL, JavaScript, Python)
- [ ] Webhook documentation

### Testing & Monitoring
- [ ] API integration tests
- [ ] Load testing
- [ ] API usage analytics
- [ ] Error tracking
- [ ] Rate limit monitoring

## ✅ معايير القبول
- [ ] جميع endpoints تعمل بشكل صحيح
- [ ] Authentication آمن (JWT)
- [ ] Rate limiting يعمل
- [ ] Documentation شاملة وواضحة
- [ ] Swagger UI interactive
- [ ] Performance optimized
- [ ] Error responses واضحة

## 📊 تقدير الوقت
**2 أسابيع** (Sprint 9-10)

## 🔗 Dependencies
- swagger-ui-express ^5.0.0
- express-rate-limit ^7.0.0
- jsonwebtoken ^9.0.0

## 📝 ملاحظات
- API versioning (/v1, /v2, etc)
- Backward compatibility مهمة
- Rate limits يمكن تعديلها per plan
````

---

## 📊 Project Board Structure

### Columns

1. **📋 Backlog** - جميع الـ issues
2. **🎯 Sprint Planning** - للـ sprint القادم
3. **🚧 In Progress** - قيد التنفيذ
4. **👀 Review** - مراجعة
5. **✅ Done** - مكتمل

### Sprint Labels

- `sprint-1-2` - Multi-tenant
- `sprint-3-4` - AI Assistant
- `sprint-5-6` - Analytics
- `sprint-7-8` - Events
- `sprint-9-10` - API
- `sprint-11-12` - Testing & Docs

---

**استخدم هذه القوالب لإنشاء Issues في GitHub وابدأ Phase 4! 🚀**
