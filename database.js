import mysql from "mysql2/promise"
export const db_conn = mysql.createPool({
  host: "localhost",
  user: "mobile-hour-user",
  password: "password",
  database: "mobile-hour",
});

