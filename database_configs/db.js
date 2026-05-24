import mysql from "mysql2/promise";

let connection;
export const db_connect = async () => {
  if (!connection) {
    connection = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
  }
  return connection;
}

