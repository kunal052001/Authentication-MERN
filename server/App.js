const express=require("express")
const app=express()


app.get("/",(req,res)=>{
    res.send("hay this is server");
})

app.listen("5000",()=>{
    console.log("servver is running on port 5000")
})