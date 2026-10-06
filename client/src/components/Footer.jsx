import React from 'react';

const footerStyles = `
  .finedai-footer {
    position: relative;
    z-index: 5;
    width: 100%;
    margin-top: auto;
    overflow: hidden;
    padding: 72px 20px 20px;
    color: #edf5ee;
    background:
      radial-gradient(circle at 12% 15%, rgba(105, 157, 119, 0.3), transparent 24rem),
      radial-gradient(circle at 88% 35%, rgba(213, 189, 135, 0.2), transparent 22rem),
      linear-gradient(135deg, #243d2d 0%, #17271d 100%);
    isolation: isolate;
  }

  .finedai-footer *,
  .finedai-footer *::before,
  .finedai-footer *::after {
    box-sizing: border-box;
  }

  .finedai-footer__orb {
    position: absolute;
    pointer-events: none;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  .finedai-footer__orb--gold {
    top: -210px;
    right: -80px;
    width: 430px;
    height: 430px;
  }

  .finedai-footer__orb--green {
    bottom: -250px;
    left: -130px;
    width: 480px;
    height: 480px;
  }

  .finedai-footer__panel {
    position: relative;
    z-index: 2;
    width: min(1180px, 100%);
    margin: 0 auto;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 26px;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04)),
      rgba(14, 32, 21, 0.52);
    box-shadow:
      0 28px 70px rgba(4, 16, 8, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(24px) saturate(125%);
    -webkit-backdrop-filter: blur(24px) saturate(125%);
    transition:
      border-color 300ms ease,
      box-shadow 300ms ease,
      transform 300ms ease;
  }

  .finedai-footer__panel:hover {
    border-color: rgba(213, 189, 135, 0.42);
    box-shadow:
      0 34px 80px rgba(4, 16, 8, 0.42),
      0 0 35px rgba(213, 189, 135, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.23);
    transform: translateY(-4px);
  }

  .finedai-footer__main {
    display: grid;
    padding: 48px;
    grid-template-columns: 1.25fr 0.7fr 0.85fr;
    gap: 60px;
  }

  .finedai-footer__brand {
    display: inline-block;
    color: #ffffff;
    font-family: 'Space Grotesk', 'DM Sans', sans-serif;
    font-size: 29px;
    font-weight: 700;
    letter-spacing: -0.08em;
    line-height: 1;
    text-decoration: none;
    transition:
      color 220ms ease,
      transform 220ms ease,
      filter 220ms ease;
  }

  .finedai-footer__brand span {
    color: #d5bd87;
  }

  .finedai-footer__brand:hover {
    color: #ffffff;
    filter: drop-shadow(0 0 16px rgba(213, 189, 135, 0.48));
    transform: translateY(-3px);
  }

  .finedai-footer__description {
    max-width: 370px;
    margin: 20px 0 24px;
    color: rgba(237, 245, 238, 0.7);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    line-height: 1.75;
  }

  .finedai-footer__safety {
    display: inline-flex;
    align-items: center;
    max-width: 380px;
    padding: 11px 13px;
    border: 1px solid rgba(213, 189, 135, 0.25);
    border-radius: 13px;
    color: rgba(239, 246, 239, 0.82);
    background: rgba(255, 255, 255, 0.06);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    line-height: 1.45;
    gap: 10px;
    transition:
      background 220ms ease,
      border-color 220ms ease,
      transform 220ms ease,
      box-shadow 220ms ease;
  }

  .finedai-footer__safety:hover {
    border-color: rgba(213, 189, 135, 0.5);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 24px rgba(4, 16, 8, 0.2);
    transform: translateY(-3px);
  }

  .finedai-footer__shield {
    display: grid;
    flex: 0 0 auto;
    width: 31px;
    height: 31px;
    place-items: center;
    border-radius: 9px;
    color: #d5bd87;
    background: rgba(213, 189, 135, 0.14);
  }

  .finedai-footer__column-title {
    margin: 2px 0 22px;
    color: #d5bd87;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .finedai-footer__links {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .finedai-footer__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 170px;
    color: rgba(237, 245, 238, 0.7);
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    text-decoration: none;
    transition:
      color 220ms ease,
      transform 220ms ease;
  }

  .finedai-footer__link svg {
    color: #d5bd87;
    opacity: 0;
    transform: translateX(-5px);
    transition:
      opacity 220ms ease,
      transform 220ms ease;
  }

  .finedai-footer__link:hover {
    color: #ffffff;
    transform: translateX(6px);
  }

  .finedai-footer__link:hover svg {
    opacity: 1;
    transform: translateX(0);
  }

  .finedai-footer__team {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .finedai-footer__person {
    display: flex;
    align-items: center;
    padding: 7px;
    margin: -7px;
    border: 1px solid transparent;
    border-radius: 13px;
    gap: 10px;
    transition:
      background 220ms ease,
      border-color 220ms ease,
      transform 220ms ease;
  }

  .finedai-footer__person:hover {
    border-color: rgba(213, 189, 135, 0.22);
    background: rgba(255, 255, 255, 0.07);
    transform: translateX(5px);
  }

  .finedai-footer__initials {
    display: grid;
    flex: 0 0 auto;
    width: 34px;
    height: 34px;
    place-items: center;
    border: 1px solid rgba(213, 189, 135, 0.35);
    border-radius: 50%;
    color: #d5bd87;
    background: rgba(255, 255, 255, 0.08);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 9px;
    font-weight: 700;
    transition:
      color 220ms ease,
      background 220ms ease,
      transform 220ms ease,
      box-shadow 220ms ease;
  }

  .finedai-footer__person:hover .finedai-footer__initials {
    color: #ffffff;
    background: rgba(213, 189, 135, 0.22);
    box-shadow: 0 0 18px rgba(213, 189, 135, 0.25);
    transform: rotate(-8deg) scale(1.08);
  }

  .finedai-footer__person-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .finedai-footer__person-info strong {
    color: rgba(255, 255, 255, 0.9);
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
  }

  .finedai-footer__person-info small {
    color: rgba(237, 245, 238, 0.53);
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
  }

  .finedai-footer__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 62px;
    padding: 0 48px;
    border-top: 1px solid rgba(255, 255, 255, 0.13);
    color: rgba(237, 245, 238, 0.52);
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    gap: 20px;
  }

  .finedai-footer__status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .finedai-footer__status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #91c69b;
    box-shadow: 0 0 0 4px rgba(145, 198, 155, 0.12);
    animation: finedaiFooterPulse 2.4s ease-in-out infinite;
  }

  @keyframes finedaiFooterPulse {
    0%,
    100% {
      opacity: 0.6;
      box-shadow: 0 0 0 3px rgba(145, 198, 155, 0.1);
    }

    50% {
      opacity: 1;
      box-shadow:
        0 0 0 7px rgba(145, 198, 155, 0.07),
        0 0 16px rgba(145, 198, 155, 0.5);
    }
  }

  @media (max-width: 850px) {
    .finedai-footer__main {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }

    .finedai-footer__brand-column {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 620px) {
    .finedai-footer {
      padding: 52px 12px 12px;
    }

    .finedai-footer__main {
      display: flex;
      flex-direction: column;
      padding: 32px 24px;
      gap: 36px;
    }

    .finedai-footer__description {
      max-width: none;
    }

    .finedai-footer__bottom {
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      min-height: 145px;
      padding: 19px 24px;
      gap: 12px;
    }

    .finedai-footer__panel:hover {
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .finedai-footer__status-dot {
      animation: none;
    }

    .finedai-footer__panel:hover,
    .finedai-footer__person:hover,
    .finedai-footer__link:hover,
    .finedai-footer__brand:hover {
      transform: none;
    }
  }
`;

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 20 6v5c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V6z" />
      <path d="m8.5 12 2.2 2.2 4.8-4.8" />
    </svg>
  );
}

