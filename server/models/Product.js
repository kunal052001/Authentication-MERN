const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({

    name:String,
    price:Number,
    quantity:Number

})

module.exports=mongoose.model("product",productSchema)
