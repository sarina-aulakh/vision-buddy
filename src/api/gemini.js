// PERSON A OWNS THIS FILE
// Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
// Key source: VITE_GEMINI_API_KEY in root .env

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are a navigation assistant for a visually impaired person.
Describe what you see as navigational instructions. Be concise, calm, and specific.
Focus on: obstacles, distances, directions (use clock positions), hazards.
Example: "Clear path ahead 10 feet. Glass door at 2 o'clock. Wet floor sign to your left."
Keep responses under 2 sentences.`;

export async function analyzeFrame(base64ImageData) {
  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: SYSTEM_PROMPT },
          { inline_data: { mime_type: 'image/jpeg', data: base64ImageData } }
        ]
      }]
    })
  });
  if (!response.ok) throw new Error(`Gemini error: ${response.status}`);
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
