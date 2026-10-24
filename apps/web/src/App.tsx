import { useState, useEffect } from 'react';

interface HealthResponse {
  success: boolean;
  data: {
    status: string;
    timestamp: string;
    environment: string;
  };
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/v1/health')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setHealth(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>StokFlow</h1>
      <p>Inventory & Sales Management System</p>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2>Backend API Status</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {health && (
          <div>
            <p><strong>Status:</strong> {health.data.status}</p>
            <p><strong>Environment:</strong> {health.data.environment}</p>
            <p><strong>Timestamp:</strong> {new Date(health.data.timestamp).toLocaleString()}</p>
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Phase 1 - Foundation Complete</h2>
        <ul>
          <li>✓ npm workspace configured</li>
          <li>✓ Backend Express server running</li>
          <li>✓ Frontend React + Vite + TypeScript</li>
          <li>✓ API proxy configured</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
