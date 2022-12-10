require('dotenv').config();

const config = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME || 'bank-account-management',
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
};

const testConfig = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: `${process.env.MYSQL_DB_NAME}-test` || 'bank-account-management-test',
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
}

module.exports = {
  development: config,
  test: testConfig,
  production: config,
};
