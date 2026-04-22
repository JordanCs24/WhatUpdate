const axios = require('axios');
const cheerio = require('cheerio');
const { getJson } = require('serpapi');
const { summarizeUpdate } = require('./AI_API');

/**
 * @desc    Uses SerpAPI to find the latest news URLs for a game
 * @param   {string} gameName - the name of the game
 * @returns {string[]} list of URLs to scrape
 */
const findNewsUrls = async (gameName) => {
  try {
    const results = await getJson({
      engine: 'google',
      q: `${gameName} game patch notes latest update 2026`,
      api_key: process.env.SERPAPI_KEY,
      num: 3,
    });

    const urls = results.organic_results
      ?.slice(0, 3)
      .map(result => result.link)
      .filter(Boolean);

    console.log(`Found URLs for ${gameName}:`, urls);
    return urls || [];
  } catch (err) {
    console.log(`Error finding URLs for ${gameName}:`, err.message);
    return [];
  }
};

/**
 * @desc    Scrapes text content from a URL
 * @param   {string} url - the URL to scrape
 * @returns {string} extracted text content
 */
const scrapeUrl = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);
    $('script, style, nav, footer, header').remove();

    const text = $('body').text()
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 3000);

    return text;
  } catch (err) {
    console.log(`Failed to scrape ${url}:`, err.message);
    return null;
  }
};

/**
 * @desc    Fetches and summarizes real gaming news for a specific game
 *          1. Uses SerpAPI to find relevant news URLs
 *          2. Scrapes content from those URLs
 *          3. Sends content to Gemini for summarization
 * @param   {string} gameId - the game's ID
 * @param   {string} gameName - the name of the game
 * @returns {object} { gameId, gameName, summary, fetchedAt }
 */
const fetchGameUpdate = async (gameId, gameName) => {
  console.log(`Fetching updates for ${gameName}...`);

  // Step 1: Find news URLs for this game
  const urls = await findNewsUrls(gameName);

  if (urls.length === 0) {
    console.log(`No URLs found for ${gameName}`);
    return null;
  }

  // Step 2: Scrape each URL
  let combinedContent = '';
  for (const url of urls) {
    console.log(`Scraping ${url}...`);
    const content = await scrapeUrl(url);
    if (content) {
      combinedContent += content + '\n\n';
    }
  }

  if (!combinedContent) {
    console.log(`No content scraped for ${gameName}`);
    return null;
  }

  // Step 3: Send to Gemini for summarization
  try {
    const summary = await summarizeUpdate(gameName, combinedContent);
    return {
      gameId,
      gameName,
      summary,
      fetchedAt: new Date(),
    };
  } catch (err) {
    console.log(`Error summarizing update for ${gameName}:`, err.message);
    return null;
  }
};

module.exports = { fetchGameUpdate };