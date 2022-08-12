const { Router } = require("express");

const teamsRouter = Router();

const { updateStats, deleteTeam,createTeam,getAll,getTeam } = require("./controller");

teamsRouter.get("/getTeam/:managerid",getTeam);
teamsRouter.get("/getAll",getAll);
teamsRouter.post("/createTeam",createTeam);
teamsRouter.delete("/deleteTeam/:id",deleteTeam);
teamsRouter.put("/updateStats/:id",updateStats);


module.exports = teamsRouter;