const bcrypt = require("bcryptjs");

const encryptPassword = async(password) => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
}

const validatePassword = async(pwdIn,savedPassword)=>{
    return await bcrypt.compare(pwdIn, savedPassword);
}


module.exports = {
    encryptPassword,
    validatePassword
}