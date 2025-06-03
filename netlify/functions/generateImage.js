const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { instances, parameters } = JSON.parse(event.body); // Matches your frontend payload
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured' }) };
    }
     if (!instances) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing "instances" in request body' }) };
    }

    // The image generation model used in your HTML is "imagen-3.0-generate-002:predict"
    // Note: The Gemini API endpoint structure for image generation might differ from text generation.
    // The example in your HTML uses a :predict endpoint. Ensure this is correct.
    // For this example, I'm assuming it's a model accessible via a similar pattern, but Google's
    // image generation APIs (like Imagen via Vertex AI) might have different endpoint structures or SDKs.
    // The example used `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`
    // If this is correct, the function would be similar.
    // However, direct access to some Imagen models via a simple `generateContent` style might not be the case.
    // Let's assume the endpoint structure from your JS is usable:
    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${GEMINI_API_KEY}`;


    const response = await fetch(geminiApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ instances, parameters: parameters || { "sampleCount": 1 } })
    });

    const responseData = await response.json();
     if (!response.ok) {
      console.error('Gemini Image API Error:', responseData);
      return { statusCode: response.status, body: JSON.stringify({ error: responseData.error?.message || 'Gemini Image API error' }) };
    }

    return { statusCode: 200, body: JSON.stringify(responseData) };

  } catch (error) {
    console.error('Image Function Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};