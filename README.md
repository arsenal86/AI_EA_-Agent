# AI_EA_-Agent

## Overview
This project is an AI-powered Real Estate Onboarding Agent web application. It uses Google Gemini APIs (via serverless Netlify functions) to:
- Chat with users to extract property requirements
- Visualize dream properties with AI-generated images
- Provide local area insights

## How it Works
- The frontend (in `public/index.html`) interacts with serverless functions for all AI features. No API keys are exposed in the frontend.
- Serverless functions are in `netlify/functions/` and proxy requests to Google Gemini APIs using a secure API key from environment variables.

## Key Serverless Functions
- `callGeminiChat.js`: Handles chat and property criteria extraction
- `generateImage.js`: Generates property images from prompts
- `getAreaInsights.js`: Provides local area summaries

## Local Development
1. Clone the repo
2. Install dependencies: `npm install`
3. Set your Google Gemini API key in your environment (e.g., `.env` or Netlify dashboard):
   ```
   GEMINI_API_KEY=your-key-here
   ```
4. Use Netlify CLI to run locally:
   ```
   npm install -g netlify-cli
   netlify dev
   ```
5. Open `http://localhost:8888` to use the app

## Deployment
- Deploy to Netlify for automatic serverless function support
- Set the `GEMINI_API_KEY` in your Netlify environment variables

## Security
- API keys are never exposed to the frontend
- All AI requests are proxied through serverless functions

## Customization
- Edit `public/index.html` for UI/UX changes
- Edit/add serverless functions in `netlify/functions/` for backend logic

---
For questions or issues, open an issue on GitHub.