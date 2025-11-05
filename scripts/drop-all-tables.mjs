import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set");
  process.exit(1);
}

(async function dropAll() {
  const conn = await mysql.createConnection(DATABASE_URL);
  try {
    console.log("Disabling foreign key checks");
    await conn.query("SET FOREIGN_KEY_CHECKS=0");

    const [tables] = await conn.query("SHOW TABLES");
    if (!tables || tables.length === 0) {
      console.log("No tables to drop");
      await conn.end();
      return;
    }

    const key = Object.keys(tables[0])[0];
    for (const r of tables) {
      const tbl = r[key];
      try {
        console.log("Dropping", tbl);
        await conn.query(`DROP TABLE IF EXISTS \`${tbl}\``);
      } catch (err) {
        console.error("Failed to drop", tbl, err.message || err);
      }
    }

    await conn.query("SET FOREIGN_KEY_CHECKS=1");
    console.log("All tables dropped");
  } catch (err) {
    console.error("Error during drop:", err.message || err);
    process.exitCode = 1;
  } finally {
    await conn.end();
  }
})();
