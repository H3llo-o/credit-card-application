import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root", 
  password: "N33dpab4NgR0oo0t20260501",
  database: "credit_card_application",
});
