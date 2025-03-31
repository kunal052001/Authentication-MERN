const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require('../models/models');

// Register a new user
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Login an existing user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Email or password not matched" });
        }

        const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true }).json({ 
            message: "Login successful", 
            token,
            user: {
                id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email
            }
        });
    } catch (err) {
        console.error("Something went wrong", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Logout the user
const logout = (req, res) => {
    res.clearCookie("token").json({ message: "Logout successful" });
};

// Get current user
const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { register, login, logout, getCurrentUser };