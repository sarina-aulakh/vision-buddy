const LABELS = { idle: '⬛ Ready', scanning: '👁️ Scanning...', speaking: '🔊 Speaking...', error: '❌ Error' };
export function StatusBar({ status, description }) {
  return (
    <div style={{ background: '#1a1a1a', borderRadius: 8, padding: 14, borderLeft: '3px solid #4ade80' }}>
      <div style={{ fontWeight: 'bold', color: '#4ade80', fontSize: '0.85rem' }}>{LABELS[status]}</div>
      {description && <p style={{ marginTop: 6, fontSize: '0.9rem', color: '#ccc', fontStyle: 'italic' }}>"{description}"</p>}
    </div>
  );
}


