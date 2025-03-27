const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const DBconnect = require("./config/db");
const Product = require("./models/todomodel"); // Changed to uppercase Product to match usage

dotenv.config();
DBconnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.post("/createproduct", (req, res) => {
    const { name, price, quantity } = req.body;
    Product.create({ name, price, quantity })
        .then((val) => res.send(val))
        .catch((err) => res.send(err));
});

app.get("/displayproduct", (req, res) => {
    Product.find()
        .then((val) => res.json(val))
        .catch((err) => res.send(err));
});

app.put("/updateproduct/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete("/deleteproduct/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});