const { Router } = require("express");

const userRouter = Router();

const { signin, signup } = require("./controller");

userRouter.post("/signup",signup);

userRouter.post("/signin",signin);

module.exports = userRouter;