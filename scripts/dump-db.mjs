import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in environment');
  process.exit(1);
}

async function dump() {
  const outDir = path.resolve(process.cwd(), 'backups');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const outFile = path.join(outDir, `railway_dump_${ts}.sql`);
  const ws = fs.createWriteStream(outFile, { encoding: 'utf8' });

  const conn = await mysql.createConnection(DATABASE_URL);
  try {
    ws.write(`-- Dump of database from ${new Date().toISOString()}\n`);
    ws.write(`-- Host: ${conn.config.host}  Port: ${conn.config.port}\n\n`);

    // Get all tables
    const [tablesRows] = await conn.query("SHOW TABLES");
    const tableKey = Object.keys(tablesRows[0])[0];
    const tables = tablesRows.map(r => r[tableKey]);

    for (const tbl of tables) {
      ws.write(`\n-- ----------------------------\n`);
      ws.write(`-- Table structure for ${tbl}\n`);
      ws.write(`-- ----------------------------\n`);

      // DROP TABLE IF EXISTS
      ws.write(`DROP TABLE IF EXISTS \`${tbl}\`;\n`);

      // CREATE TABLE
      const [[createRow]] = await conn.query(`SHOW CREATE TABLE \`${tbl}\``);
      const createSql = createRow['Create Table'] || createRow['Create View'] || Object.values(createRow)[1];
      ws.write(createSql + ';\n\n');

      // Dump data
      ws.write(`-- ----------------------------\n`);
      ws.write(`-- Data for table ${tbl}\n`);
      ws.write(`-- ----------------------------\n`);

      const [rows] = await conn.query(`SELECT * FROM \`${tbl}\``);
      if (rows.length === 0) {
        ws.write(`-- (no rows)\n\n`);
        continue;
      }

      // Column names
      const cols = Object.keys(rows[0]);
      const colList = cols.map(c => `\`${c}\``).join(', ');

      // Write INSERTs in batches
      const batchSize = 100;
      for (let i = 0; i < rows.length; i += batchSize) {
        const chunk = rows.slice(i, i + batchSize);
        const values = chunk.map(r => {
          const vals = cols.map(c => {
            const v = r[c];
            if (v === null || v === undefined) return 'NULL';
            if (typeof v === 'number') return v;
            // escape single quotes and backslashes
            const s = String(v).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
            return `'${s}'`;
          });
          return `(${vals.join(', ')})`;
        }).join(',\n');

        ws.write(`INSERT INTO \`${tbl}\` (${colList}) VALUES\n${values};\n`);
      }
      ws.write('\n');
    }

    console.log('✅ Dump written to', outFile);
  } catch (err) {
    console.error('❌ Dump failed:', err.message || err);
    process.exitCode = 1;
  } finally {
    await conn.end();
    ws.end();
  }
}

dump();
