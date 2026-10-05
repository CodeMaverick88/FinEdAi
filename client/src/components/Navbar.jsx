import React, { useEffect, useState } from 'react';

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="m6 6 12 12" />
          <path d="M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20c.8-3.3 3-5 6.5-5s5.7 1.7 6.5 5" />
    </svg>
  );
}

const navItems = [
  {
    label: 'Home',
    target: '#top',
  },
  {
    label: 'How it works',
    target: '#how-it-works',
  },
  {
    label: 'Capabilities',
    target: '#capabilities',
  },
  {
    label: 'Opportunities',
    target: '#opportunities',
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', menuOpen);

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [menuOpen]);

  const handleNavigation = (event, target) => {
    event.preventDefault();

    const section = document.querySelector(target);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    setMenuOpen(false);
  };

  return (
    <header
      className={`site-navbar ${
        scrolled ? 'site-navbar--scrolled' : ''
      } ${menuOpen ? 'site-navbar--open' : ''}`}
    >
      <div className="navbar-glow navbar-glow--gold" />
      <div className="navbar-glow navbar-glow--green" />

      <div className="navbar-shell">
        <a
          href="#top"
          className="navbar-brand"
          onClick={(event) => handleNavigation(event, '#top')}
          aria-label="FinEdAI home"
        >
          <span className="navbar-brand__name">
            FinEd<span>AI</span>
          </span>

          <span className="navbar-brand__tagline">
            Your story. Your support.
          </span>
        </a>

        <nav className="navbar-desktop-links" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <a
              href={item.target}
              key={item.target}
              className={`navbar-link navbar-link--delay-${index + 1}`}
              onClick={(event) =>
                handleNavigation(event, item.target)
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <a
            href="#start"
            className="navbar-sign-in"
            onClick={(event) => handleNavigation(event, '#start')}
          >
            <UserIcon />
            <span>Sign in</span>
          </a>

          <a
            href="#start"
            className="navbar-start-link"
            onClick={(event) => handleNavigation(event, '#start')}
          >
            <span>Explore the demo</span>
            <ArrowIcon />
          </a>
        </div>

        <button
          type="button"
          className="navbar-menu-button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={
            menuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          aria-expanded={menuOpen}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      <div
        className={`navbar-mobile-panel ${
          menuOpen ? 'navbar-mobile-panel--visible' : ''
        }`}
      >
        <nav className="navbar-mobile-links" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              href={item.target}
              key={item.target}
              className="navbar-mobile-link"
              onClick={(event) =>
                handleNavigation(event, item.target)
              }
            >
              <span>{item.label}</span>
              <ArrowIcon />
            </a>
          ))}
        </nav>

        <div className="navbar-mobile-actions">
          <a
            href="#start"
            className="navbar-mobile-sign-in"
            onClick={(event) => handleNavigation(event, '#start')}
          >
            Sign in
          </a>

          <a
            href="#start"
            className="navbar-mobile-start"
            onClick={(event) => handleNavigation(event, '#start')}
          >
            Explore the demo
            <ArrowIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
