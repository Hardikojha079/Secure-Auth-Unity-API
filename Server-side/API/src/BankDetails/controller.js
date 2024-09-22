const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../../db');
const queries = require('./queries');
const config = require('./config');

const mapRowstoObjects = (rows) => {
  if (!rows.length) return [];
  const columns = Object.keys(rows[0]);
  return rows.map(row => {
    const obj = {};
    columns.forEach(column => {
      obj[column] = row[column];
    });
    return obj;
  });
};

const checkCustomerExists = async (account_number) => {
  try {
    const result = await pool.query(queries.checkCustomerExists, [account_number]);
    return result.rows.length > 0;
  } catch (error) {
    throw new Error('Database error while checking customer existence.');
  }
};

const GetLoginId = async (req, res) => {
  const { account_number, password } = req.body;
  try {
    const result = await pool.query(queries.GetLoginId, [account_number]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
  }
    if (result.rowCount > 0) {
      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (isMatch) {
        const token = jwt.sign({ account_number: user.account_number }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ success: true, token });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials!' });
      }
    } else {
      res.status(404).json({ success: false, message: 'No matching records found!' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error!' });
  }
};

const getDetails = async (req, res) => {
  try {
    const result = await pool.query(queries.getDetails);
    const data = mapRowstoObjects(result.rows);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error!' });
  }
};

const AddDetails = async (req, res) => {
  const { account_number, first_name, last_name, age, gender, phone_number, address, bank_account_type, date_of_account_opening, branch_code } = req.body;

  if (!account_number || !first_name || !last_name || !age || !gender || !phone_number || !address || !bank_account_type || !date_of_account_opening || !branch_code) {
    return res.status(400).json({ success: false, message: 'Missing Required Details!' });
  }

  try {
    const exists = await checkCustomerExists(account_number);
    if (exists) {
      return res.status(409).json({ success: false, message: 'Customer already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, config.bcryptSaltRounds);
    await pool.query(queries.AddDetails, [account_number, first_name, last_name, age, gender, phone_number, address, bank_account_type, date_of_account_opening, branch_code, hashedPassword]);
    res.status(201).json({ success: true, message: 'Details Added Successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error!' });
  }
};

const removeDetails = async (req, res) => {
  const account_number = parseInt(req.params.account_number);
  try {
    const exists = await checkCustomerExists(account_number);
    if (!exists) {
      return res.status(404).json({ success: false, message: 'Customer Data does not exist in the database!' });
    }

    await pool.query(queries.removeDetails, [account_number]);
    res.status(200).json({ success: true, message: 'Details Removed Successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error!' });
  }
};

const updateDetails = async (req, res) => {
  const account_number = parseInt(req.params.account_number);
  const { first_name, last_name, age, gender, phone_number, address, bank_account_type, date_of_account_opening, branch_code } = req.body;

  try {
    const exists = await checkCustomerExists(account_number);
    if (!exists) {
      return res.status(404).json({ success: false, message: 'Customer Data does not exist in the database!' });
    }

    await pool.query(queries.updateDetails, [account_number, first_name, last_name, age, gender, phone_number, address, bank_account_type, date_of_account_opening, branch_code]);
    res.status(200).json({ success: true, message: 'Details Updated Successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error!' });
  }
};

module.exports = {
  getDetails,
  AddDetails,
  removeDetails,
  updateDetails,
  GetLoginId,
};
