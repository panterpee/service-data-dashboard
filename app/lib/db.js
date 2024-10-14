import mysql from "mysql2/promise";
// for db connect
let conn;
export async function connectToDatabase() {
  if (!conn) {
    conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "serviceData",
    });
  }
  return conn;
}
