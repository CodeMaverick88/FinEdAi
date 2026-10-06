import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const navbarStyles = `
  .site-navbar {
    --nav-green: #243d2d;
    --nav-green-dark: #17271d;
    --nav-green-light: #52755d;
    --nav-gold: #d5bd87;
    --nav-white: #ffffff;
    --nav-muted: rgba(255, 255, 255, 0.72);

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    width: 100%;
    padding: 14px 18px;
    font-family: 'DM Sans', sans-serif;
  }

  .navbar-shell {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: min(1180px, 100%);
    min-height: 64px;
    margin: 0 auto;
    padding: 0 10px 0 20px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 20px;
    background:
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.12),
        rgba(255, 255, 255, 0.04)
      ),
      rgba(23, 39, 29, 0.86);
    box-shadow:
      0 16px 40px rgba(5, 18, 9, 0.24),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(22px) saturate(130%);
    -webkit-backdrop-filter: blur(22px) saturate(130%);
  }

  .navbar-brand {
    display: inline-flex;
    align-items: center;
    color: #ffffff;
    font-family: 'Space Grotesk', 'DM Sans', sans-serif;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.07em;
    line-height: 1;
    text-decoration: none;
    transition:
      transform 220ms ease,
      filter 220ms ease;
  }

  .navbar-brand span {
    color: var(--nav-gold);
  }

  .navbar-brand:hover {
    transform: translateY(-2px);
    filter: drop-shadow(0 0 13px rgba(213, 189, 135, 0.4));
  }

  .navbar-nav {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .navbar-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 10px 13px;
    color: var(--nav-muted);
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
    transition:
      color 200ms ease,
      transform 200ms ease;
  }

  .navbar-link::after {
    position: absolute;
    right: 13px;
    bottom: 5px;
    left: 13px;
    height: 2px;
    border-radius: 999px;
    background: var(--nav-gold);
    content: '';
    opacity: 0;
    transform: scaleX(0);
    transform-origin: center;
    transition:
      opacity 200ms ease,
      transform 200ms ease;
  }

  .navbar-link:hover,
  .navbar-link:focus-visible {
    color: #ffffff;
    transform: translateY(-2px);
  }

  .navbar-link:hover::after,
  .navbar-link:focus-visible::after {
    opacity: 1;
    transform: scaleX(1);
  }

  .navbar-actions {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .navbar-sign-in,
  .navbar-start {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 39px;
    padding: 0 15px;
    border-radius: 11px;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition:
      transform 200ms ease,
      box-shadow 200ms ease,
      background 200ms ease,
      color 200ms ease;
  }

  .navbar-sign-in {
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.84);
    background: rgba(255, 255, 255, 0.06);
  }

  .navbar-start {
    border: 1px solid rgba(213, 189, 135, 0.45);
    color: var(--nav-green-dark);
    background: var(--nav-gold);
    box-shadow: 0 7px 18px rgba(213, 189, 135, 0.15);
  }

  .navbar-sign-in:hover,
  .navbar-sign-in:focus-visible,
  .navbar-start:hover,
  .navbar-start:focus-visible {
    transform: translateY(-2px);
  }

  .navbar-sign-in:hover,
  .navbar-sign-in:focus-visible {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.11);
  }

  .navbar-start:hover,
  .navbar-start:focus-visible {
    box-shadow:
      0 10px 24px rgba(213, 189, 135, 0.25),
      0 0 20px rgba(213, 189, 135, 0.12);
  }

  .navbar-menu-button {
    display: none;
    align-items: center;
    justify-content: center;
    width: 43px;
    height: 43px;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.07);
    cursor: pointer;
    transition:
      background 200ms ease,
      transform 200ms ease,
      border-color 200ms ease;
  }

  .navbar-menu-button:hover,
  .navbar-menu-button:focus-visible {
    border-color: rgba(213, 189, 135, 0.4);
    background: rgba(213, 189, 135, 0.12);
    transform: translateY(-2px);
  }

  .navbar-menu-icon {
    position: relative;
    display: block;
    width: 19px;
    height: 14px;
  }

  .navbar-menu-icon span {
    position: absolute;
    left: 0;
    width: 19px;
    height: 2px;
    border-radius: 999px;
    background: #ffffff;
    transition:
      top 200ms ease,
      transform 200ms ease,
      opacity 200ms ease;
  }

  .navbar-menu-icon span:nth-child(1) {
    top: 0;
  }

  .navbar-menu-icon span:nth-child(2) {
    top: 6px;
  }

  .navbar-menu-icon span:nth-child(3) {
    top: 12px;
  }

  .navbar-menu-button--open .navbar-menu-icon span:nth-child(1) {
    top: 6px;
    transform: rotate(45deg);
  }

  .navbar-menu-button--open .navbar-menu-icon span:nth-child(2) {
    opacity: 0;
  }

  .navbar-menu-button--open .navbar-menu-icon span:nth-child(3) {
    top: 6px;
    transform: rotate(-45deg);
  }

  .navbar-mobile-panel {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    left: 0;
    z-index: 1001;
    display: block;
    visibility: hidden;
    max-height: 0;
    padding: 0;
    overflow: hidden;
    border: 1px solid transparent;
    border-radius: 18px;
    background: rgba(23, 39, 29, 0.97);
    box-shadow: 0 20px 45px rgba(5, 18, 9, 0.3);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-8px);
    transform-origin: top center;
    transition:
      max-height 280ms ease,
      opacity 220ms ease,
      transform 220ms ease,
      visibility 220ms ease,
      padding 220ms ease,
      border-color 220ms ease;
  }

  .navbar-mobile-panel--visible {
    visibility: visible;
    max-height: calc(100vh - 105px);
    padding: 16px;
    overflow-y: auto;
    border-color: rgba(255, 255, 255, 0.13);
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .navbar-mobile-links {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .navbar-mobile-link {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 48px;
    padding: 0 14px;
    border-radius: 11px;
    color: rgba(255, 255, 255, 0.76);
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition:
      color 200ms ease,
      background 200ms ease,
      transform 200ms ease;
  }

  .navbar-mobile-link::after {
    position: absolute;
    right: 14px;
    bottom: 8px;
    left: 14px;
    height: 2px;
    border-radius: 999px;
    background: var(--nav-gold);
    content: '';
    opacity: 0;
    transform: scaleX(0);
    transform-origin: left center;
    transition:
      opacity 200ms ease,
      transform 200ms ease;
  }

  .navbar-mobile-link:hover,
  .navbar-mobile-link:focus-visible {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.07);
    transform: translateY(-2px);
  }

  .navbar-mobile-link:hover::after,
  .navbar-mobile-link:focus-visible::after {
    opacity: 1;
    transform: scaleX(1);
  }

  .navbar-mobile-divider {
    width: 100%;
    height: 1px;
    margin: 12px 0;
    background: rgba(255, 255, 255, 0.1);
  }

  .navbar-mobile-actions {
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  .navbar-mobile-sign-in,
  .navbar-mobile-start {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 48px;
    border-radius: 11px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition:
      transform 200ms ease,
      background 200ms ease,
      box-shadow 200ms ease;
  }

  .navbar-mobile-sign-in {
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: #ffffff;
    background: rgba(255, 255, 255, 0.06);
  }

  .navbar-mobile-start {
    border: 1px solid rgba(213, 189, 135, 0.45);
    color: var(--nav-green-dark);
    background: var(--nav-gold);
  }

  .navbar-mobile-sign-in:hover,
  .navbar-mobile-sign-in:focus-visible,
  .navbar-mobile-start:hover,
  .navbar-mobile-start:focus-visible {
    transform: translateY(-2px);
  }

  .navbar-mobile-sign-in:hover {
    background: rgba(255, 255, 255, 0.11);
  }

  .navbar-mobile-start:hover {
    box-shadow: 0 10px 24px rgba(213, 189, 135, 0.22);
  }

  @media (max-width: 860px) {
    .site-navbar {
      padding: 10px 12px;
    }

    .navbar-shell {
      min-height: 58px;
      padding: 0 8px 0 16px;
      border-radius: 17px;
    }

    .navbar-brand {
      font-size: 22px;
    }

    .navbar-nav,
    .navbar-actions {
      display: none;
    }

    .navbar-menu-button {
      display: inline-flex;
    }

    .navbar-mobile-panel {
      right: 0;
      left: 0;
    }
  }

  @media (max-width: 420px) {
    .site-navbar {
      padding: 8px 9px;
    }

    .navbar-shell {
      min-height: 56px;
      padding-left: 14px;
    }

    .navbar-brand {
      font-size: 21px;
    }

    .navbar-menu-button {
      width: 41px;
      height: 41px;
    }

    .navbar-mobile-panel--visible {
      max-height: calc(100vh - 88px);
      padding: 13px;
    }

    .navbar-mobile-link {
      min-height: 46px;
    }

    .navbar-mobile-sign-in,
    .navbar-mobile-start {
      min-height: 46px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .navbar-brand,
    .navbar-link,
    .navbar-sign-in,
    .navbar-start,
    .navbar-menu-button,
    .navbar-menu-icon span,
    .navbar-mobile-panel,
    .navbar-mobile-link,
    .navbar-mobile-sign-in,
    .navbar-mobile-start {
      transition: none;
    }
  }
`;

