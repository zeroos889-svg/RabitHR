import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

(async function createAdmin(){
  const conn = await mysql.createConnection(DATABASE_URL);
  try {
    const name = 'مدير النظام';
    const email = 'admin@admin.com';
    const phone = '+966500000001';
    const password = 'admin';
    const openId = 'admin-'+Date.now();

    const hashed = await bcrypt.hash(password, 10);

    const [res] = await conn.execute(
      `INSERT INTO users (openId, name, email, phoneNumber, loginMethod, role, userType, emailVerified, profileCompleted, createdAt, updatedAt, lastSignedIn) VALUES (?, ?, ?, ?, 'email', 'admin', 'company', 1, 1, NOW(), NOW(), NOW())`,
      [openId, name, email, phone]
    );

    const insertId = res.insertId || (res[0] && res[0].insertId);
    if (!insertId) {
      console.error('Failed to get inserted user id');
      process.exit(1);
    }

    await conn.execute(`INSERT INTO passwords (userId, passwordHash, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())`, [insertId, hashed]);

    console.log('✅ Admin user created:', email);
  } catch (err) {
    console.error('Failed to create admin:', err.message || err);
    process.exitCode = 1;
  } finally {
    await conn.end();
  }
})();
