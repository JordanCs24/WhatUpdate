const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * @desc    Takes raw gaming news text and summarizes it using Gemini AI
 *          into three categories: new content, bug fixes, balance changes
 * @param   {string} gameName - the name of the game
 * @param   {string} rawContent - raw news/patch notes text
 * @returns {object} { newContent, bugFixes, balanceChanges }
 */
const summarizeUpdate = async (gameName, rawContent) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `
    You are a gaming news summarizer for the app WhatUpdate.
    Summarize the following ${gameName} update/news into exactly 3 categories.
    Return ONLY a JSON object with no extra text, in this exact format:
    {
      "newContent": ["item1", "item2"],
      "bugFixes": ["item1", "item2"],
      "balanceChanges": ["item1", "item2"]
    }
    If a category has no items return an empty array.
    Keep each item short and clear (one sentence max).
    
    Raw content to summarize:
    ${rawContent}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Parse the JSON response
  const cleaned = text.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
};

module.exports = { summarizeUpdate };