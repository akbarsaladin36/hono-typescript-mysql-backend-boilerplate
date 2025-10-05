import mysql from "mysql2/promise"
import { config } from "dotenv"

config()

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

const checkConnection = async () => {
    let conn
    try {
        conn = await connection.getConnection();
        await conn.ping();
        console.log('✅ Database connected successfully');
    } catch (err: unknown) {
        console.error('❌ Database connection failed:', err instanceof Error ? err.message : err);
        process.exit(1);
    } finally {
        if (conn) conn.release();
    }
}

checkConnection()

export default connection
