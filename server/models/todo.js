const mongoose=require("mongoose")

const todoSchema=new mongoose.Schema({
    task:{type:String}
})
module.exports=mongoose.model("Todo",todoSchema)