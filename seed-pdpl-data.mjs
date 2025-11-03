import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

console.log("🔒 إضافة بيانات PDPL الأولية...\n");

// سياسات الاحتفاظ الافتراضية
const policiesData = [
  {
    resource: "users",
    retentionDays: 1825, // 5 سنوات
    description: "الاحتفاظ ببيانات المستخدمين لمدة 5 سنوات بعد آخر نشاط",
  },
  {
    resource: "uploads",
    retentionDays: 1095, // 3 سنوات
    description: "الاحتفاظ بالملفات المرفوعة لمدة 3 سنوات",
  },
  {
    resource: "logs",
    retentionDays: 180, // 6 أشهر
    description: "الاحتفاظ بسجلات النظام لمدة 6 أشهر",
  },
  {
    resource: "analytics",
    retentionDays: 365, // سنة واحدة
    description: "الاحتفاظ ببيانات التحليلات لمدة سنة واحدة",
  },
  {
    resource: "audit_logs",
    retentionDays: 730, // سنتان
    description: "الاحتفاظ بسجلات التدقيق لمدة سنتين (متطلب أمني)",
  },
  {
    resource: "generated_documents",
    retentionDays: 1095, // 3 سنوات
    description: "الاحتفاظ بالمستندات المولّدة لمدة 3 سنوات",
  },
];

try {
  // إضافة سياسات الاحتفاظ
  for (const policy of policiesData) {
    try {
      await connection.query(
        'INSERT INTO retentionPolicies (resource, retentionDays, description) VALUES (?, ?, ?)',
        [policy.resource, policy.retentionDays, policy.description]
      );
      console.log(`✅ سياسة الاحتفاظ: ${policy.resource} - ${policy.retentionDays} يوم`);
    } catch (error) {
      // تجاهل خطأ التكرار
      if (error.code !== 'ER_DUP_ENTRY') {
        throw error;
      }
      console.log(`⚠️  سياسة موجودة مسبقاً: ${policy.resource}`);
    }
  }

  console.log("\n🎉 تم إضافة جميع البيانات الأولية بنجاح!");
  
} catch (error) {
  console.error("❌ خطأ:", error);
  process.exit(1);
} finally {
  await connection.end();
}
