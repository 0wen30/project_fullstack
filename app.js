require("dotenv").config();
require("./config/database").conectarConBD();

const express = require("express");
const cookieparser = require("cookie-parser");
const {validateToken, refreshToken} = require("./middlewares/auth");
const userRouter = require("./users/routes");
const teamsRouter = require("./teams/routes.js");

const app = express();

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

app.use("/user", userRouter);
app.use("/teams",validateToken,teamsRouter);

app.get('/refresh', refreshToken);
app.get("/home", validateToken, (req, res) => {
    res.status(200).send("Puedes acceder");
});

module.exports = app;