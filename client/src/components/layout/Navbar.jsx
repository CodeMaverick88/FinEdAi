import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <h2>FinEdAI</h2>
      <Link to="/">Dashboard</Link>
      <Link to="/upload">Upload Statements</Link>
      <Link to="/hardship">Hardship Summary</Link>
      <Link to="/appeal">Appeal Coach</Link>
      <Link to="/opportunities">Bursaries & Grants</Link>
      <Link to="/login" style={{ marginLeft: 'auto' }}>Login</Link>
    </nav>
  );
}
