import React, { useEffect, useRef, useState } from 'react';

const howStyles = `
  .how {
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

  .how *,
  .how *::before,
  .how *::after {
    box-sizing: border-box;
  }

  .how svg {
    display: block;
    flex: none;
  }

  .how__inner {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ---------- scroll progress + floating orbs ---------- */

  .how-progress {
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

  .how__orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(80px);
    animation: howOrb 16s ease-in-out infinite;
    translate: 0 calc(var(--sy) * var(--par, -0.08));
  }

  .how__orb--one {
    width: 480px;
    height: 480px;
    right: -170px;
    top: 4%;
    background: rgba(190, 148, 62, 0.13);
  }

  .how__orb--two {
    --par: -0.14;
    width: 420px;
    height: 420px;
    left: -170px;
    top: 38%;
    background: rgba(53, 94, 68, 0.12);
    animation-delay: -6s;
  }

  .how__orb--three {
    --par: -0.05;
    width: 460px;
    height: 460px;
    right: -180px;
    top: 72%;
    background: rgba(190, 148, 62, 0.11);
    animation-delay: -10s;
  }

  /* ---------- scroll reveal (fades in AND out, both directions) ---------- */

  .how-reveal {
    --from: translateY(42px);
    opacity: 0;
    transform: var(--from);
    transition:
      opacity 420ms ease,
      transform 420ms ease,
      filter 420ms ease;
    will-change: opacity, transform;
  }

  .how-reveal--left { --from: translateX(-60px); }
  .how-reveal--right { --from: translateX(60px); }
  .how-reveal--pop { --from: scale(0.82) translateY(26px); }
  .how-reveal--blur { --from: translateY(26px); filter: blur(10px); }
  .how-reveal--fade { --from: none; }

  .how-reveal.is-up {
    transform: translateY(-38px) scale(0.97);
  }

  .how-reveal--fade.is-up {
    transform: none;
  }

  .how-reveal--blur.is-up {
    filter: blur(10px);
  }

  .how-reveal.is-in {
    opacity: 1;
    transform: none;
    filter: none;
    transition:
      opacity 800ms ease var(--delay, 0ms),
      transform 1000ms cubic-bezier(0.2, 1.15, 0.3, 1) var(--delay, 0ms),
      filter 800ms ease var(--delay, 0ms);
  }

  .how-fill > .how-reveal {
    height: 100%;
  }

  /* ---------- word-by-word pop on load / reload ---------- */

  .how-word {
    display: inline-block;
    animation: howWord 850ms cubic-bezier(0.2, 1.2, 0.3, 1) both;
    animation-delay: calc(var(--i) * 75ms + 120ms);
  }

  /* ---------- glass + glow ---------- */

  .how-glass {
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

  .how-glass::before {
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

  .how-glass::after {
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

  .how-glass > * {
    position: relative;
  }

  .how-glass--hover:hover {
    transform: translateY(-7px);
    border-color: rgba(190, 148, 62, 0.5);
    background: rgba(255, 255, 255, 0.7);
    box-shadow:
      0 28px 64px rgba(36, 79, 53, 0.15),
      0 0 34px rgba(190, 148, 62, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
  }

  .how-glass--hover:hover::before { opacity: 1; }
  .how-glass--hover:hover::after { left: 130%; }

  .how-glass--dark {
    border-color: rgba(255, 255, 255, 0.14);
    background: linear-gradient(
      145deg,
      rgba(15, 35, 24, 0.96),
      rgba(22, 48, 34, 0.93) 52%,
      rgba(13, 29, 21, 0.97)
    );
    color: #f4f0e5;
    animation: howGlow 5s ease-in-out infinite;
  }

  .how-glass--dark::before {
    background: radial-gradient(
      380px circle at var(--mx, 70%) var(--my, 0%),
      rgba(190, 148, 62, 0.18),
      transparent 62%
    );
    opacity: 1;
  }

  .how-glass--dark::after { display: none; }

  /* ---------- shared pieces ---------- */

  .how-badge {
    width: 46px;
    height: 46px;
    flex: none;
    border: 1px solid rgba(190, 148, 62, 0.28);
    border-radius: 15px;
    display: grid;
    place-items: center;
    background: rgba(190, 148, 62, 0.11);
    color: #a77e30;
    animation: howFloat 5s ease-in-out infinite;
    transition:
      transform 360ms cubic-bezier(0.2, 1.3, 0.4, 1),
      box-shadow 360ms ease,
      background 360ms ease;
  }

  .how-glass--hover:hover .how-badge {
    transform: scale(1.12) rotate(-5deg);
    background: rgba(190, 148, 62, 0.22);
    box-shadow: 0 0 0 7px rgba(190, 148, 62, 0.1), 0 0 22px rgba(190, 148, 62, 0.35);
  }

  .how-chip {
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

  .how-chip:hover {
    transform: translateY(-2px);
    border-color: rgba(190, 148, 62, 0.45);
    background: rgba(255, 255, 255, 0.85);
  }

  .how-chip--dark {
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.82);
  }

  .how-chip--dark:hover {
    border-color: rgba(216, 183, 106, 0.5);
    background: rgba(190, 148, 62, 0.16);
  }

  .how-eyebrow {
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

  .how-eyebrow--dark {
    border-color: rgba(216, 183, 106, 0.25);
    background: rgba(255, 255, 255, 0.05);
    color: #d8b76a;
  }

  .how-eyebrow__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #be943e;
    box-shadow: 0 0 0 5px rgba(190, 148, 62, 0.11);
    animation: howPulse 2s ease-in-out infinite;
  }

  .how-section { margin-top: 120px; }

  .how-section__head {
    max-width: 700px;
    margin: 0 auto 48px;
    text-align: center;
  }

  .how-section__title {
    margin: 0;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: clamp(32px, 4vw, 50px);
    line-height: 1.04;
    letter-spacing: -0.05em;
    font-weight: 700;
    color: #183b29;
  }

  .how-section__text {
    margin: 16px auto 0;
    max-width: 560px;
    color: #617167;
    font-size: 16.5px;
    line-height: 1.7;
  }

  .how-card__title {
    margin: 0;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 21px;
    font-weight: 700;
    letter-spacing: -0.035em;
    color: #183b29;
  }

  .how-card__text {
    margin: 10px 0 0;
    color: #617167;
    font-size: 14.5px;
    line-height: 1.65;
  }

  /* ---------- hero ---------- */

  .how-hero { text-align: center; }

  .how-hero__title {
    margin: 0 auto;
    max-width: 940px;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: clamp(44px, 6.2vw, 88px);
    line-height: 0.98;
    letter-spacing: -0.06em;
    font-weight: 700;
    color: #183b29;
  }

  .how-hero__accent {
    display: block;
    color: #b48a37;
    text-shadow: 0 0 40px rgba(190, 148, 62, 0.25);
  }

  .how-hero__text {
    max-width: 620px;
    margin: 24px auto 0;
    color: #617167;
    font-size: 17.5px;
    line-height: 1.7;
  }

  .how-hero__actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 13px;
    margin-top: 32px;
  }

  .how-button {
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

  .how-button:hover { transform: translateY(-3px); }

  .how-button:focus-visible,
  .how-tab:focus-visible,
  .how-toggle:focus-visible {
    outline: 2px solid #b48a37;
    outline-offset: 3px;
  }

  .how-button svg { transition: transform 240ms ease; }
  .how-button:hover svg { transform: translateX(4px); }

  .how-button--primary {
    background: #244f35;
    color: #fffdf7;
    animation: howBtnGlow 3.2s ease-in-out infinite;
  }

  .how-button--secondary {
    border-color: rgba(36, 79, 53, 0.16);
    background: rgba(255, 255, 255, 0.5);
    color: #244f35;
    backdrop-filter: blur(15px);
  }

  .how-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    max-width: 760px;
    margin: 60px auto 0;
  }

  .how-stat {
    padding: 22px 20px;
    text-align: left;
  }

  .how-stat__value {
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: -0.05em;
    color: #183b29;
  }

  .how-stat__label {
    margin-top: 4px;
    color: #6b7a70;
    font-size: 13px;
    line-height: 1.5;
  }

  /* ---------- closing call to action ---------- */

  .how-cta {
    padding: 64px 40px;
    text-align: center;
  }

  .how-cta .how-section__title { color: #f8f5ec; }

  .how-cta__text {
    max-width: 520px;
    margin: 16px auto 0;
    color: rgba(232, 239, 233, 0.72);
    font-size: 16px;
    line-height: 1.7;
  }

  .how-cta .how-hero__actions { margin-top: 30px; }

  .how-cta .how-button--primary {
    background: #c9a251;
    color: #172b1e;
    animation: howBtnGlowGold 3.2s ease-in-out infinite;
  }

  .how-cta .how-button--secondary {
    border-color: rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.06);
    color: #f4f0e5;
  }

  /* ---------- shared keyframes ---------- */

  @keyframes howPulse {
    0%, 100% { opacity: 0.65; transform: scale(0.9); }
    50% { opacity: 1; transform: scale(1.08); }
  }

  @keyframes howOrb {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(-40px, 50px, 0) scale(1.1); }
  }

  @keyframes howFloat {
    0%, 100% { translate: 0 0; }
    50% { translate: 0 -4px; }
  }

  @keyframes howWord {
    from { opacity: 0; transform: translateY(0.6em) scale(0.88); filter: blur(8px); }
    to { opacity: 1; transform: none; filter: blur(0); }
  }

  @keyframes howGlow {
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

  @keyframes howBtnGlow {
    0%, 100% { box-shadow: 0 14px 30px rgba(36, 79, 53, 0.2); }
    50% { box-shadow: 0 14px 40px rgba(36, 79, 53, 0.38), 0 0 26px rgba(190, 148, 62, 0.3); }
  }

  @keyframes howBtnGlowGold {
    0%, 100% { box-shadow: 0 14px 34px rgba(201, 162, 81, 0.28); }
    50% { box-shadow: 0 14px 44px rgba(201, 162, 81, 0.5), 0 0 30px rgba(216, 183, 106, 0.4); }
  }

  @keyframes howFlow {
    from { transform: translateX(-100%); }
    to { transform: translateX(260%); }
  }

  /* ---------- shared responsive + reduced motion ---------- */

  @media (max-width: 900px) {
    .how { padding-top: 125px; }
    .how-section { margin-top: 90px; }
  }

  @media (max-width: 620px) {
    .how { padding: 112px 18px 80px; }
    .how-hero__text { font-size: 15.5px; }
    .how-hero__actions { display: grid; grid-template-columns: 1fr; }
    .how-button { width: 100%; }
    .how-stats { grid-template-columns: 1fr; }
    .how-section__head { margin-bottom: 34px; }
    .how-section__text { font-size: 15px; }
    .how-cta { padding: 44px 22px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .how *,
    .how *::before,
    .how *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      transition-delay: 0ms !important;
    }

    .how-reveal {
      opacity: 1;
      transform: none;
      filter: none;
    }
  }

  /* =========================================================
     HOW IT WORKS: THE GAP
     ========================================================= */

  .how-gap {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .how-gap__card {
    height: 100%;
    padding: 30px;
  }

  .how-gap__card .how-badge { margin-bottom: 22px; }

  /* =========================================================
     PIPELINE
     ========================================================= */

  .how-pipeline {
    display: grid;
    grid-template-columns: minmax(290px, 0.78fr) minmax(0, 1.22fr);
    gap: 26px;
    align-items: stretch;
  }

  .how-tabs {
    display: grid;
    gap: 10px;
    align-content: start;
  }

  .how-tab {
    position: relative;
    width: 100%;
    padding: 15px 18px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.78);
    border-radius: 18px;
    display: flex;
    align-items: center;
    gap: 14px;
    background: rgba(255, 255, 255, 0.42);
    color: #3a5545;
    font: inherit;
    text-align: left;
    cursor: pointer;
    backdrop-filter: blur(18px);
    transition:
      transform 300ms cubic-bezier(0.22, 0.8, 0.3, 1),
      background 300ms ease,
      border-color 300ms ease,
      box-shadow 300ms ease;
  }

  .how-reveal.is-in .how-tab {
    animation: howTabIn 650ms cubic-bezier(0.2, 1.1, 0.3, 1) backwards;
    animation-delay: calc(var(--i) * 90ms + 150ms);
  }

  .how-tab:hover {
    transform: translateX(6px);
    background: rgba(255, 255, 255, 0.72);
    border-color: rgba(190, 148, 62, 0.35);
  }

  .how-tab.is-active {
    transform: translateX(10px);
    border-color: rgba(190, 148, 62, 0.55);
    background: rgba(255, 255, 255, 0.88);
    box-shadow:
      0 18px 40px rgba(36, 79, 53, 0.13),
      0 0 26px rgba(190, 148, 62, 0.22);
  }

  .how-tab__icon {
    width: 38px;
    height: 38px;
    flex: none;
    border-radius: 12px;
    display: grid;
    place-items: center;
    background: rgba(36, 79, 53, 0.07);
    color: #3d6a50;
    transition: background 300ms ease, color 300ms ease;
  }

  .how-tab.is-active .how-tab__icon {
    background: rgba(190, 148, 62, 0.18);
    color: #9a7228;
  }

  .how-tab__number {
    color: #a77e30;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.15em;
  }

  .how-tab__title {
    display: block;
    margin-top: 2px;
    font-size: 15px;
    font-weight: 800;
    color: #1b3d2b;
  }

  .how-tab__bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    transform-origin: left center;
    transform: scaleX(0);
    background: linear-gradient(90deg, #6d9979, #d0aa59);
  }

  .how-tab.is-active .how-tab__bar {
    animation: howTabBar 7000ms linear forwards;
  }

  .how-pipeline.is-paused .how-tab.is-active .how-tab__bar {
    animation-play-state: paused;
  }

  .how-detail {
    height: 100%;
    min-height: 470px;
    padding: 34px;
  }

  .how-detail__content {
    animation: howDetailIn 560ms cubic-bezier(0.22, 0.8, 0.3, 1) both;
  }

  .how-detail__ghost {
    position: absolute !important;
    right: -26px;
    top: -26px;
    color: rgba(216, 183, 106, 0.07);
    pointer-events: none;
    animation: howSpinSlow 40s linear infinite;
  }

  .how-detail__top {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .how-detail .how-badge {
    border-color: rgba(218, 184, 100, 0.3);
    background: rgba(190, 148, 62, 0.12);
    color: #d8b76a;
  }

  .how-detail__step {
    color: #c9a65a;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .how-detail__title {
    margin: 4px 0 0;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.04em;
    color: #f8f5ec;
  }

  .how-detail__summary {
    max-width: 600px;
    margin: 20px 0 0;
    color: rgba(232, 239, 233, 0.72);
    font-size: 15.5px;
    line-height: 1.7;
  }

  .how-detail__list {
    display: grid;
    gap: 10px;
    margin: 24px 0 0;
    padding: 0;
    list-style: none;
  }

  .how-detail__list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    color: rgba(255, 255, 255, 0.86);
    font-size: 14px;
    line-height: 1.6;
    animation: howItemIn 520ms cubic-bezier(0.22, 0.8, 0.3, 1) both;
  }

  .how-detail__tick {
    width: 22px;
    height: 22px;
    margin-top: 1px;
    flex: none;
    border-radius: 8px;
    display: grid;
    place-items: center;
    background: rgba(126, 170, 137, 0.16);
    color: #9fc8a8;
  }

  .how-detail__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 24px;
  }

  .how-detail__control {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-top: 24px;
    padding: 16px 18px;
    border: 1px solid rgba(216, 183, 106, 0.24);
    border-radius: 16px;
    background: rgba(190, 148, 62, 0.08);
    color: rgba(255, 255, 255, 0.86);
    font-size: 13.5px;
    line-height: 1.6;
  }

  .how-detail__control svg {
    margin-top: 2px;
    color: #d8b76a;
  }

  /* =========================================================
     SAFETY
     ========================================================= */

  .how-safety {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }

  .how-safety__panel {
    height: 100%;
    padding: 34px;
  }

  .how-safety__title {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0 0 22px;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.035em;
    color: #183b29;
  }

  .how-safety__list {
    display: grid;
    gap: 14px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .how-safety__list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    color: #43594b;
    font-size: 14.5px;
    line-height: 1.6;
    transition: transform 240ms ease;
  }

  .how-reveal.is-in .how-safety__list li {
    animation: howItemIn 650ms cubic-bezier(0.2, 1.1, 0.3, 1) backwards;
    animation-delay: calc(var(--i) * 120ms + 350ms);
  }

  .how-safety__list li:hover { transform: translateX(5px); }

  .how-safety__mark {
    width: 24px;
    height: 24px;
    margin-top: 1px;
    flex: none;
    border-radius: 8px;
    display: grid;
    place-items: center;
  }

  .how-safety__mark--yes {
    background: rgba(79, 138, 100, 0.14);
    color: #3f7a55;
  }

  .how-safety__mark--no {
    background: rgba(176, 90, 70, 0.12);
    color: #a8503c;
  }

  /* =========================================================
     BUILT WITH (marquee)
     ========================================================= */

  .how-marquee {
    position: relative;
    overflow: hidden;
    padding: 8px 0;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
    mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  }

  .how-marquee__track {
    display: flex;
    width: max-content;
    animation: howMarquee 36s linear infinite;
  }

  .how-marquee:hover .how-marquee__track { animation-play-state: paused; }

  .how-marquee .how-chip {
    margin-right: 12px;
    padding: 11px 20px;
    font-size: 13px;
  }

  /* =========================================================
     KEYFRAMES
     ========================================================= */

  @keyframes howTabBar {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }

  @keyframes howTabIn {
    from { opacity: 0; translate: -34px 0; }
    to { opacity: 1; translate: 0 0; }
  }

  @keyframes howDetailIn {
    from { opacity: 0; transform: translateY(14px); filter: blur(4px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  @keyframes howItemIn {
    from { opacity: 0; transform: translateX(-14px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes howSpinSlow {
    to { transform: rotate(360deg); }
  }

  @keyframes howMarquee {
    to { transform: translateX(-50%); }
  }

  /* =========================================================
     RESPONSIVE
     ========================================================= */

  @media (max-width: 900px) {
    .how-gap,
    .how-pipeline,
    .how-safety { grid-template-columns: 1fr; }

    .how-tabs {
      display: flex;
      overflow-x: auto;
      gap: 10px;
      padding: 4px 2px 12px;
      scroll-snap-type: x mandatory;
    }

    .how-tab {
      width: auto;
      min-width: 230px;
      scroll-snap-align: start;
    }

    .how-tab:hover,
    .how-tab.is-active { transform: translateY(-3px); }

    .how-detail {
      min-height: 0;
      padding: 26px;
    }
  }

  @media (max-width: 620px) {
    .how-gap__card,
    .how-safety__panel { padding: 24px; }
  }
`;

