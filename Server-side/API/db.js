const { Pool } = require('pg');
const { db } = require('./src/BankDetails/config');

const pool = new Pool(db);

module.exports = pool;
