import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);

// تحديث متطلبات كل نوع استشارة
const updates = [
  {
    code: 'labor-dispute',
    requiredDocuments: JSON.stringify([
      { nameAr: 'عقد العمل', nameEn: 'Employment Contract', required: true, description: 'نسخة من عقد العمل الحالي' },
      { nameAr: 'المراسلات', nameEn: 'Correspondence', required: true, description: 'جميع المراسلات المتعلقة بالنزاع' },
      { nameAr: 'الشكوى أو الإنذار', nameEn: 'Complaint or Warning', required: false, description: 'إن وجد' },
    ]),
    requiredInfo: JSON.stringify([
      { nameAr: 'وصف النزاع', nameEn: 'Dispute Description', type: 'textarea', required: true },
      { nameAr: 'تاريخ بدء النزاع', nameEn: 'Dispute Start Date', type: 'date', required: true },
      { nameAr: 'الإجراءات المتخذة', nameEn: 'Actions Taken', type: 'textarea', required: false },
    ])
  },
  {
    code: 'policy-review',
    requiredDocuments: JSON.stringify([
      { nameAr: 'السياسات الحالية', nameEn: 'Current Policies', required: true, description: 'ملف PDF للسياسات الحالية' },
      { nameAr: 'دليل الموظف', nameEn: 'Employee Handbook', required: false, description: 'إن وجد' },
    ]),
    requiredInfo: JSON.stringify([
      { nameAr: 'عدد الموظفين', nameEn: 'Number of Employees', type: 'number', required: true },
      { nameAr: 'المجالات المطلوب مراجعتها', nameEn: 'Areas to Review', type: 'textarea', required: true },
    ])
  },
  {
    code: 'recruitment-strategy',
    requiredDocuments: JSON.stringify([
      { nameAr: 'الهيكل التنظيمي', nameEn: 'Org Chart', required: true, description: 'الهيكل التنظيمي الحالي' },
      { nameAr: 'ميزانية التوظيف', nameEn: 'Recruitment Budget', required: false, description: 'إن وجدت' },
    ]),
    requiredInfo: JSON.stringify([
      { nameAr: 'عدد الوظائف المطلوبة', nameEn: 'Number of Positions', type: 'number', required: true },
      { nameAr: 'الإطار الزمني', nameEn: 'Timeline', type: 'text', required: true },
      { nameAr: 'التحديات الحالية', nameEn: 'Current Challenges', type: 'textarea', required: true },
    ])
  },
  {
    code: 'training-program',
    requiredDocuments: JSON.stringify([
      { nameAr: 'تقييم الاحتياجات التدريبية', nameEn: 'Training Needs Assessment', required: false, description: 'إن وجد' },
    ]),
    requiredInfo: JSON.stringify([
      { nameAr: 'عدد المتدربين', nameEn: 'Number of Trainees', type: 'number', required: true },
      { nameAr: 'المهارات المستهدفة', nameEn: 'Target Skills', type: 'textarea', required: true },
      { nameAr: 'الميزانية المتاحة', nameEn: 'Available Budget', type: 'number', required: false },
    ])
  },
  {
    code: 'compensation-structure',
    requiredDocuments: JSON.stringify([
      { nameAr: 'جدول الرواتب الحالي', nameEn: 'Current Salary Scale', required: true, description: 'نسخة مشفرة من جدول الرواتب' },
      { nameAr: 'سياسة المزايا', nameEn: 'Benefits Policy', required: false, description: 'إن وجدت' },
    ]),
    requiredInfo: JSON.stringify([
      { nameAr: 'عدد الموظفين', nameEn: 'Number of Employees', type: 'number', required: true },
      { nameAr: 'القطاع', nameEn: 'Industry', type: 'text', required: true },
      { nameAr: 'الميزانية السنوية', nameEn: 'Annual Budget', type: 'number', required: false },
    ])
  },
  {
    code: 'performance-system',
    requiredDocuments: JSON.stringify([
      { nameAr: 'نظام التقييم الحالي', nameEn: 'Current Appraisal System', required: false, description: 'إن وجد' },
    ]),
    requiredInfo: JSON.stringify([
      { nameAr: 'عدد الموظفين', nameEn: 'Number of Employees', type: 'number', required: true },
      { nameAr: 'دورة التقييم المرغوبة', nameEn: 'Desired Review Cycle', type: 'select', options: ['شهري', 'ربع سنوي', 'نصف سنوي', 'سنوي'], required: true },
    ])
  },
  {
    code: 'compliance-audit',
    requiredDocuments: JSON.stringify([
      { nameAr: 'السياسات والإجراءات', nameEn: 'Policies & Procedures', required: true, description: 'جميع السياسات الحالية' },
      { nameAr: 'عقود العمل النموذجية', nameEn: 'Sample Employment Contracts', required: true, description: 'نماذج العقود المستخدمة' },
    ]),
    requiredInfo: JSON.stringify([
      { nameAr: 'عدد الموظفين', nameEn: 'Number of Employees', type: 'number', required: true },
      { nameAr: 'آخر تدقيق', nameEn: 'Last Audit Date', type: 'date', required: false },
    ])
  },
  {
    code: 'org-restructuring',
    requiredDocuments: JSON.stringify([
      { nameAr: 'الهيكل التنظيمي الحالي', nameEn: 'Current Org Structure', required: true, description: 'الهيكل الحالي بالتفصيل' },
      { nameAr: 'الوصف الوظيفي', nameEn: 'Job Descriptions', required: false, description: 'للوظائف الرئيسية' },
    ]),
    requiredInfo: JSON.stringify([
      { nameAr: 'سبب إعادة الهيكلة', nameEn: 'Restructuring Reason', type: 'textarea', required: true },
      { nameAr: 'الأهداف المرجوة', nameEn: 'Desired Outcomes', type: 'textarea', required: true },
    ])
  },
  {
    code: 'saudization-plan',
    requiredDocuments: JSON.stringify([
      { nameAr: 'بيانات نطاقات', nameEn: 'Nitaqat Data', required: true, description: 'تقرير نطاقات الحالي' },
      { nameAr: 'قائمة الموظفين', nameEn: 'Employee List', required: true, description: 'بيانات الموظفين الحاليين' },
    ]),
    requiredInfo: JSON.stringify([
      { nameAr: 'النطاق الحالي', nameEn: 'Current Nitaqat Band', type: 'select', options: ['أحمر', 'أصفر', 'أخضر منخفض', 'أخضر متوسط', 'أخضر مرتفع', 'بلاتيني'], required: true },
      { nameAr: 'النطاق المستهدف', nameEn: 'Target Band', type: 'select', options: ['أخضر منخفض', 'أخضر متوسط', 'أخضر مرتفع', 'بلاتيني'], required: true },
    ])
  },
  {
    code: 'hr-analytics',
    requiredDocuments: JSON.stringify([
      { nameAr: 'بيانات الموظفين', nameEn: 'Employee Data', required: true, description: 'ملف Excel ببيانات الموظفين' },
    ]),
    requiredInfo: JSON.stringify([
      { nameAr: 'المؤشرات المطلوبة', nameEn: 'Required KPIs', type: 'textarea', required: true },
      { nameAr: 'الفترة الزمنية', nameEn: 'Time Period', type: 'text', required: true },
    ])
  },
];

try {
  for (const update of updates) {
    await connection.execute(
      `UPDATE consultationTypes 
       SET requiredDocuments = ?, requiredInfo = ? 
       WHERE code = ?`,
      [update.requiredDocuments, update.requiredInfo, update.code]
    );
  }
  
  console.log('✅ تم تحديث متطلبات الاستشارات بنجاح!');
  console.log(`✅ تم تحديث ${updates.length} نوع استشارة`);
} catch (error) {
  console.error('❌ خطأ في تحديث المتطلبات:', error);
  process.exit(1);
} finally {
  await connection.end();
}
