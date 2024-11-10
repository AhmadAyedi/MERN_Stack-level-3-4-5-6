/*const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://ayediahmad0work:mernchatapp123@mernchat-yt-user.j21fivr.mongodb.net/mernchat-yt-user?retryWrites=true&w=majority&appName=mernchat-yt-user', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

connectDB();
*/


/*const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://ayediahmad0work:mernchatapp123@mernchat-yt-user.j21fivr.mongodb.net/mernchat-yt-user?retryWrites=true&w=majority&appName=mernchat-yt-user', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

connectDB();
*/


// Importing the Mongoose library to interact with MongoDB.
const mongoose = require('mongoose');

// Defining an asynchronous function to connect to the MongoDB database.
async function connectDB() {
    try {
        // Attempting to connect to the MongoDB database using Mongoose.
        await mongoose.connect('mongodb+srv://ayediahmad0work:mernchatapp123@mernchat-yt-user.j21fivr.mongodb.net/mernchat-yt-user?retryWrites=true&w=majority&appName=mernchat-yt-user', {
            useNewUrlParser: true, // Using the new MongoDB connection string parser (recommended).
            useUnifiedTopology: true // Using the new server discovery and monitoring engine (recommended).
        });
        
        // If the connection is successful, log a success message to the console.
        console.log('Database connected successfully');
    } catch (error) {
        // If an error occurs during connection, log the error message to the console.
        console.error('Database connection error:', error);
    }
}

// Calling the connectDB function to initiate the database connection when the script runs.
connectDB();
