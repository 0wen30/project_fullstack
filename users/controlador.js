const userModel = require("./modelo");
const { crearToken, encriptarPassword, validarPassword } = require("./helpers");
const jwt = require("jsonwebtoken");

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
        user.token = await crearToken(user._id, res);

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
        if (!user) {
            return res.status(400).send("Usuario Invalido");
        }

        const {id} = user;

        const coincidePassword = await validarPassword(password, user.password);
        if (coincidePassword) {
            user.token = await crearToken(id);

            const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

            return res.status(200).json(user);
        }

        res.status(400).send("Password Invalido");

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "algo ha ocurrido" });
    }
};

const refresh = (req, res) => {
    if (req.cookies?.jwt) {
        const refreshToken = req.cookies.jwt;

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(406).json({ message: 'Unauthorized' });
            }
            else {
                const id = decoded.id;
                const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
                return res.json({ accessToken });
            }
        })
    } else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
}

module.exports = {
    registrar,
    ingresar,
    refresh
}