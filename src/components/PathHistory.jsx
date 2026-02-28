import { useEffect, useState } from 'react';
import { fetchPathsForBuilding } from '../api/snowflake';

export function PathHistory({ buildingName }) {
  const [paths, setPaths] = useState([]);
  useEffect(() => {
    if (!buildingName) return;
    fetchPathsForBuilding(buildingName).then(setPaths).catch(console.error);
  }, [buildingName]);
  if (!buildingName || !paths.length) return null;
  return (
    <div>
      <h3 style={{ fontSize: '0.85rem', color: '#888', marginBottom: 8 }}>Previously mapped: {buildingName}</h3>
      {paths.map((p, i) => (
        <div key={i} style={{ background: '#1a1a1a', borderRadius: 8, padding: 10, marginBottom: 8 }}>
          <div style={{ fontSize: '0.75rem', color: '#555' }}>{new Date(p.CREATED_AT).toLocaleString()}</div>
          <p style={{ fontSize: '0.85rem', marginTop: 4 }}>{p.GEMINI_SUMMARY}</p>
        </div>
      ))}
    </div>
  );
}


