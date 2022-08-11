const { Router } = require("express");
const { refreshToken } = require("../middlewares/auth");

const userRouter = Router();

const { ingresar, registrar } = require("./controlador");

userRouter.post("/registrar",registrar);

userRouter.post("/ingresar", ingresar);

userRouter.get('/refresh', refreshToken);

module.exports = userRouter;