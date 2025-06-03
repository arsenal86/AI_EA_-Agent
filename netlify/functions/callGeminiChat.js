// More robust example for callGeminiChat.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { contents, generationConfig } = JSON.parse(event.body);
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Securely accessed

    if (!GEMINI_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured' }) };
    }
    if (!contents) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing "contents" in request body' }) };
    }

    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(geminiApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents, generationConfig: generationConfig || { temperature: 0.6 } })
    });

    const responseData = await response.json();
    if (!response.ok) {
      console.error('Gemini API Error:', responseData);
      return { statusCode: response.status, body: JSON.stringify({ error: responseData.error?.message || 'Gemini API error' }) };
    }

    return { statusCode: 200, body: JSON.stringify(responseData) };

  } catch (error) {
    console.error('Serverless Function Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};