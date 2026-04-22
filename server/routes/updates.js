const express = require('express');
const router = express.Router();
const { fetchGameUpdate } = require('../services/fetchNews');
const GameUpdates = require('../models/GameUpdates');
const verifyToken = require('../middleware/verifyToken');

/**
 * @route   POST /api/updates/fetch
 * @desc    Fetch and summarize updates for a list of games
 *          1. Takes a list of game IDs and names
 *          2. Calls Gemini AI to summarize news for each game
 *          3. Saves summaries to MongoDB
 * @access  Private (token required)
 * 
 * @body    { games: [{ id, name }] }
 * @returns { message, updates }
 * @errors  500 - Server error
 */
router.post('/fetch', verifyToken, async (req, res) => {
  try {
    const { games } = req.body;
    const results = [];
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

    for (const game of games) {
      // Check cache first for each game
      const existingUpdate = await GameUpdates.findOne({ 
        gameId: game.id,
        fetchedAt: { $gte: twoDaysAgo }
      });

      if (existingUpdate) {
        console.log(`Using cached update for ${game.name}`);
        results.push(existingUpdate);
        continue; // skip to next game
      }

      // No fresh cache found — fetch new data
      console.log(`Fetching fresh update for ${game.name}`);
      const update = await fetchGameUpdate(game.id, game.name);
      if (update) {
        const saved = await GameUpdates.create(update);
        results.push(saved);
      }
    }

    res.status(200).json({ message: 'Updates fetched!', updates: results });

  } catch (err) {
    console.log('ERROR:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/**
 * @route   GET /api/updates/:gameId
 * @desc    Get the latest update for a specific game
 * @access  Private (token required)
 * 
 * @returns { update }
 * @errors  404 - No updates found
 *          500 - Server error
 */
router.get('/:gameId', verifyToken, async (req, res) => {
  try {
    const { gameId } = req.params;

    const update = await GameUpdates.findOne({ gameId })
      .sort({ fetchedAt: -1 });

    if (!update) {
      return res.status(404).json({ message: 'No updates found for this game!' });
    }

    res.status(200).json({ update });

  } catch (err) {
    console.log('ERROR:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;