const Equipo = require("./modelo");

const mostrarTodos = async(req,res) => {
    try {
        const equipos = await Equipo.find();
        const datos = equipos.map(datos=>({
            id:datos._id,
            nombre:datos.nombre,
            victorias:datos.victorias,
            empates:datos.empates,
            derrotas:datos.derrotas,
            golesanotados:datos.golesanotados,
            golesrecibidos:datos.golesrecibidos
        }))
        return res.json(datos)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const traerEquipo = async(req,res) => {
    try {
        const {nombre,victorias,empates,derrotas,golesanotados,golesrecibidos} = await Equipo.findById(req.params.propietarioid);
        return res.json({nombre,victorias,empates,derrotas,golesanotados,golesrecibidos});
    } catch (error) {
        return res.status(500).json(error)
    }
}

const crear = async(req,res) => {
    try {
        const {nombre,propietario} = req.body;
        if(!(nombre&&propietario)) return res.status(400).json({msg:"Faltan datos"})
        const equipo = await Equipo.create({nombre,propietario});
        return res.json(equipo);   
    } catch (error) {
        return res.status(500).json(error)
    }
}

const actualizar = async(req,res) => {
    const {jg=0,je=0,jp=0,gf=0,gc=0} = req.body
    try {
        const equipo = await Equipo.findById(req.params.id);
        equipo.victorias += jg
        equipo.empates += je
        equipo.derrotas += jp
        equipo.golesanotados += gf
        equipo.golesrecibidos += gc
        const resultado = await equipo.save();
        return res.json(resultado);
    } catch (error) {
        return res.status(500).json(error)
    }
}

const eliminar = async(req,res) => {
    try {
        const resultado = await Equipo.findByIdAndDelete(req.params.id);
        return res.json(resultado);
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { crear, eliminar,traerEquipo,mostrarTodos,actualizar }