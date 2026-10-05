
import React, { useEffect, useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ROUTES = {
  home: '/',
  howItWorks: '/#how-it-works',
  capabilities: '/#capabilities',
  opportunities: '/opportunity-matcher',
  dashboard: '/dashboard',
  documents: '/document-upload',
  hardship: '/hardship-summary',
  appeal: '/appeal-coach',
  login: '/login',
  privacy: '/privacy',
  about: '/about',
};

const productLinks = [
  { label: 'Home', to: ROUTES.home, hash: '#top' },
  { label: 'How it works', to: ROUTES.home, hash: '#how-it-works' },
  { label: 'Capabilities', to: ROUTES.home, hash: '#capabilities' },
  { label: 'Opportunities', to: ROUTES.opportunities },
];

const toolLinks = [
  { label: 'Dashboard', to: ROUTES.dashboard },
  { label: 'Documents', to: ROUTES.documents },
  { label: 'Hardship summary', to: ROUTES.hardship },
  { label: 'Appeal coach', to: ROUTES.appeal },
  { label: 'Sign in', to: ROUTES.login },
];

const teamMembers = [
  { name: 'Meison Njonjo', role: 'Lead Developer', id: 'DSCLMR168426' },
  { name: 'Roselyne Momanyi', role: 'Developer', id: 'DCSLMR249526' },
  { name: 'Morris Wambugu', role: 'Developer', id: 'BSCLMR513425' },
];

const officialLinks = [
  { label: 'HELB', href: 'https://www.helb.co.ke' },
  { label: 'Universities Fund', href: 'https://www.universitiesfund.go.ke' },
  { label: "St. Paul's University", href: 'https://www.spu.ac.ke' },
];

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
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

function LogoMark() {
  const id = useId();
  const g = `${id}-leaf`;
  const s = `${id}-shine`;

  return (
    <svg
      className="footer-logo"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={g}
          x1="8"
          y1="4"
          x2="34"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2fb574" />
          <stop offset="100%" stopColor="#146c47" />
        </linearGradient>

        <linearGradient
          id={s}
          x1="6"
          y1="2"
          x2="20"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#fff6d8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff6d8" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="12"
        fill={`url(#${g})`}
      />

      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="12"
        fill={`url(#${s})`}
      />

      <path
        d="M0 26.5 L40 11"
        stroke="#d4af5a"
        strokeWidth="5.5"
        strokeLinecap="round"
        opacity="0.92"
      />

      <path
        d="M12.5 14.5c4.2 1.2 7.2 5.4 7.5 10.4 2.8-5.2 7.2-8.4 11.6-9.2-3.4 4.8-4.6 9.8-3.8 14.2-4.6-1.6-9.4-1.2-13.6 1.4-1.6-5.4-1.2-11.6-1.7-16.8Z"
        fill="#f6f0e4"
        opacity="0.95"
      />
    </svg>
  );
}

function injectFooterStyles() {
  const styleId = 'finedai-footer-styles';

  if (
    typeof document === 'undefined' ||
    document.getElementById(styleId)
  ) {
    return;
  }

  const style = document.createElement('style');
  style.id = styleId;

  style.textContent = `
    .site-footer {
      position: relative;
      isolation: isolate;
      margin-top: 48px;
      padding: 28px 16px calc(28px + env(safe-area-inset-bottom));
      color: #f3eee4;
      overflow: hidden;
    }

    .footer-glow {
      position: absolute;
      pointer-events: none;
      filter: blur(42px);
      opacity: 0.42;
      z-index: 0;
    }

    .footer-glow--gold {
      width: 240px;
      height: 140px;
      left: -40px;
      bottom: -30px;
      background: radial-gradient(
        circle,
        rgba(212, 175, 90, 0.55),
        transparent 70%
      );
    }

    .footer-glow--green {
      width: 260px;
      height: 160px;
      right: -30px;
      top: -40px;
      background: radial-gradient(
        circle,
        rgba(31, 138, 91, 0.5),
        transparent 70%
      );
    }

    .footer-shell {
      position: relative;
      z-index: 1;
      max-width: 1180px;
      margin: 0 auto;
      padding: 28px 22px 20px;
      border-radius: 32px;
      background: linear-gradient(
        180deg,
        rgba(255,255,255,0.12),
        rgba(255,255,255,0.04)
      );
      background-color: rgba(10, 28, 20, 0.72);
      backdrop-filter: blur(22px) saturate(180%);
      -webkit-backdrop-filter: blur(22px) saturate(180%);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.14),
        inset 0 1px 0 rgba(255, 255, 255, 0.24),
        0 18px 50px rgba(7, 20, 15, 0.28),
        0 10px 28px rgba(212, 175, 90, 0.1);
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 28px;
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 360px;
    }

    .footer-brand-link {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      width: fit-content;
      text-decoration: none;
      color: #f3eee4;
      transition: transform 180ms ease;
    }

    .footer-brand-link:hover,
    .footer-brand-link:focus-visible {
      transform: translateY(-2px);
    }

    .footer-logo {
      display: block;
      border-radius: 12px;
      box-shadow:
        0 6px 16px rgba(20, 108, 71, 0.35),
        0 0 0 1px rgba(240, 215, 140, 0.28);
    }

    .footer-wordmark {
      font-size: 1.2rem;
      font-weight: 700;
      letter-spacing: -0.03em;
    }

    .footer-wordmark span {
      color: #d4af5a;
    }

    .footer-tagline,
    .footer-copy,
    .footer-disclaimer,
    .footer-meta,
    .footer-id {
      color: rgba(243, 238, 228, 0.72);
    }

    .footer-tagline {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .footer-heading {
      margin: 0 0 12px;
      font-size: 0.72rem;
      font-weight: 650;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #f0d78c;
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }

    .footer-link,
    .footer-external {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 40px;
      padding: 0 2px 4px;
      color: rgba(243, 238, 228, 0.82);
      text-decoration: none;
      font-size: 0.94rem;
      transition: color 180ms ease, transform 180ms ease;
    }

    .footer-link::after,
    .footer-external::after {
      content: "";
      position: absolute;
      left: 2px;
      right: 2px;
      bottom: 6px;
      height: 1.5px;
      border-radius: 99px;
      background: linear-gradient(90deg, #d4af5a, #f0d78c);
      transform: scaleX(0);
      transform-origin: center;
      transition: transform 180ms ease;
    }

    .footer-link:hover,
    .footer-link:focus-visible,
    .footer-external:hover,
    .footer-external:focus-visible {
      color: #f3eee4;
      transform: translateY(-2px);
    }

    .footer-link:hover::after,
    .footer-link:focus-visible::after,
    .footer-external:hover::after,
    .footer-external:focus-visible::after {
      transform: scaleX(1);
    }

    .footer-link:active,
    .footer-external:active,
    .footer-brand-link:active {
      transform: translateY(0) scale(0.96);
    }

    .footer-team {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer-person {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .footer-person strong {
      font-size: 0.98rem;
      font-weight: 650;
      color: #f3eee4;
    }

    .footer-role {
      font-size: 0.82rem;
      color: #d4af5a;
    }

    .footer-id {
      font-size: 0.75rem;
    }

    .footer-bottom {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 28px;
      padding-top: 18px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    .footer-disclaimer {
      margin: 0;
      max-width: 70ch;
      font-size: 0.82rem;
      line-height: 1.55;
    }

    .footer-meta {
      margin: 0;
      font-size: 0.8rem;
      line-height: 1.5;
    }

    @media (min-width: 720px) {
      .footer-grid {
        grid-template-columns: 1.3fr 1fr 1fr;
      }

      .footer-shell {
        padding: 32px 28px 22px;
      }
    }

    @media (min-width: 1020px) {
      .footer-grid {
        grid-template-columns: 1.4fr 0.9fr 0.9fr 1.2fr;
        gap: 32px;
      }

      .footer-bottom {
        flex-direction: row;
        justify-content: space-between;
        align-items: end;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .footer-link,
      .footer-external,
      .footer-brand-link,
      .footer-link::after,
      .footer-external::after {
        transition: none !important;
      }
    }
  `;

  document.head.appendChild(style);
}

export default function Footer() {
  const navigate = useNavigate();

  useEffect(() => {
    injectFooterStyles();
  }, []);

  const handleNavigation = (event, to, hash) => {
    event.preventDefault();

    const nextHash =
      hash || (to.includes('#') ? `#${to.split('#')[1]}` : '');

    const nextPath = to.split('#')[0] || '/';

    if (nextHash && nextPath === '/') {
      if (window.location.pathname !== '/') {
        navigate({
          pathname: '/',
          hash: nextHash.replace('#', ''),
        });

        return;
      }

      if (nextHash === '#top') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        navigate(
          {
            pathname: '/',
            hash: 'top',
          },
          {
            replace: true,
          }
        );

        return;
      }

      const section = document.querySelector(nextHash);

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        navigate(
          {
            pathname: '/',
            hash: nextHash.replace('#', ''),
          },
          {
            replace: true,
          }
        );
      }

      return;
    }

    navigate(nextPath);
  };

  return (
    <footer className="site-footer">
      <div className="footer-glow footer-glow--gold" />
      <div className="footer-glow footer-glow--green" />

      <div className="footer-shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link
              to="/"
              className="footer-brand-link"
              onClick={(event) =>
                handleNavigation(event, ROUTES.home, '#top')
              }
              aria-label="FinEdAI home"
            >
              <LogoMark />

              <span className="footer-wordmark">
                FinEd<span>AI</span>
              </span>
            </Link>

            <p className="footer-tagline">
              An AI funding support agent for Kenyan students. It helps you
              read statements, explain hardship, match bursaries and draft
              appeals. It does not replace HELB, HEF or any funding office.
            </p>
          </div>

          <div>
            <h2 className="footer-heading">Product</h2>

            <nav className="footer-links" aria-label="Product">
              {productLinks.map((item) => (
                <Link
                  key={item.label}
                  to={
                    item.hash
                      ? {
                          pathname: '/',
                          hash: item.hash.replace('#', ''),
                        }
                      : item.to
                  }
                  className="footer-link"
                  onClick={(event) =>
                    handleNavigation(event, item.to, item.hash)
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="footer-heading">Tools</h2>

            <nav className="footer-links" aria-label="Tools">
              {toolLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="footer-link"
                  onClick={(event) =>
                    handleNavigation(event, item.to)
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="footer-heading">Project team</h2>

            <div className="footer-team">
              {teamMembers.map((member) => (
                <div className="footer-person" key={member.id}>
                  <strong>{member.name}</strong>
                  <span className="footer-role">{member.role}</span>
                  <span className="footer-id">{member.id}</span>
                </div>
              ))}
            </div>

            <h2
              className="footer-heading"
              style={{ marginTop: 22 }}
            >
              Official sources
            </h2>

            <nav
              className="footer-links"
              aria-label="Official sources"
            >
              {officialLinks.map((item) => (
                <a
                  key={item.href}
                  className="footer-external"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                  <ArrowIcon />
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-disclaimer">
            FinEdAI is a St. Paul&apos;s University School of Communication
            and Computer Science project for BCS 2104 Artificial Intelligence.
            Drafts must be reviewed by the student before submission. Never
            enter an M-Pesa PIN, bank password or account login here.
          </p>

          <p className="footer-meta">
            © {new Date().getFullYear()} FinEdAI · St. Paul&apos;s University
            · Lead developer: Meison Njonjo
          </p>
        </div>
      </div>
    </footer>
  );
}
