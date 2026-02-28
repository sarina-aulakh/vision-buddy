import { useRef, useState, useCallback } from 'react';

export function useCamera() {
  const videoRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 640, height: 480 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
      }
    } catch (err) { setError('Camera access denied'); }
  }, []);

  const stopCamera = useCallback(() => {
    videoRef.current?.srcObject?.getTracks().forEach(t => t.stop());
    setIsActive(false);
  }, []);

  const captureFrame = useCallback(() => {
    if (!videoRef.current) return null;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
  }, []);

  return { videoRef, isActive, error, startCamera, stopCamera, captureFrame };
}


