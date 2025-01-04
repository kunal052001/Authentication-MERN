const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;


connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', authRoutes);


app.get('/', (req, res) => res.redirect('/auth/login'));


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
