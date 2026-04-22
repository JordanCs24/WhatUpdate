const Groq = require('groq-sdk');


/**
 * @desc    Takes raw gaming news text and summarizes it using Groq AI
 *          into three categories: new content, bug fixes, balance changes
 * @param   {string} gameName - the name of the game
 * @param   {string} rawContent - raw news/patch notes text
 * @returns {object} { newContent, bugFixes, balanceChanges }
 */
const summarizeUpdate = async (gameName, rawContent) => {
  // Initialize inside the function so env vars are loaded
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `You are a gaming news summarizer for the app WhatUpdate.
        Summarize gaming updates into exactly 3 categories.
        Return ONLY a JSON object with no extra text, in this exact format:
        {
          "newContent": ["item1", "item2"],
          "bugFixes": ["item1", "item2"],
          "balanceChanges": ["item1", "item2"]
        }
        If a category has no items return an empty array.
        Keep each item short and clear (one sentence max).`
      },
      {
        role: 'user',
        content: `Summarize the latest ${gameName} updates from this content:\n\n${rawContent}`
      }
    ],
    temperature: 0.3,
    max_tokens: 1000,
  });

  const text = completion.choices[0].message.content;
  const cleaned = text.replace(/```json|```/g, '').trim();
  return JSON.parse(cleaned);
};

module.exports = { summarizeUpdate };
