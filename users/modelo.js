const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    nombre: {type: String,required:true},
    apellido: {type: String,required:true},
    email: {type: String,required:true,unique:true},
    password: {type: String,required:true},
    token:{type:String}
});

module.exports = model("user", userSchema);
