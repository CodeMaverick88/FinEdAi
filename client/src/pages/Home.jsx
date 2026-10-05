import React from 'react';
import { Link } from 'react-router-dom';

function Icon({ name, size = 20 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.7',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };

  const icons = {
    arrow: (
      <>
        <path d="M5 12h13" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),

    shield: (
      <>
        <path d="M12 3 20 6v5c0 5-3.2 8.5-8 10-4.8-1.5-8-5-8-10V6z" />
        <path d="m8.5 12 2.2 2.2 4.8-4.8" />
      </>
    ),

    document: (
      <>
        <path d="M6 3.5h8l4 4V20.5H6z" />
        <path d="M14 3.5v4h4" />
        <path d="M9 12h6M9 16h4" />
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

    check: (
      <>
        <path d="m5 12 4.2 4.2L19 6.5" />
      </>
    ),

    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),

    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </>
    ),

    upload: (
      <>
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 19h14" />
      </>
    ),

    arrowUp: (
      <>
        <path d="M12 19V5" />
        <path d="m6 11 6-6 6 6" />
      </>
    ),
  };

  return <svg {...props}>{icons[name]}</svg>;
}

const capabilities = [
  {
    number: '01',
    icon: 'document',
    title: 'Understand your evidence',
    text: 'Organise M-Pesa statements, bank records, receipts, and supporting documents in one clear place.',
    tone: 'green',
  },
  {
    number: '02',
    icon: 'chart',
    title: 'See the bigger picture',
    text: 'Understand possible income patterns, essential expenses, low-balance periods, and hardship signals.',
    tone: 'gold',
  },
  {
    number: '03',
    icon: 'spark',
    title: 'Prepare a stronger appeal',
    text: 'Answer guided questions and shape your real situation into a clear, reviewable appeal draft.',
    tone: 'green',
  },
  {
    number: '04',
    icon: 'compass',
    title: 'Find relevant support',
    text: 'Explore bursaries, scholarships, grants, and education opportunities that may fit your profile.',
    tone: 'gold',
  },
];

const opportunities = [
  {
    type: 'University support',
    title: 'Need-based student assistance',
    fit: 'Strong fit',
    deadline: 'Closes in 12 days',
    tone: 'green',
  },
  {
    type: 'County bursary',
    title: 'Education support fund',
    fit: 'Good fit',
    deadline: 'Closes in 19 days',
    tone: 'gold',
  },
  {
    type: 'Scholarship',
    title: 'STEM student opportunity',
    fit: 'Review eligibility',
    deadline: 'Closes in 27 days',
    tone: 'blue',
  },
];

