const Team = require("./model");

const getAll = async(req,res) => {
    try {
        const teams = await Team.find();
        const datos = teams.map(datos=>({
            id:datos._id,
            name:datos.name,
            win:datos.win,
            draw:datos.draw,
            loss:datos.loss,
            goals:datos.goals,
            goalsAgainst:datos.goalsAgainst
        }))
        return res.json(datos)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getTeam = async(req,res) => {
    try {
        const {name,win,draw,loss,goals,goalsAgainst} = await Team.find({manager:req.params.managerid});
        console.log(req.params.managerid)
        return res.json({name,win,draw,loss,goals,goalsAgainst});
    } catch (error) {
        return res.status(500).json(error)
    }
}

const createTeam = async(req,res) => {
    try {
        const {name,manager} = req.body;
        if(!(name&&manager)) return res.status(400).json({msg:"Faltan datos"})
        const team = await Team.create({name,manager});
        return res.json(team);   
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateStats = async(req,res) => {
    const {jg=0,je=0,jp=0,gf=0,gc=0} = req.body
    try {
        const team = await Team.findById(req.params.id);
        team.win += jg
        team.draw += je
        team.loss += jp
        team.goals += gf
        team.goalsAgainst += gc
        const result = await team.save();
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteTeam = async(req,res) => {
    try {
        const result = await Team.findByIdAndDelete(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { updateStats, deleteTeam,createTeam,getAll,getTeam }