import React, { useEffect, useRef, useState } from 'react';

const authStyles = `
  .auth {
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

  .auth *,
  .auth *::before,
  .auth *::after {
    box-sizing: border-box;
  }

  .auth svg {
    display: block;
    flex: none;
  }

  .auth__inner {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ---------- scroll progress + floating orbs ---------- */

  .auth-progress {
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

  .auth__orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(80px);
    animation: authOrb 16s ease-in-out infinite;
    translate: 0 calc(var(--sy) * var(--par, -0.08));
  }

  .auth__orb--one {
    width: 480px;
    height: 480px;
    right: -170px;
    top: 4%;
    background: rgba(190, 148, 62, 0.13);
  }

  .auth__orb--two {
    --par: -0.14;
    width: 420px;
    height: 420px;
    left: -170px;
    top: 38%;
    background: rgba(53, 94, 68, 0.12);
    animation-delay: -6s;
  }

  .auth__orb--three {
    --par: -0.05;
    width: 460px;
    height: 460px;
    right: -180px;
    top: 72%;
    background: rgba(190, 148, 62, 0.11);
    animation-delay: -10s;
  }

  /* ---------- scroll reveal (fades in AND out, both directions) ---------- */

  .auth-reveal {
    --from: translateY(42px);
    opacity: 0;
    transform: var(--from);
    transition:
      opacity 420ms ease,
      transform 420ms ease,
      filter 420ms ease;
    will-change: opacity, transform;
  }

  .auth-reveal--left { --from: translateX(-60px); }
  .auth-reveal--right { --from: translateX(60px); }
  .auth-reveal--pop { --from: scale(0.82) translateY(26px); }
  .auth-reveal--blur { --from: translateY(26px); filter: blur(10px); }
  .auth-reveal--fade { --from: none; }

  .auth-reveal.is-up {
    transform: translateY(-38px) scale(0.97);
  }

  .auth-reveal--fade.is-up {
    transform: none;
  }

  .auth-reveal--blur.is-up {
    filter: blur(10px);
  }

  .auth-reveal.is-in {
    opacity: 1;
    transform: none;
    filter: none;
    transition:
      opacity 800ms ease var(--delay, 0ms),
      transform 1000ms cubic-bezier(0.2, 1.15, 0.3, 1) var(--delay, 0ms),
      filter 800ms ease var(--delay, 0ms);
  }

  .auth-fill > .auth-reveal {
    height: 100%;
  }

  /* ---------- word-by-word pop on load / reload ---------- */

  .auth-word {
    display: inline-block;
    animation: authWord 850ms cubic-bezier(0.2, 1.2, 0.3, 1) both;
    animation-delay: calc(var(--i) * 75ms + 120ms);
  }

  /* ---------- glass + glow ---------- */

  .auth-glass {
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

  .auth-glass::before {
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

  .auth-glass::after {
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

  .auth-glass > * {
    position: relative;
  }

  .auth-glass--hover:hover {
    transform: translateY(-7px);
    border-color: rgba(190, 148, 62, 0.5);
    background: rgba(255, 255, 255, 0.7);
    box-shadow:
      0 28px 64px rgba(36, 79, 53, 0.15),
      0 0 34px rgba(190, 148, 62, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
  }

  .auth-glass--hover:hover::before { opacity: 1; }
  .auth-glass--hover:hover::after { left: 130%; }

  .auth-glass--dark {
    border-color: rgba(255, 255, 255, 0.14);
    background: linear-gradient(
      145deg,
      rgba(15, 35, 24, 0.96),
      rgba(22, 48, 34, 0.93) 52%,
      rgba(13, 29, 21, 0.97)
    );
    color: #f4f0e5;
    animation: authGlow 5s ease-in-out infinite;
  }

  .auth-glass--dark::before {
    background: radial-gradient(
      380px circle at var(--mx, 70%) var(--my, 0%),
      rgba(190, 148, 62, 0.18),
      transparent 62%
    );
    opacity: 1;
  }

  .auth-glass--dark::after { display: none; }

  /* ---------- shared pieces ---------- */

  .auth-badge {
    width: 46px;
    height: 46px;
    flex: none;
    border: 1px solid rgba(190, 148, 62, 0.28);
    border-radius: 15px;
    display: grid;
    place-items: center;
    background: rgba(190, 148, 62, 0.11);
    color: #a77e30;
    animation: authFloat 5s ease-in-out infinite;
    transition:
      transform 360ms cubic-bezier(0.2, 1.3, 0.4, 1),
      box-shadow 360ms ease,
      background 360ms ease;
  }

  .auth-glass--hover:hover .auth-badge {
    transform: scale(1.12) rotate(-5deg);
    background: rgba(190, 148, 62, 0.22);
    box-shadow: 0 0 0 7px rgba(190, 148, 62, 0.1), 0 0 22px rgba(190, 148, 62, 0.35);
  }

  .auth-chip {
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

  .auth-chip:hover {
    transform: translateY(-2px);
    border-color: rgba(190, 148, 62, 0.45);
    background: rgba(255, 255, 255, 0.85);
  }

  .auth-chip--dark {
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.82);
  }

  .auth-chip--dark:hover {
    border-color: rgba(216, 183, 106, 0.5);
    background: rgba(190, 148, 62, 0.16);
  }

  .auth-eyebrow {
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

  .auth-eyebrow--dark {
    border-color: rgba(216, 183, 106, 0.25);
    background: rgba(255, 255, 255, 0.05);
    color: #d8b76a;
  }

  .auth-eyebrow__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #be943e;
    box-shadow: 0 0 0 5px rgba(190, 148, 62, 0.11);
    animation: authPulse 2s ease-in-out infinite;
  }

  .auth-section { margin-top: 120px; }

  .auth-section__head {
    max-width: 700px;
    margin: 0 auto 48px;
    text-align: center;
  }

  .auth-section__title {
    margin: 0;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: clamp(32px, 4vw, 50px);
    line-height: 1.04;
    letter-spacing: -0.05em;
    font-weight: 700;
    color: #183b29;
  }

  .auth-section__text {
    margin: 16px auto 0;
    max-width: 560px;
    color: #617167;
    font-size: 16.5px;
    line-height: 1.7;
  }

  .auth-card__title {
    margin: 0;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 21px;
    font-weight: 700;
    letter-spacing: -0.035em;
    color: #183b29;
  }

  .auth-card__text {
    margin: 10px 0 0;
    color: #617167;
    font-size: 14.5px;
    line-height: 1.65;
  }

  /* ---------- hero ---------- */

  .auth-hero { text-align: center; }

  .auth-hero__title {
    margin: 0 auto;
    max-width: 940px;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: clamp(44px, 6.2vw, 88px);
    line-height: 0.98;
    letter-spacing: -0.06em;
    font-weight: 700;
    color: #183b29;
  }

  .auth-hero__accent {
    display: block;
    color: #b48a37;
    text-shadow: 0 0 40px rgba(190, 148, 62, 0.25);
  }

  .auth-hero__text {
    max-width: 620px;
    margin: 24px auto 0;
    color: #617167;
    font-size: 17.5px;
    line-height: 1.7;
  }

  .auth-hero__actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 13px;
    margin-top: 32px;
  }

  .auth-button {
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

  .auth-button:hover { transform: translateY(-3px); }

  .auth-button:focus-visible,
  .auth-tab:focus-visible,
  .auth-toggle:focus-visible {
    outline: 2px solid #b48a37;
    outline-offset: 3px;
  }

  .auth-button svg { transition: transform 240ms ease; }
  .auth-button:hover svg { transform: translateX(4px); }

  .auth-button--primary {
    background: #244f35;
    color: #fffdf7;
    animation: authBtnGlow 3.2s ease-in-out infinite;
  }

  .auth-button--secondary {
    border-color: rgba(36, 79, 53, 0.16);
    background: rgba(255, 255, 255, 0.5);
    color: #244f35;
    backdrop-filter: blur(15px);
  }

  .auth-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    max-width: 760px;
    margin: 60px auto 0;
  }

  .auth-stat {
    padding: 22px 20px;
    text-align: left;
  }

  .auth-stat__value {
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: -0.05em;
    color: #183b29;
  }

  .auth-stat__label {
    margin-top: 4px;
    color: #6b7a70;
    font-size: 13px;
    line-height: 1.5;
  }

  /* ---------- closing call to action ---------- */

  .auth-cta {
    padding: 64px 40px;
    text-align: center;
  }

  .auth-cta .auth-section__title { color: #f8f5ec; }

  .auth-cta__text {
    max-width: 520px;
    margin: 16px auto 0;
    color: rgba(232, 239, 233, 0.72);
    font-size: 16px;
    line-height: 1.7;
  }

  .auth-cta .auth-hero__actions { margin-top: 30px; }

  .auth-cta .auth-button--primary {
    background: #c9a251;
    color: #172b1e;
    animation: authBtnGlowGold 3.2s ease-in-out infinite;
  }

  .auth-cta .auth-button--secondary {
    border-color: rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.06);
    color: #f4f0e5;
  }

  /* ---------- shared keyframes ---------- */

  @keyframes authPulse {
    0%, 100% { opacity: 0.65; transform: scale(0.9); }
    50% { opacity: 1; transform: scale(1.08); }
  }

  @keyframes authOrb {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(-40px, 50px, 0) scale(1.1); }
  }

  @keyframes authFloat {
    0%, 100% { translate: 0 0; }
    50% { translate: 0 -4px; }
  }

  @keyframes authWord {
    from { opacity: 0; transform: translateY(0.6em) scale(0.88); filter: blur(8px); }
    to { opacity: 1; transform: none; filter: blur(0); }
  }

  @keyframes authGlow {
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

  @keyframes authBtnGlow {
    0%, 100% { box-shadow: 0 14px 30px rgba(36, 79, 53, 0.2); }
    50% { box-shadow: 0 14px 40px rgba(36, 79, 53, 0.38), 0 0 26px rgba(190, 148, 62, 0.3); }
  }

  @keyframes authBtnGlowGold {
    0%, 100% { box-shadow: 0 14px 34px rgba(201, 162, 81, 0.28); }
    50% { box-shadow: 0 14px 44px rgba(201, 162, 81, 0.5), 0 0 30px rgba(216, 183, 106, 0.4); }
  }

  @keyframes authFlow {
    from { transform: translateX(-100%); }
    to { transform: translateX(260%); }
  }

  /* ---------- shared responsive + reduced motion ---------- */

  @media (max-width: 900px) {
    .auth { padding-top: 125px; }
    .auth-section { margin-top: 90px; }
  }

  @media (max-width: 620px) {
    .auth { padding: 112px 18px 80px; }
    .auth-hero__text { font-size: 15.5px; }
    .auth-hero__actions { display: grid; grid-template-columns: 1fr; }
    .auth-button { width: 100%; }
    .auth-stats { grid-template-columns: 1fr; }
    .auth-section__head { margin-bottom: 34px; }
    .auth-section__text { font-size: 15px; }
    .auth-cta { padding: 44px 22px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .auth *,
    .auth *::before,
    .auth *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      transition-delay: 0ms !important;
    }

    .auth-reveal {
      opacity: 1;
      transform: none;
      filter: none;
    }
  }

  /* =========================================================
     AUTH LAYOUT
     ========================================================= */

  .auth {
    min-height: 100vh;
    padding: 120px 6vw 80px;
    display: flex;
    align-items: center;
  }

  .auth-auth {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 28px;
    align-items: stretch;
  }

  .auth-auth > .auth-reveal { height: 100%; }

  /* ---------- aside ---------- */

  .auth-aside {
    height: 100%;
    min-height: 600px;
    padding: 44px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 36px;
  }

  .auth-aside__title {
    margin: 0;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: clamp(34px, 3.6vw, 52px);
    line-height: 1;
    letter-spacing: -0.055em;
    font-weight: 700;
    color: #f8f5ec;
  }

  .auth-aside__accent {
    display: block;
    color: #d8b76a;
    text-shadow: 0 0 36px rgba(216, 183, 106, 0.35);
  }

  .auth-aside__text {
    max-width: 380px;
    margin: 20px 0 0;
    color: rgba(232, 239, 233, 0.7);
    font-size: 15.5px;
    line-height: 1.7;
  }

  .auth-aside__list {
    display: grid;
    gap: 12px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .auth-aside__list li {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.045);
    color: rgba(255, 255, 255, 0.86);
    font-size: 14px;
    font-weight: 700;
    animation: authItemIn2 700ms cubic-bezier(0.2, 1.1, 0.3, 1) backwards;
    animation-delay: calc(var(--i) * 140ms + 700ms);
    transition: transform 280ms ease, border-color 280ms ease, background 280ms ease;
  }

  .auth-aside__list li:hover {
    transform: translateX(6px);
    border-color: rgba(216, 183, 106, 0.45);
    background: rgba(190, 148, 62, 0.1);
  }

  .auth-aside__list .auth-badge {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    border-color: rgba(218, 184, 100, 0.3);
    background: rgba(190, 148, 62, 0.12);
    color: #d8b76a;
  }

  /* ---------- form card ---------- */

  .auth-form {
    height: 100%;
    padding: 38px;
  }

  .auth-form__title {
    margin: 26px 0 0;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.045em;
    color: #183b29;
  }

  .auth-form__sub {
    margin: 8px 0 0;
    color: #617167;
    font-size: 14.5px;
    line-height: 1.6;
  }

  .auth-form__sub strong { color: #244f35; word-break: break-all; }

  .auth-seg {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 5px;
    border-radius: 16px;
    background: rgba(36, 79, 53, 0.07);
  }

  .auth-seg__pill {
    position: absolute;
    top: 5px;
    bottom: 5px;
    left: 5px;
    width: calc(50% - 5px);
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 6px 18px rgba(36, 79, 53, 0.12), 0 0 18px rgba(190, 148, 62, 0.18);
    transition: transform 420ms cubic-bezier(0.2, 1.2, 0.3, 1);
  }

  .auth-seg.is-signup .auth-seg__pill { transform: translateX(100%); }

  .auth-seg button {
    position: relative;
    z-index: 1;
    height: 42px;
    border: 0;
    background: transparent;
    color: #5b7062;
    font: inherit;
    font-size: 13.5px;
    font-weight: 800;
    cursor: pointer;
    transition: color 260ms ease;
  }

  .auth-seg button.is-on { color: #183b29; }

  /* ---------- stepper ---------- */

  .auth-steps {
    display: flex;
    align-items: center;
    margin-top: 24px;
  }

  .auth-steps__item {
    display: flex;
    align-items: center;
    gap: 9px;
    color: #8a9a8f;
    font-size: 12px;
    font-weight: 800;
    transition: color 300ms ease;
  }

  .auth-steps__dot {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    border: 1px solid rgba(36, 79, 53, 0.18);
    background: rgba(255, 255, 255, 0.6);
    font-size: 11px;
    transition: all 400ms cubic-bezier(0.2, 1.3, 0.4, 1);
  }

  .auth-steps__item.is-active { color: #183b29; }

  .auth-steps__item.is-active .auth-steps__dot {
    border-color: #be943e;
    background: #fff;
    color: #8a6420;
    box-shadow: 0 0 0 5px rgba(190, 148, 62, 0.14), 0 0 18px rgba(190, 148, 62, 0.35);
    transform: scale(1.08);
  }

  .auth-steps__item.is-done { color: #3f7a55; }

  .auth-steps__item.is-done .auth-steps__dot {
    border-color: #4f8a64;
    background: #4f8a64;
    color: #fff;
  }

  .auth-steps__bar {
    flex: 1;
    height: 2px;
    margin: 0 10px;
    border-radius: 2px;
    background: rgba(36, 79, 53, 0.12);
    overflow: hidden;
  }

  .auth-steps__bar i {
    display: block;
    height: 100%;
    transform-origin: left;
    transform: scaleX(0);
    background: linear-gradient(90deg, #6d9979, #d0aa59);
    transition: transform 600ms cubic-bezier(0.22, 0.8, 0.3, 1);
  }

  .auth-steps__bar.is-done i { transform: scaleX(1); }

  /* ---------- pane + stagger ---------- */

  .auth-pane {
    display: grid;
    gap: 16px;
    margin-top: 24px;
    animation: authPaneIn 560ms cubic-bezier(0.22, 0.9, 0.3, 1) both;
  }

  .auth-pane > * { animation: authRise 600ms cubic-bezier(0.2, 1.1, 0.3, 1) backwards; }
  .auth-pane > *:nth-child(1) { animation-delay: 60ms; }
  .auth-pane > *:nth-child(2) { animation-delay: 130ms; }
  .auth-pane > *:nth-child(3) { animation-delay: 200ms; }
  .auth-pane > *:nth-child(4) { animation-delay: 270ms; }
  .auth-pane > *:nth-child(5) { animation-delay: 340ms; }
  .auth-pane > *:nth-child(6) { animation-delay: 410ms; }
  .auth-pane > *:nth-child(7) { animation-delay: 480ms; }
  .auth-pane > *:nth-child(8) { animation-delay: 550ms; }

  /* ---------- fields ---------- */

  .auth-field__box {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 58px;
    padding: 0 14px;
    border: 1px solid rgba(36, 79, 53, 0.16);
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.62);
    transition: border-color 260ms ease, box-shadow 260ms ease, background 260ms ease;
  }

  .auth-field__box:hover { border-color: rgba(190, 148, 62, 0.4); }

  .auth-field__box:focus-within {
    border-color: #be943e;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(190, 148, 62, 0.14), 0 0 26px rgba(190, 148, 62, 0.22);
  }

  .auth-field__icon {
    display: grid;
    color: #7a8f80;
    transition: color 260ms ease, transform 260ms ease;
  }

  .auth-field__box:focus-within .auth-field__icon {
    color: #a77e30;
    transform: scale(1.12);
  }

  .auth-field__box input {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 18px 0 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: #173525;
    font: inherit;
    font-size: 15px;
  }

  .auth-field__box label {
    position: absolute;
    left: 46px;
    top: 19px;
    color: #7a8f80;
    font-size: 14.5px;
    pointer-events: none;
    transition: top 220ms ease, font-size 220ms ease, color 220ms ease, letter-spacing 220ms ease;
  }

  .auth-field__box input:focus ~ label,
  .auth-field.is-filled .auth-field__box label {
    top: 9px;
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #a77e30;
  }

  .auth-field__box input[type="date"] { color-scheme: light; }

  .auth-field__eye {
    width: 34px;
    height: 34px;
    border: 0;
    border-radius: 10px;
    display: grid;
    place-items: center;
    background: transparent;
    color: #6b8272;
    cursor: pointer;
    transition: background 200ms ease, color 200ms ease;
  }

  .auth-field__eye:hover { background: rgba(190, 148, 62, 0.14); color: #8a6420; }

  .auth-field.has-error .auth-field__box {
    border-color: #b05a46;
    box-shadow: 0 0 0 4px rgba(176, 90, 70, 0.1);
  }

  .auth-form.is-shaking .auth-field.has-error .auth-field__box,
  .auth-form.is-shaking .auth-code.has-error { animation: authShake 450ms ease; }

  .auth-field__error {
    margin: 7px 4px 0;
    color: #a8503c;
    font-size: 12.5px;
    font-weight: 700;
    animation: authFadeDown 300ms ease both;
  }

  /* ---------- strength ---------- */

  .auth-strength {
    display: grid;
    gap: 10px;
    margin-top: 12px;
  }

  .auth-strength__bars {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }

  .auth-strength__bars i {
    height: 5px;
    border-radius: 5px;
    background: rgba(36, 79, 53, 0.1);
    transition: background 400ms ease, box-shadow 400ms ease;
  }

  .auth-strength[data-score="1"] i.is-on { background: #c9674f; }
  .auth-strength[data-score="2"] i.is-on { background: #d29a3f; }
  .auth-strength[data-score="3"] i.is-on { background: #b9a443; box-shadow: 0 0 10px rgba(185, 164, 67, 0.4); }
  .auth-strength[data-score="4"] i.is-on { background: #4f8a64; box-shadow: 0 0 12px rgba(79, 138, 100, 0.5); }

  .auth-rules {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .auth-rule {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 9px;
    border-radius: 999px;
    border: 1px solid rgba(36, 79, 53, 0.12);
    color: #7a8f80;
    font-size: 11px;
    font-weight: 800;
    transition: all 300ms ease;
  }

  .auth-rule.is-met {
    border-color: rgba(79, 138, 100, 0.45);
    background: rgba(79, 138, 100, 0.12);
    color: #357050;
  }

  /* ---------- code boxes ---------- */

  .auth-code {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
  }

  .auth-code input {
    width: 100%;
    height: 62px;
    border: 1px solid rgba(36, 79, 53, 0.16);
    border-radius: 15px;
    outline: 0;
    background: rgba(255, 255, 255, 0.62);
    color: #173525;
    font: inherit;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    transition: border-color 220ms ease, box-shadow 220ms ease, background 220ms ease, transform 260ms cubic-bezier(0.2, 1.4, 0.4, 1);
  }

  .auth-code input:focus {
    border-color: #be943e;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(190, 148, 62, 0.14), 0 0 26px rgba(190, 148, 62, 0.22);
    transform: translateY(-3px);
  }

  .auth-code input.is-filled { border-color: rgba(79, 138, 100, 0.55); animation: authPop 320ms cubic-bezier(0.2, 1.4, 0.4, 1); }
  .auth-code.has-error input { border-color: #b05a46; }

  .auth-resend {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    color: #617167;
    font-size: 13px;
  }

  .auth-link {
    padding: 0;
    border: 0;
    background: none;
    color: #8a6420;
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: rgba(190, 148, 62, 0.4);
    text-underline-offset: 3px;
  }

  .auth-link:hover { color: #244f35; }
  .auth-link:disabled { color: #8a9a8f; cursor: default; text-decoration: none; }
  .auth-link:focus-visible { outline: 2px solid #b48a37; outline-offset: 3px; border-radius: 4px; }

  /* ---------- checkboxes ---------- */

  .auth-check {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border: 1px solid rgba(36, 79, 53, 0.12);
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.5);
    color: #43594b;
    font-size: 13.5px;
    line-height: 1.55;
    cursor: pointer;
    transition: border-color 240ms ease, background 240ms ease, box-shadow 240ms ease;
  }

  .auth-check:hover { border-color: rgba(190, 148, 62, 0.45); background: rgba(255, 255, 255, 0.8); }

  .auth-check input { position: absolute; opacity: 0; pointer-events: none; }

  .auth-check__box {
    width: 22px;
    height: 22px;
    margin-top: 1px;
    flex: none;
    border: 1px solid rgba(36, 79, 53, 0.25);
    border-radius: 7px;
    display: grid;
    place-items: center;
    background: #fff;
    color: transparent;
    transition: all 260ms cubic-bezier(0.2, 1.4, 0.4, 1);
  }

  .auth-check input:checked ~ .auth-check__box {
    border-color: #be943e;
    background: #be943e;
    color: #fff;
    box-shadow: 0 0 16px rgba(190, 148, 62, 0.45);
    transform: scale(1.06);
  }

  .auth-check input:focus-visible ~ .auth-check__box { outline: 2px solid #b48a37; outline-offset: 3px; }

  .auth-check.has-error { border-color: #b05a46; background: rgba(176, 90, 70, 0.06); }

  .auth-check .auth-link { font-size: inherit; }

  .auth-check__opt {
    margin-left: 6px;
    color: #8a9a8f;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .auth-agepill {
    justify-self: start;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 13px;
    border-radius: 999px;
    border: 1px solid rgba(79, 138, 100, 0.4);
    background: rgba(79, 138, 100, 0.12);
    color: #357050;
    font-size: 12.5px;
    font-weight: 800;
    animation: authPop 420ms cubic-bezier(0.2, 1.4, 0.4, 1);
  }

  /* ---------- buttons + banners ---------- */

  .auth-form .auth-button { width: 100%; }

  .auth-button:disabled { opacity: 0.7; cursor: progress; transform: none; }

  .auth-button--ghost {
    min-height: 44px;
    border-color: rgba(36, 79, 53, 0.14);
    background: rgba(255, 255, 255, 0.45);
    color: #244f35;
  }

  .auth-actions { display: grid; grid-template-columns: auto 1fr; gap: 12px; }
  .auth-actions .auth-button--ghost { min-height: 48px; }
  .auth-form .auth-actions .auth-button--ghost { width: auto; }

  .auth-spin {
    width: 17px;
    height: 17px;
    border: 2px solid rgba(255, 253, 247, 0.35);
    border-top-color: #fffdf7;
    border-radius: 50%;
    animation: authSpin 700ms linear infinite;
  }

  .auth-banner {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 14px;
    font-size: 13px;
    font-weight: 700;
    line-height: 1.5;
    animation: authFadeDown 320ms ease both;
  }

  .auth-banner--error { border: 1px solid rgba(176, 90, 70, 0.35); background: rgba(176, 90, 70, 0.1); color: #8f3f2d; }
  .auth-banner--info { border: 1px solid rgba(79, 138, 100, 0.35); background: rgba(79, 138, 100, 0.1); color: #2f6a48; }
  .auth-banner svg { margin-top: 2px; }

  .auth-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .auth-row .auth-check { padding: 0; border: 0; background: none; }
  .auth-row .auth-check:hover { background: none; }

  .auth-note {
    margin: 0;
    color: #7a8a80;
    font-size: 12px;
    line-height: 1.55;
    text-align: center;
  }

  /* ---------- success ---------- */

  .auth-done {
    margin-top: 10px;
    padding: 20px 0 6px;
    text-align: center;
  }

  .auth-done__ring {
    position: relative;
    width: 96px;
    height: 96px;
    margin: 0 auto 24px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: rgba(79, 138, 100, 0.12);
    box-shadow: 0 0 0 10px rgba(79, 138, 100, 0.07), 0 0 50px rgba(190, 148, 62, 0.35);
    animation: authPop 700ms cubic-bezier(0.2, 1.4, 0.4, 1) both;
  }

  .auth-done__ring svg { color: #3f7a55; }

  .auth-done__ring path {
    stroke-dasharray: 30;
    stroke-dashoffset: 30;
    animation: authDraw 700ms ease 400ms forwards;
  }

  .auth-burst i {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 7px;
    height: 7px;
    margin: -3.5px;
    border-radius: 50%;
    background: #d0aa59;
    box-shadow: 0 0 12px rgba(208, 170, 89, 0.8);
    opacity: 0;
    animation: authBurst 1100ms ease-out 450ms forwards;
  }

  .auth-done .auth-form__title { margin-top: 0; }
  .auth-done .auth-form__sub { max-width: 340px; margin: 10px auto 26px; }

  /* ---------- modal ---------- */

  .auth-modal {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: grid;
    place-items: center;
    padding: 20px;
    background: rgba(10, 25, 17, 0.55);
    backdrop-filter: blur(8px);
    animation: authFade 250ms ease both;
  }

  .auth-modal__panel {
    width: 100%;
    max-width: 520px;
    max-height: 86vh;
    overflow: auto;
    padding: 32px;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 26px;
    background: rgba(251, 248, 240, 0.96);
    box-shadow: 0 40px 100px rgba(10, 25, 17, 0.45), 0 0 60px rgba(190, 148, 62, 0.2);
    animation: authPop 450ms cubic-bezier(0.2, 1.25, 0.4, 1) both;
  }

  .auth-modal h3 {
    margin: 0 0 18px;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 24px;
    letter-spacing: -0.04em;
    color: #183b29;
  }

  .auth-modal ol {
    display: grid;
    gap: 14px;
    margin: 0 0 24px;
    padding: 0;
    list-style: none;
    counter-reset: t;
  }

  .auth-modal li {
    position: relative;
    padding-left: 38px;
    color: #4d6256;
    font-size: 14px;
    line-height: 1.6;
    counter-increment: t;
  }

  .auth-modal li::before {
    content: counter(t);
    position: absolute;
    left: 0;
    top: 1px;
    width: 26px;
    height: 26px;
    border-radius: 9px;
    display: grid;
    place-items: center;
    background: rgba(190, 148, 62, 0.14);
    color: #8a6420;
    font-size: 12px;
    font-weight: 800;
  }

  .auth-modal li strong { display: block; color: #183b29; }

  .auth-modal__actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  /* ---------- keyframes ---------- */

  @keyframes authPaneIn {
    from { opacity: 0; transform: translateX(calc(var(--dir, 1) * 38px)); }
    to { opacity: 1; transform: none; }
  }

  @keyframes authRise {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: none; }
  }

  @keyframes authItemIn2 {
    from { opacity: 0; transform: translateX(-24px); }
    to { opacity: 1; transform: none; }
  }

  @keyframes authFadeDown {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: none; }
  }

  @keyframes authFade { from { opacity: 0; } to { opacity: 1; } }

  @keyframes authPop {
    0% { opacity: 0; transform: scale(0.7); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes authShake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-7px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(3px); }
  }

  @keyframes authSpin { to { transform: rotate(360deg); } }

  @keyframes authDraw { to { stroke-dashoffset: 0; } }

  @keyframes authBurst {
    0% { opacity: 1; transform: rotate(var(--a)) translateY(0) scale(1); }
    100% { opacity: 0; transform: rotate(var(--a)) translateY(-84px) scale(0.3); }
  }

  /* ---------- responsive ---------- */

  @media (max-width: 960px) {
    .auth { display: block; }
    .auth-auth { grid-template-columns: 1fr; }
    .auth-auth > .auth-reveal:first-child { display: none; }
  }

  @media (max-width: 620px) {
    .auth-form { padding: 24px 20px; }
    .auth-code { gap: 6px; }
    .auth-code input { height: 54px; font-size: 20px; }
    .auth-steps__label { display: none; }
    .auth-modal__panel { padding: 24px; }
  }
`;

