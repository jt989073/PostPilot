import React, { useState, useEffect } from 'react';
import { getHealth } from './api/health';

function App() {
  // Holds the JSON response { status, service }
  const [health, setHealth] = useState(null);
  // Holds any error message
  const [error, setError] = useState(null);

    useEffect(() => {
    getHealth()
      .then(data => {
        setHealth(data);        // Save the healthy response
      })
      .catch(err => {
        setError(err.message);  // Save any error
      });
  }, []); // empty deps → runs only once


    return (
    <div style={{ padding: 20 }}>
      <h1>✅ React is working!</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <p>
          Backend status:{' '}
          {health ? health.status : 'Loading...'}
        </p>
      )}
    </div>
  );
}

export default App
