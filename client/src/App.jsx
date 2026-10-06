import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Capabilities from './pages/Capabilities';
import Opportunities from './pages/Opportunities';
import Login from './pages/Login';

const appStyles = `
  .finedai-app {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
  }

  .finedai-main {
    position: relative;
    flex: 1 0 auto;
    width: 100%;
  }

  @media (max-width: 860px) {
    .finedai-app {
      min-height: 100vh;
      min-height: 100dvh;
    }

    .finedai-main {
      width: 100%;
    }
  }
`;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <style>{appStyles}</style>

      <div className="finedai-app">
        <ScrollToTop />

        <Navbar />

        <main className="finedai-main">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />

            {/* Main pages */}
            <Route
              path="/how-it-works"
              element={<HowItWorks />}
            />

            <Route
              path="/capabilities"
              element={<Capabilities />}
            />

            <Route
              path="/opportunities"
              element={<Opportunities />}
            />

            {/* Login */}
            <Route
              path="/login"
              element={<Login />}
            />

            {/* Unknown routes */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
}