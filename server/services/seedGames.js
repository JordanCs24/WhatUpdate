const axios = require('axios');
const { fetchGameUpdate } = require('./fetchNews');
const GameUpdates = require('../models/GameUpdates');

/**
 * @desc    Fetches the top 100 games from RAWG API
 * @returns {Array} list of { id, name } objects
 */
const getTopGames = async () => {
  try {
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: process.env.RAWG_API_KEY,
        ordering: '-rating',
        page_size: 100,
      }
    });

    const games = response.data.results.map(game => ({
      id: String(game.id),
      name: game.name,
    }));

    console.log(`Fetched ${games.length} top games from RAWG`);
    return games;

  } catch (err) {
    console.log('Error fetching top games from RAWG:', err.message);
    return [];
  }
};

/**
 * @desc    Seeds the database with updates for top 100 games
 *          Only fetches games that don't already have fresh cached data
 *          Runs on server startup and every 2 days
 */
const seedTopGames = async () => {
  console.log('Starting game seeding...');
  
  const games = await getTopGames();
  
  if (games.length === 0) {
    console.log('No games fetched from RAWG — skipping seed');
    return;
  }

  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
  let seeded = 0;
  let skipped = 0;

  for (const game of games) {
    // Check if we already have fresh data
    const existingUpdate = await GameUpdates.findOne({
      gameId: game.id,
      fetchedAt: { $gte: twoDaysAgo }
    });

    if (existingUpdate) {
      skipped++;
      continue;
    }

    // Fetch and save new update
    console.log(`Seeding ${game.name}...`);
    const update = await fetchGameUpdate(game.id, game.name);
    
    if (update) {
      await GameUpdates.create(update);
      seeded++;
    }

    // Wait 2 seconds between each game to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`Seeding complete! Seeded: ${seeded}, Skipped: ${skipped}`);
};

module.exports = { seedTopGames };