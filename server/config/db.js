const mongoose=require("mongoose")
const DBconnect=async ()=>{
    try{
        await mongoose.connect("mongodb+srv://kunalsadashivpatil:kunalsadashivpatil@cluster-auth.yszuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-auth")

        console.log("database connected")

    }
    catch(err){
        console.log(err)
    }
}

module.exports=DBconnect;