const express = require('express');
const router = express.Router();
const User = require('../models/User');

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
router.post('/save', async (req, res) => {
  try {
    const { userId, games } = req.body;

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

module.exports = router;