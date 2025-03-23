// const express=require("express");
// const cors=require("cors")
// const connectDB =require("./config/db")
// const TODO=require("./models/todo")


// const app=express()

// connectDB()

// app.use(express.json())
// app.use(cors())

// app.post("/",(req,res)=>{
//     TODO.create(req.body)
//     .then((reso)=>res.json(reso))
//     .catch((err)=>res.json(err))

// })

// app.get("/",(req,res)=>{
//     TODO.find()
//     .then((resa)=>res.send(resa))
//     .catch((err)=>res.send(err))
// })
// app.delete("/delete/:id",(req,res)=>{
//     TODO.findOneAndDelete(req.params.id)
//     .then((reso)=>res.json(res))
//     .catch((err)=>res.json(err))
// })
// app.put("/update/:id", (req, res) => {
//     TODO.findByIdAndUpdate(req.params.id, { task: req.body.task }, { new: true })
//         .then((updatedTask) => res.json(updatedTask))
//         .catch((err) => res.json(err));
// });
// const PORT=5000;
// app.listen(PORT,()=>{
//     console.log(`server running on port localhost:${PORT}`)
// })
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authroutes');

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
