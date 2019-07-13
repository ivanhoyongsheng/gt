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

// const sql = mysql.createConnection(options);

const sql = mysql.createPool(options);
// sql.connect((err) => {
//   if (err) {
//     console.error('An error occurred while connecting to the database');
//     throw err;
//   }
// });

export default sql;

