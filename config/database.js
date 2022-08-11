const mongoose = require("mongoose");

const { DATABASE_URI } = process.env;

const conectarConBD = () => {
    mongoose.connect(DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("CONEXION ESTABLECIDA CON LA BASE DE DATOS DE MONGO");
    }).catch((error) => {
        console.log("ERROR AL CONECTAR CON LA BASE DE DATOS DE MONGO");
        console.error(error);
        process.exit(1);
    });
};

module.exports = { conectarConBD };