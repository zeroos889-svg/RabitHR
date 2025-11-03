import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set');
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection);

console.log('🌱 Seeding consulting data...\n');

// التخصصات (Specializations)
const specializations = [
  {
    code: 'labor-relations',
    nameAr: 'علاقات العمالة',
    nameEn: 'Labor Relations',
    descriptionAr: 'إدارة علاقات العمل والنزاعات العمالية وفقاً لنظام العمل السعودي',
    descriptionEn: 'Managing labor relations and disputes according to Saudi Labor Law',
    icon: 'Users',
    color: '#3B82F6',
    orderIndex: 1,
  },
  {
    code: 'policies-procedures',
    nameAr: 'السياسات والإجراءات',
    nameEn: 'Policies & Procedures',
    descriptionAr: 'تطوير وتحديث سياسات وإجراءات الموارد البشرية',
    descriptionEn: 'Developing and updating HR policies and procedures',
    icon: 'FileText',
    color: '#8B5CF6',
    orderIndex: 2,
  },
  {
    code: 'recruitment',
    nameAr: 'التوظيف والاستقطاب',
    nameEn: 'Recruitment & Talent Acquisition',
    descriptionAr: 'استراتيجيات التوظيف واستقطاب الكفاءات',
    descriptionEn: 'Recruitment strategies and talent acquisition',
    icon: 'UserPlus',
    color: '#10B981',
    orderIndex: 3,
  },
  {
    code: 'training-development',
    nameAr: 'التدريب والتطوير',
    nameEn: 'Training & Development',
    descriptionAr: 'تصميم وتنفيذ برامج التدريب والتطوير المهني',
    descriptionEn: 'Designing and implementing training and professional development programs',
    icon: 'GraduationCap',
    color: '#F59E0B',
    orderIndex: 4,
  },
  {
    code: 'compensation-benefits',
    nameAr: 'التعويضات والمزايا',
    nameEn: 'Compensation & Benefits',
    descriptionAr: 'تصميم أنظمة الرواتب والمزايا والحوافز',
    descriptionEn: 'Designing salary, benefits, and incentive systems',
    icon: 'DollarSign',
    color: '#EF4444',
    orderIndex: 5,
  },
  {
    code: 'performance-management',
    nameAr: 'إدارة الأداء',
    nameEn: 'Performance Management',
    descriptionAr: 'أنظمة تقييم ومتابعة أداء الموظفين',
    descriptionEn: 'Employee performance evaluation and monitoring systems',
    icon: 'TrendingUp',
    color: '#06B6D4',
    orderIndex: 6,
  },
  {
    code: 'legal-compliance',
    nameAr: 'الامتثال القانوني',
    nameEn: 'Legal Compliance',
    descriptionAr: 'التأكد من الامتثال لأنظمة العمل والتأمينات الاجتماعية',
    descriptionEn: 'Ensuring compliance with labor and social insurance regulations',
    icon: 'Scale',
    color: '#EC4899',
    orderIndex: 7,
  },
  {
    code: 'organizational-development',
    nameAr: 'التطوير التنظيمي',
    nameEn: 'Organizational Development',
    descriptionAr: 'تطوير الهياكل التنظيمية وثقافة المؤسسة',
    descriptionEn: 'Developing organizational structures and corporate culture',
    icon: 'Building2',
    color: '#6366F1',
    orderIndex: 8,
  },
  {
    code: 'saudization',
    nameAr: 'السعودة والتوطين',
    nameEn: 'Saudization & Localization',
    descriptionAr: 'استراتيجيات السعودة والامتثال لنطاقات',
    descriptionEn: 'Saudization strategies and Nitaqat compliance',
    icon: 'Flag',
    color: '#14B8A6',
    orderIndex: 9,
  },
  {
    code: 'hr-analytics',
    nameAr: 'تحليلات الموارد البشرية',
    nameEn: 'HR Analytics',
    descriptionAr: 'تحليل بيانات الموارد البشرية واتخاذ القرارات',
    descriptionEn: 'HR data analysis and decision-making',
    icon: 'BarChart3',
    color: '#F97316',
    orderIndex: 10,
  },
];

