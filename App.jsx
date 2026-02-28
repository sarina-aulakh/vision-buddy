import { useState } from 'react';
import { useCamera } from './hooks/useCamera';
import { useNavigation } from './hooks/useNavigation';
import { CameraFeed } from './components/CameraFeed';
import { StatusBar } from './components/StatusBar';
import { BuildingSelector } from './components/BuildingSelector';
import { PathHistory } from './components/PathHistory';

export default function App() {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const { videoRef, isActive, startCamera, stopCamera, captureFrame } = useCamera();
  const { status, lastDescription, startNavigation, stopNavigation } = useNavigation(captureFrame, selectedBuilding);

  const handleStart = async () => { await startCamera(); startNavigation(); };
  const handleStop = () => { stopCamera(); stopNavigation(); };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'system-ui', background: '#0a0a0a', minHeight: '100vh', color: '#f0f0f0' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem' }}>👁️ Project Ghostwriter</h1>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>AI Navigation for the Visually Impaired</p>
      </div>
      <BuildingSelector selected={selectedBuilding} onSelect={setSelectedBuilding} />
      <CameraFeed videoRef={videoRef} isActive={isActive} />
      <StatusBar status={status} description={lastDescription} />
      <div>
        {status === 'idle'
          ? <button onClick={handleStart} disabled={!selectedBuilding}
              style={{ width: '100%', padding: 14, background: selectedBuilding ? '#4ade80' : '#333', color: selectedBuilding ? '#000' : '#666', border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 'bold', cursor: selectedBuilding ? 'pointer' : 'not-allowed' }}>
              Start Navigation
            </button>
          : <button onClick={handleStop}
              style={{ width: '100%', padding: 14, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
              Stop
            </button>
        }
      </div>
      <PathHistory buildingName={selectedBuilding} />
    </div>
  );
}