const links = [
  ['How it works', '/how-it-works'],
  ['Capabilities', '/capabilities'],
  ['Opportunities', '/opportunities'],
  ['Start the demo', '/login'],
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMenuOpen && window.innerWidth <= 860) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleBrandClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <style>{navbarStyles}</style>

      <header className="site-navbar">
        <div className="navbar-shell">

          <Link
            to="/"
            className="navbar-brand"
            onClick={handleBrandClick}
          >
            FinEd<span>AI</span>
          </Link>

          <nav className="navbar-nav" aria-label="Main navigation">
            {links.map(([label, href]) => (
              <Link
                key={href}
                to={href}
                className="navbar-link"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="navbar-actions">
            <Link
              to="/login"
              className="navbar-sign-in"
            >
              Sign in
            </Link>

            <Link
              to="/login"
              className="navbar-start"
            >
              Start the demo
            </Link>
          </div>

          <button
            type="button"
            className={`navbar-menu-button ${
              isMenuOpen ? 'navbar-menu-button--open' : ''
            }`}
            aria-label={
              isMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isMenuOpen}
            aria-controls="finedai-mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span
              className="navbar-menu-icon"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>
          </button>

          <div
            id="finedai-mobile-navigation"
            className={`navbar-mobile-panel ${
              isMenuOpen
                ? 'navbar-mobile-panel--visible'
                : ''
            }`}
          >
            <nav
              className="navbar-mobile-links"
              aria-label="Mobile navigation"
            >
              {links.map(([label, href]) => (
                <Link
                  key={href}
                  to={href}
                  className="navbar-mobile-link"
                  onClick={handleMobileLinkClick}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="navbar-mobile-divider" />

            <div className="navbar-mobile-actions">
              <Link
                to="/login"
                className="navbar-mobile-sign-in"
                onClick={handleMobileLinkClick}
              >
                Sign in
              </Link>

              <Link
                to="/login"
                className="navbar-mobile-start"
                onClick={handleMobileLinkClick}
              >
                Start the demo
              </Link>
            </div>
          </div>

        </div>
      </header>
    </>
  );
}