#!/usr/bin/env node

/**
 * Database Connection Test Script
 * سكريبت اختبار الاتصال بقاعدة البيانات
 * 
 * يختبر الاتصال بقاعدة البيانات ويتحقق من جميع الوظائف الأساسية
 * Run with: node scripts/test-database-connection.mjs
 */

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.cyan}━━━ ${msg} ━━━${colors.reset}\n`),
};

/**
 * Test database connection
 */
async function testDatabaseConnection() {
  log.section('1. Testing Database Connection - اختبار الاتصال بقاعدة البيانات');

  const DATABASE_URL = process.env.DATABASE_URL;

  if (!DATABASE_URL) {
    log.error('DATABASE_URL environment variable is not set');
    log.info('Please set DATABASE_URL in your environment or .env file');
    return false;
  }

  log.info('DATABASE_URL found in environment');

  try {
    // Create connection
    const connection = await mysql.createConnection(DATABASE_URL);
    log.success('Successfully connected to MySQL database');

    // Test ping
    await connection.ping();
    log.success('Database ping successful');

    // Get server version
    const [rows] = await connection.query('SELECT VERSION() as version');
    log.success(`MySQL Version: ${rows[0].version}`);

    // Get current database
    const [dbRows] = await connection.query('SELECT DATABASE() as db');
    log.success(`Current Database: ${dbRows[0].db || 'None selected'}`);

    await connection.end();
    return true;
  } catch (error) {
    log.error(`Connection failed: ${error.message}`);
    return false;
  }
}

/**
 * Test database tables
 */
async function testDatabaseTables() {
  log.section('2. Testing Database Tables - اختبار جداول قاعدة البيانات');

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);

    // Check if tables exist
    const requiredTables = [
      'users',
      'consultants',
      'consultationBookings',
      'consultationTypes',
      'specializations',
      'templates',
      'passwords',
    ];

    const [tables] = await connection.query('SHOW TABLES');
    const tableNames = tables.map(row => Object.values(row)[0]);

    log.info(`Found ${tableNames.length} tables in database`);

    for (const table of requiredTables) {
      if (tableNames.includes(table)) {
        log.success(`Table '${table}' exists`);
      } else {
        log.warning(`Table '${table}' NOT found`);
      }
    }

    await connection.end();
    return true;
  } catch (error) {
    log.error(`Tables check failed: ${error.message}`);
    return false;
  }
}

/**
 * Test user operations
 */
async function testUserOperations() {
  log.section('3. Testing User Operations - اختبار عمليات المستخدمين');

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);

    // Count users
    const [countResult] = await connection.query('SELECT COUNT(*) as count FROM users');
    const userCount = countResult[0].count;
    log.success(`Found ${userCount} users in database`);

    // Get sample user (if exists)
    const [users] = await connection.query('SELECT id, name, email, role FROM users LIMIT 1');
    if (users.length > 0) {
      log.success('Sample user retrieved successfully');
      log.info(`  ID: ${users[0].id}`);
      log.info(`  Name: ${users[0].name || 'N/A'}`);
      log.info(`  Email: ${users[0].email || 'N/A'}`);
      log.info(`  Role: ${users[0].role || 'user'}`);
    } else {
      log.warning('No users found in database');
    }

    await connection.end();
    return true;
  } catch (error) {
    log.error(`User operations test failed: ${error.message}`);
    return false;
  }
}

/**
 * Test consultants
 */
async function testConsultants() {
  log.section('4. Testing Consultants - اختبار المستشارين');

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);

    // Count consultants
    const [countResult] = await connection.query('SELECT COUNT(*) as count FROM consultants');
    const consultantCount = countResult[0].count;
    log.success(`Found ${consultantCount} consultants in database`);

    // Count by status
    const [statusCounts] = await connection.query(
      'SELECT status, COUNT(*) as count FROM consultants GROUP BY status'
    );

    if (statusCounts.length > 0) {
      log.info('Consultants by status:');
      for (const row of statusCounts) {
        log.info(`  ${row.status}: ${row.count}`);
      }
    }

    await connection.end();
    return true;
  } catch (error) {
    log.error(`Consultants test failed: ${error.message}`);
    return false;
  }
}

/**
 * Test consultation bookings
 */
async function testConsultationBookings() {
  log.section('5. Testing Consultation Bookings - اختبار حجوزات الاستشارات');

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);

    // Count bookings
    const [countResult] = await connection.query('SELECT COUNT(*) as count FROM consultationBookings');
    const bookingCount = countResult[0].count;
    log.success(`Found ${bookingCount} consultation bookings in database`);

    // Count by status
    const [statusCounts] = await connection.query(
      'SELECT status, COUNT(*) as count FROM consultationBookings GROUP BY status'
    );

    if (statusCounts.length > 0) {
      log.info('Bookings by status:');
      for (const row of statusCounts) {
        log.info(`  ${row.status}: ${row.count}`);
      }
    }

    await connection.end();
    return true;
  } catch (error) {
    log.error(`Consultation bookings test failed: ${error.message}`);
    return false;
  }
}

/**
 * Test templates
 */
async function testTemplates() {
  log.section('6. Testing Templates - اختبار القوالب');

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);

    // Count templates
    const [countResult] = await connection.query('SELECT COUNT(*) as count FROM templates WHERE isActive = 1');
    const templateCount = countResult[0].count;
    log.success(`Found ${templateCount} active templates in database`);

    // Count by category
    const [categoryCounts] = await connection.query(
      'SELECT category, COUNT(*) as count FROM templates WHERE isActive = 1 GROUP BY category'
    );

    if (categoryCounts.length > 0) {
      log.info('Templates by category:');
      for (const row of categoryCounts) {
        log.info(`  ${row.category}: ${row.count}`);
      }
    }

    await connection.end();
    return true;
  } catch (error) {
    log.error(`Templates test failed: ${error.message}`);
    return false;
  }
}

/**
 * Test database performance
 */
async function testDatabasePerformance() {
  log.section('7. Testing Database Performance - اختبار أداء قاعدة البيانات');

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL);

    // Test simple query performance
    const start = Date.now();
    await connection.query('SELECT 1');
    const duration = Date.now() - start;

    log.success(`Simple query executed in ${duration}ms`);

    if (duration < 100) {
      log.success('Database response time is excellent (< 100ms)');
    } else if (duration < 500) {
      log.success('Database response time is good (< 500ms)');
    } else {
      log.warning(`Database response time is slow (${duration}ms)`);
    }

    await connection.end();
    return true;
  } catch (error) {
    log.error(`Performance test failed: ${error.message}`);
    return false;
  }
}

/**
 * Generate summary report
 */
function generateSummary(results) {
  log.section('Test Summary - ملخص الاختبارات');

  const totalTests = results.length;
  const passedTests = results.filter(r => r.passed).length;
  const failedTests = totalTests - passedTests;

  console.log(`Total Tests: ${totalTests}`);
  console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`);

  console.log('\nTest Results:');
  for (const result of results) {
    const icon = result.passed ? '✅' : '❌';
    console.log(`${icon} ${result.name}`);
  }

  if (failedTests === 0) {
    console.log(`\n${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}✅ All tests passed! Database is properly connected and working.${colors.reset}`);
    console.log(`${colors.green}✅ جميع الاختبارات نجحت! قاعدة البيانات متصلة وتعمل بشكل صحيح.${colors.reset}`);
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  } else {
    console.log(`\n${colors.red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.red}❌ Some tests failed. Please check the database connection.${colors.reset}`);
    console.log(`${colors.red}❌ بعض الاختبارات فشلت. يرجى التحقق من اتصال قاعدة البيانات.${colors.reset}`);
    console.log(`${colors.red}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
  }

  return failedTests === 0;
}

/**
 * Main test runner
 */
async function main() {
  console.log(`
${colors.cyan}╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║         Database Connection Test Suite                        ║
║         مجموعة اختبارات الاتصال بقاعدة البيانات               ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝${colors.reset}
`);

  const results = [];

  // Run all tests
  const tests = [
    { name: 'Database Connection', fn: testDatabaseConnection },
    { name: 'Database Tables', fn: testDatabaseTables },
    { name: 'User Operations', fn: testUserOperations },
    { name: 'Consultants', fn: testConsultants },
    { name: 'Consultation Bookings', fn: testConsultationBookings },
    { name: 'Templates', fn: testTemplates },
    { name: 'Database Performance', fn: testDatabasePerformance },
  ];

  for (const test of tests) {
    try {
      const passed = await test.fn();
      results.push({ name: test.name, passed });
    } catch (error) {
      log.error(`Unexpected error in ${test.name}: ${error.message}`);
      results.push({ name: test.name, passed: false });
    }
  }

  // Generate summary
  const allPassed = generateSummary(results);

  // Exit with appropriate code
  process.exit(allPassed ? 0 : 1);
}

// Run the tests
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
