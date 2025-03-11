const express = require('express');
const app = express();
const connectDB = require("./config/db");
connectDB();  

const cors=require('cors');

const login =require("../client/auth/components/Login")
const user=require("./Models/user")


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.post("/login",(req,res)=>{
       const {name,email,password}=req.body; 
       bcrypt.hash(password, 10, function(err, hash) {
       const newUser=  user.create({name,email,password:hash})
       res.send(newUser);})
})


app.post("/logout",(req,res)=>{
    const {email,password}=req.body;
          const user = user.findOne({ email: email });
          if(!user) return res.send("user not fount")

          bcrypt.compare(password,user.password,function(err,result){
            if(result){
                let token=jwt.sign({email:user.email},"shhhhhhhhhhhhhh");
                res.cokie("token",token)
                res.send("you are login ")
            }
          })
})

app.get("/logout",(req,res)=>{
    res.cookie(" ")
    res.send("you are logout")
    res.redirect("/Login")
})


const PORT = 5000;  
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
