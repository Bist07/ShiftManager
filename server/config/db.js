import mariadb from 'mariadb';
import fs from 'fs';  // Import fs for reading the certificate file
import dotenv from 'dotenv';
dotenv.config();

// Create a connection pool to MariaDB
export const pool = mariadb.createPool({
    host: process.env.DB_HOST,      // Use the environment variable for host
    user: process.env.DB_USER,      // Use the environment variable for user
    password: process.env.DB_PASSWORD,  // Use the environment variable for password
    database: process.env.DB_NAME,  // Use the environment variable for database
    connectionLimit: 10,             // Number of connections in the pool
    ssl: {
        ca: fs.readFileSync('../server/us-east-2-bundle.pem'),  // Ensure the path is correct
    }
});


// Use async/await for queries
export async function query(sql, params, transaction = null) {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(sql, params, transaction);
        return result;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}