/* =========================================================
   ICONS
   ========================================================= */

const ICONS = {
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
  upload: (
    <>
      <path d="M12 16V4" />
      <path d="M7 9l5-5 5 5" />
      <path d="M5 20h14" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5" />
    </>
  ),
  chart: (
    <>
      <path d="M5 20V11" />
      <path d="M12 20V4" />
      <path d="M19 20v-7" />
    </>
  ),
  chat: <path d="M21 12a8 8 0 01-11.8 7L4 20l1.2-4.6A8 8 0 1121 12z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  alert: (
    <>
      <path d="M12 3l10 18H2L12 3z" />
      <path d="M12 10v4M12 17.5v.01" />
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
      className={`how-reveal how-reveal--${variant} is-${state} ${className}`}
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
          <span className="how-word" style={{ '--i': start + index }}>
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
      className={`how-glass${hover ? ' how-glass--hover' : ''} ${className}`}
      onPointerMove={handleMove}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function Eyebrow({ children, dark = false }) {
  return (
    <div className={dark ? 'how-eyebrow how-eyebrow--dark' : 'how-eyebrow'}>
      <span className="how-eyebrow__dot" />
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title, text }) {
  return (
    <Reveal className="how-section__head" variant="blur">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="how-section__title">{title}</h2>
      {text && <p className="how-section__text">{text}</p>}
    </Reveal>
  );
}


/* =========================================================
   CONTENT
   ========================================================= */

const gapCards = [
  {
    icon: 'alert',
    title: 'Hardship goes unseen',
    text: 'Funding checks lean on household background, so lost income or medical bills can be missed.',
  },
  {
    icon: 'file',
    title: 'Evidence is hard to organise',
    text: 'Pages of M-Pesa and bank statements are hard to turn into a clear case for an appeal.',
  },
  {
    icon: 'search',
    title: 'Opportunities are scattered',
    text: 'Bursaries and grants sit across many sites, and are often found too late.',
  },
];

const steps = [
  {
    icon: 'shield',
    title: 'Sign up and give consent',
    summary: 'Create a secure account and choose what FinEdAI may process. Nothing is read until you agree.',
    happens: ['Secure login over encrypted connections', 'No M-Pesa PIN or bank password, ever'],
    uses: ['Secure login', 'Consent controls'],
    control: 'You can delete your documents at any time.',
  },
  {
    icon: 'upload',
    title: 'Share your details and documents',
    summary: 'Answer a short guided form, then upload statements, receipts and letters as PDFs or scans.',
    happens: ['Institution, course, county and funding needed', 'Text and tables are read from your documents'],
    uses: ['React', 'OCR', 'Computer Vision'],
    control: 'You choose what to share, and can correct or delete it.',
  },
  {
    icon: 'chart',
    title: 'Understand your finances',
    summary: 'Transactions are organised into a hardship summary you can read at a glance.',
    happens: ['Money in, rent, fees and food grouped clearly', 'Low-balance weeks highlighted'],
    uses: ['Python', 'Pandas'],
    control: 'You review and correct it. It is not an official HELB or HEF score.',
  },
  {
    icon: 'chat',
    title: 'Get guided by the appeal coach',
    summary: 'Simple questions about what has changed at home, then a checklist of documents to gather.',
    happens: ['Questions on income, medical costs and siblings in school', 'A personalised draft appeal letter'],
    uses: ['Generative AI', 'NLP'],
    control: 'Answers come from you. Nothing is invented.',
  },
  {
    icon: 'target',
    title: 'Match, draft and submit',
    summary: 'See verified opportunities with a reason for every match, then edit your drafts and submit them yourself.',
    happens: ['Each match shows a reason, source link and deadline', 'Appeals, applications and statements to download'],
    uses: ['NLP', 'PostgreSQL', 'Verified sources'],
    control: 'Nothing is submitted without you. The institution decides.',
  },
];

const safetyYes = [
  'Asks consent before processing any document',
  'Uses only what matching needs',
  'Lets you delete documents anytime',
];

const safetyNo = [
  'Never asks for an M-Pesa PIN or bank password',
  'Never submits anything without you',
  'Never decides who deserves funding',
];

const builtWith = [
  'React', 'Vite', 'Python', 'Flask', 'PostgreSQL', 'Neon',
  'OCR', 'Computer Vision', 'Pandas', 'NLP', 'Generative AI', 'Git',
];

/* =========================================================
   PAGE
   ========================================================= */

const STEP_DURATION = 7000;

export default function HowItWorks() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useScrollFx(rootRef);

  useEffect(() => {
    if (paused) return undefined;

    const timer = window.setTimeout(() => {
      setActive((previous) => (previous + 1) % steps.length);
    }, STEP_DURATION);

    return () => window.clearTimeout(timer);
  }, [active, paused]);

  const step = steps[active];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <style>{howStyles}</style>

      <main className="how" id="how-it-works" ref={rootRef}>
        <div className="how-progress" />
        <div className="how__orb how__orb--one" />
        <div className="how__orb how__orb--two" />
        <div className="how__orb how__orb--three" />

        <div className="how__inner">

          {/* HERO */}

          <header className="how-hero">
            <Reveal variant="pop">
              <Eyebrow>How FinEdAI works</Eyebrow>
            </Reveal>

            <h1 className="how-hero__title">
              <SplitWords text="From scattered documents" />
              <span className="how-hero__accent">
                <SplitWords text="to a stronger application." start={3} />
              </span>
            </h1>

            <Reveal delay={500} variant="blur">
              <p className="how-hero__text">
                An AI funding support agent for Kenyan students. It organises
                your evidence, finds verified opportunities and drafts your
                appeals, while the institution still makes the decision.
              </p>
            </Reveal>

            <Reveal delay={650} variant="pop">
              <div className="how-hero__actions">
                <a className="how-button how-button--primary" href="#start">
                  Start the demo
                  <Icon name="arrowRight" size={16} />
                </a>

                <a className="how-button how-button--secondary" href="#pipeline">
                  Follow the journey
                </a>
              </div>
            </Reveal>

            <div className="how-stats">
              {[
                [5, 'guided steps, start to draft'],
                [6, 'core capabilities'],
                [0, 'PIN or password requests'],
              ].map(([value, label], index) => (
                <Reveal key={label} delay={800 + index * 110} variant="pop">
                  <Glass className="how-stat">
                    <div className="how-stat__value">
                      <CountUp to={value} />
                    </div>
                    <div className="how-stat__label">{label}</div>
                  </Glass>
                </Reveal>
              ))}
            </div>
          </header>

          {/* THE GAP */}

          <section className="how-section" id="why">
            <SectionHead
              eyebrow="The problem"
              title="Why students fall through the gaps"
            />

            <div className="how-gap how-fill">
              {gapCards.map((card, index) => (
                <Reveal
                  key={card.title}
                  delay={index * 120}
                  variant={index === 0 ? 'left' : index === 2 ? 'right' : 'up'}
                >
                  <Glass className="how-gap__card">
                    <div className="how-badge">
                      <Icon name={card.icon} size={21} />
                    </div>

                    <h3 className="how-card__title">{card.title}</h3>
                    <p className="how-card__text">{card.text}</p>
                  </Glass>
                </Reveal>
              ))}
            </div>
          </section>

          {/* PIPELINE */}

          <section className="how-section" id="pipeline">
            <SectionHead
              eyebrow="The journey"
              title="Five steps, one clear path"
              text="Pick a step to see what happens and what stays in your hands."
            />

            <div
              className={paused ? 'how-pipeline how-fill is-paused' : 'how-pipeline how-fill'}
              onPointerEnter={(event) => event.pointerType === 'mouse' && setPaused(true)}
              onPointerLeave={() => setPaused(false)}
            >
              <Reveal className="how-tabs" variant="left" role="tablist" aria-label="FinEdAI steps">
                {steps.map((item, index) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={index === active}
                    key={item.title}
                    className={index === active ? 'how-tab is-active' : 'how-tab'}
                    style={{ '--i': index }}
                    onClick={() => setActive(index)}
                  >
                    <span className="how-tab__icon">
                      <Icon name={item.icon} size={18} />
                    </span>

                    <span>
                      <span className="how-tab__number">
                        STEP {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="how-tab__title">{item.title}</span>
                    </span>

                    <span
                      className="how-tab__bar"
                      key={index === active ? `bar-${active}-${paused}` : 'bar'}
                    />
                  </button>
                ))}
              </Reveal>

              <Reveal variant="right" delay={120}>
                <Glass className="how-glass--dark how-detail" hover={false}>
                  <div className="how-detail__ghost">
                    <Icon name={step.icon} size={190} strokeWidth={1.2} />
                  </div>

                  <div className="how-detail__content" key={active} role="tabpanel">
                    <div className="how-detail__top">
                      <div className="how-badge">
                        <Icon name={step.icon} size={22} />
                      </div>

                      <div>
                        <div className="how-detail__step">
                          Step {String(active + 1).padStart(2, '0')} of {steps.length}
                        </div>
                        <h3 className="how-detail__title">{step.title}</h3>
                      </div>
                    </div>

                    <p className="how-detail__summary">{step.summary}</p>

                    <ul className="how-detail__list">
                      {step.happens.map((line, index) => (
                        <li key={line} style={{ animationDelay: `${180 + index * 120}ms` }}>
                          <span className="how-detail__tick">
                            <Icon name="check" size={13} strokeWidth={2.6} />
                          </span>
                          {line}
                        </li>
                      ))}
                    </ul>

                    <div className="how-detail__chips">
                      {step.uses.map((item) => (
                        <span className="how-chip how-chip--dark" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="how-detail__control">
                      <Icon name="shield" size={18} />
                      <span>
                        <strong>You stay in control.</strong> {step.control}
                      </span>
                    </div>
                  </div>
                </Glass>
              </Reveal>
            </div>
          </section>

          {/* SAFETY */}

          <section className="how-section" id="privacy">
            <SectionHead
              eyebrow="Safety and privacy"
              title="Built for sensitive documents"
              text="You always know what is happening, and you can stop it."
            />

            <div className="how-safety how-fill">
              <Reveal variant="left">
                <Glass className="how-safety__panel">
                  <h3 className="how-safety__title">
                    <span className="how-badge">
                      <Icon name="shield" size={21} />
                    </span>
                    What FinEdAI does
                  </h3>

                  <ul className="how-safety__list">
                    {safetyYes.map((item, index) => (
                      <li key={item} style={{ '--i': index }}>
                        <span className="how-safety__mark how-safety__mark--yes">
                          <Icon name="check" size={14} strokeWidth={2.6} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Glass>
              </Reveal>

              <Reveal variant="right" delay={120}>
                <Glass className="how-safety__panel">
                  <h3 className="how-safety__title">
                    <span className="how-badge">
                      <Icon name="lock" size={21} />
                    </span>
                    What it never does
                  </h3>

                  <ul className="how-safety__list">
                    {safetyNo.map((item, index) => (
                      <li key={item} style={{ '--i': index }}>
                        <span className="how-safety__mark how-safety__mark--no">
                          <Icon name="x" size={14} strokeWidth={2.6} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Glass>
              </Reveal>
            </div>
          </section>

          {/* BUILT WITH */}

          <section className="how-section" id="technology">
            <SectionHead eyebrow="Under the hood" title="What FinEdAI is built with" />

            <Reveal variant="fade">
              <div className="how-marquee" aria-label="Technologies used">
                <div className="how-marquee__track">
                  {[...builtWith, ...builtWith].map((item, index) => (
                    <span className="how-chip" key={`${item}-${index}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* CTA */}

          <section className="how-section" id="get-started">
            <Reveal variant="pop">
              <Glass className="how-glass--dark how-cta" hover={false}>
                <Eyebrow dark>Ready to see it</Eyebrow>

                <h2 className="how-section__title">
                  The student prepares. The institution decides.
                </h2>

                <p className="how-cta__text">
                  FinEdAI never replaces HELB, HEF or a bursary committee. It
                  helps you arrive with a clearer, better-prepared case.
                </p>

                <div className="how-hero__actions">
                  <a className="how-button how-button--primary" href="#start">
                    Start the demo
                    <Icon name="arrowRight" size={16} />
                  </a>

                  <button type="button" className="how-button how-button--secondary" onClick={scrollToTop}>
                    Back to the top
                  </button>
                </div>
              </Glass>
            </Reveal>
          </section>

        </div>
      </main>
    </>
  );
}