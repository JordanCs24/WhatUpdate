const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

/**
 * @route   POST /api/games/save
 * @desc    Save the games a user selected
 *          1. Find the user by their ID from the JWT token
 *          2. Update their games array in MongoDB
 * @access  Private (token required)
 * 
 * @body    { userId, games }
 * @returns { message, games }
 * @errors  404 - User not found
 *          500 - Server error
 */
router.post('/save', verifyToken, async (req, res) => {
    console.log('SAVE ROUTE HIT');
    console.log('Headers:', req.headers);
  try {
    const { games } = req.body;
    const userId = req.userId;
    console.log('Save games - userId:', userId);
    console.log('Save games - games:', games);

    const user = await User.findByIdAndUpdate(
        userId,
        { games },
        { returnDocument: 'after' }  // replace { new: true } with this
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.status(200).json({ message: 'Games saved!', games: user.games });

  } catch (err) {
    console.log('ERROR:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/**
 * @route   GET /api/games
 * @desc    Get the games a user has saved
 *          1. verifyToken middleware extracts user ID from JWT token
 *          2. Find the user by their ID and return their games array
 * @access  Private (token required)
 * 
 * @returns { games }
 * @errors  404 - User not found
 *          500 - Server error
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    console.log('GET games - user:', user);
    console.log('GET games - games:', user?.games);

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.status(200).json({ games: user.games });

  } catch (err) {
    console.log('ERROR:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = router;