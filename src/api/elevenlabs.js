// PERSON B OWNS THIS FILE
// Endpoint: https://api.elevenlabs.io/v1/text-to-speech/:voiceId
// Keys: VITE_ELEVENLABS_API_KEY, VITE_ELEVENLABS_VOICE_ID in root .env
// Find Voice IDs at: elevenlabs.io → Voice Library

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const VOICE_ID = import.meta.env.VITE_ELEVENLABS_VOICE_ID;

let currentAudio = null;

export async function speakText(text) {
  if (currentAudio) { currentAudio.pause(); currentAudio = null; }

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg'
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: { stability: 0.75, similarity_boost: 0.85 }
    })
  });

  if (!response.ok) throw new Error(`ElevenLabs error: ${response.status}`);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  currentAudio = new Audio(url);
  await currentAudio.play();
}
