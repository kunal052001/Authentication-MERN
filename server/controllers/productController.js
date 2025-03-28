const Product = require("../models/Product");

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const product = await Product.create({ name, price, quantity });
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { 
            new: true,
            runValidators: true
        });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Buy product (increase stock)
const buyProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        product.quantity += Number(quantity);
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error updating stock" });
    }
};

// Sell product (decrease stock)
const sellProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        if (product.quantity < quantity) {
            return res.status(400).json({ message: "Not enough stock available" });
        }
        
        product.quantity -= Number(quantity);
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error updating stock" });
    }
};

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    buyProduct,
    sellProduct
};