const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Environment variable for MongoDB URI
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// Mongoose connection
async function connectToMongo() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure code
    }
}

const app = express();

// Will allow the communication between two servers, which are running in the two diff ports.
app.use(cors());

// To handle json type data from client
app.use(express.json());

const todoRouter = require('./routes/todoRouter');
const categoryRouter = require('./routes/categoryRouter');

// Router which has all the endpoints
app.use(todoRouter);
app.use(categoryRouter);

connectToMongo().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
