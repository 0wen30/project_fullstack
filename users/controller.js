const userModel = require("./model");
const { encryptPassword, validatePassword } = require("./helpers");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET } = process.env;

const signup = async (req, res) => {
    try {

        let { name, lastname, email, password } = req.body;
        if (!(email && password && name && lastname)) {
            return res.status(400).send("Todos los datos son requeridos");
        }

        const oldUser = await userModel.findOne({ email });
        if (oldUser) {
            return res.status(409).json({ error: "El usuario ya existe" });
        }

        password = await encryptPassword(password);

        const user = await userModel.create({ name, lastname, email, password });
        user.token = await jwt.sign({ id:user._id }, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

        res.status(201).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "algo ha ocurrido" });
    }
};

const signin = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).send("Usuario Invalido");

        const coincidePassword = await validatePassword(password, user.password);
        if (!coincidePassword) return res.status(400).send("Password Invalido");

        user.token = jwt.sign({ id:user._id }, ACCESS_TOKEN_SECRET, { expiresIn: '3m' });
        const refreshToken = jwt.sign({ id:user._id }, REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        res.cookie('refresh', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "algo ha ocurrido" });
    }
};

module.exports = {
    signin, signup
}