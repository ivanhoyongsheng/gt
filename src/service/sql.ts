import mysql from 'mysql2/promise';

const DB_NAME = 'st_tc_db';

const { DBUSER, DBPASSWORD } = process.env;
const options = {
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  user: DBUSER || 'root',
  password: DBPASSWORD || 'password',
  database: DB_NAME
};

const sql = mysql.createPool(options);

export default sql;
