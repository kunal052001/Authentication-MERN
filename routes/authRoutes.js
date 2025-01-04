const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../models/user');

const router = express.Router();


router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.redirect('/auth/register?error=user_exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashedPassword });
        res.redirect('/auth/login');
    } catch (err) {
        res.redirect('/auth/register?error=server_error');
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.redirect('/auth/login?error=user_not_found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.redirect('/auth/login?error=invalid_credentials');

        const token = jwt.sign({ email: user.email }, 'shhhhhhhhhhhh', { expiresIn: '1h' });
        res.cookie('token', token).redirect('/auth/dashboard');
    } catch (err) {
        res.redirect('/auth/login?error=server_error');
    }
});


router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../public/login.html')));
router.get('/register', (req, res) => res.sendFile(path.join(__dirname, '../public/register.html')));
router.get('/dashboard', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/auth/login');
    try {
        jwt.verify(token, 'shhhhhhhhhhhh');
        res.sendFile(path.join(__dirname, '../public/dashboard.html'));
    } catch {
        res.redirect('/auth/login');
    }
});


router.get('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.redirect('/auth/login');
});

module.exports = router;
