const { summarizeUpdate } = require('./gemini');

/**
 * @desc    Fetches gaming news for a specific game and summarizes it
 *          using Gemini AI into structured update categories
 * @param   {string} gameId - the game's ID from our GAMES list
 * @param   {string} gameName - the name of the game
 * @returns {object} { gameId, gameName, summary, fetchedAt }
 */
const fetchGameUpdate = async (gameId, gameName) => {
  // TODO: Replace with real news scraping later
  // For now we use hardcoded sample news to test the AI summarization
  const sampleNews = {
    'Fortnite': `Fortnite Chapter 5 Season 2 brings a brand new map with ancient Greek themes. 
    New weapon: Thunderbolt of Zeus added to loot pool. 
    The Mythic Medallion system has been reworked. 
    Bug fix: Players no longer fall through the map near Lavish Lair. 
    Bug fix: Shotgun spread issue has been resolved. 
    Balance change: SMG damage reduced from 18 to 16. 
    Balance change: Shield potion now takes 3 seconds to use instead of 2.`,

    'Warzone': `Warzone Season 3 introduces new operator skins and a limited time mode. 
    New content: Resurgence Trios mode added for limited time. 
    New weapon: Kar98k returns to ground loot. 
    Bug fix: Fixed parachute clipping through terrain. 
    Balance change: Sniper bullet velocity increased by 15%.`,

    'Apex Legends': `Apex Legends Season 21 introduces a new legend named Alter. 
    New content: Alter can create void portals for repositioning. 
    New care package weapon: G7 Scout added. 
    Bug fix: Fixed Wraith hitbox being larger than intended. 
    Bug fix: Kings Canyon audio crackling issue fixed. 
    Balance change: Caustic gas now deals 6 damage per tick up from 5. 
    Balance change: Wingman headshot multiplier reduced to 1.5x.`,
  };

  const rawContent = sampleNews[gameName] || `Latest updates for ${gameName}`;

  try {
    const summary = await summarizeUpdate(gameName, rawContent);
    return {
      gameId,
      gameName,
      summary,
      fetchedAt: new Date(),
    };
  } catch (err) {
    console.log(`Error fetching update for ${gameName}:`, err.message);
    return null;
  }
};

module.exports = { fetchGameUpdate };