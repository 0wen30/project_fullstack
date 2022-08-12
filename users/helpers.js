const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const encriptarPassword = async(password) => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
}

const validarPassword = async(pwdIngresado,pwdGuardado)=>{
    return await bcrypt.compare(pwdIngresado, pwdGuardado);
}


module.exports = {
    encriptarPassword,
    validarPassword
}