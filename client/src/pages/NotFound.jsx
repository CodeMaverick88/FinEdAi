import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', margin: '4rem auto', padding: '0 1rem' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ color: '#2563eb', textDecoration: 'underline' }}>Back to Home</Link>
    </div>
  );
}
