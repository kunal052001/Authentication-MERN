const express = require('express');

const connectDB = require("./config/db");
connectDB();  

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hey, this is the server!");
});

const PORT = 5000;  
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
