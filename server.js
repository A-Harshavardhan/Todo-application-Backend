const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Connecting express with mongodb using mongoose library
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to mongodb successfully'));

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

app.listen('5000', () => console.log('Server started at port 5000.'));