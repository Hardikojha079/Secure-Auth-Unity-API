const bcrypt = require('bcryptjs');

const plainPasswords = [
    'password1', 'password2', 'password3', 'password4', 'password5',
    'password6', 'password7', 'password8', 'password9', 'password10'
];

const saltRounds = 10;

plainPasswords.forEach(async (plainPassword, index) => {
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    console.log(`Hashed password ${index + 1}: ${hash}`);
});