const homeStyles = `
  .finedai-home {
    --home-text: #243129;
    --home-text-soft: #6e7c73;
    --home-text-muted: #96a29a;
    --home-green: #52755d;
    --home-green-dark: #345640;
    --home-green-light: #a4bca5;
    --home-gold: #b69860;
    --home-gold-light: #d5bd87;
    --home-border: rgba(58, 84, 66, 0.13);
    --home-white: #ffffff;

    width: 100%;
    overflow: hidden;
    color: var(--home-text);
    background:
      radial-gradient(
        circle at 86% 7%,
        rgba(213, 189, 135, 0.15),
        transparent 25rem
      ),
      linear-gradient(135deg, #fbfcfa 0%, #f1f6f1 100%);
  }

  .finedai-home *,
  .finedai-home *::before,
  .finedai-home *::after {
    box-sizing: border-box;
  }

  .finedai-home a {
    color: inherit;
    text-decoration: none;
  }

  .finedai-home__container {
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto;
  }

  .finedai-home__hero {
    position: relative;
    min-height: 680px;
    padding: 70px 0 55px;
    isolation: isolate;
  }

  .finedai-home__hero::before {
    position: absolute;
    top: 0;
    right: 12%;
    z-index: -1;
    width: 420px;
    height: 420px;
    content: '';
    border-radius: 50%;
    background: rgba(168, 199, 173, 0.18);
    filter: blur(48px);
  }

  .finedai-home__hero::after {
    position: absolute;
    right: -13rem;
    bottom: -16rem;
    z-index: -1;
    width: 440px;
    height: 440px;
    content: '';
    border: 1px solid rgba(182, 152, 96, 0.12);
    border-radius: 50%;
  }

  .finedai-home__hero-grid {
    display: grid;
    min-height: 550px;
    align-items: center;
    grid-template-columns: minmax(0, 0.92fr) minmax(460px, 1.08fr);
    gap: 35px;
  }

  .finedai-home__hero-copy {
    max-width: 610px;
  }

  .finedai-home__eyebrow,
  .finedai-home__kicker {
    display: inline-flex;
    align-items: center;
    color: var(--home-green);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  .finedai-home__eyebrow {
    margin-bottom: 22px;
    gap: 9px;
  }

  .finedai-home__eyebrow-dot {
    width: 7px;
    height: 7px;
    border: 2px solid var(--home-gold);
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(182, 152, 96, 0.12);
  }

  .finedai-home h1 {
    max-width: 650px;
    margin: 0;
    color: var(--home-text);
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(3.2rem, 5.8vw, 5.5rem);
    font-weight: 600;
    letter-spacing: -0.085em;
    line-height: 0.98;
  }

  .finedai-home__hero-highlight {
    color: var(--home-green);
  }

  .finedai-home__hero-description {
    max-width: 520px;
    margin: 28px 0 0;
    color: var(--home-text-soft);
    font-size: 17px;
    line-height: 1.7;
  }

  .finedai-home__hero-actions {
    display: flex;
    align-items: center;
    margin-top: 34px;
    gap: 23px;
  }

  .finedai-home__button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 51px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 700;
    gap: 10px;
    transition:
      transform 220ms ease,
      box-shadow 220ms ease,
      background 220ms ease;
  }

  .finedai-home__button--primary {
    padding: 0 19px;
    border: 1px solid rgba(182, 152, 96, 0.45);
    color: #ffffff;
    background: linear-gradient(
      135deg,
      var(--home-green),
      var(--home-green-dark)
    );
    box-shadow:
      0 10px 22px rgba(52, 86, 64, 0.17),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }

  .finedai-home__button--primary:hover {
    transform: translateY(-3px);
    box-shadow:
      0 15px 28px rgba(52, 86, 64, 0.21),
      0 0 25px rgba(182, 152, 96, 0.17);
  }

  .finedai-home__button--quiet {
    position: relative;
    min-height: 40px;
    padding: 0;
    color: var(--home-green-dark);
  }

  .finedai-home__button--quiet::after {
    position: absolute;
    right: 28px;
    bottom: 5px;
    left: 0;
    height: 1px;
    content: '';
    background: var(--home-gold);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 220ms ease;
  }

  .finedai-home__button--quiet:hover {
    transform: translateY(-2px);
  }

  .finedai-home__button--quiet:hover::after {
    transform: scaleX(1);
  }

  .finedai-home__trust {
    display: flex;
    align-items: center;
    max-width: 480px;
    margin-top: 39px;
    padding-top: 18px;
    border-top: 1px solid var(--home-border);
    color: var(--home-text-soft);
    gap: 12px;
  }

  .finedai-home__trust-icon {
    display: grid;
    flex: 0 0 auto;
    width: 35px;
    height: 35px;
    place-items: center;
    border: 1px solid rgba(82, 117, 93, 0.17);
    border-radius: 10px;
    color: var(--home-green);
    background: rgba(255, 255, 255, 0.7);
  }

  .finedai-home__trust strong,
  .finedai-home__trust span {
    display: block;
  }

  .finedai-home__trust strong {
    color: var(--home-text);
    font-size: 12px;
  }

  .finedai-home__trust span {
    margin-top: 3px;
    font-size: 11px;
  }

  /* PRODUCT PREVIEW */

  .finedai-home__visual {
    position: relative;
    min-height: 490px;
  }

  .finedai-home__visual-glow {
    position: absolute;
    top: 13%;
    right: 10%;
    width: 380px;
    height: 300px;
    border-radius: 50%;
    background: rgba(139, 177, 146, 0.25);
    filter: blur(45px);
    animation: finedaiSoftGlow 5s ease-in-out infinite;
  }

  @keyframes finedaiSoftGlow {
    0%,
    100% {
      opacity: 0.5;
      transform: scale(0.96);
    }

    50% {
      opacity: 0.85;
      transform: scale(1.07);
    }
  }

  .finedai-home__window {
    position: absolute;
    top: 42px;
    right: 1%;
    width: min(100%, 570px);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.9);
    border-radius: 25px;
    background:
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.93),
        rgba(232, 241, 234, 0.78)
      ),
      rgba(255, 255, 255, 0.7);
    box-shadow:
      0 34px 75px rgba(40, 65, 48, 0.15),
      0 0 0 8px rgba(255, 255, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.96);
    transform: rotateY(-5deg) rotateX(2deg);
    backdrop-filter: blur(22px);
    -webkit-backdrop-filter: blur(22px);
    animation: finedaiWindowFloat 7s ease-in-out infinite;
  }

  @keyframes finedaiWindowFloat {
    0%,
    100% {
      transform: rotateY(-5deg) rotateX(2deg) translateY(0);
    }

    50% {
      transform: rotateY(-5deg) rotateX(2deg) translateY(-8px);
    }
  }

  .finedai-home__window-top {
    display: flex;
    align-items: center;
    min-height: 48px;
    padding: 0 17px;
    border-bottom: 1px solid rgba(58, 84, 66, 0.08);
    gap: 13px;
  }

  .finedai-home__window-dots {
    display: flex;
    gap: 5px;
  }

  .finedai-home__window-dots span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #bdc9bd;
  }

  .finedai-home__window-dots span:first-child {
    background: var(--home-gold-light);
  }

  .finedai-home__window-label {
    color: #829087;
    font-size: 9px;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .finedai-home__window-status {
    display: inline-flex;
    align-items: center;
    margin-left: auto;
    color: var(--home-green);
    font-size: 9px;
    gap: 5px;
  }

  .finedai-home__window-status span {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #6eaa78;
    box-shadow: 0 0 0 3px rgba(110, 170, 120, 0.13);
  }

  .finedai-home__window-body {
    padding: 24px;
  }

  .finedai-home__window-welcome {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .finedai-home__caption {
    color: #8b978f;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .finedai-home__window h2 {
    margin: 7px 0 0;
    color: var(--home-text);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 26px;
    letter-spacing: -0.06em;
  }

  .finedai-home__avatar {
    display: grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border: 1px solid rgba(182, 152, 96, 0.38);
    border-radius: 50%;
    color: #ffffff;
    background: linear-gradient(135deg, #779781, #486c54);
    font-size: 10px;
    font-weight: 700;
  }

  .finedai-home__progress-card {
    margin-top: 26px;
    padding: 17px;
    border: 1px solid rgba(58, 84, 66, 0.1);
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.6);
  }

  .finedai-home__progress-top,
  .finedai-home__progress-labels {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .finedai-home__progress-top {
    color: #6f7d73;
    font-size: 11px;
  }

  .finedai-home__progress-top strong {
    color: var(--home-green-dark);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
  }

  .finedai-home__progress-line {
    height: 7px;
    margin-top: 13px;
    overflow: hidden;
    border-radius: 20px;
    background: #e3ebe3;
  }

  .finedai-home__progress-line span {
    display: block;
    width: 68%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #789e7e, #c3a56b);
  }

  .finedai-home__progress-labels {
    margin-top: 10px;
    color: #9aa59d;
    font-size: 9px;
  }

  .finedai-home__insight-grid {
    display: grid;
    margin-top: 12px;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .finedai-home__insight {
    display: flex;
    min-height: 128px;
    flex-direction: column;
    padding: 14px;
    border: 1px solid rgba(58, 84, 66, 0.09);
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.55);
  }

  .finedai-home__insight-icon {
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    border-radius: 9px;
    color: var(--home-green);
    background: rgba(111, 165, 121, 0.15);
  }

  .finedai-home__insight-icon--gold {
    color: var(--home-gold);
    background: rgba(203, 169, 103, 0.16);
  }

  .finedai-home__insight small {
    margin-top: 12px;
    color: #8d9890;
    font-size: 9px;
  }

  .finedai-home__insight strong {
    margin-top: 4px;
    color: var(--home-text);
    font-size: 12px;
  }

  .finedai-home__insight-link {
    margin-top: auto;
    color: var(--home-green);
    font-size: 9px;
    font-weight: 700;
  }

  .finedai-home__appeal-preview {
    display: flex;
    align-items: center;
    margin-top: 12px;
    padding: 13px;
    border: 1px solid rgba(182, 152, 96, 0.2);
    border-radius: 14px;
    background: linear-gradient(
      120deg,
      rgba(252, 247, 236, 0.85),
      rgba(255, 255, 255, 0.63)
    );
    gap: 10px;
  }

  .finedai-home__appeal-icon {
    display: grid;
    width: 31px;
    height: 31px;
    place-items: center;
    border-radius: 9px;
    color: var(--home-gold);
    background: rgba(182, 152, 96, 0.13);
  }

  .finedai-home__appeal-copy {
    display: flex;
    flex-direction: column;
  }

  .finedai-home__appeal-copy small {
    color: #8d9890;
    font-size: 9px;
  }

  .finedai-home__appeal-copy strong {
    margin-top: 3px;
    color: var(--home-text);
    font-size: 11px;
  }

  .finedai-home__appeal-preview > svg {
    margin-left: auto;
    color: var(--home-gold);
  }

  .finedai-home__floating-card {
    position: absolute;
    display: inline-flex;
    align-items: center;
    padding: 12px 14px;
    border: 1px solid rgba(255, 255, 255, 0.9);
    border-radius: 13px;
    color: var(--home-text);
    background: rgba(255, 255, 255, 0.82);
    box-shadow:
      0 16px 30px rgba(48, 74, 55, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
    font-size: 10px;
    font-weight: 700;
    gap: 8px;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    animation: finedaiCardFloat 6s ease-in-out infinite;
  }

  .finedai-home__floating-card--top {
    top: 4px;
    left: 0;
  }

  .finedai-home__floating-card--bottom {
    right: -3%;
    bottom: 25px;
    animation-delay: -2.4s;
  }

  @keyframes finedaiCardFloat {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-7px);
    }
  }

  .finedai-home__floating-check {
    display: grid;
    width: 25px;
    height: 25px;
    place-items: center;
    border-radius: 8px;
    color: #ffffff;
    background: var(--home-green);
  }

  .finedai-home__floating-number {
    color: var(--home-green);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 20px;
  }

  .finedai-home__floating-copy {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .finedai-home__floating-copy strong {
    font-size: 10px;
  }

  .finedai-home__floating-copy small {
    color: #8b978f;
    font-size: 9px;
  }

  .finedai-home__scroll-note {
    display: flex;
    align-items: center;
    color: #919e95;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    gap: 10px;
  }

  .finedai-home__scroll-line {
    width: 31px;
    height: 1px;
    background: var(--home-gold);
  }

  /* TRUST STRIP */

  .finedai-home__trust-strip {
    border-top: 1px solid rgba(58, 84, 66, 0.1);
    border-bottom: 1px solid rgba(58, 84, 66, 0.1);
    background: rgba(255, 255, 255, 0.45);
  }

  .finedai-home__trust-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 92px;
    gap: 25px;
  }

  .finedai-home__trust-intro {
    color: #86938a;
    font-size: 11px;
    font-weight: 600;
  }

  .finedai-home__trust-items {
    display: flex;
    align-items: center;
    gap: 27px;
  }

  .finedai-home__trust-item {
    display: inline-flex;
    align-items: center;
    color: var(--home-text-soft);
    font-size: 11px;
    font-weight: 600;
    gap: 8px;
  }

  .finedai-home__trust-item-icon {
    display: grid;
    width: 27px;
    height: 27px;
    place-items: center;
    border: 1px solid rgba(82, 117, 93, 0.15);
    border-radius: 8px;
    color: var(--home-green);
    background: rgba(255, 255, 255, 0.7);
  }

  /* GENERAL SECTIONS */

  .finedai-home__section {
    padding: 120px 0;
  }

  .finedai-home__section--how {
    background: rgba(255, 255, 255, 0.35);
  }

  .finedai-home__section-heading {
    max-width: 650px;
  }

  .finedai-home__section-heading--split {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    max-width: none;
    gap: 60px;
  }

  .finedai-home__section-heading--split > p {
    max-width: 390px;
    margin: 0 0 5px;
  }

  .finedai-home__section-heading h2,
  .finedai-home__cta h2 {
    margin: 15px 0 0;
    color: var(--home-text);
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.5rem, 4.7vw, 4.1rem);
    font-weight: 600;
    letter-spacing: -0.08em;
    line-height: 1;
  }

  .finedai-home__section-heading p {
    color: var(--home-text-soft);
    font-size: 15px;
    line-height: 1.7;
  }

  /* JOURNEY */

  .finedai-home__journey-line {
    position: relative;
    height: 1px;
    margin: 75px 0 47px;
    background: rgba(82, 117, 93, 0.16);
  }

  .finedai-home__journey-progress {
    position: absolute;
    top: -2px;
    left: 0;
    width: 34%;
    height: 5px;
    border-radius: 8px;
    background: linear-gradient(
      90deg,
      var(--home-green),
      var(--home-gold)
    );
    box-shadow: 0 0 14px rgba(82, 117, 93, 0.25);
  }

  .finedai-home__journey-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  .finedai-home__journey-number {
    color: var(--home-gold);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
  }

  .finedai-home__journey-step h3 {
    margin: 23px 0 10px;
    color: var(--home-text);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    letter-spacing: -0.04em;
  }

  .finedai-home__journey-step p {
    max-width: 220px;
    margin: 0;
    color: var(--home-text-soft);
    font-size: 13px;
    line-height: 1.65;
  }

  /* CAPABILITIES */

  .finedai-home__section--capabilities {
    background:
      radial-gradient(
        circle at 92% 10%,
        rgba(213, 189, 135, 0.13),
        transparent 27rem
      ),
      rgba(237, 243, 237, 0.45);
  }

  .finedai-home__capabilities-grid {
    display: grid;
    margin-top: 65px;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .finedai-home__capability {
    position: relative;
    min-height: 270px;
    padding: 26px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.85);
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.6);
    box-shadow:
      0 15px 32px rgba(42, 63, 49, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
    transition:
      transform 250ms ease,
      box-shadow 250ms ease,
      border-color 250ms ease;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }

  .finedai-home__capability:hover {
    border-color: rgba(182, 152, 96, 0.3);
    box-shadow:
      0 20px 42px rgba(42, 63, 49, 0.1),
      0 0 25px rgba(182, 152, 96, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.98);
    transform: translateY(-6px);
  }

  .finedai-home__capability-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .finedai-home__capability-number {
    color: #9daaa1;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
  }

  .finedai-home__capability-icon {
    display: grid;
    width: 41px;
    height: 41px;
    place-items: center;
    border-radius: 12px;
    color: var(--home-green);
    background: rgba(116, 158, 125, 0.13);
  }

  .finedai-home__capability--gold .finedai-home__capability-icon {
    color: var(--home-gold);
    background: rgba(182, 152, 96, 0.13);
  }

  .finedai-home__capability h3 {
    margin: 47px 0 11px;
    color: var(--home-text);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    letter-spacing: -0.06em;
  }

  .finedai-home__capability p {
    max-width: 410px;
    margin: 0;
    color: var(--home-text-soft);
    font-size: 13px;
    line-height: 1.65;
  }

  .finedai-home__capability-arrow {
    position: absolute;
    right: 27px;
    bottom: 27px;
    display: grid;
    width: 31px;
    height: 31px;
    place-items: center;
    border: 1px solid rgba(82, 117, 93, 0.16);
    border-radius: 50%;
    color: var(--home-green);
    transition:
      transform 220ms ease,
      color 220ms ease,
      background 220ms ease;
  }

  .finedai-home__capability:hover .finedai-home__capability-arrow {
    color: #ffffff;
    background: var(--home-green);
    transform: translateX(3px);
  }

  /* PRIVACY */

  .finedai-home__privacy {
    background: #f4f7f3;
  }

  .finedai-home__privacy-panel {
    display: grid;
    min-height: 410px;
    align-items: center;
    padding: 65px 75px;
    border: 1px solid rgba(255, 255, 255, 0.88);
    border-radius: 26px;
    background:
      linear-gradient(
        120deg,
        rgba(255, 255, 255, 0.92),
        rgba(234, 241, 235, 0.66)
      );
    box-shadow:
      0 22px 45px rgba(42, 63, 49, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.96);
    grid-template-columns: 1fr 0.7fr;
    gap: 80px;
  }

  .finedai-home__privacy-copy h2 {
    margin: 15px 0 17px;
    color: var(--home-text);
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.4rem, 4vw, 3.7rem);
    letter-spacing: -0.08em;
    line-height: 1;
  }

  .finedai-home__privacy-copy > p {
    max-width: 430px;
    margin: 0;
    color: var(--home-text-soft);
    font-size: 15px;
    line-height: 1.7;
  }

  .finedai-home__privacy-list {
    display: flex;
    max-width: 455px;
    flex-direction: column;
    margin: 28px 0 0;
    padding: 0;
    list-style: none;
    gap: 13px;
  }

  .finedai-home__privacy-list li {
    display: flex;
    align-items: center;
    color: var(--home-text);
    font-size: 12px;
    gap: 10px;
  }

  .finedai-home__privacy-list svg {
    flex: 0 0 auto;
    color: var(--home-green);
  }

  .finedai-home__privacy-visual {
    position: relative;
    display: grid;
    min-height: 270px;
    place-items: center;
  }

  .finedai-home__orbit {
    position: absolute;
    border: 1px solid rgba(82, 117, 93, 0.15);
    border-radius: 50%;
    transform: rotate(-19deg);
  }

  .finedai-home__orbit--outer {
    width: 260px;
    height: 160px;
  }

  .finedai-home__orbit--inner {
    width: 195px;
    height: 120px;
    transform: rotate(34deg);
  }

  .finedai-home__shield {
    position: relative;
    z-index: 1;
    display: flex;
    width: 145px;
    height: 145px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.9);
    border-radius: 38% 38% 45% 45%;
    color: var(--home-green);
    background: rgba(255, 255, 255, 0.8);
    box-shadow:
      0 18px 34px rgba(52, 86, 64, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 1);
    gap: 11px;
  }

  .finedai-home__shield span {
    color: var(--home-text);
    font-size: 11px;
    font-weight: 700;
  }

  /* OPPORTUNITIES */

  .finedai-home__opportunities {
    background: rgba(255, 255, 255, 0.52);
  }

  .finedai-home__opportunity-panel {
    margin-top: 62px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.85);
    border-radius: 21px;
    background: rgba(255, 255, 255, 0.58);
    box-shadow:
      0 16px 36px rgba(42, 63, 49, 0.07),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
  }

  .finedai-home__opportunity-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 4px 4px 20px;
    gap: 20px;
  }

  .finedai-home__opportunity-header h3 {
    margin: 8px 0 0;
    color: var(--home-text);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    letter-spacing: -0.06em;
  }

  .finedai-home__text-link {
    display: inline-flex;
    align-items: center;
    color: var(--home-green);
    font-size: 12px;
    font-weight: 700;
    gap: 7px;
  }

  .finedai-home__text-link:hover {
    color: var(--home-gold);
  }

  .finedai-home__opportunity-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .finedai-home__opportunity-row {
    display: flex;
    align-items: center;
    min-height: 78px;
    padding: 12px 15px;
    border: 1px solid rgba(58, 84, 66, 0.08);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.54);
    transition:
      transform 220ms ease,
      border-color 220ms ease,
      background 220ms ease;
    gap: 13px;
  }

  .finedai-home__opportunity-row:hover {
    border-color: rgba(182, 152, 96, 0.25);
    background: rgba(255, 255, 255, 0.88);
    transform: translateX(4px);
  }

  .finedai-home__opportunity-icon {
    display: grid;
    flex: 0 0 auto;
    width: 38px;
    height: 38px;
    place-items: center;
    border-radius: 11px;
    color: var(--home-green);
    background: rgba(116, 158, 125, 0.14);
  }

  .finedai-home__opportunity-icon--gold {
    color: var(--home-gold);
    background: rgba(182, 152, 96, 0.13);
  }

  .finedai-home__opportunity-icon--blue {
    color: #68889d;
    background: rgba(105, 142, 165, 0.13);
  }

  .finedai-home__opportunity-main {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 5px;
  }

  .finedai-home__opportunity-main span {
    color: #909d94;
    font-size: 10px;
  }

  .finedai-home__opportunity-main strong {
    overflow: hidden;
    color: var(--home-text);
    font-size: 13px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .finedai-home__opportunity-fit {
    display: flex;
    min-width: 140px;
    flex-direction: column;
    margin-left: auto;
    gap: 5px;
  }

  .finedai-home__opportunity-fit strong {
    color: var(--home-green);
    font-size: 11px;
  }

  .finedai-home__opportunity-fit span {
    display: inline-flex;
    align-items: center;
    color: #919d95;
    font-size: 10px;
    gap: 4px;
  }

  .finedai-home__opportunity-row > svg {
    color: #9fac9f;
  }

  /* CTA */

  .finedai-home__cta {
    position: relative;
    overflow: hidden;
    padding: 125px 0;
    color: #ffffff;
    background: linear-gradient(135deg, #345740, #4d7058);
    isolation: isolate;
  }

  .finedai-home__cta::before {
    position: absolute;
    top: -14rem;
    right: -8rem;
    width: 39rem;
    height: 39rem;
    content: '';
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 50%;
  }

  .finedai-home__cta::after {
    position: absolute;
    right: 20%;
    bottom: -19rem;
    width: 36rem;
    height: 36rem;
    content: '';
    border: 1px solid rgba(213, 189, 135, 0.23);
    border-radius: 50%;
  }

  .finedai-home__cta-content {
    position: relative;
    z-index: 2;
    text-align: center;
  }

  .finedai-home__cta .finedai-home__kicker {
    color: var(--home-gold-light);
  }

  .finedai-home__cta h2 {
    color: #ffffff;
  }

  .finedai-home__cta p {
    max-width: 440px;
    margin: 24px auto 31px;
    color: rgba(255, 255, 255, 0.75);
    font-size: 15px;
    line-height: 1.7;
  }

  .finedai-home__button--light {
    color: var(--home-green-dark);
    background: #ffffff;
    box-shadow:
      0 11px 25px rgba(21, 49, 31, 0.2),
      0 0 20px rgba(213, 189, 135, 0.18);
  }

  .finedai-home__button--light:hover {
    background: #fffdf7;
  }

  /* FOOTER */

  .finedai-home__footer {
    color: #839087;
    background: #f1f5f0;
  }

  .finedai-home__footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 86px;
    font-size: 10px;
    gap: 20px;
  }

  .finedai-home__footer-brand {
    color: var(--home-text);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.05em;
  }

  .finedai-home__footer-brand span {
    color: var(--home-green);
  }

  /* TABLET */

  @media (max-width: 1000px) {
    .finedai-home__hero-grid {
      grid-template-columns: minmax(0, 0.9fr) minmax(410px, 1.1fr);
      gap: 20px;
    }

    .finedai-home__window {
      right: -2%;
    }

    .finedai-home__floating-card--bottom {
      right: -8%;
    }

    .finedai-home__privacy-panel {
      padding: 55px;
      gap: 35px;
    }
  }

  /* MOBILE/TABLET */

  @media (max-width: 850px) {
    .finedai-home__hero {
      padding-top: 45px;
    }

    .finedai-home__hero-grid {
      display: flex;
      min-height: auto;
      flex-direction: column;
      align-items: stretch;
      gap: 45px;
    }

    .finedai-home__hero-copy {
      max-width: 670px;
    }

    .finedai-home__visual {
      width: min(100%, 620px);
      min-height: 480px;
      margin: 0 auto;
    }

    .finedai-home__section-heading--split {
      display: block;
    }

    .finedai-home__section-heading--split > p {
      max-width: 520px;
      margin-top: 24px;
    }

    .finedai-home__privacy-panel {
      grid-template-columns: 1fr;
    }

    .finedai-home__privacy-visual {
      min-height: 235px;
    }
  }

  @media (max-width: 680px) {
    .finedai-home__container {
      width: min(100% - 28px, 1180px);
    }

    .finedai-home__hero {
      min-height: auto;
      padding-top: 35px;
      padding-bottom: 45px;
    }

    .finedai-home h1 {
      font-size: clamp(3rem, 14vw, 4.6rem);
    }

    .finedai-home__hero-description {
      font-size: 15px;
    }

    .finedai-home__hero-actions {
      align-items: stretch;
      flex-direction: column;
      gap: 10px;
    }

    .finedai-home__button--primary {
      width: 100%;
    }

    .finedai-home__button--quiet {
      width: fit-content;
    }

    .finedai-home__visual {
      min-height: 425px;
    }

    .finedai-home__window {
      top: 30px;
      right: 0;
      width: 100%;
      transform: none;
      animation: none;
    }

    .finedai-home__floating-card--top {
      top: 0;
      left: -3px;
    }

    .finedai-home__floating-card--bottom {
      right: -3px;
      bottom: 5px;
    }

    .finedai-home__trust-inner {
      align-items: flex-start;
      flex-direction: column;
      padding: 22px 0;
      gap: 16px;
    }

    .finedai-home__trust-items {
      align-items: flex-start;
      flex-direction: column;
      gap: 11px;
    }

    .finedai-home__section {
      padding: 85px 0;
    }

    .finedai-home__section-heading h2,
    .finedai-home__cta h2 {
      font-size: 2.8rem;
    }

    .finedai-home__journey-line {
      margin: 49px 0 30px;
    }

    .finedai-home__journey-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 35px 18px;
    }

    .finedai-home__journey-step p {
      max-width: none;
    }

    .finedai-home__capabilities-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .finedai-home__capability {
      min-height: 230px;
    }

    .finedai-home__privacy-panel {
      padding: 40px 24px;
    }

    .finedai-home__opportunity-panel {
      padding: 16px;
    }

    .finedai-home__opportunity-header {
      align-items: flex-start;
      flex-direction: column;
      gap: 16px;
    }

    .finedai-home__opportunity-row {
      align-items: flex-start;
      min-height: 90px;
    }

    .finedai-home__opportunity-fit {
      display: none;
    }

    .finedai-home__opportunity-row > svg {
      margin-left: auto;
    }

    .finedai-home__cta {
      padding: 100px 0;
    }

    .finedai-home__footer-inner {
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;
      min-height: 140px;
      padding: 22px 0;
      gap: 9px;
    }
  }

  @media (max-width: 440px) {
    .finedai-home h1 {
      font-size: 3.1rem;
    }

    .finedai-home__visual {
      min-height: 385px;
    }

    .finedai-home__window-body {
      padding: 17px;
    }

    .finedai-home__window h2 {
      font-size: 22px;
    }

    .finedai-home__insight-grid {
      gap: 7px;
    }

    .finedai-home__insight {
      min-height: 116px;
      padding: 10px;
    }

    .finedai-home__insight strong {
      font-size: 10px;
    }

    .finedai-home__floating-card {
      padding: 9px 10px;
      font-size: 9px;
    }

    .finedai-home__journey-grid {
      grid-template-columns: 1fr;
    }

    .finedai-home__journey-step p {
      max-width: 280px;
    }

    .finedai-home__privacy-visual {
      transform: scale(0.83);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .finedai-home__visual-glow,
    .finedai-home__window,
    .finedai-home__floating-card {
      animation: none;
    }
  }
`;

