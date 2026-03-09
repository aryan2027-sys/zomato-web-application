const mongoose = require("mongoose")

const foodItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodPartner"
    }
},{timestamps:true})

const foodItemModel = mongoose.model("foodItem",foodItemSchema)
module.exports = foodItemModel