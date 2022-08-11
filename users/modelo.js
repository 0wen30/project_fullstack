const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    nombre: { 
        type: String, 
        default: null 
    },
    apellido: { 
        type: String, 
        default: null },
    email: { 
        type: String, 
        unique: true 
    },
    password: { 
        type: String 
    },
    token: { 
        type: String 
    }
});

module.exports = model("user", userSchema);
