require("dotenv").config();
require("./config/database").conectarConBD();

const express = require("express");
const cookieparser = require("cookie-parser");
const {validarToken} = require("./middlewares/auth");
const userRouter = require("./users/routes");

const app = express();

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

app.use("/", userRouter);

app.post("/home", validarToken, (req, res) => {
    res.status(200).send("Puedes acceder");
});

module.exports = app;