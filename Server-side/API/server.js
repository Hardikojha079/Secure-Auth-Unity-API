require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./src/BankDetails/auth');
const { serverPort } = require('./src/BankDetails/config');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/BankDetails', authRoutes);

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});
