import React, { useEffect, useRef, useState } from 'react';

const oppStyles = `
  .opp {
    --scroll: 0;
    --sy: 0px;
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 150px 6vw 110px;
    background:
      radial-gradient(circle at 8% 6%, rgba(82, 117, 93, 0.13), transparent 30%),
      radial-gradient(circle at 92% 22%, rgba(190, 148, 62, 0.14), transparent 28%),
      radial-gradient(circle at 12% 62%, rgba(82, 117, 93, 0.1), transparent 30%),
      radial-gradient(circle at 90% 88%, rgba(190, 148, 62, 0.11), transparent 30%),
      linear-gradient(160deg, #fbf8f0 0%, #f4f0e5 46%, #edf2eb 100%);
    color: #173525;
    font-family: "DM Sans", system-ui, sans-serif;
  }

  .opp *,
  .opp *::before,
  .opp *::after {
    box-sizing: border-box;
  }

  .opp svg {
    display: block;
    flex: none;
  }

  .opp__inner {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ---------- scroll progress + floating orbs ---------- */

  .opp-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 60;
    height: 3px;
    transform-origin: 0 50%;
    transform: scaleX(var(--scroll));
    background: linear-gradient(90deg, #6d9979, #d0aa59);
    box-shadow: 0 0 14px rgba(208, 170, 89, 0.7);
    pointer-events: none;
  }

  .opp__orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(80px);
    animation: oppOrb 16s ease-in-out infinite;
    translate: 0 calc(var(--sy) * var(--par, -0.08));
  }

  .opp__orb--one {
    width: 480px;
    height: 480px;
    right: -170px;
    top: 4%;
    background: rgba(190, 148, 62, 0.13);
  }

  .opp__orb--two {
    --par: -0.14;
    width: 420px;
    height: 420px;
    left: -170px;
    top: 38%;
    background: rgba(53, 94, 68, 0.12);
    animation-delay: -6s;
  }

  .opp__orb--three {
    --par: -0.05;
    width: 460px;
    height: 460px;
    right: -180px;
    top: 72%;
    background: rgba(190, 148, 62, 0.11);
    animation-delay: -10s;
  }

  /* ---------- scroll reveal (fades in AND out, both directions) ---------- */

  .opp-reveal {
    --from: translateY(42px);
    opacity: 0;
    transform: var(--from);
    transition:
      opacity 420ms ease,
      transform 420ms ease,
      filter 420ms ease;
    will-change: opacity, transform;
  }

  .opp-reveal--left { --from: translateX(-60px); }
  .opp-reveal--right { --from: translateX(60px); }
  .opp-reveal--pop { --from: scale(0.82) translateY(26px); }
  .opp-reveal--blur { --from: translateY(26px); filter: blur(10px); }
  .opp-reveal--fade { --from: none; }

  .opp-reveal.is-up {
    transform: translateY(-38px) scale(0.97);
  }

  .opp-reveal--fade.is-up {
    transform: none;
  }

  .opp-reveal--blur.is-up {
    filter: blur(10px);
  }

  .opp-reveal.is-in {
    opacity: 1;
    transform: none;
    filter: none;
    transition:
      opacity 800ms ease var(--delay, 0ms),
      transform 1000ms cubic-bezier(0.2, 1.15, 0.3, 1) var(--delay, 0ms),
      filter 800ms ease var(--delay, 0ms);
  }

  .opp-fill > .opp-reveal {
    height: 100%;
  }

  /* ---------- word-by-word pop on load / reload ---------- */

  .opp-word {
    display: inline-block;
    animation: oppWord 850ms cubic-bezier(0.2, 1.2, 0.3, 1) both;
    animation-delay: calc(var(--i) * 75ms + 120ms);
  }

  /* ---------- glass + glow ---------- */

  .opp-glass {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.78);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.5);
    box-shadow:
      0 18px 50px rgba(36, 79, 53, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(22px) saturate(1.3);
    -webkit-backdrop-filter: blur(22px) saturate(1.3);
    transition:
      transform 360ms cubic-bezier(0.22, 0.8, 0.3, 1),
      box-shadow 360ms ease,
      border-color 360ms ease,
      background 360ms ease;
  }

  .opp-glass::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      320px circle at var(--mx, 50%) var(--my, 0%),
      rgba(190, 148, 62, 0.22),
      transparent 62%
    );
    opacity: 0;
    transition: opacity 360ms ease;
    pointer-events: none;
  }

  .opp-glass::after {
    content: "";
    position: absolute;
    top: 0;
    left: -70%;
    width: 45%;
    height: 100%;
    background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    transform: skewX(-18deg);
    transition: left 900ms ease;
    pointer-events: none;
  }

  .opp-glass > * {
    position: relative;
  }

  .opp-glass--hover:hover {
    transform: translateY(-7px);
    border-color: rgba(190, 148, 62, 0.5);
    background: rgba(255, 255, 255, 0.7);
    box-shadow:
      0 28px 64px rgba(36, 79, 53, 0.15),
      0 0 34px rgba(190, 148, 62, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
  }

  .opp-glass--hover:hover::before { opacity: 1; }
  .opp-glass--hover:hover::after { left: 130%; }

  .opp-glass--dark {
    border-color: rgba(255, 255, 255, 0.14);
    background: linear-gradient(
      145deg,
      rgba(15, 35, 24, 0.96),
      rgba(22, 48, 34, 0.93) 52%,
      rgba(13, 29, 21, 0.97)
    );
    color: #f4f0e5;
    animation: oppGlow 5s ease-in-out infinite;
  }

  .opp-glass--dark::before {
    background: radial-gradient(
      380px circle at var(--mx, 70%) var(--my, 0%),
      rgba(190, 148, 62, 0.18),
      transparent 62%
    );
    opacity: 1;
  }

  .opp-glass--dark::after { display: none; }

  /* ---------- shared pieces ---------- */

  .opp-badge {
    width: 46px;
    height: 46px;
    flex: none;
    border: 1px solid rgba(190, 148, 62, 0.28);
    border-radius: 15px;
    display: grid;
    place-items: center;
    background: rgba(190, 148, 62, 0.11);
    color: #a77e30;
    animation: oppFloat 5s ease-in-out infinite;
    transition:
      transform 360ms cubic-bezier(0.2, 1.3, 0.4, 1),
      box-shadow 360ms ease,
      background 360ms ease;
  }

  .opp-glass--hover:hover .opp-badge {
    transform: scale(1.12) rotate(-5deg);
    background: rgba(190, 148, 62, 0.22);
    box-shadow: 0 0 0 7px rgba(190, 148, 62, 0.1), 0 0 22px rgba(190, 148, 62, 0.35);
  }

  .opp-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 11px;
    border: 1px solid rgba(36, 79, 53, 0.13);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.55);
    color: #2f5a41;
    font-size: 11px;
    font-weight: 800;
    white-space: nowrap;
    transition: transform 240ms ease, background 240ms ease, border-color 240ms ease;
  }

  .opp-chip:hover {
    transform: translateY(-2px);
    border-color: rgba(190, 148, 62, 0.45);
    background: rgba(255, 255, 255, 0.85);
  }

  .opp-chip--dark {
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.82);
  }

  .opp-chip--dark:hover {
    border-color: rgba(216, 183, 106, 0.5);
    background: rgba(190, 148, 62, 0.16);
  }

  .opp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 20px;
    padding: 8px 13px;
    border: 1px solid rgba(47, 82, 60, 0.15);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.5);
    color: #4f705a;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    backdrop-filter: blur(16px);
  }

  .opp-eyebrow--dark {
    border-color: rgba(216, 183, 106, 0.25);
    background: rgba(255, 255, 255, 0.05);
    color: #d8b76a;
  }

  .opp-eyebrow__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #be943e;
    box-shadow: 0 0 0 5px rgba(190, 148, 62, 0.11);
    animation: oppPulse 2s ease-in-out infinite;
  }

  .opp-section { margin-top: 120px; }

  .opp-section__head {
    max-width: 700px;
    margin: 0 auto 48px;
    text-align: center;
  }

  .opp-section__title {
    margin: 0;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: clamp(32px, 4vw, 50px);
    line-height: 1.04;
    letter-spacing: -0.05em;
    font-weight: 700;
    color: #183b29;
  }

  .opp-section__text {
    margin: 16px auto 0;
    max-width: 560px;
    color: #617167;
    font-size: 16.5px;
    line-height: 1.7;
  }

  .opp-card__title {
    margin: 0;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 21px;
    font-weight: 700;
    letter-spacing: -0.035em;
    color: #183b29;
  }

  .opp-card__text {
    margin: 10px 0 0;
    color: #617167;
    font-size: 14.5px;
    line-height: 1.65;
  }

  /* ---------- hero ---------- */

  .opp-hero { text-align: center; }

  .opp-hero__title {
    margin: 0 auto;
    max-width: 940px;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: clamp(44px, 6.2vw, 88px);
    line-height: 0.98;
    letter-spacing: -0.06em;
    font-weight: 700;
    color: #183b29;
  }

  .opp-hero__accent {
    display: block;
    color: #b48a37;
    text-shadow: 0 0 40px rgba(190, 148, 62, 0.25);
  }

  .opp-hero__text {
    max-width: 620px;
    margin: 24px auto 0;
    color: #617167;
    font-size: 17.5px;
    line-height: 1.7;
  }

  .opp-hero__actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 13px;
    margin-top: 32px;
  }

  .opp-button {
    min-height: 48px;
    padding: 0 22px;
    border: 1px solid transparent;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    text-decoration: none;
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
  }

  .opp-button:hover { transform: translateY(-3px); }

  .opp-button:focus-visible,
  .opp-tab:focus-visible,
  .opp-toggle:focus-visible {
    outline: 2px solid #b48a37;
    outline-offset: 3px;
  }

  .opp-button svg { transition: transform 240ms ease; }
  .opp-button:hover svg { transform: translateX(4px); }

  .opp-button--primary {
    background: #244f35;
    color: #fffdf7;
    animation: oppBtnGlow 3.2s ease-in-out infinite;
  }

  .opp-button--secondary {
    border-color: rgba(36, 79, 53, 0.16);
    background: rgba(255, 255, 255, 0.5);
    color: #244f35;
    backdrop-filter: blur(15px);
  }

  .opp-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    max-width: 760px;
    margin: 60px auto 0;
  }

  .opp-stat {
    padding: 22px 20px;
    text-align: left;
  }

  .opp-stat__value {
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: -0.05em;
    color: #183b29;
  }

  .opp-stat__label {
    margin-top: 4px;
    color: #6b7a70;
    font-size: 13px;
    line-height: 1.5;
  }

  /* ---------- closing call to action ---------- */

  .opp-cta {
    padding: 64px 40px;
    text-align: center;
  }

  .opp-cta .opp-section__title { color: #f8f5ec; }

  .opp-cta__text {
    max-width: 520px;
    margin: 16px auto 0;
    color: rgba(232, 239, 233, 0.72);
    font-size: 16px;
    line-height: 1.7;
  }

  .opp-cta .opp-hero__actions { margin-top: 30px; }

  .opp-cta .opp-button--primary {
    background: #c9a251;
    color: #172b1e;
    animation: oppBtnGlowGold 3.2s ease-in-out infinite;
  }

  .opp-cta .opp-button--secondary {
    border-color: rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.06);
    color: #f4f0e5;
  }

  /* ---------- shared keyframes ---------- */

  @keyframes oppPulse {
    0%, 100% { opacity: 0.65; transform: scale(0.9); }
    50% { opacity: 1; transform: scale(1.08); }
  }

  @keyframes oppOrb {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(-40px, 50px, 0) scale(1.1); }
  }

  @keyframes oppFloat {
    0%, 100% { translate: 0 0; }
    50% { translate: 0 -4px; }
  }

  @keyframes oppWord {
    from { opacity: 0; transform: translateY(0.6em) scale(0.88); filter: blur(8px); }
    to { opacity: 1; transform: none; filter: blur(0); }
  }

  @keyframes oppGlow {
    0%, 100% {
      box-shadow:
        0 34px 80px rgba(25, 55, 38, 0.26),
        0 0 36px rgba(190, 148, 62, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    50% {
      box-shadow:
        0 34px 80px rgba(25, 55, 38, 0.3),
        0 0 80px rgba(190, 148, 62, 0.26),
        inset 0 1px 0 rgba(255, 255, 255, 0.14);
    }
  }

  @keyframes oppBtnGlow {
    0%, 100% { box-shadow: 0 14px 30px rgba(36, 79, 53, 0.2); }
    50% { box-shadow: 0 14px 40px rgba(36, 79, 53, 0.38), 0 0 26px rgba(190, 148, 62, 0.3); }
  }

  @keyframes oppBtnGlowGold {
    0%, 100% { box-shadow: 0 14px 34px rgba(201, 162, 81, 0.28); }
    50% { box-shadow: 0 14px 44px rgba(201, 162, 81, 0.5), 0 0 30px rgba(216, 183, 106, 0.4); }
  }

  @keyframes oppFlow {
    from { transform: translateX(-100%); }
    to { transform: translateX(260%); }
  }

  /* ---------- shared responsive + reduced motion ---------- */

  @media (max-width: 900px) {
    .opp { padding-top: 125px; }
    .opp-section { margin-top: 90px; }
  }

  @media (max-width: 620px) {
    .opp { padding: 112px 18px 80px; }
    .opp-hero__text { font-size: 15.5px; }
    .opp-hero__actions { display: grid; grid-template-columns: 1fr; }
    .opp-button { width: 100%; }
    .opp-stats { grid-template-columns: 1fr; }
    .opp-section__head { margin-bottom: 34px; }
    .opp-section__text { font-size: 15px; }
    .opp-cta { padding: 44px 22px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .opp *,
    .opp *::before,
    .opp *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      transition-delay: 0ms !important;
    }

    .opp-reveal {
      opacity: 1;
      transform: none;
      filter: none;
    }
  }

  /* =========================================================
     OPPORTUNITIES: FUNDERS
     ========================================================= */

  .opp-funders {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
  }

  .opp-funders > .opp-reveal { grid-column: span 2; }
  .opp-funders > .opp-reveal:nth-child(n + 4) { grid-column: span 3; }

  .opp-funder {
    height: 100%;
    padding: 28px;
    display: flex;
    align-items: flex-start;
    gap: 18px;
  }

  .opp-funder .opp-card__title { font-size: 19px; }
  .opp-funder .opp-card__text { margin-top: 6px; font-size: 14px; }

  /* =========================================================
     MATCH DEMO
     ========================================================= */

  .opp-match {
    padding: 38px;
  }

  .opp-match__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 26px;
  }

  .opp-match__label {
    color: rgba(255, 255, 255, 0.5);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .opp-match__toggles {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 12px;
  }

  .opp-toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 15px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.6);
    font: inherit;
    font-size: 12.5px;
    font-weight: 800;
    cursor: pointer;
    transition:
      transform 240ms cubic-bezier(0.2, 1.3, 0.4, 1),
      background 240ms ease,
      border-color 240ms ease,
      color 240ms ease,
      box-shadow 240ms ease;
  }

  .opp-toggle:hover { transform: translateY(-2px); }

  .opp-toggle.is-on {
    border-color: rgba(216, 183, 106, 0.55);
    background: rgba(190, 148, 62, 0.18);
    color: #f6e7c3;
    box-shadow: 0 0 22px rgba(190, 148, 62, 0.25);
  }

  .opp-toggle__box {
    width: 16px;
    height: 16px;
    border-radius: 5px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: transparent;
    transition: background 240ms ease, color 240ms ease, border-color 240ms ease;
  }

  .opp-toggle.is-on .opp-toggle__box {
    border-color: #d8b76a;
    background: #d8b76a;
    color: #172b1e;
  }

  .opp-match__tip {
    max-width: 260px;
    color: rgba(255, 255, 255, 0.55);
    font-size: 12.5px;
    line-height: 1.55;
  }

  .opp-match__list {
    display: grid;
    gap: 14px;
  }

  .opp-offer {
    padding: 22px 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.04);
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.4fr) auto;
    align-items: center;
    gap: 22px;
    transition: border-color 320ms ease, background 320ms ease, box-shadow 320ms ease, transform 320ms ease;
  }

  .opp-offer:hover { transform: translateX(6px); }

  .opp-offer.is-strong {
    border-color: rgba(216, 183, 106, 0.45);
    background: rgba(190, 148, 62, 0.09);
    box-shadow: 0 0 34px rgba(190, 148, 62, 0.14);
  }

  .opp-reveal.is-in .opp-offer {
    animation: oppItemIn 700ms cubic-bezier(0.2, 1.1, 0.3, 1) backwards;
    animation-delay: calc(var(--i) * 140ms + 300ms);
  }

  .opp-offer__name {
    color: #f8f5ec;
    font-size: 16px;
    font-weight: 800;
  }

  .opp-offer__by {
    margin-top: 4px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12.5px;
  }

  .opp-offer__reqs {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .opp-req {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.42);
    font-size: 11px;
    font-weight: 800;
    transition: all 300ms ease;
  }

  .opp-req.is-met {
    border-color: rgba(126, 170, 137, 0.5);
    background: rgba(126, 170, 137, 0.16);
    color: #b9dcc1;
  }

  .opp-offer__meter {
    min-width: 128px;
    text-align: right;
  }

  .opp-offer__count {
    color: #f8f5ec;
    font-size: 13px;
    font-weight: 800;
  }

  .opp-segments {
    display: flex;
    gap: 5px;
    margin-top: 8px;
  }

  .opp-segments i {
    flex: 1;
    height: 6px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    transition: background 400ms ease, box-shadow 400ms ease;
  }

  .opp-segments i.is-met {
    background: linear-gradient(90deg, #6d9979, #d0aa59);
    box-shadow: 0 0 12px rgba(208, 170, 89, 0.45);
  }

  .opp-offer__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    grid-column: 1 / -1;
    padding-top: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.55);
    font-size: 12px;
  }

  .opp-offer__meta span {
    display: inline-flex;
    align-items: center;
    gap: 7px;
  }

  .opp-offer__meta svg { color: #d8b76a; }

  /* =========================================================
     VERIFIED
     ========================================================= */

  .opp-verify {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .opp-verify__line {
    position: absolute;
    z-index: 0;
    top: 53px;
    left: 16%;
    right: 16%;
    height: 2px;
    overflow: hidden;
    border-radius: 2px;
    background: rgba(36, 79, 53, 0.12);
  }

  .opp-verify__line::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 40%;
    background: linear-gradient(90deg, transparent, #be943e, transparent);
    animation: oppFlow 2.4s ease-in-out infinite;
  }

  .opp-verify > .opp-reveal { position: relative; z-index: 1; }

  .opp-step {
    height: 100%;
    padding: 30px;
  }

  .opp-step__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
  }

  .opp-step__num {
    color: rgba(167, 126, 48, 0.45);
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: -0.05em;
  }

  /* =========================================================
     WHAT'S NEXT
     ========================================================= */

  .opp-next {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  .opp-next__card {
    height: 100%;
    padding: 26px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .opp-next__title {
    color: #183b29;
    font-size: 16px;
    font-weight: 800;
  }

  .opp-next__text {
    margin-top: 3px;
    color: #617167;
    font-size: 13.5px;
    line-height: 1.5;
  }

  /* =========================================================
     RESPONSIVE
     ========================================================= */

  @media (max-width: 1000px) {
    .opp-offer {
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .opp-offer__meter {
      min-width: 0;
      text-align: left;
    }

    .opp-offer__meta { padding-top: 12px; }
  }

  @media (max-width: 900px) {
    .opp-funders { grid-template-columns: repeat(2, 1fr); }
    .opp-funders > .opp-reveal,
    .opp-funders > .opp-reveal:nth-child(n + 4) { grid-column: auto; }
    .opp-funders > .opp-reveal:last-child { grid-column: span 2; }
    .opp-verify,
    .opp-next { grid-template-columns: 1fr; }
    .opp-verify__line { display: none; }
  }

  @media (max-width: 620px) {
    .opp-funders { grid-template-columns: 1fr; }
    .opp-funders > .opp-reveal:last-child { grid-column: auto; }
    .opp-funder,
    .opp-step { padding: 24px; }
    .opp-match { padding: 20px; }
    .opp-offer { padding: 18px; }
  }
`;

/* =========================================================
   ICONS
   ========================================================= */

const ICONS = {
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  building: (
    <>
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M9 21v-6h6v6" />
      <path d="M3 21h18" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  link: (
    <>
      <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16v-5a6 6 0 0112 0v5l2 2H4l2-2z" />
      <path d="M10 21h4" />
    </>
  ),
  map: (
    <>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 016.5 3H20v16H6.5A2.5 2.5 0 004 21.5v-16z" />
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0112 7.6a4.3 4.3 0 017.5 2.2C19.5 15.4 12 20 12 20z" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" />
      <path d="M3 13h18" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <path d="M16 4.7a3.5 3.5 0 010 6.6M18 14.3c2.2.6 3.5 2.4 3.5 5.7" />
    </>
  ),
  trending: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
};

function Icon({ name, size = 18, strokeWidth = 1.8 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

/* =========================================================
   SHARED HELPERS
   ========================================================= */

/* Reports 'in' | 'up' (left through the top) | 'down' (waiting below).
   Because it tracks both directions, content fades in AND out on scroll. */
function useViewState(ref) {
  const [state, setState] = useState('down');

  useEffect(() => {
    const node = ref.current;

    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setState('in');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setState('in');
        else setState(entry.boundingClientRect.top < 0 ? 'up' : 'down');
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref]);

  return state;
}

/* Feeds scroll progress (--scroll) and offset (--sy) to the page for the
   progress bar and the orb parallax. */
function useScrollFx(ref) {
  useEffect(() => {
    const root = ref.current;

    if (!root) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;

      const y = window.scrollY || 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      root.style.setProperty('--scroll', String(max > 0 ? Math.min(1, y / max) : 0));
      root.style.setProperty('--sy', `${y}px`);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ref]);
}

function Reveal({ as: Tag = 'div', delay = 0, variant = 'up', className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const state = useViewState(ref);

  return (
    <Tag
      ref={ref}
      className={`opp-reveal opp-reveal--${variant} is-${state} ${className}`}
      style={{ '--delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function SplitWords({ text, start = 0 }) {
  return (
    <>
      {text.split(' ').map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          {index > 0 && ' '}
          <span className="opp-word" style={{ '--i': start + index }}>
            {word}
          </span>
        </React.Fragment>
      ))}
    </>
  );
}

function CountUp({ to, suffix = '', duration = 1200 }) {
  const ref = useRef(null);
  const state = useViewState(ref);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (state !== 'in') {
      setValue(0);
      return undefined;
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return undefined;
    }

    let frame = 0;
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);

      setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));

      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [state, to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function Glass({ as: Tag = 'div', className = '', hover = true, children, ...rest }) {
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      className={`opp-glass${hover ? ' opp-glass--hover' : ''} ${className}`}
      onPointerMove={handleMove}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function Eyebrow({ children, dark = false }) {
  return (
    <div className={dark ? 'opp-eyebrow opp-eyebrow--dark' : 'opp-eyebrow'}>
      <span className="opp-eyebrow__dot" />
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title, text }) {
  return (
    <Reveal className="opp-section__head" variant="blur">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="opp-section__title">{title}</h2>
      {text && <p className="opp-section__text">{text}</p>}
    </Reveal>
  );
}


/* =========================================================
   CONTENT
   ========================================================= */

const funders = [
  { icon: 'building', title: 'Government programmes', text: 'HELB, HEF and the Universities Fund.' },
  { icon: 'map', title: 'County governments', text: 'County bursaries and local education funds.' },
  { icon: 'book', title: 'Universities', text: 'Bursaries and scholarships from your institution.' },
  { icon: 'heart', title: 'NGOs and foundations', text: 'Grants, scholarships and youth funding.' },
  { icon: 'briefcase', title: 'Private organisations', text: 'Scholarships and funding programmes for young people.' },
];

/* Illustrative example only. These are not real listings. */
const profile = [
  { id: 'course', label: 'Course' },
  { id: 'county', label: 'County' },
  { id: 'level', label: 'Education level' },
  { id: 'need', label: 'Financial need' },
];

const offers = [
  {
    name: 'Sample County Bursary',
    by: 'County government',
    needs: ['county', 'level', 'need'],
    deadline: 'Closes in 14 days',
    checked: 'Last checked 3 days ago',
  },
  {
    name: 'Sample University Scholarship',
    by: 'University',
    needs: ['course', 'level', 'need'],
    deadline: 'Closes in 30 days',
    checked: 'Last checked 5 days ago',
  },
  {
    name: 'Sample Foundation Grant',
    by: 'NGO or foundation',
    needs: ['course', 'need'],
    deadline: 'Closes in 21 days',
    checked: 'Last checked 2 days ago',
  },
];

const labelFor = Object.fromEntries(profile.map((item) => [item.id, item.label]));

const verifySteps = [
  { icon: 'link', title: 'A source link', text: 'Every opportunity points back to its official page.' },
  { icon: 'clock', title: 'A last-checked date', text: 'Outdated listings are removed, so you never chase a dead end.' },
  { icon: 'bell', title: 'Deadline reminders', text: 'Get nudged about closing dates and missing documents.' },
];

const nextUp = [
  { icon: 'users', title: 'TVET students', text: 'Next to join the platform.' },
  { icon: 'trending', title: 'Other young people', text: 'Grants and business support.' },
  { icon: 'map', title: 'Local opportunities', text: 'More sources, closer to home.' },
];

/* =========================================================
   PAGE
   ========================================================= */

export default function Opportunities() {
  const rootRef = useRef(null);
  const [on, setOn] = useState(['course', 'county', 'level', 'need']);

  useScrollFx(rootRef);

  const toggle = (id) =>
    setOn((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]
    );

  return (
    <>
      <style>{oppStyles}</style>

      <main className="opp" id="opportunities" ref={rootRef}>
        <div className="opp-progress" />
        <div className="opp__orb opp__orb--one" />
        <div className="opp__orb opp__orb--two" />
        <div className="opp__orb opp__orb--three" />

        <div className="opp__inner">

          {/* HERO */}

          <header className="opp-hero">
            <Reveal variant="pop">
              <Eyebrow>Opportunities</Eyebrow>
            </Reveal>

            <h1 className="opp-hero__title">
              <SplitWords text="Funding is out there." />
              <span className="opp-hero__accent">
                <SplitWords text="Now it is in one place." start={4} />
              </span>
            </h1>

            <Reveal delay={500} variant="blur">
              <p className="opp-hero__text">
                Bursaries, scholarships and grants are scattered across many
                sites. FinEdAI brings verified ones together and tells you why
                each one fits.
              </p>
            </Reveal>

            <Reveal delay={650} variant="pop">
              <div className="opp-hero__actions">
                <a className="opp-button opp-button--primary" href="#start">
                  Start the demo
                  <Icon name="arrowRight" size={16} />
                </a>

                <a className="opp-button opp-button--secondary" href="#matching">
                  See how matching works
                </a>
              </div>
            </Reveal>

            <div className="opp-stats">
              {[
                [5, 'kinds of funders'],
                [1, 'place to search'],
                [3, 'proofs with every match'],
              ].map(([value, label], index) => (
                <Reveal key={label} delay={800 + index * 110} variant="pop">
                  <Glass className="opp-stat">
                    <div className="opp-stat__value">
                      <CountUp to={value} />
                    </div>
                    <div className="opp-stat__label">{label}</div>
                  </Glass>
                </Reveal>
              ))}
            </div>
          </header>

          {/* FUNDERS */}

          <section className="opp-section" id="funders">
            <SectionHead eyebrow="Where funding comes from" title="Five kinds of funders" />

            <div className="opp-funders opp-fill">
              {funders.map((funder, index) => (
                <Reveal
                  key={funder.title}
                  delay={(index % 3) * 100}
                  variant={index === 0 || index === 3 ? 'left' : index === 2 || index === 4 ? 'right' : 'pop'}
                >
                  <Glass className="opp-funder">
                    <div className="opp-badge">
                      <Icon name={funder.icon} size={21} />
                    </div>

                    <div>
                      <h3 className="opp-card__title">{funder.title}</h3>
                      <p className="opp-card__text">{funder.text}</p>
                    </div>
                  </Glass>
                </Reveal>
              ))}
            </div>
          </section>

          {/* MATCHING */}

          <section className="opp-section" id="matching">
            <SectionHead
              eyebrow="Smart matching"
              title="Every match explains itself"
              text="Switch details on and off to see how the reasons change."
            />

            <Reveal variant="pop">
              <Glass className="opp-glass--dark opp-match" hover={false}>
                <div className="opp-match__top">
                  <div>
                    <div className="opp-match__label">Your profile (sample)</div>

                    <div className="opp-match__toggles">
                      {profile.map((item) => {
                        const isOn = on.includes(item.id);

                        return (
                          <button
                            type="button"
                            key={item.id}
                            className={isOn ? 'opp-toggle is-on' : 'opp-toggle'}
                            aria-pressed={isOn}
                            onClick={() => toggle(item.id)}
                          >
                            <span className="opp-toggle__box">
                              <Icon name="check" size={11} strokeWidth={3.2} />
                            </span>
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <p className="opp-match__tip">
                    Illustrative example. These are not real listings.
                  </p>
                </div>

                <div className="opp-match__list">
                  {offers.map((offer, index) => {
                    const met = offer.needs.filter((need) => on.includes(need)).length;
                    const strong = met === offer.needs.length;

                    return (
                      <div
                        key={offer.name}
                        className={strong ? 'opp-offer is-strong' : 'opp-offer'}
                        style={{ '--i': index }}
                      >
                        <div>
                          <div className="opp-offer__name">{offer.name}</div>
                          <div className="opp-offer__by">{offer.by}</div>
                        </div>

                        <div className="opp-offer__reqs">
                          {offer.needs.map((need) => (
                            <span
                              key={need}
                              className={on.includes(need) ? 'opp-req is-met' : 'opp-req'}
                            >
                              <Icon name={on.includes(need) ? 'check' : 'x'} size={11} strokeWidth={3} />
                              {labelFor[need]}
                            </span>
                          ))}
                        </div>

                        <div className="opp-offer__meter">
                          <div className="opp-offer__count">
                            {met} of {offer.needs.length} met
                          </div>
                          <div className="opp-segments">
                            {offer.needs.map((need, segment) => (
                              <i key={need} className={segment < met ? 'is-met' : ''} />
                            ))}
                          </div>
                        </div>

                        <div className="opp-offer__meta">
                          <span><Icon name="link" size={13} /> Source link</span>
                          <span><Icon name="clock" size={13} /> {offer.checked}</span>
                          <span><Icon name="bell" size={13} /> {offer.deadline}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Glass>
            </Reveal>
          </section>

          {/* VERIFIED */}

          <section className="opp-section" id="verified">
            <SectionHead
              eyebrow="Verified, never stale"
              title="Three things on every opportunity"
            />

            <div className="opp-verify opp-fill">
              <div className="opp-verify__line" />

              {verifySteps.map((item, index) => (
                <Reveal key={item.title} delay={index * 130} variant="up">
                  <Glass className="opp-step">
                    <div className="opp-step__top">
                      <div className="opp-badge">
                        <Icon name={item.icon} size={21} />
                      </div>
                      <span className="opp-step__num">{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    <h3 className="opp-card__title">{item.title}</h3>
                    <p className="opp-card__text">{item.text}</p>
                  </Glass>
                </Reveal>
              ))}
            </div>
          </section>

          {/* NEXT */}

          <section className="opp-section" id="next">
            <SectionHead
              eyebrow="What is next"
              title="Starting with students, growing from there"
            />

            <div className="opp-next opp-fill">
              {nextUp.map((item, index) => (
                <Reveal key={item.title} delay={index * 110} variant={index === 1 ? 'pop' : index === 0 ? 'left' : 'right'}>
                  <Glass className="opp-next__card">
                    <div className="opp-badge">
                      <Icon name={item.icon} size={21} />
                    </div>

                    <div>
                      <div className="opp-next__title">{item.title}</div>
                      <div className="opp-next__text">{item.text}</div>
                    </div>
                  </Glass>
                </Reveal>
              ))}
            </div>
          </section>

          {/* CTA */}

          <section className="opp-section" id="get-started">
            <Reveal variant="pop">
              <Glass className="opp-glass--dark opp-cta" hover={false}>
                <Eyebrow dark>Do not miss out</Eyebrow>

                <h2 className="opp-section__title">Find the funding you might have missed</h2>

                <p className="opp-cta__text">
                  Tell FinEdAI about your course and situation. It does the
                  searching and explains every match.
                </p>

                <div className="opp-hero__actions">
                  <a className="opp-button opp-button--primary" href="#start">
                    Start the demo
                    <Icon name="arrowRight" size={16} />
                  </a>

                  <a className="opp-button opp-button--secondary" href="#how-it-works">
                    See how it works
                  </a>
                </div>
              </Glass>
            </Reveal>
          </section>

        </div>
      </main>
    </>
  );
}