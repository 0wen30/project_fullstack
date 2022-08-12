const { Schema, model } = require("mongoose");

const equipoSchema = new Schema({
    nombre:{type: String,required:true},
    propietario: { type: Schema.Types.ObjectId, ref: 'user',required:true},
    victorias:{type:Number,default:0},
    empates:{type:Number,default:0},
    derrotas:{type:Number,default:0},
    golesanotados:{type:Number,default:0},
    golesrecibidos:{type:Number,default:0}
});

module.exports = model("equipo", equipoSchema);