// أنواع الاستشارات (Consultation Types)
const consultationTypes = [
  {
    code: 'labor-dispute',
    nameAr: 'استشارة نزاع عمالي',
    nameEn: 'Labor Dispute Consultation',
    descriptionAr: 'حل النزاعات العمالية والقضايا المتعلقة بالموظفين',
    descriptionEn: 'Resolving labor disputes and employee-related issues',
    basePriceSAR: 50000, // 500 ريال
    estimatedDuration: 60,
    relatedSpecializations: JSON.stringify(['labor-relations', 'legal-compliance']),
    icon: 'AlertTriangle',
    color: '#EF4444',
    features: JSON.stringify({
      ar: ['تحليل الحالة', 'استشارة قانونية', 'خطة حل', 'متابعة لمدة أسبوع'],
      en: ['Case analysis', 'Legal consultation', 'Solution plan', 'One week follow-up'],
    }),
    orderIndex: 1,
  },
  {
    code: 'policy-review',
    nameAr: 'مراجعة السياسات والإجراءات',
    nameEn: 'Policy & Procedure Review',
    descriptionAr: 'مراجعة وتحديث سياسات الموارد البشرية',
    descriptionEn: 'Reviewing and updating HR policies',
    basePriceSAR: 80000, // 800 ريال
    estimatedDuration: 90,
    relatedSpecializations: JSON.stringify(['policies-procedures', 'legal-compliance']),
    icon: 'FileCheck',
    color: '#8B5CF6',
    features: JSON.stringify({
      ar: ['مراجعة شاملة', 'تقرير مفصل', 'توصيات التحسين', 'نماذج محدثة'],
      en: ['Comprehensive review', 'Detailed report', 'Improvement recommendations', 'Updated templates'],
    }),
    orderIndex: 2,
  },
  {
    code: 'recruitment-strategy',
    nameAr: 'استراتيجية التوظيف',
    nameEn: 'Recruitment Strategy',
    descriptionAr: 'تطوير استراتيجية توظيف فعالة',
    descriptionEn: 'Developing an effective recruitment strategy',
    basePriceSAR: 100000, // 1000 ريال
    estimatedDuration: 120,
    relatedSpecializations: JSON.stringify(['recruitment', 'saudization']),
    icon: 'Target',
    color: '#10B981',
    features: JSON.stringify({
      ar: ['تحليل الاحتياجات', 'خطة استقطاب', 'قنوات التوظيف', 'مؤشرات الأداء'],
      en: ['Needs analysis', 'Attraction plan', 'Recruitment channels', 'KPIs'],
    }),
    orderIndex: 3,
  },
  {
    code: 'training-program',
    nameAr: 'تصميم برنامج تدريبي',
    nameEn: 'Training Program Design',
    descriptionAr: 'تصميم برنامج تدريبي مخصص',
    descriptionEn: 'Designing a customized training program',
    basePriceSAR: 120000, // 1200 ريال
    estimatedDuration: 120,
    relatedSpecializations: JSON.stringify(['training-development']),
    icon: 'BookOpen',
    color: '#F59E0B',
    features: JSON.stringify({
      ar: ['تحليل الفجوات', 'محتوى تدريبي', 'خطة التنفيذ', 'أدوات التقييم'],
      en: ['Gap analysis', 'Training content', 'Implementation plan', 'Evaluation tools'],
    }),
    orderIndex: 4,
  },
  {
    code: 'compensation-structure',
    nameAr: 'هيكل التعويضات والمزايا',
    nameEn: 'Compensation Structure',
    descriptionAr: 'تصميم هيكل رواتب ومزايا تنافسي',
    descriptionEn: 'Designing a competitive salary and benefits structure',
    basePriceSAR: 150000, // 1500 ريال
    estimatedDuration: 150,
    relatedSpecializations: JSON.stringify(['compensation-benefits']),
    icon: 'Wallet',
    color: '#EF4444',
    features: JSON.stringify({
      ar: ['دراسة السوق', 'هيكل الرواتب', 'حزمة المزايا', 'نظام الحوافز'],
      en: ['Market study', 'Salary structure', 'Benefits package', 'Incentive system'],
    }),
    orderIndex: 5,
  },
  {
    code: 'performance-system',
    nameAr: 'نظام إدارة الأداء',
    nameEn: 'Performance Management System',
    descriptionAr: 'تصميم نظام شامل لإدارة الأداء',
    descriptionEn: 'Designing a comprehensive performance management system',
    basePriceSAR: 130000, // 1300 ريال
    estimatedDuration: 120,
    relatedSpecializations: JSON.stringify(['performance-management']),
    icon: 'Award',
    color: '#06B6D4',
    features: JSON.stringify({
      ar: ['معايير الأداء', 'نماذج التقييم', 'خطط التحسين', 'نظام المكافآت'],
      en: ['Performance criteria', 'Evaluation forms', 'Improvement plans', 'Reward system'],
    }),
    orderIndex: 6,
  },
  {
    code: 'compliance-audit',
    nameAr: 'تدقيق الامتثال القانوني',
    nameEn: 'Compliance Audit',
    descriptionAr: 'تدقيق شامل للامتثال لأنظمة العمل',
    descriptionEn: 'Comprehensive audit for labor law compliance',
    basePriceSAR: 100000, // 1000 ريال
    estimatedDuration: 90,
    relatedSpecializations: JSON.stringify(['legal-compliance']),
    icon: 'ShieldCheck',
    color: '#EC4899',
    features: JSON.stringify({
      ar: ['تدقيق شامل', 'تقرير المخالفات', 'خطة التصحيح', 'متابعة شهرية'],
      en: ['Full audit', 'Violations report', 'Correction plan', 'Monthly follow-up'],
    }),
    orderIndex: 7,
  },
  {
    code: 'organizational-restructure',
    nameAr: 'إعادة الهيكلة التنظيمية',
    nameEn: 'Organizational Restructuring',
    descriptionAr: 'إعادة تصميم الهيكل التنظيمي',
    descriptionEn: 'Redesigning organizational structure',
    basePriceSAR: 200000, // 2000 ريال
    estimatedDuration: 180,
    relatedSpecializations: JSON.stringify(['organizational-development']),
    icon: 'Network',
    color: '#6366F1',
    features: JSON.stringify({
      ar: ['تحليل الهيكل الحالي', 'تصميم جديد', 'خطة الانتقال', 'إدارة التغيير'],
      en: ['Current structure analysis', 'New design', 'Transition plan', 'Change management'],
    }),
    orderIndex: 8,
  },
  {
    code: 'saudization-plan',
    nameAr: 'خطة السعودة والتوطين',
    nameEn: 'Saudization Plan',
    descriptionAr: 'تطوير خطة شاملة للسعودة',
    descriptionEn: 'Developing a comprehensive Saudization plan',
    basePriceSAR: 110000, // 1100 ريال
    estimatedDuration: 120,
    relatedSpecializations: JSON.stringify(['saudization', 'recruitment']),
    icon: 'Users2',
    color: '#14B8A6',
    features: JSON.stringify({
      ar: ['تحليل النطاق', 'خطة التوطين', 'برامج التدريب', 'استراتيجية الاستقطاب'],
      en: ['Nitaqat analysis', 'Localization plan', 'Training programs', 'Attraction strategy'],
    }),
    orderIndex: 9,
  },
  {
    code: 'hr-dashboard',
    nameAr: 'لوحة تحليلات الموارد البشرية',
    nameEn: 'HR Analytics Dashboard',
    descriptionAr: 'تصميم لوحة تحليلات ومؤشرات أداء',
    descriptionEn: 'Designing analytics dashboard and KPIs',
    basePriceSAR: 140000, // 1400 ريال
    estimatedDuration: 150,
    relatedSpecializations: JSON.stringify(['hr-analytics']),
    icon: 'LineChart',
    color: '#F97316',
    features: JSON.stringify({
      ar: ['تحديد المؤشرات', 'تصميم اللوحة', 'تكامل البيانات', 'تدريب المستخدمين'],
      en: ['KPI definition', 'Dashboard design', 'Data integration', 'User training'],
    }),
    orderIndex: 10,
  },
];

