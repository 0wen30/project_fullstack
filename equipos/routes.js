const { Router } = require("express");

const equiposRouter = Router();

const { crear, eliminar, traerEquipo, mostrarTodos, actualizar } = require("./controlador");

equiposRouter.get("/traerEquipo/:propietarioid",traerEquipo);
equiposRouter.get("/mostrarTodos",mostrarTodos);
equiposRouter.post("/crear",crear);
equiposRouter.delete("/eliminar/:id",eliminar);
equiposRouter.put("/actualizar/:id",actualizar);


module.exports = equiposRouter;