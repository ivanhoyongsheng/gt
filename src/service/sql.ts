import mysql from 'mysql2/promise';

const { DBUSER, DBPASSWORD, DBHOST, DBPORT, DBNAME } = process.env;

const options = {
  host: DBHOST || 'localhost',
  port: parseInt(DBPORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  user: DBUSER || 'root',
  password: DBPASSWORD || 'password',
  database: DBNAME || 'st_tc_db'
};

const sql = mysql.createPool(options);

export default sql;
