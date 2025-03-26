const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const DBconnect = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
const product=require("./models/todomodel")

dotenv.config();
DBconnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// app.use("/", authRoutes);

app.post("/createproduct",(req,res)=>{
    const {name,price,quantity}=req.body;
       product.create(name,price,quantity)
       .then((val)=>res.send(val))
       .catch((err)=>res.send(err))
})
app.get("/getproduct",(req,res)=>{
    proguct.
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
