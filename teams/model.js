const { Schema, model } = require("mongoose");

const teamSchema = new Schema({
    name:{type: String,required:true},
    manager: { type: Schema.Types.ObjectId, ref: 'user',required:true},
    win:{type:Number,default:0},
    draw:{type:Number,default:0},
    loss:{type:Number,default:0},
    goals:{type:Number,default:0},
    goalsAgainst:{type:Number,default:0}
});

module.exports = model("team", teamSchema);
