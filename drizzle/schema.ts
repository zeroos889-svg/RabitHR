import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, date } from "drizzle-orm/mysql-core";

/**
 * قاعدة بيانات منصة رابِط - 21 جدول
 * متوافقة 100% مع نظام العمل السعودي
 */

// 1. المستخدمون
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).unique(), // nullable for email/password users
  name: text("name"),
  email: varchar("email", { length: 320 }).unique(), // unique for email/password login
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  loginMethod: varchar("loginMethod", { length: 64 }), // 'oauth', 'email', 'google', 'apple', etc.
  profilePicture: text("profilePicture"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  userType: mysqlEnum("userType", ["employee", "individual", "company"]),
  emailVerified: boolean("emailVerified").default(false),
  profileCompleted: boolean("profileCompleted").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

// 1.1 كلمات المرور (للتسجيل بالبريد)
export const passwords = mysqlTable("passwords", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  resetToken: varchar("resetToken", { length: 255 }),
  resetTokenExpiry: timestamp("resetTokenExpiry"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
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

// 22. قوالب النماذج (Templates)
export const templates = mysqlTable("templates", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 100 }).notNull().unique(),
  titleAr: varchar("titleAr", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }),
  category: varchar("category", { length: 100 }),
  placeholdersSchema: text("placeholdersSchema"), // JSON
  aiPrompt: text("aiPrompt"),
  defaultContent: text("defaultContent"),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 23. المستندات المولدة (Generated Documents)
export const generatedDocuments = mysqlTable("generatedDocuments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  templateCode: varchar("templateCode", { length: 100 }).notNull(),
  outputHtml: text("outputHtml"),
  outputText: text("outputText"),
  lang: mysqlEnum("lang", ["ar", "en", "both"]).default("ar"),
  inputData: text("inputData"), // JSON
  companyLogo: text("companyLogo"),
  companyName: varchar("companyName", { length: 255 }),
  isSaved: boolean("isSaved").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 24. باقات الاستشارات (Consulting Packages)
export const consultingPackages = mysqlTable("consultingPackages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }),
  description: text("description"),
  descriptionEn: text("descriptionEn"),
  duration: int("duration"), // بالدقائق
  slaHours: int("slaHours"), // مدة الاستجابة بالساعات
  priceSAR: int("priceSAR").notNull(),
  features: text("features"), // JSON array
  isActive: boolean("isActive").default(true),
  orderIndex: int("orderIndex").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 25. تذاكر الاستشارات (Consulting Tickets)
export const consultingTickets = mysqlTable("consultingTickets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  packageId: int("packageId").notNull(),
  consultantId: int("consultantId"),
  ticketNumber: varchar("ticketNumber", { length: 50 }).notNull().unique(),
  status: mysqlEnum("status", ["pending", "assigned", "in-progress", "completed", "cancelled"]).default("pending"),
  priority: mysqlEnum("priority", ["low", "medium", "high", "urgent"]).default("medium"),
  subject: varchar("subject", { length: 255 }),
  description: text("description"),
  submittedFormJson: text("submittedFormJson"), // JSON
  attachments: text("attachments"), // JSON array of URLs
  scheduledAt: timestamp("scheduledAt"),
  completedAt: timestamp("completedAt"),
  slaDeadline: timestamp("slaDeadline"),
  rating: int("rating"), // 1-5
  feedback: text("feedback"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 26. ردود الاستشارات (Consulting Responses)
export const consultingResponses = mysqlTable("consultingResponses", {
  id: int("id").autoincrement().primaryKey(),
  ticketId: int("ticketId").notNull(),
  userId: int("userId").notNull(),
  message: text("message").notNull(),
  attachments: text("attachments"), // JSON array
  isInternal: boolean("isInternal").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 27. تتبع الاستخدام (Usage Events)
export const usageEvents = mysqlTable("usageEvents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  eventType: varchar("eventType", { length: 100 }).notNull(),
  payloadJson: text("payloadJson"), // JSON
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// 28. أكواد الخصم (Discount Codes)
export const discountCodes = mysqlTable("discountCodes", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  description: text("description"),
  discountType: mysqlEnum("discountType", ["percentage", "fixed"]).notNull(),
  discountValue: int("discountValue").notNull(), // percentage (0-100) or fixed amount in SAR
  maxUses: int("maxUses"), // null = unlimited
  usedCount: int("usedCount").default(0).notNull(),
  validFrom: timestamp("validFrom"),
  validUntil: timestamp("validUntil"),
  isActive: boolean("isActive").default(true).notNull(),
  createdBy: int("createdBy").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 29. استخدام أكواد الخصم (Discount Code Usage)
export const discountCodeUsage = mysqlTable("discountCodeUsage", {
  id: int("id").autoincrement().primaryKey(),
  codeId: int("codeId").notNull(),
  userId: int("userId").notNull(),
  orderId: varchar("orderId", { length: 100 }),
  originalAmount: int("originalAmount").notNull(),
  discountAmount: int("discountAmount").notNull(),
  finalAmount: int("finalAmount").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// 30. الإشعارات (Notifications)
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["success", "info", "warning", "error"]).default("info").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  link: varchar("link", { length: 500 }),
  icon: varchar("icon", { length: 50 }),
  isRead: boolean("isRead").default(false).notNull(),
  readAt: timestamp("readAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// 31. تفضيلات الإشعارات (Notification Preferences)
export const notificationPreferences = mysqlTable("notificationPreferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  inAppEnabled: boolean("inAppEnabled").default(true).notNull(),
  emailEnabled: boolean("emailEnabled").default(true).notNull(),
  pushEnabled: boolean("pushEnabled").default(false).notNull(),
  smsEnabled: boolean("smsEnabled").default(false).notNull(),
  // تفضيلات تفصيلية
  notifyOnBooking: boolean("notifyOnBooking").default(true).notNull(),
  notifyOnResponse: boolean("notifyOnResponse").default(true).notNull(),
  notifyOnReminder: boolean("notifyOnReminder").default(true).notNull(),
  notifyOnPromotion: boolean("notifyOnPromotion").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 32. سجل البريد الإلكتروني (Email Logs)
export const emailLogs = mysqlTable("emailLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  toEmail: varchar("toEmail", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 500 }).notNull(),
  template: varchar("template", { length: 100 }),
  status: mysqlEnum("status", ["pending", "sent", "failed"]).default("pending").notNull(),
  errorMessage: text("errorMessage"),
  sentAt: timestamp("sentAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// 33. سجل الرسائل النصية (SMS Logs)
export const smsLogs = mysqlTable("smsLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  toPhone: varchar("toPhone", { length: 20 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["pending", "sent", "failed"]).default("pending").notNull(),
  errorMessage: text("errorMessage"),
  sentAt: timestamp("sentAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// Payment table
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  amount: int("amount").notNull(), // in halalas (SAR * 100)
  currency: varchar("currency", { length: 3 }).default("SAR").notNull(),
  status: mysqlEnum("status", ["pending", "paid", "failed", "refunded", "cancelled"]).default("pending").notNull(),
  paymentMethod: mysqlEnum("paymentMethod", ["creditcard", "mada", "applepay", "stcpay"]),
  gateway: mysqlEnum("gateway", ["moyasar", "tap"]).notNull(),
  gatewayPaymentId: varchar("gatewayPaymentId", { length: 255 }),
  gatewayResponse: text("gatewayResponse"), // JSON response from gateway
  description: text("description"),
  itemType: mysqlEnum("itemType", ["consultation", "course", "subscription", "document"]),
  itemId: int("itemId"), // Reference to the item being purchased
  discountCodeId: int("discountCodeId"),
  discountAmount: int("discountAmount").default(0), // in halalas
  finalAmount: int("finalAmount").notNull(), // after discount
  refundedAmount: int("refundedAmount").default(0),
  refundedAt: timestamp("refundedAt"),
  paidAt: timestamp("paidAt"),
  failedAt: timestamp("failedAt"),
  errorMessage: text("errorMessage"),
  metadata: text("metadata"), // JSON for additional data
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Password = typeof passwords.$inferSelect;
export type InsertPassword = typeof passwords.$inferInsert;
export type Company = typeof companies.$inferSelect;
export type IndividualHR = typeof individualHRs.$inferSelect;
export type Employee = typeof employees.$inferSelect;
export type Job = typeof jobs.$inferSelect;
export type Candidate = typeof candidates.$inferSelect;
export type JobApplication = typeof jobApplications.$inferSelect;
export type Template = typeof templates.$inferSelect;
export type GeneratedDocument = typeof generatedDocuments.$inferSelect;
export type ConsultingPackage = typeof consultingPackages.$inferSelect;
export type ConsultingTicket = typeof consultingTickets.$inferSelect;
export type ConsultingResponse = typeof consultingResponses.$inferSelect;
export type UsageEvent = typeof usageEvents.$inferSelect;
export type DiscountCode = typeof discountCodes.$inferSelect;
export type InsertDiscountCode = typeof discountCodes.$inferInsert;
export type DiscountCodeUsage = typeof discountCodeUsage.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;
export type NotificationPreference = typeof notificationPreferences.$inferSelect;
export type EmailLog = typeof emailLogs.$inferSelect;
export type SmsLog = typeof smsLogs.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;


// 22. محادثات الدردشة المباشرة
export const chatConversations = mysqlTable("chatConversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"), // null للزوار غير المسجلين
  visitorName: varchar("visitorName", { length: 255 }),
  visitorEmail: varchar("visitorEmail", { length: 320 }),
  status: mysqlEnum("status", ["open", "closed"]).default("open").notNull(),
  lastMessageAt: timestamp("lastMessageAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 23. رسائل الدردشة
export const chatMessages = mysqlTable("chatMessages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  senderType: mysqlEnum("senderType", ["visitor", "admin"]).notNull(),
  senderName: varchar("senderName", { length: 255 }),
  message: text("message").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatConversation = typeof chatConversations.$inferSelect;
export type InsertChatConversation = typeof chatConversations.$inferInsert;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

// ==========================================
// نظام الاستشارات الشامل (Consulting System)
// ==========================================

// 24. المستشارون
export const consultants = mysqlTable("consultants", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(), // ربط مع جدول users
  
  // معلومات شخصية
  fullNameAr: varchar("fullNameAr", { length: 255 }).notNull(),
  fullNameEn: varchar("fullNameEn", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  city: varchar("city", { length: 100 }),
  profilePicture: text("profilePicture"),
  
  // معلومات مهنية
  mainSpecialization: varchar("mainSpecialization", { length: 100 }).notNull(),
  subSpecializations: text("subSpecializations"), // JSON array
  yearsOfExperience: int("yearsOfExperience").notNull(),
  qualifications: text("qualifications"), // JSON array
  certifications: text("certifications"), // JSON array
  bioAr: text("bioAr"), // نبذة تعريفية بالعربي
  bioEn: text("bioEn"), // نبذة تعريفية بالإنجليزي
  
  // معلومات الأرباح
  ibanNumber: varchar("ibanNumber", { length: 34 }),
  bankName: varchar("bankName", { length: 100 }),
  accountHolderName: varchar("accountHolderName", { length: 255 }),
  commissionRate: int("commissionRate").default(20).notNull(), // نسبة العمولة (%)
  
  // الحالة والموافقة
  status: mysqlEnum("status", ["pending", "approved", "rejected", "suspended"]).default("pending").notNull(),
  rejectionReason: text("rejectionReason"),
  approvedAt: timestamp("approvedAt"),
  approvedBy: int("approvedBy"), // userId of admin
  
  // إحصائيات
  totalConsultations: int("totalConsultations").default(0).notNull(),
  completedConsultations: int("completedConsultations").default(0).notNull(),
  averageRating: int("averageRating").default(0), // من 0 إلى 500 (5.00 * 100)
  totalEarnings: int("totalEarnings").default(0).notNull(), // بالهللة
  
  // التوفر
  isAvailable: boolean("isAvailable").default(true).notNull(),
  maxDailyBookings: int("maxDailyBookings").default(5).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 25. مستندات المستشارين
export const consultantDocuments = mysqlTable("consultantDocuments", {
  id: int("id").autoincrement().primaryKey(),
  consultantId: int("consultantId").notNull(),
  
  documentType: mysqlEnum("documentType", ["cv", "certificate", "id", "license", "other"]).notNull(),
  documentName: varchar("documentName", { length: 255 }).notNull(),
  documentUrl: text("documentUrl").notNull(), // S3 URL
  fileSize: int("fileSize"), // بالبايت
  mimeType: varchar("mimeType", { length: 100 }),
  
  // حالة التحقق
  verificationStatus: mysqlEnum("verificationStatus", ["pending", "verified", "rejected"]).default("pending").notNull(),
  verificationNotes: text("verificationNotes"),
  verifiedBy: int("verifiedBy"), // userId of admin
  verifiedAt: timestamp("verifiedAt"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 26. التخصصات
export const specializations = mysqlTable("specializations", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  descriptionAr: text("descriptionAr"),
  descriptionEn: text("descriptionEn"),
  
  icon: varchar("icon", { length: 100 }), // اسم الأيقونة من lucide-react
  imageUrl: text("imageUrl"),
  color: varchar("color", { length: 20 }), // hex color
  
  isActive: boolean("isActive").default(true).notNull(),
  orderIndex: int("orderIndex").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 27. أنواع الاستشارات
export const consultationTypes = mysqlTable("consultationTypes", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  
  nameAr: varchar("nameAr", { length: 255 }).notNull(),
  nameEn: varchar("nameEn", { length: 255 }).notNull(),
  descriptionAr: text("descriptionAr"),
  descriptionEn: text("descriptionEn"),
  
  // التسعير
  basePriceSAR: int("basePriceSAR").notNull(), // بالهللة
  estimatedDuration: int("estimatedDuration").default(60).notNull(), // بالدقائق
  
  // التخصصات المرتبطة
  relatedSpecializations: text("relatedSpecializations"), // JSON array of specialization codes
  
  // العرض
  icon: varchar("icon", { length: 100 }),
  imageUrl: text("imageUrl"),
  color: varchar("color", { length: 20 }),
  features: text("features"), // JSON array بالعربي والإنجليزي
  
  // المتطلبات من العميل
  requiredDocuments: text("requiredDocuments"), // JSON array: [{nameAr, nameEn, required, description}]
  requiredInfo: text("requiredInfo"), // JSON array: [{nameAr, nameEn, type, required}]
  
  isActive: boolean("isActive").default(true).notNull(),
  orderIndex: int("orderIndex").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 28. حجوزات الاستشارات
export const consultationBookings = mysqlTable("consultationBookings", {
  id: int("id").autoincrement().primaryKey(),
  bookingNumber: varchar("bookingNumber", { length: 50 }).notNull().unique(),
  
  // الأطراف
  clientId: int("clientId").notNull(), // userId
  consultantId: int("consultantId").notNull(),
  consultationTypeId: int("consultationTypeId").notNull(),
  
  // معلومات الحجز
  scheduledDate: date("scheduledDate").notNull(),
  scheduledTime: varchar("scheduledTime", { length: 10 }).notNull(), // "14:00"
  duration: int("duration").default(60).notNull(), // بالدقائق
  
  // تفاصيل الاستشارة
  clientNotes: text("clientNotes"), // ملاحظات العميل
  consultantNotes: text("consultantNotes"), // ملاحظات المستشار (خاصة)
  
  // الحالة
  status: mysqlEnum("status", [
    "pending", // في انتظار التأكيد
    "confirmed", // مؤكدة
    "in-progress", // جارية
    "completed", // مكتملة
    "cancelled", // ملغاة
    "no-show" // لم يحضر العميل
  ]).default("pending").notNull(),
  
  cancellationReason: text("cancellationReason"),
  cancelledBy: int("cancelledBy"), // userId
  cancelledAt: timestamp("cancelledAt"),
  
  // المالية
  totalAmount: int("totalAmount").notNull(), // بالهللة
  discountAmount: int("discountAmount").default(0).notNull(),
  finalAmount: int("finalAmount").notNull(),
  discountCodeId: int("discountCodeId"), // ربط مع جدول discount_codes
  
  // الدفع
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "paid", "refunded"]).default("pending").notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  paymentTransactionId: varchar("paymentTransactionId", { length: 255 }),
  paidAt: timestamp("paidAt"),
  
  // التقييم
  rating: int("rating"), // من 1 إلى 5
  review: text("review"),
  reviewedAt: timestamp("reviewedAt"),
  
  // الأوقات
  confirmedAt: timestamp("confirmedAt"),
  startedAt: timestamp("startedAt"),
  completedAt: timestamp("completedAt"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 29. أرباح المستشارين
export const consultantEarnings = mysqlTable("consultantEarnings", {
  id: int("id").autoincrement().primaryKey(),
  consultantId: int("consultantId").notNull(),
  bookingId: int("bookingId").notNull(),
  
  // المبالغ
  totalAmount: int("totalAmount").notNull(), // إجمالي المبلغ المدفوع
  platformCommission: int("platformCommission").notNull(), // عمولة المنصة
  consultantEarning: int("consultantEarning").notNull(), // صافي ربح المستشار
  commissionRate: int("commissionRate").notNull(), // نسبة العمولة المطبقة
  
  // حالة الدفع
  payoutStatus: mysqlEnum("payoutStatus", [
    "pending", // في انتظار الدفع
    "processing", // قيد المعالجة
    "paid", // تم الدفع
    "cancelled" // ملغى
  ]).default("pending").notNull(),
  
  payoutMethod: varchar("payoutMethod", { length: 50 }), // "bank_transfer", "wallet", etc.
  payoutTransactionId: varchar("payoutTransactionId", { length: 255 }),
  payoutDate: timestamp("payoutDate"),
  payoutNotes: text("payoutNotes"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 30. توفر المستشارين (جدول الأوقات)
export const consultantAvailability = mysqlTable("consultantAvailability", {
  id: int("id").autoincrement().primaryKey(),
  consultantId: int("consultantId").notNull(),
  
  dayOfWeek: mysqlEnum("dayOfWeek", ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]).notNull(),
  startTime: varchar("startTime", { length: 10 }).notNull(), // "09:00"
  endTime: varchar("endTime", { length: 10 }).notNull(), // "17:00"
  
  isAvailable: boolean("isAvailable").default(true).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// 31. الأيام المحظورة (إجازات المستشارين)
export const consultantBlockedDates = mysqlTable("consultantBlockedDates", {
  id: int("id").autoincrement().primaryKey(),
  consultantId: int("consultantId").notNull(),
  
  blockedDate: date("blockedDate").notNull(),
  reason: text("reason"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// 32. تقييمات المستشارين
export const consultantReviews = mysqlTable("consultantReviews", {
  id: int("id").autoincrement().primaryKey(),
  consultantId: int("consultantId").notNull(),
  bookingId: int("bookingId").notNull().unique(),
  clientId: int("clientId").notNull(),
  
  rating: int("rating").notNull(), // من 1 إلى 5
  review: text("review"),
  
  // تقييمات فرعية
  professionalismRating: int("professionalismRating"), // الاحترافية
  communicationRating: int("communicationRating"), // التواصل
  knowledgeRating: int("knowledgeRating"), // المعرفة
  timelinessRating: int("timelinessRating"), // الالتزام بالوقت
  
  isPublished: boolean("isPublished").default(true).notNull(),
  
  // رد المستشار
  consultantResponse: text("consultantResponse"),
  respondedAt: timestamp("respondedAt"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Types
export type Consultant = typeof consultants.$inferSelect;
export type InsertConsultant = typeof consultants.$inferInsert;
export type ConsultantDocument = typeof consultantDocuments.$inferSelect;
export type InsertConsultantDocument = typeof consultantDocuments.$inferInsert;
export type Specialization = typeof specializations.$inferSelect;
export type InsertSpecialization = typeof specializations.$inferInsert;
export type ConsultationType = typeof consultationTypes.$inferSelect;
export type InsertConsultationType = typeof consultationTypes.$inferInsert;
export type ConsultationBooking = typeof consultationBookings.$inferSelect;
export type InsertConsultationBooking = typeof consultationBookings.$inferInsert;
export type ConsultantEarning = typeof consultantEarnings.$inferSelect;
export type InsertConsultantEarning = typeof consultantEarnings.$inferInsert;
export type ConsultantAvailability = typeof consultantAvailability.$inferSelect;
export type InsertConsultantAvailability = typeof consultantAvailability.$inferInsert;
export type ConsultantBlockedDate = typeof consultantBlockedDates.$inferSelect;
export type InsertConsultantBlockedDate = typeof consultantBlockedDates.$inferInsert;
export type ConsultantReview = typeof consultantReviews.$inferSelect;
export type InsertConsultantReview = typeof consultantReviews.$inferInsert;

// 33. رسائل الاستشارات (Consultation Messages)
export const consultationMessages = mysqlTable("consultationMessages", {
  id: int("id").autoincrement().primaryKey(),
  bookingId: int("bookingId").notNull(), // ربط مع consultationBookings
  
  // المرسل
  senderId: int("senderId").notNull(), // userId
  senderType: mysqlEnum("senderType", ["client", "consultant"]).notNull(),
  
  // المحتوى
  message: text("message").notNull(),
  attachments: text("attachments"), // JSON array of file URLs
  
  // حالة القراءة
  isRead: boolean("isRead").default(false).notNull(),
  readAt: timestamp("readAt"),
  
  // AI assistance (للمستشار فقط)
  isAiAssisted: boolean("isAiAssisted").default(false).notNull(),
  aiSuggestion: text("aiSuggestion"), // الاقتراح الأصلي من AI
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ConsultationMessage = typeof consultationMessages.$inferSelect;
export type InsertConsultationMessage = typeof consultationMessages.$inferInsert;


// ============================================
// PDPL Compliance Tables (نظام حماية البيانات الشخصية السعودي)
// ============================================

// 34. الموافقات (User Consents)
export const userConsents = mysqlTable("userConsents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  policyVersion: varchar("policyVersion", { length: 50 }).notNull(), // مثال: "PP-1.0-2025"
  consentedAt: timestamp("consentedAt").defaultNow().notNull(),
  withdrawnAt: timestamp("withdrawnAt"),
  ipAddress: varchar("ipAddress", { length: 45 }), // IPv6 support
  userAgent: text("userAgent"),
});

export type UserConsent = typeof userConsents.$inferSelect;
export type InsertUserConsent = typeof userConsents.$inferInsert;

// 35. طلبات حقوق صاحب البيانات (Data Subject Requests)
export const dataSubjectRequests = mysqlTable("dataSubjectRequests", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["access", "correct", "delete", "withdraw", "object"]).notNull(),
  payloadJson: text("payloadJson"), // تفاصيل الطلب
  status: mysqlEnum("status", ["new", "in_progress", "done", "rejected"]).default("new").notNull(),
  adminNotes: text("adminNotes"), // ملاحظات الأدمن
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  closedAt: timestamp("closedAt"),
});

export type DataSubjectRequest = typeof dataSubjectRequests.$inferSelect;
export type InsertDataSubjectRequest = typeof dataSubjectRequests.$inferInsert;

// 36. سياسات الاحتفاظ (Retention Policies)
export const retentionPolicies = mysqlTable("retentionPolicies", {
  id: int("id").autoincrement().primaryKey(),
  resource: varchar("resource", { length: 100 }).notNull().unique(), // users, uploads, logs, analytics
  retentionDays: int("retentionDays").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RetentionPolicy = typeof retentionPolicies.$inferSelect;
export type InsertRetentionPolicy = typeof retentionPolicies.$inferInsert;

// 37. سجلات الاحتفاظ (Retention Logs)
export const retentionLogs = mysqlTable("retentionLogs", {
  id: int("id").autoincrement().primaryKey(),
  resource: varchar("resource", { length: 100 }).notNull(),
  recordsDeleted: int("recordsDeleted").notNull(),
  executedAt: timestamp("executedAt").defaultNow().notNull(),
});

export type RetentionLog = typeof retentionLogs.$inferSelect;
export type InsertRetentionLog = typeof retentionLogs.$inferInsert;

// 38. حوادث الأمن (Security Incidents)
export const securityIncidents = mysqlTable("securityIncidents", {
  id: int("id").autoincrement().primaryKey(),
  detectedAt: timestamp("detectedAt").notNull(),
  reportedToSdaiaAt: timestamp("reportedToSdaiaAt"),
  reportedToUsersAt: timestamp("reportedToUsersAt"),
  description: text("description").notNull(),
  cause: text("cause"),
  affectedDataCategories: text("affectedDataCategories"), // JSON array
  affectedUsersCount: int("affectedUsersCount"),
  riskLevel: mysqlEnum("riskLevel", ["low", "medium", "high"]).notNull(),
  status: mysqlEnum("status", ["new", "investigating", "reported", "resolved"]).default("new").notNull(),
  isLate: boolean("isLate").default(false).notNull(), // تجاوز 72 ساعة
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SecurityIncident = typeof securityIncidents.$inferSelect;
export type InsertSecurityIncident = typeof securityIncidents.$inferInsert;

// 39. نقل البيانات (Data Transfers)
export const dataTransfers = mysqlTable("dataTransfers", {
  id: int("id").autoincrement().primaryKey(),
  customerId: int("customerId"), // null = platform-level
  legalBasis: mysqlEnum("legalBasis", [
    "adequacy",
    "scc",
    "explicit_consent",
    "vital_interest",
    "central_processing"
  ]).notNull(),
  destinationCountry: varchar("destinationCountry", { length: 2 }).notNull(), // ISO country code
  dataCategories: text("dataCategories"), // JSON array
  riskAssessmentRef: varchar("riskAssessmentRef", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type DataTransfer = typeof dataTransfers.$inferSelect;
export type InsertDataTransfer = typeof dataTransfers.$inferInsert;

// 40. أنشطة المعالجة (Processing Activities - ROPA)
export const processingActivities = mysqlTable("processingActivities", {
  id: int("id").autoincrement().primaryKey(),
  controllerId: int("controllerId"), // userId أو null للمنصة
  purpose: varchar("purpose", { length: 255 }).notNull(), // consulting, doc_generation, kb_upload
  dataCategories: text("dataCategories"), // JSON array: employees, hr_docs
  legalBasis: varchar("legalBasis", { length: 100 }).notNull(),
  recipients: text("recipients"), // من يستلم البيانات
  retentionPeriod: varchar("retentionPeriod", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProcessingActivity = typeof processingActivities.$inferSelect;
export type InsertProcessingActivity = typeof processingActivities.$inferInsert;

// 41. تحديث جدول Companies لإضافة حقول PDPL
// (سيتم تحديثه في migration منفصل)

// 42. إعدادات PDPL للعملاء
export const customerPdplSettings = mysqlTable("customerPdplSettings", {
  id: int("id").autoincrement().primaryKey(),
  customerId: int("customerId").notNull().unique(),
  processingRole: mysqlEnum("processingRole", ["controller", "processor"]).default("controller").notNull(),
  dataStorageLocation: mysqlEnum("dataStorageLocation", ["SA", "EU", "Other"]).default("SA").notNull(),
  allowAiTraining: boolean("allowAiTraining").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CustomerPdplSetting = typeof customerPdplSettings.$inferSelect;
export type InsertCustomerPdplSetting = typeof customerPdplSettings.$inferInsert;
