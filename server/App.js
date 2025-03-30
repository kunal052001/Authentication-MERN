const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const DBconnect = require("./config/db");
const Product = require("./models/Product");

dotenv.config();
DBconnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// Product routes
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

// Stock management routes
app.put("/buy/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const product = await Product.findById(id);
        product.quantity += Number(quantity);
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error updating stock" });
    }
});

app.put("/sell/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const product = await Product.findById(id);
        
        if (product.quantity < quantity) {
            return res.status(400).json({ message: "Not enough stock available" });
        }
        
        product.quantity -= Number(quantity);
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error updating stock" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});