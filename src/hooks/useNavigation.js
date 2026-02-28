import { useState, useRef, useCallback } from 'react';
import { analyzeFrame } from '../api/gemini';
import { speakText } from '../api/elevenlabs';
import { savePath } from '../api/snowflake';

export function useNavigation(captureFrame, selectedBuilding) {
  const [status, setStatus] = useState('idle');
  const [lastDescription, setLastDescription] = useState('');
  const intervalRef = useRef(null);

  const startNavigation = useCallback(() => {
    setStatus('scanning');
    intervalRef.current = setInterval(async () => {
      try {
        const frame = captureFrame();
        if (!frame) return;
        setStatus('scanning');
        const description = await analyzeFrame(frame);
        setLastDescription(description);
        setStatus('speaking');
        await speakText(description);
        if (selectedBuilding) await savePath(selectedBuilding, description);
        setStatus('scanning');
      } catch (err) {
        console.error(err);
        setStatus('error');
        setTimeout(() => setStatus('scanning'), 2000);
      }
    }, 4000);
  }, [captureFrame, selectedBuilding]);

  const stopNavigation = useCallback(() => {
    clearInterval(intervalRef.current);
    setStatus('idle');
  }, []);

  return { status, lastDescription, startNavigation, stopNavigation };
}


