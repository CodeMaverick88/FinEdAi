import React, { useEffect, useRef, useState } from 'react';

const capStyles = `
  .cap {
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

  .cap *,
  .cap *::before,
  .cap *::after {
    box-sizing: border-box;
  }

  .cap svg {
    display: block;
    flex: none;
  }

  .cap__inner {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ---------- scroll progress + floating orbs ---------- */

  .cap-progress {
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

  .cap__orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(80px);
    animation: capOrb 16s ease-in-out infinite;
    translate: 0 calc(var(--sy) * var(--par, -0.08));
  }

  .cap__orb--one {
    width: 480px;
    height: 480px;
    right: -170px;
    top: 4%;
    background: rgba(190, 148, 62, 0.13);
  }

  .cap__orb--two {
    --par: -0.14;
    width: 420px;
    height: 420px;
    left: -170px;
    top: 38%;
    background: rgba(53, 94, 68, 0.12);
    animation-delay: -6s;
  }

  .cap__orb--three {
    --par: -0.05;
    width: 460px;
    height: 460px;
    right: -180px;
    top: 72%;
    background: rgba(190, 148, 62, 0.11);
    animation-delay: -10s;
  }

  /* ---------- scroll reveal (fades in AND out, both directions) ---------- */

  .cap-reveal {
    --from: translateY(42px);
    opacity: 0;
    transform: var(--from);
    transition:
      opacity 420ms ease,
      transform 420ms ease,
      filter 420ms ease;
    will-change: opacity, transform;
  }

  .cap-reveal--left { --from: translateX(-60px); }
  .cap-reveal--right { --from: translateX(60px); }
  .cap-reveal--pop { --from: scale(0.82) translateY(26px); }
  .cap-reveal--blur { --from: translateY(26px); filter: blur(10px); }
  .cap-reveal--fade { --from: none; }

  .cap-reveal.is-up {
    transform: translateY(-38px) scale(0.97);
  }

  .cap-reveal--fade.is-up {
    transform: none;
  }

  .cap-reveal--blur.is-up {
    filter: blur(10px);
  }

  .cap-reveal.is-in {
    opacity: 1;
    transform: none;
    filter: none;
    transition:
      opacity 800ms ease var(--delay, 0ms),
      transform 1000ms cubic-bezier(0.2, 1.15, 0.3, 1) var(--delay, 0ms),
      filter 800ms ease var(--delay, 0ms);
  }

  .cap-fill > .cap-reveal {
    height: 100%;
  }

  /* ---------- word-by-word pop on load / reload ---------- */

  .cap-word {
    display: inline-block;
    animation: capWord 850ms cubic-bezier(0.2, 1.2, 0.3, 1) both;
    animation-delay: calc(var(--i) * 75ms + 120ms);
  }

  /* ---------- glass + glow ---------- */

  .cap-glass {
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

  .cap-glass::before {
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

  .cap-glass::after {
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

  .cap-glass > * {
    position: relative;
  }

  .cap-glass--hover:hover {
    transform: translateY(-7px);
    border-color: rgba(190, 148, 62, 0.5);
    background: rgba(255, 255, 255, 0.7);
    box-shadow:
      0 28px 64px rgba(36, 79, 53, 0.15),
      0 0 34px rgba(190, 148, 62, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
  }

  .cap-glass--hover:hover::before { opacity: 1; }
  .cap-glass--hover:hover::after { left: 130%; }

  .cap-glass--dark {
    border-color: rgba(255, 255, 255, 0.14);
    background: linear-gradient(
      145deg,
      rgba(15, 35, 24, 0.96),
      rgba(22, 48, 34, 0.93) 52%,
      rgba(13, 29, 21, 0.97)
    );
    color: #f4f0e5;
    animation: capGlow 5s ease-in-out infinite;
  }

  .cap-glass--dark::before {
    background: radial-gradient(
      380px circle at var(--mx, 70%) var(--my, 0%),
      rgba(190, 148, 62, 0.18),
      transparent 62%
    );
    opacity: 1;
  }

  .cap-glass--dark::after { display: none; }

  /* ---------- shared pieces ---------- */

  .cap-badge {
    width: 46px;
    height: 46px;
    flex: none;
    border: 1px solid rgba(190, 148, 62, 0.28);
    border-radius: 15px;
    display: grid;
    place-items: center;
    background: rgba(190, 148, 62, 0.11);
    color: #a77e30;
    animation: capFloat 5s ease-in-out infinite;
    transition:
      transform 360ms cubic-bezier(0.2, 1.3, 0.4, 1),
      box-shadow 360ms ease,
      background 360ms ease;
  }

  .cap-glass--hover:hover .cap-badge {
    transform: scale(1.12) rotate(-5deg);
    background: rgba(190, 148, 62, 0.22);
    box-shadow: 0 0 0 7px rgba(190, 148, 62, 0.1), 0 0 22px rgba(190, 148, 62, 0.35);
  }

  .cap-chip {
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

  .cap-chip:hover {
    transform: translateY(-2px);
    border-color: rgba(190, 148, 62, 0.45);
    background: rgba(255, 255, 255, 0.85);
  }

  .cap-chip--dark {
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.82);
  }

  .cap-chip--dark:hover {
    border-color: rgba(216, 183, 106, 0.5);
    background: rgba(190, 148, 62, 0.16);
  }

  .cap-eyebrow {
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

  .cap-eyebrow--dark {
    border-color: rgba(216, 183, 106, 0.25);
    background: rgba(255, 255, 255, 0.05);
    color: #d8b76a;
  }

  .cap-eyebrow__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #be943e;
    box-shadow: 0 0 0 5px rgba(190, 148, 62, 0.11);
    animation: capPulse 2s ease-in-out infinite;
  }

  .cap-section { margin-top: 120px; }

  .cap-section__head {
    max-width: 700px;
    margin: 0 auto 48px;
    text-align: center;
  }

  .cap-section__title {
    margin: 0;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: clamp(32px, 4vw, 50px);
    line-height: 1.04;
    letter-spacing: -0.05em;
    font-weight: 700;
    color: #183b29;
  }

  .cap-section__text {
    margin: 16px auto 0;
    max-width: 560px;
    color: #617167;
    font-size: 16.5px;
    line-height: 1.7;
  }

  .cap-card__title {
    margin: 0;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 21px;
    font-weight: 700;
    letter-spacing: -0.035em;
    color: #183b29;
  }

  .cap-card__text {
    margin: 10px 0 0;
    color: #617167;
    font-size: 14.5px;
    line-height: 1.65;
  }

  /* ---------- hero ---------- */

  .cap-hero { text-align: center; }

  .cap-hero__title {
    margin: 0 auto;
    max-width: 940px;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: clamp(44px, 6.2vw, 88px);
    line-height: 0.98;
    letter-spacing: -0.06em;
    font-weight: 700;
    color: #183b29;
  }

  .cap-hero__accent {
    display: block;
    color: #b48a37;
    text-shadow: 0 0 40px rgba(190, 148, 62, 0.25);
  }

  .cap-hero__text {
    max-width: 620px;
    margin: 24px auto 0;
    color: #617167;
    font-size: 17.5px;
    line-height: 1.7;
  }

  .cap-hero__actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 13px;
    margin-top: 32px;
  }

  .cap-button {
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

  .cap-button:hover { transform: translateY(-3px); }

  .cap-button:focus-visible,
  .cap-tab:focus-visible,
  .cap-toggle:focus-visible {
    outline: 2px solid #b48a37;
    outline-offset: 3px;
  }

  .cap-button svg { transition: transform 240ms ease; }
  .cap-button:hover svg { transform: translateX(4px); }

  .cap-button--primary {
    background: #244f35;
    color: #fffdf7;
    animation: capBtnGlow 3.2s ease-in-out infinite;
  }

  .cap-button--secondary {
    border-color: rgba(36, 79, 53, 0.16);
    background: rgba(255, 255, 255, 0.5);
    color: #244f35;
    backdrop-filter: blur(15px);
  }

  .cap-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    max-width: 760px;
    margin: 60px auto 0;
  }

  .cap-stat {
    padding: 22px 20px;
    text-align: left;
  }

  .cap-stat__value {
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: -0.05em;
    color: #183b29;
  }

  .cap-stat__label {
    margin-top: 4px;
    color: #6b7a70;
    font-size: 13px;
    line-height: 1.5;
  }

  /* ---------- closing call to action ---------- */

  .cap-cta {
    padding: 64px 40px;
    text-align: center;
  }

  .cap-cta .cap-section__title { color: #f8f5ec; }

  .cap-cta__text {
    max-width: 520px;
    margin: 16px auto 0;
    color: rgba(232, 239, 233, 0.72);
    font-size: 16px;
    line-height: 1.7;
  }

  .cap-cta .cap-hero__actions { margin-top: 30px; }

  .cap-cta .cap-button--primary {
    background: #c9a251;
    color: #172b1e;
    animation: capBtnGlowGold 3.2s ease-in-out infinite;
  }

  .cap-cta .cap-button--secondary {
    border-color: rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.06);
    color: #f4f0e5;
  }

  /* ---------- shared keyframes ---------- */

  @keyframes capPulse {
    0%, 100% { opacity: 0.65; transform: scale(0.9); }
    50% { opacity: 1; transform: scale(1.08); }
  }

  @keyframes capOrb {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(-40px, 50px, 0) scale(1.1); }
  }

  @keyframes capFloat {
    0%, 100% { translate: 0 0; }
    50% { translate: 0 -4px; }
  }

  @keyframes capWord {
    from { opacity: 0; transform: translateY(0.6em) scale(0.88); filter: blur(8px); }
    to { opacity: 1; transform: none; filter: blur(0); }
  }

  @keyframes capGlow {
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

  @keyframes capBtnGlow {
    0%, 100% { box-shadow: 0 14px 30px rgba(36, 79, 53, 0.2); }
    50% { box-shadow: 0 14px 40px rgba(36, 79, 53, 0.38), 0 0 26px rgba(190, 148, 62, 0.3); }
  }

  @keyframes capBtnGlowGold {
    0%, 100% { box-shadow: 0 14px 34px rgba(201, 162, 81, 0.28); }
    50% { box-shadow: 0 14px 44px rgba(201, 162, 81, 0.5), 0 0 30px rgba(216, 183, 106, 0.4); }
  }

  @keyframes capFlow {
    from { transform: translateX(-100%); }
    to { transform: translateX(260%); }
  }

  /* ---------- shared responsive + reduced motion ---------- */

  @media (max-width: 900px) {
    .cap { padding-top: 125px; }
    .cap-section { margin-top: 90px; }
  }

  @media (max-width: 620px) {
    .cap { padding: 112px 18px 80px; }
    .cap-hero__text { font-size: 15.5px; }
    .cap-hero__actions { display: grid; grid-template-columns: 1fr; }
    .cap-button { width: 100%; }
    .cap-stats { grid-template-columns: 1fr; }
    .cap-section__head { margin-bottom: 34px; }
    .cap-section__text { font-size: 15px; }
    .cap-cta { padding: 44px 22px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .cap *,
    .cap *::before,
    .cap *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      transition-delay: 0ms !important;
    }

    .cap-reveal {
      opacity: 1;
      transform: none;
      filter: none;
    }
  }

  /* =========================================================
     CAPABILITIES: BENTO GRID
     ========================================================= */

  .cap-bento {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .cap-bento > .cap-reveal--wide { grid-column: span 2; }

  .cap-bento__card {
    height: 100%;
    min-height: 230px;
    padding: 30px;
    display: flex;
    flex-direction: column;
  }

  .cap-bento__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 26px;
  }

  .cap-bento__num {
    color: rgba(167, 126, 48, 0.4);
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 34px;
    font-weight: 700;
    letter-spacing: -0.05em;
    transition: color 360ms ease, transform 360ms ease;
  }

  .cap-glass--hover:hover .cap-bento__num {
    color: rgba(167, 126, 48, 0.9);
    transform: scale(1.12);
  }

  .cap-bento__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
    padding-top: 22px;
  }

  /* =========================================================
     SEE IT IN ACTION
     ========================================================= */

  .cap-demo {
    padding: 38px;
  }

  .cap-demo__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }

  .cap-demo__panel {
    padding: 26px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.04);
  }

  .cap-demo__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 22px;
  }

  .cap-demo__title {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #f8f5ec;
    font-size: 16px;
    font-weight: 800;
  }

  .cap-demo__title svg { color: #d8b76a; }

  .cap-demo__note {
    color: rgba(255, 255, 255, 0.45);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .cap-bars {
    height: 170px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
    align-items: end;
  }

  .cap-bars__col {
    position: relative;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 7px;
  }

  .cap-bar {
    width: 100%;
    max-width: 30px;
    height: var(--h);
    border-radius: 8px 8px 3px 3px;
    transform-origin: bottom;
    transform: scaleY(0);
    transition: transform 1000ms cubic-bezier(0.2, 1.1, 0.3, 1);
    transition-delay: calc(var(--i) * 140ms + 300ms);
  }

  .cap-bar--in {
    background: linear-gradient(180deg, #9fc8a8, #4f8a64);
    box-shadow: 0 0 18px rgba(126, 170, 137, 0.35);
  }

  .cap-bar--out {
    background: linear-gradient(180deg, #e3c27a, #be943e);
    box-shadow: 0 0 18px rgba(190, 148, 62, 0.35);
  }

  .cap-reveal.is-in .cap-bar { transform: scaleY(1); }

  .cap-bars__low {
    position: absolute;
    top: -6px;
    left: 50%;
    padding: 3px 8px;
    border: 1px solid rgba(228, 128, 104, 0.4);
    border-radius: 999px;
    background: rgba(176, 90, 70, 0.2);
    color: #f0a995;
    font-size: 9.5px;
    font-weight: 800;
    letter-spacing: 0.06em;
    white-space: nowrap;
    translate: -50% 0;
    opacity: 0;
    animation: capLowPulse 2s ease-in-out infinite;
    animation-play-state: paused;
  }

  .cap-reveal.is-in .cap-bars__low {
    opacity: 1;
    animation-play-state: running;
  }

  .cap-bars__labels {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 11px;
    font-weight: 700;
    text-align: center;
  }

  .cap-legend {
    display: flex;
    gap: 18px;
    margin-top: 18px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
  }

  .cap-legend span {
    display: inline-flex;
    align-items: center;
    gap: 7px;
  }

  .cap-legend i {
    width: 10px;
    height: 10px;
    border-radius: 3px;
  }

  .cap-chat {
    display: grid;
    gap: 12px;
    min-height: 236px;
    align-content: start;
  }

  .cap-bubble {
    max-width: 86%;
    padding: 11px 15px;
    border-radius: 16px;
    font-size: 13.5px;
    line-height: 1.55;
    opacity: 0;
  }

  .cap-bubble--coach {
    justify-self: start;
    border: 1px solid rgba(216, 183, 106, 0.26);
    border-bottom-left-radius: 5px;
    background: rgba(190, 148, 62, 0.12);
    color: rgba(255, 255, 255, 0.9);
  }

  .cap-bubble--student {
    justify-self: end;
    border-bottom-right-radius: 5px;
    background: rgba(126, 170, 137, 0.2);
    color: #eef5ee;
  }

  .cap-reveal.is-in .cap-bubble {
    animation: capBubbleIn 650ms cubic-bezier(0.2, 1.2, 0.3, 1) forwards;
    animation-delay: calc(var(--i) * 900ms + 500ms);
  }

  .cap-typing {
    justify-self: start;
    display: inline-flex;
    gap: 5px;
    padding: 13px 15px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.06);
    opacity: 0;
  }

  .cap-reveal.is-in .cap-typing {
    animation: capFadeLate 500ms ease forwards;
    animation-delay: 4400ms;
  }

  .cap-typing i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #d8b76a;
    animation: capDot 1.2s ease-in-out infinite;
  }

  .cap-typing i:nth-child(2) { animation-delay: 0.15s; }
  .cap-typing i:nth-child(3) { animation-delay: 0.3s; }

  .cap-demo__foot {
    margin-top: 22px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.62);
    font-size: 12.5px;
  }

  .cap-demo__foot svg { color: #d8b76a; }

  @keyframes capBubbleIn {
    from { opacity: 0; transform: translateY(14px) scale(0.92); }
    to { opacity: 1; transform: none; }
  }

  @keyframes capFadeLate {
    to { opacity: 1; }
  }

  @keyframes capDot {
    0%, 100% { opacity: 0.3; transform: translateY(0); }
    50% { opacity: 1; transform: translateY(-3px); }
  }

  @keyframes capLowPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(228, 128, 104, 0.35); }
    50% { box-shadow: 0 0 0 7px rgba(228, 128, 104, 0); }
  }

  /* =========================================================
     RESPONSIVE
     ========================================================= */

  @media (max-width: 960px) {
    .cap-bento { grid-template-columns: repeat(2, 1fr); }
    .cap-demo__grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 620px) {
    .cap-bento { grid-template-columns: 1fr; }
    .cap-bento > .cap-reveal--wide { grid-column: auto; }
    .cap-bento__card { min-height: 0; padding: 24px; }
    .cap-demo { padding: 20px; }
    .cap-demo__panel { padding: 20px; }
    .cap-bars { gap: 10px; }
    .cap-bars__labels { gap: 10px; }
  }

  @media (max-width: 960px) {
    .cap-bento > .cap-reveal:last-child { grid-column: span 2; }
  }

  @media (max-width: 620px) {
    .cap-bento > .cap-reveal:last-child { grid-column: auto; }
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
  scan: (
    <>
      <path d="M4 8V5a1 1 0 011-1h3" />
      <path d="M16 4h3a1 1 0 011 1v3" />
      <path d="M20 16v3a1 1 0 01-1 1h-3" />
      <path d="M8 20H5a1 1 0 01-1-1v-3" />
      <path d="M4 12h16" />
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
  edit: (
    <>
      <path d="M4 20h4L19 9l-4-4L4 16v4z" />
      <path d="M13.5 6.5l4 4" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
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
      className={`cap-reveal cap-reveal--${variant} is-${state} ${className}`}
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
          <span className="cap-word" style={{ '--i': start + index }}>
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
      className={`cap-glass${hover ? ' cap-glass--hover' : ''} ${className}`}
      onPointerMove={handleMove}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function Eyebrow({ children, dark = false }) {
  return (
    <div className={dark ? 'cap-eyebrow cap-eyebrow--dark' : 'cap-eyebrow'}>
      <span className="cap-eyebrow__dot" />
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title, text }) {
  return (
    <Reveal className="cap-section__head" variant="blur">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="cap-section__title">{title}</h2>
      {text && <p className="cap-section__text">{text}</p>}
    </Reveal>
  );
}


/* =========================================================
   CONTENT
   ========================================================= */

const capabilities = [
  {
    icon: 'scan',
    title: 'Document reading',
    text: 'Turns long M-Pesa and bank statements into organised, usable information.',
    tags: ['OCR', 'Computer Vision'],
    wide: true,
  },
  {
    icon: 'chart',
    title: 'Hardship summary',
    text: 'Shows money in, money out and the weeks the balance ran low.',
    tags: ['Python', 'Pandas'],
  },
  {
    icon: 'chat',
    title: 'Appeal coach',
    text: 'Asks simple questions, lists the documents you need, then drafts your letter.',
    tags: ['Generative AI', 'NLP'],
  },
  {
    icon: 'target',
    title: 'Opportunity matching',
    text: 'Finds funding that fits you and explains why, not just a score.',
    tags: ['NLP', 'Verified sources'],
    wide: true,
  },
  {
    icon: 'edit',
    title: 'Application drafts',
    text: 'Appeals, bursary applications and personal statements to review, edit and download.',
    tags: ['Generative AI', 'React'],
    wide: true,
  },
  {
    icon: 'lock',
    title: 'Privacy by design',
    text: 'Consent first, delete anytime, and no PIN or password ever.',
    tags: ['Consent', 'Encrypted'],
  },
];

const weeks = [
  { label: 'Week 1', money: 62, spent: 38 },
  { label: 'Week 2', money: 34, spent: 52 },
  { label: 'Week 3', money: 14, spent: 46, low: true },
  { label: 'Week 4', money: 48, spent: 30 },
];

const chat = [
  { from: 'student', text: 'My father lost his job this year.' },
  { from: 'coach', text: 'I am sorry to hear that. Do you have a letter or recent payslip showing it?' },
  { from: 'student', text: 'Yes, I have the letter.' },
  { from: 'coach', text: 'Added to your checklist. I have started your draft for you to review.' },
];

/* =========================================================
   PAGE
   ========================================================= */

export default function Capabilities() {
  const rootRef = useRef(null);

  useScrollFx(rootRef);

  return (
    <>
      <style>{capStyles}</style>

      <main className="cap" id="capabilities" ref={rootRef}>
        <div className="cap-progress" />
        <div className="cap__orb cap__orb--one" />
        <div className="cap__orb cap__orb--two" />
        <div className="cap__orb cap__orb--three" />

        <div className="cap__inner">

          {/* HERO */}

          <header className="cap-hero">
            <Reveal variant="pop">
              <Eyebrow>Capabilities</Eyebrow>
            </Reveal>

            <h1 className="cap-hero__title">
              <SplitWords text="Six capabilities," />
              <span className="cap-hero__accent">
                <SplitWords text="one clear journey." start={2} />
              </span>
            </h1>

            <Reveal delay={500} variant="blur">
              <p className="cap-hero__text">
                Each one solves a single part of the funding process, then
                hands the result back to you to check.
              </p>
            </Reveal>

            <Reveal delay={650} variant="pop">
              <div className="cap-hero__actions">
                <a className="cap-button cap-button--primary" href="#start">
                  Start the demo
                  <Icon name="arrowRight" size={16} />
                </a>

                <a className="cap-button cap-button--secondary" href="#in-action">
                  See it in action
                </a>
              </div>
            </Reveal>
          </header>

          {/* BENTO */}

          <section className="cap-section" id="what-it-does">
            <SectionHead eyebrow="What it does" title="Built around the student" />

            <div className="cap-bento cap-fill">
              {capabilities.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={(index % 3) * 110}
                  variant={index % 3 === 0 ? 'left' : index % 3 === 1 ? 'pop' : 'right'}
                  className={item.wide ? 'cap-reveal--wide' : ''}
                >
                  <Glass className="cap-bento__card">
                    <div className="cap-bento__top">
                      <div className="cap-badge">
                        <Icon name={item.icon} size={21} />
                      </div>
                      <span className="cap-bento__num">{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    <h3 className="cap-card__title">{item.title}</h3>
                    <p className="cap-card__text">{item.text}</p>

                    <div className="cap-bento__tags">
                      {item.tags.map((tag) => (
                        <span className="cap-chip" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Glass>
                </Reveal>
              ))}
            </div>
          </section>

          {/* SEE IT IN ACTION */}

          <section className="cap-section" id="in-action">
            <SectionHead
              eyebrow="See it in action"
              title="From statement to story"
              text="A quick look at two capabilities, using made-up sample data."
            />

            <Reveal variant="pop">
              <Glass className="cap-glass--dark cap-demo" hover={false}>
                <div className="cap-demo__grid">
                  <div className="cap-demo__panel">
                    <div className="cap-demo__head">
                      <div className="cap-demo__title">
                        <Icon name="chart" size={18} />
                        Hardship summary
                      </div>
                      <span className="cap-demo__note">Sample data</span>
                    </div>

                    <div className="cap-bars">
                      {weeks.map((week, index) => (
                        <div className="cap-bars__col" key={week.label}>
                          {week.low && <span className="cap-bars__low">Balance ran low</span>}
                          <span
                            className="cap-bar cap-bar--in"
                            style={{ '--h': `${week.money}%`, '--i': index }}
                          />
                          <span
                            className="cap-bar cap-bar--out"
                            style={{ '--h': `${week.spent}%`, '--i': index }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="cap-bars__labels">
                      {weeks.map((week) => (
                        <span key={week.label}>{week.label}</span>
                      ))}
                    </div>

                    <div className="cap-legend">
                      <span><i style={{ background: '#6d9979' }} /> Money in</span>
                      <span><i style={{ background: '#be943e' }} /> Money out</span>
                    </div>
                  </div>

                  <div className="cap-demo__panel">
                    <div className="cap-demo__head">
                      <div className="cap-demo__title">
                        <Icon name="chat" size={18} />
                        Appeal coach
                      </div>
                      <span className="cap-demo__note">Sample chat</span>
                    </div>

                    <div className="cap-chat">
                      {chat.map((message, index) => (
                        <div
                          key={message.text}
                          className={`cap-bubble cap-bubble--${message.from}`}
                          style={{ '--i': index }}
                        >
                          {message.text}
                        </div>
                      ))}

                      <div className="cap-typing" aria-hidden="true">
                        <i /><i /><i />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cap-demo__foot">
                  <Icon name="shield" size={16} />
                  You review and correct everything. The summary supports an
                  appeal and is not an official HELB or HEF score.
                </div>
              </Glass>
            </Reveal>
          </section>

          {/* CTA */}

          <section className="cap-section" id="get-started">
            <Reveal variant="pop">
              <Glass className="cap-glass--dark cap-cta" hover={false}>
                <Eyebrow dark>Your draft, your decision</Eyebrow>

                <h2 className="cap-section__title">Every output is yours to review</h2>

                <p className="cap-cta__text">
                  FinEdAI prepares. You edit, approve and submit.
                </p>

                <div className="cap-hero__actions">
                  <a className="cap-button cap-button--primary" href="#start">
                    Start the demo
                    <Icon name="arrowRight" size={16} />
                  </a>

                  <a className="cap-button cap-button--secondary" href="#how-it-works">
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