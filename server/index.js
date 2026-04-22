const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { seedTopGames } = require('./services/seedGames');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('WhatUpdate API is running!');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/games', require('./routes/games'));
app.use('/api/updates', require('./routes/updates'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);

    });
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });