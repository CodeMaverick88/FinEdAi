import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Home />
      </main>
    </div>
  );
}
