import { drizzle } from 'drizzle-orm/mysql2';
import { users, passwords } from '../drizzle/schema.js';
import bcrypt from 'bcryptjs';

const db = drizzle(process.env.DATABASE_URL);

async function seedTestUsers() {
  console.log('🌱 Seeding test users...');

  const testUsers = [
    {
      name: 'مدير النظام',
      email: 'admin@admin.com',
      password: 'admin',
      role: 'admin',
      userType: 'company', // admin doesn't have userType enum
      phoneNumber: '+966500000001',
      emailVerified: true,
      profileCompleted: true,
    },
    {
      name: 'شركة تجريبية',
      email: 'company@test.com',
      password: 'admin',
      role: 'user',
      userType: 'company',
      phoneNumber: '+966500000002',
      emailVerified: true,
      profileCompleted: true,
    },
    {
      name: 'مستشار تجريبي',
      email: 'consultant@test.com',
      password: 'admin',
      role: 'user',
      userType: 'individual', // consultant = individual in schema
      phoneNumber: '+966500000003',
      emailVerified: true,
      profileCompleted: true,
    },
    {
      name: 'موظف تجريبي',
      email: 'employee@test.com',
      password: 'admin',
      role: 'user',
      userType: 'employee',
      phoneNumber: '+966500000004',
      emailVerified: true,
      profileCompleted: true,
    },
  ];

  for (const userData of testUsers) {
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Insert user
      const [insertedUser] = await db.insert(users).values({
        name: userData.name,
        email: userData.email,
        role: userData.role,
        userType: userData.userType,
        phoneNumber: userData.phoneNumber,
        emailVerified: userData.emailVerified,
        profileCompleted: userData.profileCompleted,
        loginMethod: 'email',
      });

      // Insert password
      await db.insert(passwords).values({
        userId: insertedUser.insertId,
        passwordHash: hashedPassword,
      });

      console.log(`✅ Created user: ${userData.email} (${userData.userType})`);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        console.log(`⚠️  User already exists: ${userData.email}`);
      } else {
        console.error(`❌ Error creating user ${userData.email}:`, error.message);
      }
    }
  }

  console.log('✅ Test users seeding completed!');
  process.exit(0);
}

seedTestUsers().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
