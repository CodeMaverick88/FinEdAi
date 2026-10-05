import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? '#2563eb' : '#374151',
    fontWeight: isActive ? '600' : '400',
    textDecoration: 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    backgroundColor: isActive ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
    transition: 'all 0.2s ease'
  });

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justify: 'space-between',
      padding: '1rem 2rem',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e3a8a' }}>
        <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          FinEd<span style={{ color: '#2563eb' }}>AI</span>
        </NavLink>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/how-it-works" style={linkStyle}>How It Works</NavLink>
        <NavLink to="/capabilities" style={linkStyle}>Capabilities</NavLink>
        <NavLink to="/opportunities" style={linkStyle}>Opportunities</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>
        <NavLink to="/login" style={{
          ...linkStyle({ isActive: false }),
          backgroundColor: '#2563eb',
          color: '#ffffff',
          fontWeight: '600',
          marginLeft: '1rem'
        }}>Login</NavLink>
      </div>
    </nav>
  );
}
