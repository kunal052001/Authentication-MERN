const { Product, User } = require("../models/models");

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const product = await Product.create({ 
            name, 
            price, 
            quantity,
            createdBy: req.user.id 
        });
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all products for the logged-in user
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ createdBy: req.user.id });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a product (only if owned by user)
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        // First verify the product belongs to the user
        const product = await Product.findOne({ _id: id, createdBy: req.user.id });
        if (!product) {
            return res.status(404).json({ message: "Product not found or not authorized" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { 
            new: true,
            runValidators: true
        });
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a product (only if owned by user)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        // First verify the product belongs to the user
        const product = await Product.findOne({ _id: id, createdBy: req.user.id });
        if (!product) {
            return res.status(404).json({ message: "Product not found or not authorized" });
        }

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
        
        // First verify the product belongs to the user
        const product = await Product.findOne({ _id: id, createdBy: req.user.id });
        if (!product) {
            return res.status(404).json({ message: "Product not found or not authorized" });
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
        
        // First verify the product belongs to the user
        const product = await Product.findOne({ _id: id, createdBy: req.user.id });
        if (!product) {
            return res.status(404).json({ message: "Product not found or not authorized" });
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