const express = require('express');
const router = express.Router(); // like a mini version of app, handles routes specifically for auth
const bcrypt = require('bcryptjs'); // encrypts passwords
const jwt = require('jsonwebtoken'); // creates tokens
const User = require('../models/User'); // User model

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 *          1. Check if username already exists in database
 *          2. Encrypt the password using bcrypt before saving
 *          3. Save the new user to MongoDB
 *          4. Return a JWT token so the user is logged in immediately
 * @access  Public (no token required)
 * 
 * @body    { username, email, password }
 * @returns { token, username }
 * @errors  400 - Username already taken
 *          500 - Server error
 */

router.post('/register', async (req, res) => {
  console.log('Register hit!', req.body);
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken!' });
    }

    // Encrypt the password
    console.log('Encrypting password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    console.log('Creating user...');
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Create JWT token
    console.log('Creating token...');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, username: user.username });

  } catch (err) {
    console.log('ERROR:', err.message);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email or username already exists!' });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Login an existing user
 *          1. Find the user by username in the database
 *          2. Compare the password with the encrypted one in the database
 *          3. Return a JWT token if everything matches
 * @access  Public (no token required)
 * 
 * @body    { username, password }
 * @returns { token, username }
 * @errors  400 - User not found or wrong password
 *          500 - Server error
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password!' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ token, username: user.username });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;