const links = [
  ['How it works', '#how-it-works'],
  ['Capabilities', '#capabilities'],
  ['Opportunities', '#opportunities'],
  ['Start the demo', '#start'],
];

const developers = [
  ['MN', 'Meison Njono', 'Main Developer'],
  ['RM', 'Roselynee Momanyi', 'Developer'],
  ['MW', 'Morris Wambugu', 'Developer'],
];

function scrollToSection(event, selector) {
  event.preventDefault();

  const target = document.querySelector(selector);

  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

export default function Footer() {
  return (
    <>
      <style>{footerStyles}</style>

      <footer className="finedai-footer">
        <span className="finedai-footer__orb finedai-footer__orb--gold" />
        <span className="finedai-footer__orb finedai-footer__orb--green" />

        <div className="finedai-footer__panel">
          <div className="finedai-footer__main">
            <section className="finedai-footer__brand-column">
              <a
                href="#top"
                className="finedai-footer__brand"
                onClick={(event) => scrollToSection(event, '#top')}
              >
                FinEd<span>AI</span>
              </a>

              <p className="finedai-footer__description">
                An AI-assisted funding support experience helping
                Kenyan students organise their financial story,
                prepare clearer appeals, and discover relevant
                education opportunities.
              </p>

              <div className="finedai-footer__safety">
                <span className="finedai-footer__shield">
                  <ShieldIcon />
                </span>

                <span>
                  Built to assist students, not make official funding
                  decisions.
                </span>
              </div>
            </section>

            <section>
              <h3 className="finedai-footer__column-title">
                Explore
              </h3>

              <nav className="finedai-footer__links">
                {links.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="finedai-footer__link"
                    onClick={(event) =>
                      scrollToSection(event, href)
                    }
                  >
                    <span>{label}</span>
                    <ArrowIcon />
                  </a>
                ))}
              </nav>
            </section>

            <section>
              <h3 className="finedai-footer__column-title">
                Project team
              </h3>

              <div className="finedai-footer__team">
                {developers.map(([initials, name, role]) => (
                  <div
                    key={name}
                    className="finedai-footer__person"
                  >
                    <span className="finedai-footer__initials">
                      {initials}
                    </span>

                    <span className="finedai-footer__person-info">
                      <strong>{name}</strong>
                      <small>{role}</small>
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="finedai-footer__bottom">
            <span>© 2026 FinEdAI</span>

            <span className="finedai-footer__status">
              <span className="finedai-footer__status-dot" />
              Designed for clearer student support journeys
            </span>

            <span>Frontend concept in progress</span>
          </div>
        </div>
      </footer>
    </>
  );
}
