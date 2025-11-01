import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const templateData = [
  // خطابات التوظيف
  {
    code: 'offer_letter',
    titleAr: 'خطاب عرض عمل',
    titleEn: 'Job Offer Letter',
    category: 'employment',
    aiPrompt: 'اكتب خطاب عرض عمل رسمي يتضمن المسمى الوظيفي، الراتب، المزايا، تاريخ البدء، وشروط العمل.',
  },
  {
    code: 'employment_contract',
    titleAr: 'عقد عمل',
    titleEn: 'Employment Contract',
    category: 'employment',
    aiPrompt: 'اكتب عقد عمل رسمي متوافق مع نظام العمل السعودي يتضمن جميع البنود القانونية المطلوبة.',
  },
  {
    code: 'appointment_letter',
    titleAr: 'خطاب تعيين',
    titleEn: 'Appointment Letter',
    category: 'employment',
    aiPrompt: 'اكتب خطاب تعيين رسمي يؤكد قبول الموظف في الوظيفة.',
  },
  
  // الشهادات
  {
    code: 'salary_certificate',
    titleAr: 'شهادة راتب',
    titleEn: 'Salary Certificate',
    category: 'certificates',
    aiPrompt: 'اكتب شهادة راتب رسمية للبنوك تتضمن المسمى الوظيفي والراتب الشهري.',
  },
  {
    code: 'experience_certificate',
    titleAr: 'شهادة خبرة',
    titleEn: 'Experience Certificate',
    category: 'certificates',
    aiPrompt: 'اكتب شهادة خبرة رسمية تتضمن مدة العمل والمهام والإنجازات.',
  },
  {
    code: 'employment_verification',
    titleAr: 'شهادة تعريف بالراتب',
    titleEn: 'Employment Verification',
    category: 'certificates',
    aiPrompt: 'اكتب شهادة تعريف بالراتب للجهات الرسمية.',
  },
  
  // خطابات داخلية
  {
    code: 'promotion_letter',
    titleAr: 'خطاب ترقية',
    titleEn: 'Promotion Letter',
    category: 'internal',
    aiPrompt: 'اكتب خطاب ترقية يهنئ الموظف ويوضح المنصب الجديد والراتب.',
  },
  {
    code: 'transfer_letter',
    titleAr: 'خطاب نقل',
    titleEn: 'Transfer Letter',
    category: 'internal',
    aiPrompt: 'اكتب خطاب نقل موظف إلى قسم أو فرع آخر.',
  },
  {
    code: 'warning_letter',
    titleAr: 'خطاب إنذار',
    titleEn: 'Warning Letter',
    category: 'disciplinary',
    aiPrompt: 'اكتب خطاب إنذار رسمي يوضح المخالفة والعواقب.',
  },
  
  // إنهاء الخدمة
  {
    code: 'termination_letter',
    titleAr: 'خطاب إنهاء خدمة',
    titleEn: 'Termination Letter',
    category: 'termination',
    aiPrompt: 'اكتب خطاب إنهاء خدمة رسمي يوضح السبب وتاريخ الإنهاء.',
  },
  {
    code: 'resignation_acceptance',
    titleAr: 'خطاب قبول استقالة',
    titleEn: 'Resignation Acceptance',
    category: 'termination',
    aiPrompt: 'اكتب خطاب قبول استقالة موظف وتحديد آخر يوم عمل.',
  },
  {
    code: 'end_of_service_clearance',
    titleAr: 'خطاب مخالصة نهائية',
    titleEn: 'End of Service Clearance',
    category: 'termination',
    aiPrompt: 'اكتب خطاب مخالصة نهائية يوضح المستحقات المالية.',
  },
];

console.log('🌱 Seeding templates...');

for (const template of templateData) {
  const query = `
    INSERT INTO templates (code, titleAr, titleEn, category, aiPrompt, isActive)
    VALUES (?, ?, ?, ?, ?, 1)
    ON DUPLICATE KEY UPDATE
      titleAr = VALUES(titleAr),
      titleEn = VALUES(titleEn),
      category = VALUES(category),
      aiPrompt = VALUES(aiPrompt)
  `;
  
  await connection.execute(query, [
    template.code,
    template.titleAr,
    template.titleEn,
    template.category,
    template.aiPrompt,
  ]);
  
  console.log(`✅ ${template.titleAr}`);
}

console.log('✅ Templates seeded successfully!');
await connection.end();
process.exit(0);