/* =========================================================
   ICONS
   ========================================================= */

const ICONS = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M8.5 12l2.5 2.5L16 9.5" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  edit: (
    <>
      <path d="M4 20h4L19 9l-4-4L4 16v4z" />
      <path d="M13.5 6.5l4 4" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  alert: (
    <>
      <path d="M12 3l10 18H2L12 3z" />
      <path d="M12 10v4M12 17.5v.01" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.1A10 10 0 0112 5c6.4 0 10 7 10 7a17 17 0 01-3.2 4M6.5 6.6A17 17 0 002 12s3.6 7 10 7c1.7 0 3.2-.4 4.5-1" />
      <path d="M9.9 9.9a3 3 0 004.2 4.2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
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
      className={`auth-reveal auth-reveal--${variant} is-${state} ${className}`}
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
          <span className="auth-word" style={{ '--i': start + index }}>
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
      className={`auth-glass${hover ? ' auth-glass--hover' : ''} ${className}`}
      onPointerMove={handleMove}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function Eyebrow({ children, dark = false }) {
  return (
    <div className={dark ? 'auth-eyebrow auth-eyebrow--dark' : 'auth-eyebrow'}>
      <span className="auth-eyebrow__dot" />
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title, text }) {
  return (
    <Reveal className="auth-section__head" variant="blur">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="auth-section__title">{title}</h2>
      {text && <p className="auth-section__text">{text}</p>}
    </Reveal>
  );
}


/* =========================================================
   CONFIG + HELPERS
   ========================================================= */

const MIN_AGE = 16; // change to match your own sign-up policy
const CODE_LENGTH = 6;
const RESEND_SECONDS = 30;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const passwordRules = [
  { id: 'len', label: '8+ characters', test: (p) => p.length >= 8, required: true },
  { id: 'case', label: 'Upper and lower case', test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p), required: true },
  { id: 'num', label: 'A number', test: (p) => /\d/.test(p), required: true },
  { id: 'sym', label: 'A symbol', test: (p) => /[^A-Za-z0-9]/.test(p), required: false },
];

