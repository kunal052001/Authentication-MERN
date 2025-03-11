const { hash } = require("bcrypt");
const user = require("../Models/user");


exports.registeruser= async (req,res)=>{

   const {name,email,password}=req.body;

  
   bcrypt.hash(password, 10, function(err, hash) {
    const newUser=  user.create({name,email,password:hash})
    res.send(newUser);
});   
}

exports.loginuser= async (req,res)=>{
   
          const {email,password}=req.body;
          const user = await user.findOne({ email: email });
          if(!user) return res.send("user not fount")

          bcrypt.compare(password,user.password,function(err,result){
            if(result){
                let token=jwt.sign({email:user.email},"shhhhhhhhhhhhhh");
                res.cokie("token",token)
                res.send("you are login ")
            }
          })
   
}

exports.logoutuser= async (req,res)=>{

         res.cookie(" ")
         res.send("you are logout")
         res.redirect("/Login")
}