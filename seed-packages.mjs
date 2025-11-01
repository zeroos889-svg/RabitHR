import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const packagesData = [
  {
    name: 'استشارة سريعة - 15 دقيقة',
    nameEn: 'Quick Consultation - 15 min',
    description: 'استشارة سريعة للإجابة على سؤال محدد أو توضيح نقطة قانونية',
    descriptionEn: 'Quick consultation to answer a specific question or clarify a legal point',
    duration: 15,
    slaHours: 24,
    priceSAR: 200,
    features: JSON.stringify([
      'رد خلال 24 ساعة',
      'استشارة مركزة',
      'إجابة على سؤال واحد',
      'توضيح قانوني',
    ]),
    orderIndex: 1,
  },
  {
    name: 'مراجعة مستند - 30 دقيقة',
    nameEn: 'Document Review - 30 min',
    description: 'مراجعة مستند أو عقد عمل والتأكد من مطابقته لنظام العمل السعودي',
    descriptionEn: 'Review a document or employment contract and ensure compliance with Saudi labor law',
    duration: 30,
    slaHours: 48,
    priceSAR: 400,
    features: JSON.stringify([
      'رد خلال 48 ساعة',
      'مراجعة شاملة للمستند',
      'تقرير بالملاحظات',
      'توصيات للتحسين',
    ]),
    orderIndex: 2,
  },
  {
    name: 'استشارة شاملة - 60 دقيقة',
    nameEn: 'Comprehensive Consultation - 60 min',
    description: 'استشارة شاملة لحالة معقدة أو مشكلة تحتاج دراسة تفصيلية',
    descriptionEn: 'Comprehensive consultation for complex cases requiring detailed analysis',
    duration: 60,
    slaHours: 72,
    priceSAR: 750,
    features: JSON.stringify([
      'رد خلال 72 ساعة',
      'دراسة تفصيلية للحالة',
      'تقرير مكتوب شامل',
      'خطة عمل موصى بها',
      'متابعة لمدة أسبوع',
    ]),
    orderIndex: 3,
  },
];

console.log('🌱 Seeding consulting packages...');

for (const pkg of packagesData) {
  const query = `
    INSERT INTO consultingPackages (name, nameEn, description, descriptionEn, duration, slaHours, priceSAR, features, isActive, orderIndex)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      nameEn = VALUES(nameEn),
      description = VALUES(description),
      descriptionEn = VALUES(descriptionEn),
      duration = VALUES(duration),
      slaHours = VALUES(slaHours),
      priceSAR = VALUES(priceSAR),
      features = VALUES(features),
      orderIndex = VALUES(orderIndex)
  `;
  
  await connection.execute(query, [
    pkg.name,
    pkg.nameEn,
    pkg.description,
    pkg.descriptionEn,
    pkg.duration,
    pkg.slaHours,
    pkg.priceSAR,
    pkg.features,
    pkg.orderIndex,
  ]);
  
  console.log(`✅ ${pkg.name}`);
}

console.log('✅ Consulting packages seeded successfully!');
await connection.end();
process.exit(0);