const pitch = [
  { icon: 'shield', text: 'Consent before anything is read' },
  { icon: 'lock', text: 'No PIN or password ever requested' },
  { icon: 'edit', text: 'You review and submit every draft' },
];

const termsSummary = [
  ['Your consent', 'Documents are processed only after you agree, and you can withdraw consent at any time.'],
  ['Your data', 'Only information needed for matching and summaries is used. You can delete your documents and details whenever you like.'],
  ['What FinEdAI is', 'An assistant. It does not decide funding, it does not replace HELB, HEF or any committee, and its summaries are not official scores.'],
  ['Your responsibility', 'Provide true information, review every draft, and submit applications yourself.'],
  ['Your security', 'FinEdAI never asks for an M-Pesa PIN, a bank password or direct access to an account.'],
];

const pause = (ms = 800) => new Promise((resolve) => window.setTimeout(resolve, ms));

const todayIso = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${now.getFullYear()}-${month}-${day}`;
};

const ageFrom = (iso) => {
  const [year, month, day] = iso.split('-').map(Number);
  const now = new Date();
  let age = now.getFullYear() - year;

  if (now.getMonth() + 1 < month || (now.getMonth() + 1 === month && now.getDate() < day)) age -= 1;

  return age;
};

/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

function Field({ id, label, type = 'text', icon, value, onChange, error, autoComplete, right, filled = false, inputProps }) {
  const isFilled = filled || value !== '';

  return (
    <div className={`auth-field${error ? ' has-error' : ''}${isFilled ? ' is-filled' : ''}`}>
      <div className="auth-field__box">
        <span className="auth-field__icon">
          <Icon name={icon} size={18} />
        </span>

        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...inputProps}
        />

        <label htmlFor={id}>{label}</label>
        {right}
      </div>

      {error && (
        <p className="auth-field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function PasswordField({ id, label, value, onChange, error, autoComplete }) {
  const [shown, setShown] = useState(false);

  return (
    <Field
      id={id}
      label={label}
      icon="lock"
      type={shown ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      error={error}
      autoComplete={autoComplete}
      right={
        <button
          type="button"
          className="auth-field__eye"
          onClick={() => setShown((previous) => !previous)}
          aria-label={shown ? 'Hide password' : 'Show password'}
        >
          <Icon name={shown ? 'eyeOff' : 'eye'} size={17} />
        </button>
      }
    />
  );
}

function Check({ checked, onChange, error, optional = false, children }) {
  return (
    <label className={`auth-check${error ? ' has-error' : ''}`}>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="auth-check__box">
        <Icon name="check" size={14} strokeWidth={3} />
      </span>
      <span>
        {children}
        {optional && <span className="auth-check__opt">Optional</span>}
      </span>
    </label>
  );
}

function Submit({ loading, children }) {
  return (
    <button type="submit" className="auth-button auth-button--primary" disabled={loading}>
      {loading ? (
        <span className="auth-spin" aria-label="Please wait" />
      ) : (
        <>
          {children}
          <Icon name="arrowRight" size={16} />
        </>
      )}
    </button>
  );
}

function Stepper({ step }) {
  const items = ['Account', 'Verify', 'About you'];

  return (
    <div className="auth-steps" aria-label="Sign-up progress">
      {items.map((label, index) => (
        <React.Fragment key={label}>
          <div
            className={`auth-steps__item${index === step ? ' is-active' : ''}${index < step ? ' is-done' : ''}`}
          >
            <span className="auth-steps__dot">
              {index < step ? <Icon name="check" size={13} strokeWidth={3} /> : index + 1}
            </span>
            <span className="auth-steps__label">{label}</span>
          </div>

          {index < items.length - 1 && (
            <div className={`auth-steps__bar${index < step ? ' is-done' : ''}`}>
              <i />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function CodeInput({ digits, setDigits, error }) {
  const refs = useRef([]);

  useEffect(() => {
    if (refs.current[0]) refs.current[0].focus();
  }, []);

  const focusAt = (index) => {
    const node = refs.current[Math.max(0, Math.min(CODE_LENGTH - 1, index))];

    if (node) node.focus();
  };

  const handleChange = (index, raw) => {
    const clean = raw.replace(/\D/g, '');

    if (!clean) {
      setDigits((previous) => previous.map((digit, i) => (i === index ? '' : digit)));
      return;
    }

    setDigits((previous) => {
      const next = [...previous];

      clean.split('').forEach((char, offset) => {
        if (index + offset < CODE_LENGTH) next[index + offset] = char;
      });

      return next;
    });

    focusAt(index + clean.length);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !digits[index]) focusAt(index - 1);
    if (event.key === 'ArrowLeft') focusAt(index - 1);
    if (event.key === 'ArrowRight') focusAt(index + 1);
  };

  const handlePaste = (event) => {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);

    if (!pasted) return;

    event.preventDefault();
    setDigits(Array.from({ length: CODE_LENGTH }, (_, i) => pasted[i] || ''));
    focusAt(pasted.length);
  };

  return (
    <div className={`auth-code${error ? ' has-error' : ''}`} onPaste={handlePaste} role="group" aria-label="Verification code">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          className={digit ? 'is-filled' : ''}
          value={digit}
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={CODE_LENGTH}
          aria-label={`Digit ${index + 1}`}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onFocus={(event) => event.target.select()}
        />
      ))}
    </div>
  );
}

/* =========================================================
   PAGE
   ========================================================= */

/* Every callback is optional and may return a promise. Throw an Error to show
   its message on the form. With no callbacks the page simulates success, so the
   whole flow can be previewed before the backend exists. */
export default function Login({
  onSignIn = () => pause(),
  onSignUp = () => pause(),
  onVerify = () => pause(),
  onResend = () => pause(300),
  onForgot = () => pause(500),
  onComplete = () => pause(),
  dashboardHref = '#dashboard',
}) {
  const rootRef = useRef(null);

  const [mode, setMode] = useState('signup'); // 'signin' | 'signup'
  const [step, setStep] = useState(0); // 0 account, 1 verify, 2 about you, 3 done
  const [dir, setDir] = useState(1);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    birthday: '',
    terms: false,
    consent: false,
    reminders: true,
    remember: true,
  });
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''));
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showTerms, setShowTerms] = useState(false);

  useScrollFx(rootRef);

  /* resend countdown */
  useEffect(() => {
    if (countdown <= 0) return undefined;

    const timer = window.setTimeout(() => setCountdown((previous) => previous - 1), 1000);

    return () => window.clearTimeout(timer);
  }, [countdown]);

  /* close the terms dialog with Escape */
  useEffect(() => {
    if (!showTerms) return undefined;

    const onKey = (event) => event.key === 'Escape' && setShowTerms(false);

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, [showTerms]);

  const set = (key, value) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) =>
      previous[key] || previous.form ? { ...previous, [key]: undefined, form: undefined } : previous
    );
    setFormError('');
    setInfo('');
  };

  const fail = (nextErrors) => {
    setErrors(nextErrors);
    setShaking(true);
    window.setTimeout(() => setShaking(false), 500);
  };

  const go = (nextStep) => {
    setDir(nextStep >= step ? 1 : -1);
    setStep(nextStep);
    setErrors({});
    setFormError('');
    setInfo('');
  };

  const switchMode = (nextMode) => {
    if (nextMode === mode) return;

    setDir(nextMode === 'signup' ? 1 : -1);
    setMode(nextMode);
    setStep(0);
    setErrors({});
    setFormError('');
    setInfo('');
  };

  const run = async (task, onSuccess) => {
    setLoading(true);
    setFormError('');

    try {
      await task();
      onSuccess();
    } catch (error) {
      setFormError(error && error.message ? error.message : 'Something went wrong. Please try again.');
      setShaking(true);
      window.setTimeout(() => setShaking(false), 500);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- submit handlers ---------- */

  const submitSignIn = (event) => {
    event.preventDefault();

    const next = {};

    if (!EMAIL_PATTERN.test(values.email.trim())) next.email = 'Enter a valid email address';
    if (!values.password) next.password = 'Enter your password';

    if (Object.keys(next).length) return fail(next);

    return run(
      () => onSignIn({ email: values.email.trim(), password: values.password, remember: values.remember }),
      () => go(3)
    );
  };

  const forgot = () => {
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      return fail({ email: 'Enter your email first and we will send a reset link' });
    }

    return run(
      () => onForgot({ email: values.email.trim() }),
      () => setInfo(`If an account exists for ${values.email.trim()}, a reset link is on its way.`)
    );
  };

  const submitAccount = (event) => {
    event.preventDefault();

    const next = {};
    const failedRule = passwordRules.find((rule) => rule.required && !rule.test(values.password));

    if (values.name.trim().length < 2) next.name = 'Enter your full name';
    if (!EMAIL_PATTERN.test(values.email.trim())) next.email = 'Enter a valid email address';
    if (failedRule) next.password = 'Use 8+ characters with upper and lower case letters and a number';
    if (!next.password && values.confirm !== values.password) next.confirm = 'Passwords do not match';

    if (Object.keys(next).length) return fail(next);

    return run(
      () => onSignUp({ name: values.name.trim(), email: values.email.trim(), password: values.password }),
      () => {
        setDigits(Array(CODE_LENGTH).fill(''));
        setCountdown(RESEND_SECONDS);
        go(1);
      }
    );
  };

  const submitVerify = (event) => {
    event.preventDefault();

    const code = digits.join('');

    if (code.length < CODE_LENGTH) return fail({ code: `Enter the ${CODE_LENGTH}-digit code from your email` });

    return run(
      () => onVerify({ email: values.email.trim(), code }),
      () => go(2)
    );
  };

  const resend = () => {
    if (countdown > 0 || loading) return undefined;

    return run(
      () => onResend({ email: values.email.trim() }),
      () => {
        setCountdown(RESEND_SECONDS);
        setDigits(Array(CODE_LENGTH).fill(''));
        setInfo('A new code has been sent.');
      }
    );
  };

  const submitAbout = (event) => {
    event.preventDefault();

    const next = {};
    const today = todayIso();

    if (!values.birthday) {
      next.birthday = 'Add your date of birth';
    } else if (values.birthday > today) {
      next.birthday = 'Your date of birth cannot be in the future';
    } else if (ageFrom(values.birthday) > 110) {
      next.birthday = 'Please check the year';
    } else if (ageFrom(values.birthday) < MIN_AGE) {
      next.birthday = `You need to be at least ${MIN_AGE} to create an account`;
    }

    if (!values.terms) next.terms = true;
    if (!values.consent) next.consent = true;

    if (Object.keys(next).length) {
      if (next.terms || next.consent) next.form = 'Please accept the required items to continue';
      return fail(next);
    }

    return run(
      () =>
        onComplete({
          name: values.name.trim(),
          email: values.email.trim(),
          birthday: values.birthday,
          consentToProcessing: values.consent,
          acceptedTerms: values.terms,
          deadlineReminders: values.reminders,
        }),
      () => {
        setValues((previous) => ({ ...previous, password: '', confirm: '' }));
        go(3);
      }
    );
  };

  const acceptTerms = () => {
    set('terms', true);
    setShowTerms(false);
  };

  /* ---------- derived ---------- */

  const score = passwordRules.filter((rule) => rule.test(values.password)).length;
  const validBirthday =
    values.birthday && values.birthday <= todayIso() && ageFrom(values.birthday) >= MIN_AGE && ageFrom(values.birthday) <= 110;
  const firstName = values.name.trim().split(' ')[0];

  const headline =
    mode === 'signup'
      ? ['Start your funding', 'journey today.']
      : ['Welcome back,', 'let us continue.'];

  const subText =
    mode === 'signup'
      ? 'Create an account to organise your evidence, find verified opportunities and prepare stronger appeals.'
      : 'Pick up where you left off with your documents, matches and drafts.';

  /* ---------- render ---------- */

  return (
    <>
      <style>{authStyles}</style>

      <main className="auth" id="login" ref={rootRef}>
        <div className="auth-progress" />
        <div className="auth__orb auth__orb--one" />
        <div className="auth__orb auth__orb--two" />
        <div className="auth__orb auth__orb--three" />

        <div className="auth__inner">
          <div className="auth-auth">

            {/* PITCH */}

            <Reveal variant="left">
              <Glass className="auth-glass--dark auth-aside" hover={false}>
                <div>
                  <Eyebrow dark>FinEdAI</Eyebrow>

                  <h1 className="auth-aside__title" key={mode}>
                    <SplitWords text={headline[0]} />
                    <span className="auth-aside__accent">
                      <SplitWords text={headline[1]} start={3} />
                    </span>
                  </h1>

                  <p className="auth-aside__text">{subText}</p>
                </div>

                <ul className="auth-aside__list">
                  {pitch.map((item, index) => (
                    <li key={item.text} style={{ '--i': index }}>
                      <span className="auth-badge">
                        <Icon name={item.icon} size={18} />
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </Glass>
            </Reveal>

            {/* FORM */}

            <Reveal variant="right" delay={120}>
              <Glass className={`auth-form${shaking ? ' is-shaking' : ''}`} hover={false}>
                {step < 3 && (
                  <div className={`auth-seg${mode === 'signup' ? ' is-signup' : ''}`} role="tablist">
                    <span className="auth-seg__pill" />
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mode === 'signin'}
                      className={mode === 'signin' ? 'is-on' : ''}
                      onClick={() => switchMode('signin')}
                    >
                      Sign in
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={mode === 'signup'}
                      className={mode === 'signup' ? 'is-on' : ''}
                      onClick={() => switchMode('signup')}
                    >
                      Create account
                    </button>
                  </div>
                )}

                {mode === 'signup' && step < 3 && <Stepper step={step} />}

                {/* ----- SIGN IN ----- */}

                {mode === 'signin' && step === 0 && (
                  <form className="auth-pane" key="signin" style={{ '--dir': dir }} onSubmit={submitSignIn} noValidate>
                    <div>
                      <h2 className="auth-form__title" style={{ marginTop: 0 }}>Sign in</h2>
                      <p className="auth-form__sub">Use the email and password you signed up with.</p>
                    </div>

                    {formError && (
                      <div className="auth-banner auth-banner--error" role="alert">
                        <Icon name="alert" size={16} />
                        {formError}
                      </div>
                    )}

                    {info && (
                      <div className="auth-banner auth-banner--info" role="status">
                        <Icon name="mail" size={16} />
                        {info}
                      </div>
                    )}

                    <Field
                      id="si-email"
                      label="Email address"
                      type="email"
                      icon="mail"
                      value={values.email}
                      onChange={(value) => set('email', value)}
                      error={errors.email}
                      autoComplete="email"
                    />

                    <PasswordField
                      id="si-password"
                      label="Password"
                      value={values.password}
                      onChange={(value) => set('password', value)}
                      error={errors.password}
                      autoComplete="current-password"
                    />

                    <div className="auth-row">
                      <Check checked={values.remember} onChange={(value) => set('remember', value)}>
                        Remember me
                      </Check>

                      <button type="button" className="auth-link" onClick={forgot}>
                        Forgot password?
                      </button>
                    </div>

                    <Submit loading={loading}>Sign in</Submit>

                    <p className="auth-note">
                      New here?{' '}
                      <button type="button" className="auth-link" onClick={() => switchMode('signup')}>
                        Create an account
                      </button>
                    </p>
                  </form>
                )}

                {/* ----- SIGN UP: ACCOUNT ----- */}

                {mode === 'signup' && step === 0 && (
                  <form className="auth-pane" key="account" style={{ '--dir': dir }} onSubmit={submitAccount} noValidate>
                    {formError && (
                      <div className="auth-banner auth-banner--error" role="alert">
                        <Icon name="alert" size={16} />
                        {formError}
                      </div>
                    )}

                    <Field
                      id="su-name"
                      label="Full name"
                      icon="user"
                      value={values.name}
                      onChange={(value) => set('name', value)}
                      error={errors.name}
                      autoComplete="name"
                    />

                    <Field
                      id="su-email"
                      label="Email address"
                      type="email"
                      icon="mail"
                      value={values.email}
                      onChange={(value) => set('email', value)}
                      error={errors.email}
                      autoComplete="email"
                    />

                    <div>
                      <PasswordField
                        id="su-password"
                        label="Create password"
                        value={values.password}
                        onChange={(value) => set('password', value)}
                        error={errors.password}
                        autoComplete="new-password"
                      />

                      {values.password && (
                        <div className="auth-strength" data-score={score}>
                          <div className="auth-strength__bars" aria-hidden="true">
                            {[1, 2, 3, 4].map((n) => (
                              <i key={n} className={n <= score ? 'is-on' : ''} />
                            ))}
                          </div>

                          <div className="auth-rules">
                            {passwordRules.map((rule) => (
                              <span key={rule.id} className={`auth-rule${rule.test(values.password) ? ' is-met' : ''}`}>
                                <Icon name={rule.test(values.password) ? 'check' : 'x'} size={10} strokeWidth={3.2} />
                                {rule.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <PasswordField
                      id="su-confirm"
                      label="Confirm password"
                      value={values.confirm}
                      onChange={(value) => set('confirm', value)}
                      error={errors.confirm}
                      autoComplete="new-password"
                    />

                    <Submit loading={loading}>Continue</Submit>

                    <p className="auth-note">
                      Already have an account?{' '}
                      <button type="button" className="auth-link" onClick={() => switchMode('signin')}>
                        Sign in
                      </button>
                    </p>
                  </form>
                )}

                {/* ----- SIGN UP: VERIFY EMAIL ----- */}

                {mode === 'signup' && step === 1 && (
                  <form className="auth-pane" key="verify" style={{ '--dir': dir }} onSubmit={submitVerify} noValidate>
                    <div>
                      <h2 className="auth-form__title" style={{ marginTop: 0 }}>Check your email</h2>
                      <p className="auth-form__sub">
                        We sent a {CODE_LENGTH}-digit code to <strong>{values.email.trim()}</strong>. Enter it below to
                        verify your address.
                      </p>
                    </div>

                    {formError && (
                      <div className="auth-banner auth-banner--error" role="alert">
                        <Icon name="alert" size={16} />
                        {formError}
                      </div>
                    )}

                    {info && (
                      <div className="auth-banner auth-banner--info" role="status">
                        <Icon name="mail" size={16} />
                        {info}
                      </div>
                    )}

                    <div>
                      <CodeInput
                        digits={digits}
                        setDigits={(updater) => {
                          setDigits(updater);
                          setErrors({});
                          setInfo('');
                        }}
                        error={errors.code}
                      />

                      {errors.code && (
                        <p className="auth-field__error" role="alert">
                          {errors.code}
                        </p>
                      )}
                    </div>

                    <div className="auth-resend">
                      <span>Did not get it? Check your spam folder.</span>

                      <button type="button" className="auth-link" onClick={resend} disabled={countdown > 0 || loading}>
                        {countdown > 0 ? `Resend in ${countdown}s` : 'Resend code'}
                      </button>
                    </div>

                    <div className="auth-actions">
                      <button type="button" className="auth-button auth-button--ghost" onClick={() => go(0)}>
                        <Icon name="arrowLeft" size={16} />
                        Back
                      </button>

                      <Submit loading={loading}>Verify email</Submit>
                    </div>
                  </form>
                )}

                {/* ----- SIGN UP: ABOUT YOU + TERMS ----- */}

                {mode === 'signup' && step === 2 && (
                  <form className="auth-pane" key="about" style={{ '--dir': dir }} onSubmit={submitAbout} noValidate>
                    <div>
                      <h2 className="auth-form__title" style={{ marginTop: 0 }}>Almost there</h2>
                      <p className="auth-form__sub">Just a few details and your agreement to how FinEdAI works.</p>
                    </div>

                    {(formError || errors.form) && (
                      <div className="auth-banner auth-banner--error" role="alert">
                        <Icon name="alert" size={16} />
                        {formError || errors.form}
                      </div>
                    )}

                    <div>
                      <Field
                        id="su-birthday"
                        label="Date of birth"
                        type="date"
                        icon="calendar"
                        filled
                        value={values.birthday}
                        onChange={(value) => set('birthday', value)}
                        error={errors.birthday}
                        autoComplete="bday"
                        inputProps={{ max: todayIso(), min: '1900-01-01' }}
                      />
                    </div>

                    {validBirthday && (
                      <span className="auth-agepill" key={values.birthday}>
                        <Icon name="check" size={14} strokeWidth={3} />
                        Age {ageFrom(values.birthday)}
                      </span>
                    )}

                    <Check checked={values.terms} onChange={(value) => set('terms', value)} error={errors.terms === true}>
                      I agree to the{' '}
                      <button type="button" className="auth-link" onClick={() => setShowTerms(true)}>
                        Terms and Privacy Policy
                      </button>
                    </Check>

                    <Check checked={values.consent} onChange={(value) => set('consent', value)} error={errors.consent === true}>
                      I consent to FinEdAI processing the documents I choose to upload, and I understand I can delete
                      them at any time.
                    </Check>

                    <Check checked={values.reminders} onChange={(value) => set('reminders', value)} optional>
                      Email me reminders about deadlines and missing documents.
                    </Check>

                    <div className="auth-actions">
                      <button type="button" className="auth-button auth-button--ghost" onClick={() => go(1)}>
                        <Icon name="arrowLeft" size={16} />
                        Back
                      </button>

                      <Submit loading={loading}>Create my account</Submit>
                    </div>
                  </form>
                )}

                {/* ----- DONE ----- */}

                {step === 3 && (
                  <div className="auth-pane auth-done" key="done" style={{ '--dir': dir }}>
                    <div className="auth-done__ring">
                      <div className="auth-burst" aria-hidden="true">
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                          <i key={angle} style={{ '--a': `${angle}deg` }} />
                        ))}
                      </div>

                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </div>

                    <div>
                      <h2 className="auth-form__title">
                        {mode === 'signup' ? `Welcome${firstName ? `, ${firstName}` : ''}!` : 'You are signed in'}
                      </h2>
                      <p className="auth-form__sub">
                        {mode === 'signup'
                          ? 'Your account is ready and your email is verified. Let us build your first profile.'
                          : 'Good to see you again. Your documents, matches and drafts are waiting.'}
                      </p>
                    </div>

                    <a className="auth-button auth-button--primary" href={dashboardHref}>
                      {mode === 'signup' ? 'Start my journey' : 'Go to my dashboard'}
                      <Icon name="arrowRight" size={16} />
                    </a>
                  </div>
                )}
              </Glass>
            </Reveal>
          </div>
        </div>

        {/* TERMS DIALOG (kept outside the animated wrappers so it can cover the page).
            This is a plain-language summary. Replace it with your full legal terms. */}

        {showTerms && (
          <div className="auth-modal" onClick={() => setShowTerms(false)}>
            <div
              className="auth-modal__panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="auth-terms-title"
              onClick={(event) => event.stopPropagation()}
            >
              <h3 id="auth-terms-title">Terms and Privacy</h3>

              <ol>
                {termsSummary.map(([title, text]) => (
                  <li key={title}>
                    <strong>{title}</strong>
                    {text}
                  </li>
                ))}
              </ol>

              <div className="auth-modal__actions">
                <button type="button" className="auth-button auth-button--ghost" onClick={() => setShowTerms(false)}>
                  Close
                </button>

                <button type="button" className="auth-button auth-button--primary" onClick={acceptTerms}>
                  I agree
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}