try {
  // إدراج التخصصات
  console.log('📌 Inserting specializations...');
  for (const spec of specializations) {
    await connection.execute(
      `INSERT INTO specializations 
      (code, nameAr, nameEn, descriptionAr, descriptionEn, icon, color, isActive, orderIndex, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE 
      nameAr = VALUES(nameAr), 
      nameEn = VALUES(nameEn),
      descriptionAr = VALUES(descriptionAr),
      descriptionEn = VALUES(descriptionEn),
      icon = VALUES(icon),
      color = VALUES(color),
      orderIndex = VALUES(orderIndex),
      updatedAt = NOW()`,
      [
        spec.code,
        spec.nameAr,
        spec.nameEn,
        spec.descriptionAr,
        spec.descriptionEn,
        spec.icon,
        spec.color,
        spec.orderIndex,
      ]
    );
  }
  console.log(`✅ Inserted ${specializations.length} specializations\n`);

  // إدراج أنواع الاستشارات
  console.log('📌 Inserting consultation types...');
  for (const type of consultationTypes) {
    await connection.execute(
      `INSERT INTO consultationTypes 
      (code, nameAr, nameEn, descriptionAr, descriptionEn, basePriceSAR, estimatedDuration, 
       relatedSpecializations, icon, color, features, isActive, orderIndex, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE 
      nameAr = VALUES(nameAr), 
      nameEn = VALUES(nameEn),
      descriptionAr = VALUES(descriptionAr),
      descriptionEn = VALUES(descriptionEn),
      basePriceSAR = VALUES(basePriceSAR),
      estimatedDuration = VALUES(estimatedDuration),
      relatedSpecializations = VALUES(relatedSpecializations),
      icon = VALUES(icon),
      color = VALUES(color),
      features = VALUES(features),
      orderIndex = VALUES(orderIndex),
      updatedAt = NOW()`,
      [
        type.code,
        type.nameAr,
        type.nameEn,
        type.descriptionAr,
        type.descriptionEn,
        type.basePriceSAR,
        type.estimatedDuration,
        type.relatedSpecializations,
        type.icon,
        type.color,
        type.features,
        type.orderIndex,
      ]
    );
  }
  console.log(`✅ Inserted ${consultationTypes.length} consultation types\n`);

  console.log('🎉 Seeding completed successfully!');
} catch (error) {
  console.error('❌ Error seeding data:', error);
  process.exit(1);
} finally {
  await connection.end();
  process.exit(0);
}
