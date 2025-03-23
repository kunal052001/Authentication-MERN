const mongoose = require('mongoose');

const DBconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};

module.exports = DBconnect;
