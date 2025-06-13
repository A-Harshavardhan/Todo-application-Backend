const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config(); // This loads the .env file

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

// Start the Express server only after a successful connection to MongoDB
connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
