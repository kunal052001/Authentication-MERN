const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const DBconnect = require("./config/Db");

// Route imports
const productRoutes = require("./routes/productRoutes");

dotenv.config();
DBconnect();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// Routes - maintaining the exact endpoints your frontend expects
app.use("/", productRoutes); // This will handle all the existing frontend routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});