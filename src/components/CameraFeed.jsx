export function CameraFeed({ videoRef, isActive }) {
  return (
    <div style={{ background: '#111', borderRadius: 12, overflow: 'hidden', minHeight: 200 }}>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', display: 'block' }} />
      {!isActive && (
        <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
          Camera inactive
        </div>
      )}
    </div>
  );
}


