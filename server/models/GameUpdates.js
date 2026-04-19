const mongoose = require('mongoose');

/**
 * @desc    MongoDB model for storing AI summarized game updates
 *          Each document represents one update for one game
 */
const UpdateSchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  gameName: { type: String, required: true },
  summary: {
    newContent: [{ type: String }],
    bugFixes: [{ type: String }],
    balanceChanges: [{ type: String }],
  },
  fetchedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Update', UpdateSchema);