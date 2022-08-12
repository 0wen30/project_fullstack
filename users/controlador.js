const userModel = require("./modelo");
const { crearToken, encriptarPassword, validarPassword } = require("./helpers");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET } = process.env;

const registrar = async (req, res) => {
    try {

        let { nombre, apellido, email, password } = req.body;
        if (!(email && password && nombre && apellido)) {
            return res.status(400).send("Todos los datos son requeridos");
        }

        const oldUser = await userModel.findOne({ email });
        if (oldUser) {
            return res.status(409).json({ error: "El usuario ya existe" });
        }

        password = await encriptarPassword(password);

        const user = await userModel.create({ nombre, apellido, email, password });
        user.token = await crearToken(user._id, ACCESS_TOKEN_SECRET);

        res.status(201).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "algo ha ocurrido" });
    }
};

const ingresar = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).send("Usuario Invalido");

        const {id} = user;
        const coincidePassword = await validarPassword(password, user.password);
        if (!coincidePassword) return res.status(400).send("Password Invalido");

        user.token = jwt.sign({ id }, ACCESS_TOKEN_SECRET, { expiresIn: '3m' });
        //res.cookie('token', user.token, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 180 * 1000 });
        const refreshToken = jwt.sign({ id }, REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        res.cookie('refresh', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "algo ha ocurrido" });
    }
};

module.exports = {
    registrar,
    ingresar
}