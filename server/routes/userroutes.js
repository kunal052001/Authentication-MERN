const express=require("express")

const router=express.Router();

const {registeruser,loginuser,logoutuser}=require("../controllers/userCotroller")

router.post("/Register",registeruser);
router.post("/login",loginuser);
router.get("/logout",logoutuser);

module.exports=router;