export default function Home() {
  return (
    <>
      <style>{homeStyles}</style>

      <div className="finedai-home">
        <section className="finedai-home__hero">
          <div className="finedai-home__container finedai-home__hero-grid">
            <div className="finedai-home__hero-copy">
              <div className="finedai-home__eyebrow">
                <span className="finedai-home__eyebrow-dot" />
                AI support for your funding journey
              </div>

              <h1>
                Your story deserves
                <span className="finedai-home__hero-highlight">
                  {' '}
                  to be understood.
                </span>
              </h1>

              <p className="finedai-home__hero-description">
                FinEdAI helps Kenyan students organise their financial
                story, understand their hardship, discover relevant
                support, and prepare clearer appeals.
              </p>

              <div className="finedai-home__hero-actions">
                <Link
                  to="/dashboard"
                  className="finedai-home__button finedai-home__button--primary"
                >
                  Explore the demo
                  <Icon name="arrow" size={18} />
                </Link>

                <a
                  href="#how-it-works"
                  className="finedai-home__button finedai-home__button--quiet"
                >
                  See how it works
                  <Icon name="arrow" size={17} />
                </a>
              </div>

              <div className="finedai-home__trust">
                <span className="finedai-home__trust-icon">
                  <Icon name="shield" size={18} />
                </span>

                <div>
                  <strong>
                    Built with care for sensitive information
                  </strong>

                  <span>
                    No M-Pesa PINs. No bank passwords. No automatic
                    submissions.
                  </span>
                </div>
              </div>
            </div>

            <div className="finedai-home__visual">
              <div className="finedai-home__visual-glow" />

              <div className="finedai-home__window">
                <div className="finedai-home__window-top">
                  <div className="finedai-home__window-dots">
                    <span />
                    <span />
                    <span />
                  </div>

                  <span className="finedai-home__window-label">
                    finedai / your progress
                  </span>

                  <span className="finedai-home__window-status">
                    <span />
                    Secure workspace
                  </span>
                </div>

                <div className="finedai-home__window-body">
                  <div className="finedai-home__window-welcome">
                    <div>
                      <span className="finedai-home__caption">
                        Good morning, Amina
                      </span>

                      <h2>Your funding story</h2>
                    </div>

                    <div className="finedai-home__avatar">AM</div>
                  </div>

                  <div className="finedai-home__progress-card">
                    <div className="finedai-home__progress-top">
                      <span>Journey progress</span>
                      <strong>68%</strong>
                    </div>

                    <div className="finedai-home__progress-line">
                      <span />
                    </div>

                    <div className="finedai-home__progress-labels">
                      <span>Evidence organised</span>
                      <span>2 steps left</span>
                    </div>
                  </div>

                  <div className="finedai-home__insight-grid">
                    <div className="finedai-home__insight">
                      <span className="finedai-home__insight-icon">
                        <Icon name="chart" size={17} />
                      </span>

                      <small>Hardship signal</small>
                      <strong>Needs context</strong>

                      <span className="finedai-home__insight-link">
                        Review summary
                      </span>
                    </div>

                    <div className="finedai-home__insight">
                      <span className="finedai-home__insight-icon finedai-home__insight-icon--gold">
                        <Icon name="compass" size={17} />
                      </span>

                      <small>Opportunities</small>
                      <strong>8 possible matches</strong>

                      <span className="finedai-home__insight-link">
                        Explore options
                      </span>
                    </div>
                  </div>

                  <div className="finedai-home__appeal-preview">
                    <span className="finedai-home__appeal-icon">
                      <Icon name="spark" size={18} />
                    </span>

                    <span className="finedai-home__appeal-copy">
                      <small>Appeal coach</small>
                      <strong>Your draft is ready to review</strong>
                    </span>

                    <Icon name="arrow" size={17} />
                  </div>
                </div>
              </div>

              <div className="finedai-home__floating-card finedai-home__floating-card--top">
                <span className="finedai-home__floating-check">
                  <Icon name="check" size={15} />
                </span>

                <span>Statement organised</span>
              </div>

              <div className="finedai-home__floating-card finedai-home__floating-card--bottom">
                <span className="finedai-home__floating-number">08</span>

                <span className="finedai-home__floating-copy">
                  <strong>possible matches</strong>
                  <small>based on your profile</small>
                </span>
              </div>
            </div>
          </div>

          <div className="finedai-home__container finedai-home__scroll-note">
            <span className="finedai-home__scroll-line" />
            Scroll to explore
          </div>
        </section>

        <section className="finedai-home__trust-strip">
          <div className="finedai-home__container finedai-home__trust-inner">
            <div className="finedai-home__trust-intro">
              Designed around your real situation
            </div>

            <div className="finedai-home__trust-items">
              <div className="finedai-home__trust-item">
                <span className="finedai-home__trust-item-icon">
                  <Icon name="lock" size={16} />
                </span>
                Privacy-first
              </div>

              <div className="finedai-home__trust-item">
                <span className="finedai-home__trust-item-icon">
                  <Icon name="check" size={16} />
                </span>
                Review before you submit
              </div>

              <div className="finedai-home__trust-item">
                <span className="finedai-home__trust-item-icon">
                  <Icon name="shield" size={16} />
                </span>
                Assistant, not decision-maker
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="finedai-home__section finedai-home__section--how"
        >
          <div className="finedai-home__container">
            <div className="finedai-home__section-heading finedai-home__section-heading--split">
              <div>
                <span className="finedai-home__kicker">
                  How it works
                </span>

                <h2>
                  From uncertainty
                    

                  to a clearer next step.
                </h2>
              </div>

              <p>
                When financial pressure is difficult to explain,
                FinEdAI helps you organise the details and move
                forward with more confidence.
              </p>
            </div>

            <div className="finedai-home__journey-line">
              <span className="finedai-home__journey-progress" />
            </div>

            <div className="finedai-home__journey-grid">
              <div className="finedai-home__journey-step">
                <span className="finedai-home__journey-number">01</span>
                <h3>Bring your evidence</h3>
                <p>
                  Add the documents that help tell the full picture
                  of your situation.
                </p>
              </div>

              <div className="finedai-home__journey-step">
                <span className="finedai-home__journey-number">02</span>
                <h3>Understand the signals</h3>
                <p>
                  Review income, expenses, and possible hardship
                  indicators in plain language.
                </p>
              </div>

              <div className="finedai-home__journey-step">
                <span className="finedai-home__journey-number">03</span>
                <h3>Shape your appeal</h3>
                <p>
                  Answer thoughtful questions and create a draft that
                  reflects your real story.
                </p>
              </div>

              <div className="finedai-home__journey-step">
                <span className="finedai-home__journey-number">04</span>
                <h3>Discover support</h3>
                <p>
                  Explore opportunities and understand why they may
                  fit your goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="finedai-home__section finedai-home__section--capabilities">
          <div className="finedai-home__container">
            <div className="finedai-home__section-heading">
              <span className="finedai-home__kicker">
                A calmer way to prepare
              </span>

              <h2>
                Everything you need
                  

                to tell the full story.
              </h2>

              <p>
                FinEdAI turns a complicated funding process into a
                series of understandable steps.
              </p>
            </div>

            <div className="finedai-home__capabilities-grid">
              {capabilities.map((capability) => (
                <article
                  key={capability.number}
                  className={`finedai-home__capability ${
                    capability.tone === 'gold'
                      ? 'finedai-home__capability--gold'
                      : ''
                  }`}
                >
                  <div className="finedai-home__capability-top">
                    <span className="finedai-home__capability-number">
                      {capability.number}
                    </span>

                    <span className="finedai-home__capability-icon">
                      <Icon name={capability.icon} size={21} />
                    </span>
                  </div>

                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>

                  <span className="finedai-home__capability-arrow">
                    <Icon name="arrow" size={17} />
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="finedai-home__section finedai-home__privacy">
          <div className="finedai-home__container finedai-home__privacy-panel">
            <div className="finedai-home__privacy-copy">
              <span className="finedai-home__kicker">
                A responsible assistant
              </span>

              <h2>
                Your information should
                  

                stay in your hands.
              </h2>

              <p>
                Financial documents are personal. FinEdAI is designed
                to help you prepare, not to take control away from you.
              </p>

              <ul className="finedai-home__privacy-list">
                <li>
                  <Icon name="check" size={17} />
                  We never ask for an M-Pesa PIN or bank password.
                </li>

                <li>
                  <Icon name="check" size={17} />
                  You review and correct AI-assisted insights.
                </li>

                <li>
                  <Icon name="check" size={17} />
                  Drafts are not submitted automatically.
                </li>
              </ul>
            </div>

            <div className="finedai-home__privacy-visual">
              <div className="finedai-home__orbit finedai-home__orbit--outer" />
              <div className="finedai-home__orbit finedai-home__orbit--inner" />

              <div className="finedai-home__shield">
                <Icon name="shield" size={42} />
                <span>In your control</span>
              </div>
            </div>
          </div>
        </section>

        <section className="finedai-home__section finedai-home__opportunities">
          <div className="finedai-home__container">
            <div className="finedai-home__section-heading finedai-home__section-heading--split">
              <div>
                <span className="finedai-home__kicker">
                  Find your possibilities
                </span>

                <h2>
                  Support that starts
                    

                  with the right match.
                </h2>
              </div>

              <p>
                Instead of searching everywhere, see opportunities
                organised around your course, location, study level,
                and financial situation.
              </p>
            </div>

            <div className="finedai-home__opportunity-panel">
              <div className="finedai-home__opportunity-header">
                <div>
                  <span className="finedai-home__caption">
                    For your profile
                  </span>

                  <h3>Opportunities worth exploring</h3>
                </div>

                <Link
                  to="/opportunities"
                  className="finedai-home__text-link"
                >
                  View all matches
                  <Icon name="arrow" size={16} />
                </Link>
              </div>

              <div className="finedai-home__opportunity-list">
                {opportunities.map((opportunity) => (
                  <div
                    key={opportunity.title}
                    className="finedai-home__opportunity-row"
                  >
                    <span
                      className={`finedai-home__opportunity-icon ${
                        opportunity.tone === 'gold'
                          ? 'finedai-home__opportunity-icon--gold'
                          : opportunity.tone === 'blue'
                            ? 'finedai-home__opportunity-icon--blue'
                            : ''
                      }`}
                    >
                      <Icon name="compass" size={18} />
                    </span>

                    <span className="finedai-home__opportunity-main">
                      <span>{opportunity.type}</span>
                      <strong>{opportunity.title}</strong>
                    </span>

                    <span className="finedai-home__opportunity-fit">
                      <strong>{opportunity.fit}</strong>
                      <span>
                        <Icon name="clock" size={14} />
                        {opportunity.deadline}
                      </span>
                    </span>

                    <Icon name="arrow" size={17} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="finedai-home__cta">
          <div className="finedai-home__container finedai-home__cta-content">
            <span className="finedai-home__kicker">
              Your next step can be clearer
            </span>

            <h2>
              Start with what
                

              you already know.
            </h2>

            <p>
              Explore the FinEdAI demo and see how your documents,
              story, and goals can come together.
            </p>

            <Link
              to="/dashboard"
              className="finedai-home__button finedai-home__button--primary finedai-home__button--light"
            >
              Explore the demo
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </section>

        <footer className="finedai-home__footer">
          <div className="finedai-home__container finedai-home__footer-inner">
            <span className="finedai-home__footer-brand">
              FinEd<span>AI</span>
            </span>

            <span>
              An AI assistant for clearer student funding journeys.
            </span>

            <span>© 2026 FinEdAI</span>
          </div>
        </footer>
      </div>
    </>
  );
}
