const { Router } = require("express");

const userRouter = Router();

const { ingresar, registrar } = require("./controlador");

userRouter.post("/registrar",registrar);

userRouter.post("/ingresar", ingresar);

module.exports = userRouter;