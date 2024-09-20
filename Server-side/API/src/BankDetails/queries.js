const GetLoginId = 'SELECT * FROM <Schema.TableName> WHERE account_number=$1';
const getDetails = 'SELECT * FROM <Schema.TableName>';
const checkCustomerExists = 'SELECT s FROM <Schema.TableName> s WHERE s.account_number = $1';
const AddDetails = 'INSERT INTO <Schema.TableName> (account_number, first_name, last_name, age, gender, phone_number, address, bank_account_type, date_of_account_opening, branch_code, password_hash) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11)';
const removeDetails = 'DELETE FROM <Schema.TableName> WHERE account_number=$1';
const updateDetails = `UPDATE <Schema.TableName> SET first_name = $2, last_name = $3, age = $4, gender = $5, phone_number = $6, address = $7, bank_account_type = $8, date_of_account_opening = $9, branch_code = $10 WHERE account_number = $1`;

module.exports = {
  GetLoginId,
  getDetails,
  checkCustomerExists,
  AddDetails,
  removeDetails,
  updateDetails,
};
