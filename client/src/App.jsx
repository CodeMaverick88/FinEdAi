import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import DocumentUpload from './pages/DocumentUpload/DocumentUpload';
import HardshipSummary from './pages/HardshipSummary/HardshipSummary';
import AppealCoach from './pages/AppealCoach/AppealCoach';
import OpportunityMatcher from './pages/OpportunityMatcher/OpportunityMatcher';
import Login from './pages/Auth/Login';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<DocumentUpload />} />
        <Route path="/hardship" element={<HardshipSummary />} />
        <Route path="/appeal" element={<AppealCoach />} />
        <Route path="/opportunities" element={<OpportunityMatcher />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
