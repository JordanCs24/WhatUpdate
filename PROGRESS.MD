# WhatUpdate - Progress Log

## Project Overview
A full stack mobile application that allows gamers to track and receive AI-summarized updates for any game they want to follow.

## Tech Stack
- **Frontend:** React Native, Expo, TypeScript, Expo Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **AI:** Groq (Llama 3.3 70B)
- **APIs:** SerpAPI (web search), RAWG (gaming database)
- **Auth:** JWT tokens, bcrypt password encryption
- **Web Scraping:** axios, cheerio

## File Structure
WhatUpdate/
MyApp/                          ← React Native frontend
app/
_layout.tsx                 ← Expo Router navigation setup
index.tsx                   ← Home screen (signup/login buttons)
signup-screen.tsx           ← Signup form with validation
login.tsx                   ← Login form
gameselect.tsx              ← Game search and selection
feed.tsx                    ← Main feed with lazy loaded updates
api_url.ts                    ← Centralized API URL config
constants.ts                  ← Deleted, no longer needed
server/                         ← Express backend
index.js                      ← Entry point, connects everything
.env                          ← Secret keys (never committed)
routes/
auth.js                     ← POST /api/auth/register, POST /api/auth/login
games.js                    ← POST /api/games/save, GET /api/games
updates.js                  ← POST /api/updates/fetch, GET /api/updates/:gameId
models/
User.js                     ← MongoDB user schema
GameUpdates.js              ← MongoDB game updates schema
middleware/
verifyToken.js              ← JWT verification middleware
services/
AI_API.js                   ← Groq AI summarization
fetchNews.js                ← SerpAPI search + axios/cheerio scraping
seedGames.js                ← RAWG top games fetcher (not used on startup)

## Environment Variables (server/.env)
PORT=3000
MONGO_URI=mongodb+srv://...
JWT_SECRET=whatupdate_secret_key_123
GROQ_API_KEY=...
SERPAPI_KEY=...
RAWG_API_KEY=...

## API Routes
POST /api/auth/register     → create account, returns JWT token
POST /api/auth/login        → login, returns JWT token
POST /api/games/save        → save user's selected games (protected)
GET  /api/games             → get user's saved games (protected)
POST /api/updates/fetch     → fetch + summarize game updates (protected)
GET  /api/updates/:gameId   → get latest update for a game (protected)

## How The App Works
User signs up → JWT token saved to AsyncStorage
→ Game select screen → user types any game name → adds to list
→ saves game objects {id, name} to MongoDB
→ Feed screen loads → fetches user's saved games
→ User taps a game card → fetches AI summary on demand
→ SerpAPI finds news URLs → axios scrapes content
→ Groq summarizes into: New Content, Bug Fixes, Balance Changes
→ Saved to MongoDB with 2-day cache
→ Next tap uses cached data instantly

## Key Technical Decisions Made
1. **Lazy loading** — fetch updates only when user taps a card, not on load
2. **2-day MongoDB cache** — check DB before calling AI to save quota
3. **Dynamic game search** — users type any game, not a predefined list
4. **Groq over Gemini** — more generous free tier, 14,400 requests/day
5. **Full game objects saved** — store {id, name} not just IDs
6. **Centralized API URL** — api_url.ts so only one place to update
7. **verifyToken middleware** — protects all private routes

## Deployment
- **Backend:** Railway (whatupdate-server-production.up.railway.app)
- **Status:** Deployed but MongoDB Atlas IP whitelist issue being resolved
- **Frontend:** Still using Expo Go for development

## What's Left To Do
- [ ] Build standalone iOS app with EAS Build
- [ ] Add push notifications for update alerts
- [ ] Add ability for users to edit their game list from feed screen
- [ ] Write full documentation for all files
- [ ] Add user profile screen

## How To Run Locally
```bash
# Start backend
cd WhatUpdate/server
npm run dev

# Start frontend (separate terminal)
cd WhatUpdate/MyApp
npx expo start
```

## Common Issues & Fixes
- **Can't connect to server** → check IP changed with `ipconfig getifaddr en0`, update api_url.ts
- **MongoDB connection error** → check Atlas Network Access allows your IP
- **Gemini/Groq quota exceeded** → create new API key or wait for reset
- **App crashes on startup** → check for syntax errors, look at Expo terminal
- **Server not found** → make sure you're in the server folder before running npm run dev