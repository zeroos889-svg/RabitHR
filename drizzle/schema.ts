import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, date } from "drizzle-orm/mysql-core";

/**
 * قاعدة بيانات منصة رابِط - 21 جدول
 * متوافقة 100% مع نظام العمل السعودي
 */

// 1. المستخدمون
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  userType: mysqlEnum("userType", ["employee", "individual", "company"]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

// 2. الشركات
export const companies = mysqlTable("companies", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  nameAr: varchar("nameAr", { length: 255 }),
  nameEn: varchar("nameEn", { length: 255 }),
  commercialRegister: varchar("commercialRegister", { length: 50 }).unique(),
  industry: varchar("industry", { length: 100 }),
  employeeCount: mysqlEnum("employeeCount", ["1-50", "51-200", "201-500", "500+"]),
  city: varchar("city", { length: 100 }),
  address: text("address"),
  website: varchar("website", { length: 255 }),
  logoUrl: text("logoUrl"),
  subscriptionPlan: mysqlEnum("subscriptionPlan", ["starter", "professional", "enterprise", "custom"]),
  subscriptionStatus: mysqlEnum("subscriptionStatus", ["active", "inactive", "trial"]),
  subscriptionStartDate: date("subscriptionStartDate"),
  subscriptionEndDate: date("subscriptionEndDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 3. مستقلو الموارد البشرية
export const individualHRs = mysqlTable("individualHRs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fullName: varchar("fullName", { length: 255 }),
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  specialization: varchar("specialization", { length: 100 }),
  experienceYears: int("experienceYears"),
  certifications: text("certifications"),
  subscriptionStatus: mysqlEnum("subscriptionStatus", ["active", "inactive", "trial"]),
  subscriptionStartDate: date("subscriptionStartDate"),
  subscriptionEndDate: date("subscriptionEndDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 4. الموظفون
export const employees = mysqlTable("employees", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fullName: varchar("fullName", { length: 255 }),
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  companyName: varchar("companyName", { length: 255 }),
  jobTitle: varchar("jobTitle", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 5. الاشتراكات
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  planType: mysqlEnum("planType", ["free", "individual", "starter", "professional", "enterprise", "custom"]),
  status: mysqlEnum("status", ["active", "inactive", "trial", "cancelled"]),
  startDate: date("startDate"),
  endDate: date("endDate"),
  price: int("price"),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  autoRenew: boolean("autoRenew").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 6. الصلاحيات
export const permissions = mysqlTable("permissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  permissionLevel: mysqlEnum("permissionLevel", ["view_only", "basic_tools", "advanced_tools", "ats_access", "full_access", "admin"]),
  canUseCalculators: boolean("canUseCalculators").default(false),
  canGenerateLetters: boolean("canGenerateLetters").default(false),
  canAccessATS: boolean("canAccessATS").default(false),
  canManageCases: boolean("canManageCases").default(false),
  canViewReports: boolean("canViewReports").default(false),
  canManageTeam: boolean("canManageTeam").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 7. الوظائف
export const jobs = mysqlTable("jobs", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  title: varchar("title", { length: 255 }),
  titleEn: varchar("titleEn", { length: 255 }),
  description: text("description"),
  requirements: text("requirements"),
  responsibilities: text("responsibilities"),
  employmentType: mysqlEnum("employmentType", ["full-time", "part-time", "contract", "temporary"]),
  experienceLevel: mysqlEnum("experienceLevel", ["entry", "mid", "senior", "executive"]),
  educationLevel: varchar("educationLevel", { length: 100 }),
  salaryMin: int("salaryMin"),
  salaryMax: int("salaryMax"),
  currency: varchar("currency", { length: 3 }).default("SAR"),
  location: varchar("location", { length: 255 }),
  remoteOption: boolean("remoteOption").default(false),
  benefits: text("benefits"),
  status: mysqlEnum("status", ["draft", "published", "closed", "on-hold"]),
  publishedAt: timestamp("publishedAt"),
  closedAt: timestamp("closedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 8. طلبات التوظيف
export const jobApplications = mysqlTable("jobApplications", {
  id: int("id").autoincrement().primaryKey(),
  jobId: int("jobId").notNull(),
  candidateId: int("candidateId").notNull(),
  status: mysqlEnum("status", ["pending", "reviewing", "shortlisted", "interview", "offer", "rejected", "hired"]),
  cvUrl: text("cvUrl"),
  coverLetter: text("coverLetter"),
  appliedAt: timestamp("appliedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 9. المرشحون
export const candidates = mysqlTable("candidates", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 255 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  nationality: varchar("nationality", { length: 100 }),
  currentLocation: varchar("currentLocation", { length: 255 }),
  cvUrl: text("cvUrl"),
  linkedinUrl: varchar("linkedinUrl", { length: 255 }),
  portfolioUrl: varchar("portfolioUrl", { length: 255 }),
  skills: text("skills"),
  experience: text("experience"),
  education: text("education"),
  languages: text("languages"),
  aiParsedData: text("aiParsedData"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 10. مراحل التوظيف
export const pipelineStages = mysqlTable("pipelineStages", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  name: varchar("name", { length: 100 }),
  nameEn: varchar("nameEn", { length: 100 }),
  orderIndex: int("orderIndex"),
  color: varchar("color", { length: 7 }),
  isDefault: boolean("isDefault").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 11. تقييمات المرشحين
export const candidateEvaluations = mysqlTable("candidateEvaluations", {
  id: int("id").autoincrement().primaryKey(),
  applicationId: int("applicationId").notNull(),
  evaluatorId: int("evaluatorId").notNull(),
  technicalScore: int("technicalScore"),
  softSkillsScore: int("softSkillsScore"),
  cultureFitScore: int("cultureFitScore"),
  overallScore: int("overallScore"),
  notes: text("notes"),
  recommendation: mysqlEnum("recommendation", ["strongly_recommend", "recommend", "neutral", "not_recommend"]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 12. أنشطة المرشحين
export const candidateActivities = mysqlTable("candidateActivities", {
  id: int("id").autoincrement().primaryKey(),
  applicationId: int("applicationId").notNull(),
  userId: int("userId").notNull(),
  activityType: mysqlEnum("activityType", ["status_change", "note_added", "email_sent", "interview_scheduled", "evaluation_added"]),
  description: text("description"),
  metadata: text("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// 13. جدولة المقابلات
export const interviewSchedules = mysqlTable("interviewSchedules", {
  id: int("id").autoincrement().primaryKey(),
  applicationId: int("applicationId").notNull(),
  interviewType: mysqlEnum("interviewType", ["phone", "video", "in-person", "technical", "hr"]),
  scheduledAt: timestamp("scheduledAt"),
  duration: int("duration"),
  location: varchar("location", { length: 255 }),
  meetingLink: varchar("meetingLink", { length: 500 }),
  interviewers: text("interviewers"),
  status: mysqlEnum("status", ["scheduled", "completed", "cancelled", "rescheduled"]),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 14. حالات الموارد البشرية
export const hrCases = mysqlTable("hrCases", {
  id: int("id").autoincrement().primaryKey(),
  companyId: int("companyId").notNull(),
  createdBy: int("createdBy").notNull(),
  assignedTo: int("assignedTo"),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  caseType: mysqlEnum("caseType", ["complaint", "request", "inquiry", "disciplinary", "grievance", "other"]),
  priority: mysqlEnum("priority", ["low", "medium", "high", "urgent"]),
  status: mysqlEnum("status", ["open", "in-progress", "pending", "resolved", "closed"]),
  relatedEmployeeId: int("relatedEmployeeId"),
  attachments: text("attachments"),
  resolution: text("resolution"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  resolvedAt: timestamp("resolvedAt"),
});

// 15. المهام
export const tasks = mysqlTable("tasks", {
  id: int("id").autoincrement().primaryKey(),
  caseId: int("caseId"),
  createdBy: int("createdBy").notNull(),
  assignedTo: int("assignedTo"),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  dueDate: date("dueDate"),
  priority: mysqlEnum("priority", ["low", "medium", "high"]),
  status: mysqlEnum("status", ["todo", "in-progress", "completed", "cancelled"]),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 16. تعليقات الحالات
export const caseComments = mysqlTable("caseComments", {
  id: int("id").autoincrement().primaryKey(),
  caseId: int("caseId").notNull(),
  userId: int("userId").notNull(),
  comment: text("comment"),
  isInternal: boolean("isInternal").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 17. المستندات
export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  companyId: int("companyId"),
  documentType: varchar("documentType", { length: 100 }),
  title: varchar("title", { length: 255 }),
  fileUrl: text("fileUrl"),
  fileSize: int("fileSize"),
  mimeType: varchar("mimeType", { length: 100 }),
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
});

// 18. سجل الحسابات
export const calculationHistory = mysqlTable("calculationHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  calculationType: mysqlEnum("calculationType", ["end-of-service", "vacation", "overtime", "deduction"]),
  inputData: text("inputData"),
  result: text("result"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// 19. الخطابات المولدة
export const generatedLetters = mysqlTable("generatedLetters", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  letterType: varchar("letterType", { length: 100 }),
  content: text("content"),
  metadata: text("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// 20. سجل الدردشة
export const chatHistory = mysqlTable("chatHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  message: text("message"),
  response: text("response"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// 21. سجل التدقيق
export const auditLogs = mysqlTable("auditLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  action: varchar("action", { length: 255 }),
  entityType: varchar("entityType", { length: 100 }),
  entityId: int("entityId"),
  changes: text("changes"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Company = typeof companies.$inferSelect;
export type IndividualHR = typeof individualHRs.$inferSelect;
export type Employee = typeof employees.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type Candidate = typeof candidates.$inferSelect;
export type JobApplication = typeof jobApplications.$inferSelect;
