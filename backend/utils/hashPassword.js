const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword, saltRounds = 10) => {
    //Now hashing the password using bcrypt
    //First, we need to generate salt
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword.trim(), salt);

    return hashedPassword;
}

module.exports = hashPassword;