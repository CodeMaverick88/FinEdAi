import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

function Icon({ name, size = 18 }) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.7',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  const icons = {
    home: (
      <>
        <path d="M3 10.8 12 3l9 7.8" />
        <path d="M5.5 9.5V21h13V9.5" />
        <path d="M9.5 21v-6h5v6" />
      </>
    ),

    document: (
      <>
        <path d="M6 3.5h8l4 4V20.5H6z" />
        <path d="M14 3.5v4h4" />
        <path d="M9 12h6M9 16h6" />
      </>
    ),

    chart: (
      <>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="m7 15 3-4 3 2 5-6" />
      </>
    ),

    spark: (
      <>
        <path d="m12 3-1.2 5.2L6 10l4.8 1.8L12 17l1.2-5.2L18 10l-4.8-1.8z" />
        <path d="m19 15-.6 2.4L16 18l2.4.6L19 21l.6-2.4L22 18l-2.4-.6z" />
      </>
    ),

    compass: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m14.8 9.2-1.5 4.1-4.1 1.5 1.5-4.1z" />
      </>
    ),

    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),

    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),

    arrow: (
      <>
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),

    user: (
      <>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 20c.8-3.3 3-5 6.5-5s5.7 1.7 6.5 5" />
      </>
    ),
  };

  return <svg {...commonProps}>{icons[name]}</svg>;
}

const navigationItems = [
  {
    label: 'Overview',
    path: '/',
    icon: 'home',
    end: true,
  },
  {
    label: 'Documents',
    path: '/upload',
    icon: 'document',
  },
  {
    label: 'Hardship',
    path: '/hardship',
    icon: 'chart',
  },
  {
    label: 'Appeal coach',
    path: '/appeal',
    icon: 'spark',
  },
  {
    label: 'Opportunities',
    path: '/opportunities',
    icon: 'compass',
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen);

    return () => {
      document.body.classList.remove('menu-is-open');
    };
  }, [menuOpen]);

  return (
    <header
      className={`site-navbar ${
        isScrolled ? 'site-navbar--scrolled' : ''
      }`}
    >
      <div className="navbar-glow navbar-glow--left" />
      <div className="navbar-glow navbar-glow--right" />

      <div className="navbar-inner">
        <Link
          to="/"
          className="brand"
          aria-label="FinEdAI home"
        >
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark__ring" />
            <span className="brand-mark__coin">₵</span>
            <span className="brand-mark__spark brand-mark__spark--one" />
            <span className="brand-mark__spark brand-mark__spark--two" />
          </span>

          <span className="brand-copy">
            <span className="brand-name">
              FinEd<span>AI</span>
            </span>

            <span className="brand-tagline">
              Your story. Your support.
            </span>
          </span>
        </Link>

        <nav
          className="desktop-navigation"
          aria-label="Main navigation"
        >
          <div className="navigation-pill">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `navigation-link ${
                    isActive ? 'navigation-link--active' : ''
                  }`
                }
              >
                <span className="navigation-link__icon">
                  <Icon name={item.icon} size={16} />
                </span>

                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="navbar-actions">
          <Link to="/login" className="navbar-login">
            <Icon name="user" size={16} />
            <span>Sign in</span>
          </Link>

          <Link to="/upload" className="navbar-primary-action">
            <span>Start your journey</span>
            <Icon name="arrow" size={16} />
          </Link>
        </div>

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={
            menuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          aria-expanded={menuOpen}
        >
          <Icon
            name={menuOpen ? 'close' : 'menu'}
            size={22}
          />
        </button>
      </div>

      <div
        className={`mobile-navigation ${
          menuOpen ? 'mobile-navigation--open' : ''
        }`}
      >
        <div className="mobile-navigation__inner">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `mobile-navigation-link ${
                  isActive
                    ? 'mobile-navigation-link--active'
                    : ''
                }`
              }
            >
              <span className="mobile-navigation-link__icon">
                <Icon name={item.icon} size={18} />
              </span>

              <span>{item.label}</span>

              <Icon name="arrow" size={16} />
            </NavLink>
          ))}

          <div className="mobile-navigation__actions">
            <Link to="/login" className="mobile-login-button">
              Sign in
            </Link>

            <Link
              to="/upload"
              className="mobile-start-button"
            >
              Start your journey
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
