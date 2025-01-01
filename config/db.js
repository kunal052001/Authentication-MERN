const mongoose = require('mongoose');

const connectDB = async () => {
    try {
       
        await mongoose.connect('mongodb+srv://kunalsadashivpatil:nKxBjcXNwzs8LoxH@cluster-auth.yszuj.mongodb.net/authtestapp?retryWrites=true&w=majority', {
           
        });
        console.log('MongoDB Atlas connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
