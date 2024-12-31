const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Updated MongoDB Atlas connection string without deprecated options
        await mongoose.connect('mongodb+srv://kunalsadashivpatil:nKxBjcXNwzs8LoxH@cluster-auth.yszuj.mongodb.net/authtestapp?retryWrites=true&w=majority', {
            // No need for `useNewUrlParser` and `useUnifiedTopology` as they are no longer necessary
        });
        console.log('MongoDB Atlas connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
