import { useEffect, useState } from 'react';
import { getAllBuildings } from '../api/snowflake';

export function BuildingSelector({ selected, onSelect }) {
  const [buildings, setBuildings] = useState([]);
  useEffect(() => {
    getAllBuildings()
      .then(setBuildings)
      .catch(() => setBuildings(['University Library', 'City Hospital', 'Central Mall']));
  }, []);
  return (
    <select value={selected} onChange={e => onSelect(e.target.value)}
      style={{ width: '100%', padding: 10, background: '#1a1a1a', border: '1px solid #333', color: '#f0f0f0', borderRadius: 8 }}>
      <option value="">Select building...</option>
      {buildings.map(b => <option key={b} value={b}>{b}</option>)}
    </select>
  );
}

