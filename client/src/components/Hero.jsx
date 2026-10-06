import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const heroStyles = `
  .finedai-hero {
    position: relative;
    width: 100%;
    min-height: 760px;
    padding: 150px 6vw 90px;
    display: flex;
    align-items: center;
    overflow: hidden;
    background:
      radial-gradient(circle at 8% 18%, rgba(82, 117, 93, 0.12), transparent 32%),
      radial-gradient(circle at 88% 30%, rgba(190, 148, 62, 0.13), transparent 30%),
      linear-gradient(135deg, #fbf8f0 0%, #f4f0e5 48%, #edf2eb 100%);
    color: #173525;
  }

  .finedai-hero svg {
    display: block;
    flex: none;
  }

  .finedai-hero::before {
    content: "";
    position: absolute;
    width: 520px;
    height: 520px;
    right: -190px;
    top: 70px;
    border-radius: 50%;
    background: rgba(190, 148, 62, 0.09);
    filter: blur(80px);
    pointer-events: none;
  }

  .finedai-hero::after {
    content: "";
    position: absolute;
    width: 430px;
    height: 430px;
    left: -190px;
    bottom: -170px;
    border-radius: 50%;
    background: rgba(53, 94, 68, 0.09);
    filter: blur(70px);
    pointer-events: none;
  }

  .finedai-hero__inner {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 0.88fr) minmax(560px, 1.12fr);
    gap: 72px;
    align-items: center;
  }

  .finedai-hero__copy {
    max-width: 650px;
  }

  .finedai-hero__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 25px;
    padding: 8px 13px;
    border: 1px solid rgba(47, 82, 60, 0.15);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.48);
    color: #4f705a;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    backdrop-filter: blur(16px);
  }

  .finedai-hero__eyebrow-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #be943e;
    box-shadow: 0 0 0 5px rgba(190, 148, 62, 0.11);
    animation: finedaiHeroPulse 2s ease-in-out infinite;
  }

  .finedai-hero__title {
    margin: 0;
    min-height: 250px;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: clamp(62px, 6.5vw, 104px);
    line-height: 0.92;
    letter-spacing: -0.065em;
    font-weight: 700;
    color: #183b29;
  }

  .finedai-hero__title-line {
    display: block;
    min-height: 0.95em;
    white-space: nowrap;
  }

  .finedai-hero__title-line--gold {
    color: #b48a37;
  }

  .finedai-hero__cursor {
    display: inline-block;
    width: 4px;
    height: 0.82em;
    margin-left: 8px;
    vertical-align: -0.06em;
    border-radius: 5px;
    background: #b48a37;
    animation: finedaiHeroCursor 0.82s step-end infinite;
  }

  .finedai-hero__description {
    max-width: 590px;
    margin: 27px 0 0;
    color: #617167;
    font-size: 17px;
    line-height: 1.75;
  }

  .finedai-hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 13px;
    margin-top: 31px;
  }

  .finedai-hero__button {
    min-height: 48px;
    padding: 0 21px;
    border: 1px solid transparent;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    text-decoration: none;
    font-size: 13px;
    font-weight: 800;
    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      background 180ms ease;
  }

  .finedai-hero__button:hover {
    transform: translateY(-2px);
  }

  .finedai-hero__button--primary {
    background: #244f35;
    color: #fffdf7;
    box-shadow: 0 14px 30px rgba(36, 79, 53, 0.2);
  }

  .finedai-hero__button--primary:hover {
    box-shadow: 0 18px 38px rgba(36, 79, 53, 0.28);
  }

  .finedai-hero__button--secondary {
    border-color: rgba(36, 79, 53, 0.16);
    background: rgba(255, 255, 255, 0.48);
    color: #244f35;
    backdrop-filter: blur(15px);
  }

  .finedai-hero__trust {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 28px;
    color: #748078;
    font-size: 12px;
  }

  .finedai-hero__trust-icon {
    width: 33px;
    height: 33px;
    flex: none;
    border: 1px solid rgba(36, 79, 53, 0.13);
    border-radius: 11px;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.48);
    color: #47735a;
  }

  /* =========================================================
     PRODUCT WALKTHROUGH
     ========================================================= */

  .finedai-demo {
    position: relative;
    width: 100%;
    min-width: 0;
  }

  .finedai-demo__glow {
    position: absolute;
    inset: 8% 7%;
    border-radius: 42px;
    background: rgba(65, 105, 77, 0.16);
    filter: blur(42px);
    transform: translateY(24px);
    pointer-events: none;
  }

  .finedai-demo__window {
    position: relative;
    height: 640px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.48);
    border-radius: 30px;
    background:
      linear-gradient(
        145deg,
        rgba(15, 35, 24, 0.97),
        rgba(22, 48, 34, 0.94) 52%,
        rgba(13, 29, 21, 0.98)
      );
    box-shadow:
      0 35px 80px rgba(25, 55, 38, 0.24),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(30px);
  }

  .finedai-demo__window.is-paused *,
  .finedai-demo__window.is-paused *::before,
  .finedai-demo__window.is-paused *::after {
    animation-play-state: paused !important;
  }

  .finedai-demo__topbar {
    flex: none;
    height: 54px;
    padding: 0 19px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .finedai-demo__traffic {
    display: flex;
    gap: 7px;
  }

  .finedai-demo__traffic span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.28);
  }

  .finedai-demo__traffic span:nth-child(2) {
    background: rgba(255, 255, 255, 0.19);
  }

  .finedai-demo__traffic span:nth-child(3) {
    background: rgba(255, 255, 255, 0.13);
  }

  .finedai-demo__brand {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.74);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
  }

  .finedai-demo__brand-mark {
    width: 24px;
    height: 24px;
    border: 1px solid rgba(218, 184, 100, 0.35);
    border-radius: 8px;
    display: grid;
    place-items: center;
    color: #d8b76a;
    font-size: 10px;
  }

  .finedai-demo__status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: rgba(255, 255, 255, 0.46);
    font-size: 9px;
    font-weight: 700;
  }

  .finedai-demo__status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #8bb795;
    box-shadow: 0 0 10px rgba(139, 183, 149, 0.7);
    animation: finedaiHeroPulse 2s ease-in-out infinite;
  }

  .finedai-demo__body {
    flex: 1;
    min-height: 0;
    padding: 22px 24px 20px;
    display: flex;
    flex-direction: column;
  }

  .finedai-demo__stage-header {
    flex: none;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 18px;
    min-height: 88px;
    margin-bottom: 12px;
  }

  .finedai-demo__stage-head-main {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    min-width: 0;
    animation: finedaiTextIn 520ms ease both;
  }

  .finedai-demo__stage-icon {
    width: 42px;
    height: 42px;
    flex: none;
    border: 1px solid rgba(218, 184, 100, 0.3);
    border-radius: 13px;
    display: grid;
    place-items: center;
    background: rgba(190, 148, 62, 0.1);
    color: #d8b76a;
    animation: finedaiPop 560ms cubic-bezier(0.2, 1.4, 0.4, 1) both;
  }

  .finedai-demo__stage-number {
    color: #c9a65a;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .finedai-demo__stage-title {
    margin-top: 4px;
    color: #f8f5ec;
    font-family: "Space Grotesk", "DM Sans", system-ui, sans-serif;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.035em;
  }

  .finedai-demo__stage-description {
    margin-top: 5px;
    max-width: 470px;
    color: rgba(232, 239, 233, 0.56);
    font-size: 12px;
    line-height: 1.55;
  }

  .finedai-demo__counter {
    flex: 0 0 auto;
    padding: 7px 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 9px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 9px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  .finedai-demo__screen {
    position: relative;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.075);
    border-radius: 21px;
    background:
      radial-gradient(circle at 80% 15%, rgba(190, 148, 62, 0.08), transparent 30%),
      rgba(5, 17, 11, 0.48);
  }

  .finedai-demo__scene {
    width: 100%;
    height: 100%;
    padding: 20px;
    animation: finedaiSceneIn 520ms cubic-bezier(0.22, 0.8, 0.3, 1) both;
  }

  /* ---------- Timeline ---------- */

  .finedai-demo__timeline {
    flex: none;
    margin-top: 16px;
  }

  .finedai-demo__steps {
    display: flex;
    gap: 6px;
  }

  .finedai-demo__step {
    flex: 1;
    min-width: 0;
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.3);
    transition: color 260ms ease;
  }

  .finedai-demo__step:hover {
    color: rgba(255, 255, 255, 0.72);
  }

  .finedai-demo__step:focus-visible {
    outline: 2px solid #d8b76a;
    outline-offset: 3px;
    border-radius: 9px;
  }

  .finedai-demo__step.is-done {
    color: #8bb795;
  }

  .finedai-demo__step.is-active {
    color: #e0c077;
  }

  .finedai-demo__step-icon {
    width: 28px;
    height: 28px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 9px;
    display: grid;
    place-items: center;
    background: rgba(255, 255, 255, 0.03);
    transition:
      transform 320ms cubic-bezier(0.2, 1.2, 0.4, 1),
      background 320ms ease,
      border-color 320ms ease,
      box-shadow 320ms ease;
  }

  .finedai-demo__step.is-done .finedai-demo__step-icon {
    border-color: rgba(139, 183, 149, 0.28);
    background: rgba(112, 159, 121, 0.1);
  }

  .finedai-demo__step.is-active .finedai-demo__step-icon {
    transform: translateY(-3px);
    border-color: rgba(224, 192, 119, 0.55);
    background: rgba(190, 148, 62, 0.16);
    box-shadow: 0 8px 18px rgba(190, 148, 62, 0.18);
  }

  .finedai-demo__step-track {
    width: 100%;
    height: 3px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
  }

  .finedai-demo__step-fill {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #6d9979, #d0aa59);
    transform-origin: left center;
    transform: scaleX(0);
    will-change: transform;
  }

  .finedai-demo__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 14px;
  }

  .finedai-demo__progress-label {
    color: rgba(255, 255, 255, 0.4);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .finedai-demo__buttons {
    display: flex;
    gap: 7px;
  }

  .finedai-demo__restart {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 9px;
    padding: 7px 10px;
    background: rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.58);
    font-size: 9px;
    font-weight: 800;
    cursor: pointer;
    transition: 180ms ease;
  }

  .finedai-demo__restart:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.09);
  }

  .finedai-demo__restart:focus-visible {
    outline: 2px solid #d8b76a;
    outline-offset: 2px;
  }

  /* =========================================================
     SHARED DEMO ELEMENTS
     ========================================================= */

  .demo-card {
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 17px;
    background: rgba(255, 255, 255, 0.045);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035);
  }

  .demo-label {
    display: block;
    margin-bottom: 6px;
    color: rgba(255, 255, 255, 0.46);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .demo-input {
    width: 100%;
    height: 38px;
    padding: 0 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.045);
    color: rgba(255, 255, 255, 0.86);
    font-size: 12px;
    transition: border-color 200ms ease, background 200ms ease;
  }

  .demo-input.is-focus {
    border-color: rgba(216, 183, 106, 0.55);
    background: rgba(190, 148, 62, 0.06);
  }

  .demo-input__icon {
    display: grid;
    place-items: center;
    color: rgba(255, 255, 255, 0.34);
  }

  .demo-input__text {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    letter-spacing: 0.01em;
  }

  .demo-caret {
    display: inline-block;
    width: 1.5px;
    height: 14px;
    margin-left: -5px;
    background: #d8b76a;
    animation: finedaiHeroCursor 0.8s step-end infinite;
  }

  .demo-button {
    min-height: 38px;
    padding: 0 16px;
    border: 0;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    background: #b99245;
    color: #172b1e;
    font-size: 11px;
    font-weight: 900;
    cursor: default;
    transition: transform 240ms ease, box-shadow 240ms ease, opacity 240ms ease;
  }

  .demo-button--ghost {
    min-height: 32px;
    padding: 0 12px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.82);
    font-size: 10px;
  }

  .demo-button--gold-outline {
    min-height: 32px;
    padding: 0 12px;
    background: rgba(190, 148, 62, 0.16);
    border: 1px solid rgba(216, 183, 106, 0.4);
    color: #e0c077;
    font-size: 10px;
  }

  .demo-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 8px;
    border-radius: 999px;
    background: rgba(112, 159, 121, 0.14);
    color: #9fc8a8;
    font-size: 9px;
    font-weight: 800;
    white-space: nowrap;
  }

  .demo-chip--gold {
    background: rgba(190, 148, 62, 0.15);
    color: #e0c077;
  }

  .demo-chip--muted {
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.5);
  }

  .demo-badge {
    width: 32px;
    height: 32px;
    flex: none;
    border-radius: 10px;
    display: grid;
    place-items: center;
    background: rgba(190, 148, 62, 0.11);
    color: #d5b269;
  }

  .demo-badge--green {
    background: rgba(112, 159, 121, 0.13);
    color: #9fc8a8;
  }

  .demo-pop {
    animation: finedaiPop 460ms cubic-bezier(0.2, 1.4, 0.4, 1) both;
  }

  .demo-rise {
    animation: finedaiCardUp 560ms cubic-bezier(0.22, 0.8, 0.3, 1) both;
  }

  /* =========================================================
     STAGE 01 — ACCOUNT AND CONSENT
     ========================================================= */

  .demo-account {
    height: 100%;
    display: grid;
    grid-template-columns: 1.08fr 0.92fr;
    gap: 14px;
  }

  .demo-account__form {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
  }

  .demo-account .demo-input {
    height: 34px;
  }

  .demo-account .demo-label {
    margin-bottom: 5px;
  }

  .demo-account__head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  .demo-account__logo {
    width: 34px;
    height: 34px;
    flex: none;
    border: 1px solid rgba(210, 174, 91, 0.3);
    border-radius: 12px;
    display: grid;
    place-items: center;
    color: #d2ae5b;
    font-weight: 900;
    font-size: 14px;
  }

  .demo-account__heading {
    color: #f5f2e9;
    font-size: 15px;
    font-weight: 800;
  }

  .demo-account__sub {
    margin-top: 3px;
    color: rgba(255, 255, 255, 0.46);
    font-size: 10px;
  }

  .demo-account__fields {
    display: grid;
    gap: 9px;
  }

  .demo-account__button {
    margin-top: auto;
    min-height: 34px;
    width: 100%;
    opacity: 0.45;
  }

  .demo-account__button.is-ready {
    opacity: 1;
    transform: translateY(-1px);
    box-shadow: 0 10px 22px rgba(185, 146, 69, 0.28);
  }

  .demo-consent {
    padding: 18px;
    display: flex;
    flex-direction: column;
  }

  .demo-consent__shield {
    width: 42px;
    height: 42px;
    margin-bottom: 12px;
    border: 1px solid rgba(144, 189, 152, 0.28);
    border-radius: 13px;
    display: grid;
    place-items: center;
    background: rgba(112, 159, 121, 0.1);
    color: #9fc8a8;
    animation: finedaiHalo 2.6s ease-in-out infinite;
  }

  .demo-consent__title {
    color: #f4f0e5;
    font-size: 14px;
    font-weight: 800;
  }

  .demo-consent__text {
    margin-top: 4px;
    color: rgba(255, 255, 255, 0.46);
    font-size: 10px;
    line-height: 1.55;
  }

  .demo-consent__list {
    display: grid;
    gap: 9px;
    margin-top: 14px;
  }

  .demo-consent__row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 10px;
    line-height: 1.45;
    transition: color 300ms ease;
  }

  .demo-consent__row.is-on {
    color: rgba(255, 255, 255, 0.88);
  }

  .demo-consent__box {
    width: 18px;
    height: 18px;
    flex: none;
    margin-top: 1px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    display: grid;
    place-items: center;
    color: transparent;
    transition: all 260ms ease;
  }

  .demo-consent__row.is-on .demo-consent__box {
    border-color: #8fbd99;
    background: rgba(112, 159, 121, 0.28);
    color: #cfe8d5;
    animation: finedaiPop 420ms cubic-bezier(0.2, 1.4, 0.4, 1) both;
  }

  .demo-consent__note {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-top: auto;
    padding-top: 12px;
    color: #9fc8a8;
    font-size: 10px;
    line-height: 1.45;
  }

  /* =========================================================
     STAGE 02 — PROFILE
     ========================================================= */

  .demo-profile {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 14px;
    height: 100%;
  }

  .demo-profile__side {
    padding: 16px;
  }

  .demo-profile__avatar {
    width: 52px;
    height: 52px;
    margin-bottom: 11px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: linear-gradient(145deg, #d2b36d, #718e76);
    color: #183425;
    font-size: 16px;
    font-weight: 900;
  }

  .demo-profile__name {
    color: #f4f1e7;
    font-size: 13px;
    font-weight: 800;
  }

  .demo-profile__status {
    margin-top: 3px;
    color: rgba(255, 255, 255, 0.42);
    font-size: 9px;
  }

  .demo-profile__steps {
    display: grid;
    gap: 11px;
    margin-top: 20px;
  }

  .demo-profile__step {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.36);
    font-size: 10px;
    transition: color 300ms ease;
  }

  .demo-profile__step-dot {
    width: 16px;
    height: 16px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: transparent;
    transition: all 300ms ease;
  }

  .demo-profile__step.is-active {
    color: #d8b76a;
  }

  .demo-profile__step.is-active .demo-profile__step-dot {
    border-color: #d8b76a;
    box-shadow: 0 0 0 3px rgba(216, 183, 106, 0.14);
    animation: finedaiHeroPulse 1.6s ease-in-out infinite;
  }

  .demo-profile__step.is-done {
    color: #9fc8a8;
  }

  .demo-profile__step.is-done .demo-profile__step-dot {
    border-color: #8fbd99;
    background: rgba(112, 159, 121, 0.25);
    color: #cfe8d5;
  }

  .demo-profile__main {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .demo-profile__heading {
    color: #f4f1e7;
    font-size: 14px;
    font-weight: 800;
  }

  .demo-profile__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 9px;
    margin-top: 12px;
  }

  .demo-profile__field {
    min-width: 0;
    padding: 8px 11px;
  }

  .demo-profile__field.is-empty {
    opacity: 0;
  }

  .demo-profile__field-row {
    display: flex;
    align-items: center;
    gap: 7px;
    color: rgba(255, 255, 255, 0.86);
    font-size: 11px;
    font-weight: 700;
  }

  .demo-profile__field-row span:nth-child(2) {
    min-width: 0;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .demo-profile__field-icon {
    color: #d5b269;
  }

  .demo-profile__field-check {
    color: #8fbd99;
  }

  .demo-profile__complete {
    margin-top: auto;
    padding: 11px 13px;
  }

  .demo-profile__complete-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .demo-profile__complete-label {
    color: rgba(255, 255, 255, 0.46);
    font-size: 10px;
  }

  .demo-profile__complete-value {
    color: #93bf9d;
    font-size: 12px;
    font-weight: 900;
    font-variant-numeric: tabular-nums;
  }

  .demo-meter {
    height: 4px;
    overflow: hidden;
    border-radius: 99px;
    background: rgba(255, 255, 255, 0.08);
  }

  .demo-meter__fill {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #61866c, #d1ad5e);
  }

  /* =========================================================
     STAGE 03 — DOCUMENT UPLOAD
     ========================================================= */

  .demo-upload {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    height: 100%;
  }

  .demo-upload__dropzone {
    padding: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px dashed rgba(210, 174, 91, 0.36);
    border-radius: 17px;
    background: rgba(190, 148, 62, 0.035);
  }

  .demo-doc {
    position: relative;
    width: 108px;
    height: 118px;
    margin-bottom: 14px;
    padding: 12px 11px;
    overflow: hidden;
    border-radius: 11px;
    background: rgba(247, 244, 236, 0.95);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.3);
    animation: finedaiFloat 2.6s ease-in-out infinite;
  }

  .demo-doc__line {
    height: 4px;
    margin-bottom: 7px;
    border-radius: 3px;
    background: rgba(32, 59, 43, 0.16);
  }

  .demo-doc__line--short {
    width: 55%;
  }

  .demo-doc__line--gold {
    background: rgba(185, 146, 69, 0.45);
  }

  .demo-doc__beam {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 24px;
    background: linear-gradient(
      180deg,
      transparent,
      rgba(190, 148, 62, 0.34) 85%,
      rgba(190, 148, 62, 0.85)
    );
    animation: finedaiScan 1.9s ease-in-out infinite alternate;
  }

  .demo-upload__title {
    color: #f2eee4;
    font-size: 14px;
    font-weight: 800;
  }

  .demo-upload__sub {
    max-width: 250px;
    margin-top: 6px;
    color: rgba(255, 255, 255, 0.46);
    font-size: 10px;
    line-height: 1.55;
  }

  .demo-upload__consent {
    margin-top: 12px;
  }

  .demo-files {
    display: grid;
    gap: 8px;
    align-content: center;
  }

  .demo-file {
    padding: 10px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0;
    animation: finedaiCardUp 520ms cubic-bezier(0.22, 0.8, 0.3, 1) both;
  }

  .demo-file__icon {
    width: 32px;
    height: 32px;
    flex: none;
    border-radius: 9px;
    display: grid;
    place-items: center;
    background: rgba(125, 166, 135, 0.11);
    color: #91bc9a;
  }

  .demo-file__info {
    min-width: 0;
    flex: 1;
  }

  .demo-file__name {
    overflow: hidden;
    color: rgba(255, 255, 255, 0.82);
    font-size: 11px;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .demo-file__meta {
    display: flex;
    justify-content: space-between;
    margin: 3px 0 6px;
    color: rgba(255, 255, 255, 0.38);
    font-size: 9px;
  }

  .demo-file__done {
    width: 22px;
    height: 22px;
    flex: none;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: rgba(112, 159, 121, 0.16);
    color: #8fbd99;
  }

  .demo-spinner {
    width: 14px;
    height: 14px;
    flex: none;
    border: 2px solid rgba(216, 183, 106, 0.22);
    border-top-color: #d8b76a;
    border-radius: 50%;
    animation: finedaiSpin 0.8s linear infinite;
  }

  /* =========================================================
     STAGE 04 — READ AND ORGANISE
     ========================================================= */

  .demo-extract {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 11px;
  }

  .demo-extract__top {
    display: flex;
    align-items: center;
    gap: 11px;
  }

  .demo-extract__title {
    color: #f2eee4;
    font-size: 13px;
    font-weight: 800;
  }

  .demo-extract__sub {
    margin-top: 2px;
    color: rgba(255, 255, 255, 0.44);
    font-size: 10px;
  }

  .demo-extract__stats {
    display: flex;
    gap: 16px;
    margin-left: auto;
  }

  .demo-extract__stat {
    text-align: right;
  }

  .demo-extract__stat-value {
    color: #e0c077;
    font-size: 17px;
    font-weight: 900;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.03em;
  }

  .demo-extract__stat-label {
    color: rgba(255, 255, 255, 0.4);
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .demo-table {
    flex: 1;
    min-height: 0;
    padding: 6px 4px;
    overflow: hidden;
  }

  .demo-table__head,
  .demo-table__row {
    display: grid;
    grid-template-columns: 58px minmax(0, 1fr) 82px 96px;
    align-items: center;
    gap: 10px;
    padding: 0 12px;
  }

  .demo-table__head {
    height: 26px;
    color: rgba(255, 255, 255, 0.36);
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .demo-table__row {
    height: 33px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.78);
    font-size: 11px;
    animation: finedaiRowIn 480ms cubic-bezier(0.22, 0.8, 0.3, 1) both;
  }

  .demo-table__row.is-flag {
    background: rgba(190, 148, 62, 0.07);
  }

  .demo-table__date {
    color: rgba(255, 255, 255, 0.44);
    font-size: 10px;
  }

  .demo-table__desc {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .demo-table__amount {
    text-align: right;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  .demo-table__amount--in {
    color: #9fc8a8;
  }

  .demo-table__amount--out {
    color: rgba(255, 255, 255, 0.72);
  }

  .demo-table__amount--flag {
    color: #e0c077;
  }

  /* =========================================================
     STAGE 05 — HARDSHIP SUMMARY
     ========================================================= */

  .demo-summary {
    height: 100%;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    grid-template-rows: minmax(0, 1fr) auto;
    gap: 10px 12px;
  }

  .demo-summary__chart {
    padding: 14px 16px 12px;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .demo-summary__chart-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 10px;
  }

  .demo-summary__chart-title {
    color: #f2eee4;
    font-size: 12px;
    font-weight: 800;
  }

  .demo-bars {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    align-items: end;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .demo-bars__col {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 5px;
  }

  .demo-bars__value {
    color: rgba(255, 255, 255, 0.5);
    font-size: 8px;
    font-weight: 800;
    animation: finedaiFade 500ms ease both;
  }

  .demo-bars__bar {
    width: 100%;
    max-width: 34px;
    min-height: 3px;
    border-radius: 7px 7px 3px 3px;
    background: linear-gradient(180deg, #d0aa59, #61866c);
    transform-origin: bottom center;
    animation: finedaiGrow 900ms cubic-bezier(0.22, 0.8, 0.3, 1) both;
  }

  .demo-bars__bar--low {
    background: linear-gradient(180deg, #b98a4a, #7a5a35);
  }

  .demo-bars__months {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;
    margin-top: 7px;
    text-align: center;
    color: rgba(255, 255, 255, 0.4);
    font-size: 9px;
  }

  .demo-summary__tiles {
    display: grid;
    gap: 9px;
    grid-template-rows: repeat(3, minmax(0, 1fr));
    min-height: 0;
  }

  .demo-tile {
    padding: 10px 13px;
    display: flex;
    align-items: center;
    gap: 11px;
    min-height: 0;
    animation: finedaiCardUp 560ms cubic-bezier(0.22, 0.8, 0.3, 1) both;
  }

  .demo-tile__body {
    min-width: 0;
    flex: 1;
  }

  .demo-tile__label {
    color: rgba(255, 255, 255, 0.46);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .demo-tile__value {
    margin-top: 3px;
    color: #f4f0e5;
    font-size: 17px;
    font-weight: 900;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
  }

  .demo-tile__sub {
    margin-top: 2px;
    color: rgba(255, 255, 255, 0.42);
    font-size: 9px;
  }

  .demo-stack {
    display: flex;
    gap: 2px;
    height: 5px;
    margin-top: 6px;
    overflow: hidden;
    border-radius: 99px;
  }

  .demo-stack span {
    display: block;
    height: 100%;
    transform-origin: left center;
    animation: finedaiGrowX 900ms cubic-bezier(0.22, 0.8, 0.3, 1) both;
  }

  .demo-summary__note {
    grid-column: 1 / -1;
    padding: 9px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.58);
    font-size: 10px;
  }

  .demo-summary__note-text {
    flex: 1;
    min-width: 0;
    line-height: 1.45;
  }

  /* =========================================================
     STAGE 06 — APPEAL COACH
     ========================================================= */

  .demo-coach {
    height: 100%;
    display: grid;
    grid-template-columns: 1.25fr 0.75fr;
    gap: 12px;
  }

  .demo-chat {
    padding: 14px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 7px;
    min-height: 0;
    overflow: hidden;
  }

  .demo-chat__head {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: auto;
    color: rgba(255, 255, 255, 0.82);
    font-size: 11px;
    font-weight: 800;
  }

  .demo-msg {
    max-width: 90%;
    padding: 7px 11px;
    border-radius: 14px;
    font-size: 11px;
    line-height: 1.45;
    animation: finedaiMsgIn 420ms cubic-bezier(0.22, 0.8, 0.3, 1) both;
  }

  .demo-msg--ai {
    align-self: flex-start;
    border-bottom-left-radius: 4px;
    background: rgba(255, 255, 255, 0.07);
    color: rgba(255, 255, 255, 0.86);
  }

  .demo-msg--you {
    align-self: flex-end;
    border-bottom-right-radius: 4px;
    background: rgba(185, 146, 69, 0.9);
    color: #172b1e;
    font-weight: 700;
  }

  .demo-typing {
    align-self: flex-start;
    display: flex;
    gap: 4px;
    padding: 11px 13px;
    border-radius: 14px;
    border-bottom-left-radius: 4px;
    background: rgba(255, 255, 255, 0.07);
  }

  .demo-typing span {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.55);
    animation: finedaiDot 1s ease-in-out infinite;
  }

  .demo-typing span:nth-child(2) {
    animation-delay: 150ms;
  }

  .demo-typing span:nth-child(3) {
    animation-delay: 300ms;
  }

  .demo-checklist {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 9px;
    min-height: 0;
  }

  .demo-checklist__title {
    color: #f2eee4;
    font-size: 11px;
    font-weight: 800;
  }

  .demo-checklist__item {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    padding: 9px 10px;
    border: 1px solid rgba(216, 183, 106, 0.2);
    border-radius: 12px;
    background: rgba(190, 148, 62, 0.07);
    color: rgba(255, 255, 255, 0.8);
    font-size: 10px;
    line-height: 1.4;
    animation: finedaiPop 480ms cubic-bezier(0.2, 1.3, 0.4, 1) both;
  }

  .demo-checklist__item svg {
    color: #d8b76a;
    margin-top: 1px;
  }

  .demo-checklist__ready {
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #9fc8a8;
    font-size: 10px;
    font-weight: 800;
    animation: finedaiPop 480ms cubic-bezier(0.2, 1.3, 0.4, 1) both;
  }

  /* =========================================================
     STAGE 07 — OPPORTUNITY MATCHING
     ========================================================= */

  .demo-match {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .demo-match__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    color: rgba(255, 255, 255, 0.82);
    font-size: 12px;
    font-weight: 800;
  }

  .demo-match__top-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .demo-opp {
    padding: 10px 12px;
    display: grid;
    grid-template-columns: 32px minmax(0, 1fr) auto;
    gap: 11px;
    align-items: center;
    animation: finedaiCardUp 600ms cubic-bezier(0.22, 0.8, 0.3, 1) both;
  }

  .demo-opp__name {
    overflow: hidden;
    color: #f4f0e5;
    font-size: 12px;
    font-weight: 800;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .demo-opp__source {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 3px;
    color: rgba(255, 255, 255, 0.42);
    font-size: 9px;
  }

  .demo-opp__why {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 7px;
  }

  .demo-opp__why-label {
    color: rgba(255, 255, 255, 0.4);
    font-size: 9px;
    margin-right: 2px;
  }

  .demo-opp__side {
    align-self: start;
  }

  /* =========================================================
     STAGE 08 — DRAFT DOCUMENTS
     ========================================================= */

  .demo-draft {
    height: 100%;
    display: grid;
    grid-template-columns: 1.4fr 0.6fr;
    gap: 12px;
  }

  .demo-draft__paper {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    min-height: 0;
    border-radius: 17px;
    background: rgba(247, 244, 236, 0.97);
    color: #203b2b;
    animation: finedaiPaper 520ms ease both;
  }

  .demo-draft__paper-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding-bottom: 9px;
    border-bottom: 1px solid rgba(30, 61, 43, 0.1);
  }

  .demo-draft__paper-title {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 900;
  }

  .demo-draft__tag {
    padding: 4px 8px;
    border-radius: 999px;
    background: rgba(185, 146, 69, 0.16);
    color: #8a6a28;
    font-size: 9px;
    font-weight: 900;
  }

  .demo-draft__body {
    flex: 1;
    min-height: 0;
    padding-top: 10px;
    overflow: hidden;
    font-size: 11px;
    line-height: 1.6;
    color: #2b4636;
  }

  .demo-draft__meta {
    margin-bottom: 8px;
    color: #6c7b70;
    font-size: 10px;
    line-height: 1.5;
  }

  .demo-draft__caret {
    display: inline-block;
    width: 1.5px;
    height: 12px;
    margin-left: 1px;
    vertical-align: -2px;
    background: #b48a37;
    animation: finedaiHeroCursor 0.8s step-end infinite;
  }

  .demo-draft__actions {
    display: flex;
    gap: 8px;
    min-height: 32px;
    padding-top: 8px;
  }

  .demo-draft__actions .demo-button {
    background: #244f35;
    color: #fffdf7;
  }

  .demo-draft__actions .demo-button--ghost {
    background: rgba(36, 79, 53, 0.08);
    border-color: rgba(36, 79, 53, 0.16);
    color: #244f35;
  }

  .demo-docs {
    padding: 14px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 0;
  }

  .demo-docs__title {
    color: rgba(255, 255, 255, 0.46);
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .demo-docs__item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 9px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 11px;
    color: rgba(255, 255, 255, 0.58);
    font-size: 10px;
    font-weight: 700;
    line-height: 1.3;
    animation: finedaiCardUp 520ms cubic-bezier(0.22, 0.8, 0.3, 1) both;
  }

  .demo-docs__item span:nth-child(2) {
    flex: 1;
    min-width: 0;
  }

  .demo-docs__item.is-active {
    border-color: rgba(216, 183, 106, 0.4);
    background: rgba(190, 148, 62, 0.1);
    color: #f0dfb4;
  }

  .demo-docs__note {
    margin-top: auto;
    color: rgba(255, 255, 255, 0.42);
    font-size: 9px;
    line-height: 1.5;
  }

  /* =========================================================
     STAGE 09 — SUBMIT AND DECISION
     ========================================================= */

  .demo-review {
    height: 100%;
    display: grid;
    place-items: center;
  }

  .demo-review__panel {
    width: min(540px, 100%);
    padding: 14px 20px;
  }

  .demo-review__top {
    display: flex;
    align-items: center;
    gap: 13px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  }

  .demo-review__authority {
    width: 40px;
    height: 40px;
    flex: none;
    border: 1px solid rgba(207, 173, 93, 0.25);
    border-radius: 12px;
    display: grid;
    place-items: center;
    color: #d0ad60;
  }

  .demo-review__name {
    color: #f1ede3;
    font-size: 12px;
    font-weight: 800;
  }

  .demo-review__role {
    margin-top: 3px;
    color: rgba(255, 255, 255, 0.42);
    font-size: 9px;
  }

  .demo-review__status {
    margin-left: auto;
  }

  .demo-review__timeline {
    display: grid;
    gap: 0;
    margin-top: 12px;
  }

  .demo-review__item {
    position: relative;
    display: grid;
    grid-template-columns: 26px minmax(0, 1fr) auto;
    gap: 12px;
    align-items: center;
    padding: 6px 0;
  }

  .demo-review__item:not(:last-child)::before {
    content: "";
    position: absolute;
    left: 12px;
    top: 32px;
    bottom: -6px;
    width: 1px;
    background: rgba(255, 255, 255, 0.1);
  }

  .demo-review__icon {
    position: relative;
    z-index: 1;
    width: 26px;
    height: 26px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 9px;
    display: grid;
    place-items: center;
    background: rgba(18, 38, 27, 1);
    color: rgba(255, 255, 255, 0.4);
    transition: all 360ms ease;
  }

  .demo-review__item.is-done .demo-review__icon {
    border-color: rgba(143, 189, 153, 0.35);
    background: rgba(40, 78, 54, 1);
    color: #a9d0b1;
  }

  .demo-review__item.is-now .demo-review__icon {
    border-color: rgba(224, 192, 119, 0.55);
    background: rgba(70, 56, 24, 1);
    color: #e0c077;
    animation: finedaiHalo 1.8s ease-in-out infinite;
  }

  .demo-review__item-name {
    color: rgba(255, 255, 255, 0.74);
    font-size: 11px;
    font-weight: 700;
  }

  .demo-review__item-sub {
    margin-top: 2px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 9px;
  }

  .demo-review__item-status {
    opacity: 0;
    transition: opacity 360ms ease;
  }

  .demo-review__item.is-done .demo-review__item-status,
  .demo-review__item.is-now .demo-review__item-status,
  .demo-review__item.is-next .demo-review__item-status {
    opacity: 1;
  }

  .demo-review__footer {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    padding-top: 11px;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    color: rgba(255, 255, 255, 0.48);
    font-size: 10px;
  }

  /* =========================================================
     ANIMATIONS
     ========================================================= */

  @keyframes finedaiHeroPulse {
    0%, 100% {
      opacity: 0.65;
      transform: scale(0.9);
    }
    50% {
      opacity: 1;
      transform: scale(1.08);
    }
  }

  @keyframes finedaiHeroCursor {
    0%, 48% {
      opacity: 1;
    }
    49%, 100% {
      opacity: 0;
    }
  }

  @keyframes finedaiSceneIn {
    from {
      opacity: 0;
      transform: translateY(12px) scale(0.985);
      filter: blur(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes finedaiTextIn {
    from {
      opacity: 0;
      transform: translateX(-8px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes finedaiFloat {
    0%, 100% {
      transform: translateY(0) rotate(-1.5deg);
    }
    50% {
      transform: translateY(-6px) rotate(1deg);
    }
  }

  @keyframes finedaiScan {
    from {
      transform: translateY(-20px);
    }
    to {
      transform: translateY(116px);
    }
  }

  @keyframes finedaiSpin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes finedaiHalo {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(190, 148, 62, 0);
    }
    50% {
      box-shadow: 0 0 0 7px rgba(190, 148, 62, 0.12);
    }
  }

  @keyframes finedaiPaper {
    from {
      opacity: 0;
      transform: translateX(15px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes finedaiPop {
    from {
      opacity: 0;
      transform: scale(0.7);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes finedaiCardUp {
    from {
      opacity: 0;
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes finedaiRowIn {
    from {
      opacity: 0;
      transform: translateX(-12px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes finedaiMsgIn {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes finedaiDot {
    0%, 100% {
      opacity: 0.35;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-3px);
    }
  }

  @keyframes finedaiGrow {
    from {
      opacity: 0;
      transform: scaleY(0);
    }
    to {
      opacity: 1;
      transform: scaleY(1);
    }
  }

  @keyframes finedaiGrowX {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }

  @keyframes finedaiFade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 1120px) {
    .finedai-hero {
      padding-left: 4vw;
      padding-right: 4vw;
    }

    .finedai-hero__inner {
      grid-template-columns: minmax(0, 0.8fr) minmax(500px, 1.2fr);
      gap: 42px;
    }

    .finedai-hero__title {
      font-size: clamp(56px, 6vw, 78px);
    }
  }

  @media (max-width: 900px) {
    .finedai-hero {
      padding-top: 125px;
      padding-bottom: 70px;
    }

    .finedai-hero__inner {
      grid-template-columns: 1fr;
      gap: 50px;
    }

    .finedai-hero__copy {
      max-width: 750px;
    }

    .finedai-hero__title {
      font-size: clamp(58px, 10vw, 88px);
    }

    .finedai-demo {
      max-width: 760px;
      margin: 0 auto;
    }
  }

  @media (max-width: 620px) {
    .finedai-hero {
      min-height: auto;
      padding: 112px 18px 55px;
    }

    .finedai-hero__inner {
      gap: 37px;
    }

    .finedai-hero__eyebrow {
      font-size: 9px;
      letter-spacing: 0.08em;
    }

    .finedai-hero__title {
      font-size: clamp(48px, 14vw, 70px);
      line-height: 0.94;
      min-height: 0;
    }

    .finedai-hero__title-line {
      white-space: normal;
    }

    .finedai-hero__description {
      font-size: 14px;
      line-height: 1.65;
    }

    .finedai-hero__actions {
      display: grid;
      grid-template-columns: 1fr;
    }

    .finedai-hero__button {
      width: 100%;
    }

    .finedai-demo__window {
      height: auto;
      min-height: 600px;
      border-radius: 22px;
    }

    .finedai-demo__body {
      padding: 16px;
    }

    .finedai-demo__stage-header {
      min-height: 100px;
    }

    .finedai-demo__stage-icon {
      width: 36px;
      height: 36px;
    }

    .finedai-demo__stage-title {
      font-size: 19px;
    }

    .finedai-demo__stage-description {
      max-width: 280px;
      font-size: 11px;
    }

    .finedai-demo__screen {
      flex: none;
      height: 372px;
    }

    .finedai-demo__scene {
      padding: 12px;
    }

    .finedai-demo__progress-label {
      display: none;
    }

    .finedai-demo__controls {
      justify-content: flex-end;
    }

    .finedai-demo__step-icon {
      width: 24px;
      height: 24px;
      border-radius: 8px;
    }

    .finedai-demo__step-icon svg {
      width: 12px;
      height: 12px;
    }

    .demo-account,
    .demo-upload,
    .demo-coach,
    .demo-draft,
    .demo-summary {
      grid-template-columns: 1fr;
    }

    .demo-account__form {
      padding: 14px;
    }

    .demo-account__head {
      margin-bottom: 11px;
    }

    .demo-account__fields {
      gap: 8px;
    }

    .demo-account__button {
      margin-top: 12px;
    }

    .demo-consent {
      display: none;
    }

    .demo-profile {
      grid-template-columns: 1fr;
    }

    .demo-profile__side,
    .demo-docs,
    .demo-checklist,
    .demo-upload__dropzone,
    .demo-summary__tiles {
      display: none;
    }

    .demo-summary__chart {
      min-height: 0;
    }

    .demo-summary {
      grid-template-rows: minmax(0, 1fr) auto;
    }

    .demo-table__head,
    .demo-table__row {
      grid-template-columns: 46px minmax(0, 1fr) 70px;
    }

    .demo-table__head span:last-child,
    .demo-table__row span:last-child {
      display: none;
    }

    .demo-extract__stats {
      gap: 10px;
    }

    .demo-extract__sub {
      display: none;
    }

    .demo-opp {
      grid-template-columns: 32px minmax(0, 1fr);
    }

    .demo-opp__side {
      display: none;
    }

    .demo-review__panel {
      padding: 14px;
    }

    .demo-review__status {
      display: none;
    }
  }

  @media (max-width: 390px) {
    .finedai-hero__title {
      font-size: 46px;
    }

    .finedai-demo__window {
      min-height: 590px;
    }

    .finedai-demo__counter {
      display: none;
    }

    .demo-profile__grid {
      grid-template-columns: 1fr;
    }

    .demo-profile__field:nth-child(n + 5) {
      display: none;
    }

    .finedai-demo__step-icon {
      width: 22px;
      height: 22px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .finedai-hero *,
    .finedai-hero *::before,
    .finedai-hero *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
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
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M17 14c2.8 0 4.5 2 4.5 5" />
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
  upload: (
    <>
      <path d="M12 16V4" />
      <path d="M7 9l5-5 5 5" />
      <path d="M5 20h14" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v12" />
      <path d="M7 11l5 5 5-5" />
      <path d="M5 20h14" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
      <path d="M14 3v5h5" />
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
  sparkles: (
    <>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
      <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" />
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
  building: (
    <>
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M9 21v-6h6v6" />
      <path d="M3 21h18" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" />
    </>
  ),
  cap: (
    <>
      <path d="M2 9l10-5 10 5-10 5L2 9z" />
      <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z" />
      <path d="M4 19a2 2 0 012-2h13" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="14.5" r="1" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  trash: (
    <>
      <path d="M5 7h14" />
      <path d="M9 7V4h6v3" />
      <path d="M7 7l1 13h8l1-13" />
    </>
  ),
  trendDown: (
    <>
      <path d="M3 7l6 6 4-4 8 8" />
      <path d="M15 17h6v-6" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3l10 18H2L12 3z" />
      <path d="M12 10v4M12 17.5v.01" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </>
  ),
  send: (
    <>
      <path d="M21 3L10 14" />
      <path d="M21 3l-7 18-4-7-7-4 18-7z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  pause: <path d="M8 5v14M16 5v14" />,
  play: <path d="M7 4l13 8-13 8V4z" />,
  restart: (
    <>
      <path d="M4 12a8 8 0 108-8 8 8 0 00-6 2.7" />
      <path d="M4 4v4h4" />
    </>
  ),
};

function Icon({ name, size = 16, strokeWidth = 1.8 }) {
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
   CONTENT
   ========================================================= */

const headlineLines = [
  'Funding',
  'should find',
  'the student.',
];

/*
 * The walkthrough follows the proposal: consent, profile, documents,
 * OCR, hardship summary, appeal coach, opportunity matching, drafts,
 * and a final decision that stays with the funding institution.
 * Durations are in milliseconds.
 */
const stages = [
  {
    number: '01',
    icon: 'shield',
    duration: 4800,
    title: 'Start with consent',
    description:
      'Students create an account and choose what FinEdAI may process. No M-Pesa PIN or bank password is ever requested.',
  },
  {
    number: '02',
    icon: 'user',
    duration: 5000,
    title: 'Build your student profile',
    description:
      'Institution, course, level, county and the type of funding needed. Only what matching requires.',
  },
  {
    number: '03',
    icon: 'upload',
    duration: 5600,
    title: 'Upload your documents',
    description:
      'M-Pesa statements, bank statements, receipts and supporting letters, added by the student.',
  },
  {
    number: '04',
    icon: 'scan',
    duration: 5600,
    title: 'Read and organise transactions',
    description:
      'OCR and document processing turn long statements into clear, structured transactions.',
  },
  {
    number: '05',
    icon: 'chart',
    duration: 5600,
    title: 'Review your hardship summary',
    description:
      'Income patterns, essential expenses and low-balance periods. The student reviews and corrects it.',
  },
  {
    number: '06',
    icon: 'chat',
    duration: 6200,
    title: 'Get guided by the appeal coach',
    description:
      'Simple questions uncover what changed at home and which documents are worth gathering.',
  },
  {
    number: '07',
    icon: 'target',
    duration: 5600,
    title: 'Discover matching opportunities',
    description:
      'Verified bursaries, scholarships and grants, each with a clear reason it may fit.',
  },
  {
    number: '08',
    icon: 'edit',
    duration: 6200,
    title: 'Prepare your drafts',
    description:
      'Appeal letters and applications written from the student\u2019s own information, ready to edit and download.',
  },
  {
    number: '09',
    icon: 'building',
    duration: 5200,
    title: 'Submit to the institution',
    description:
      'The student stays in control. The responsible funding institution makes the final decision.',
  },
];

/* =========================================================
   TIMING HELPERS
   ========================================================= */

const PauseContext = createContext({ current: false });

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const progressOf = (t, delay, duration) => clamp((t - delay) / duration, 0, 1);
const easeOut = (p) => 1 - Math.pow(1 - p, 3);
const typedText = (text, t, delay, speed) =>
  text.slice(0, clamp(Math.floor((t - delay) / speed), 0, text.length));

/*
 * Each scene gets its own clock. It only advances while the walkthrough
 * is playing, so typing, counters and reveals pause together with the
 * timeline.
 */
function useSceneClock() {
  const pausedRef = useContext(PauseContext);
  const [t, setT] = useState(0);

  useEffect(() => {
    let frame;
    let active = 0;
    let last = null;

    const tick = (now) => {
      if (last === null) last = now;
      const delta = clamp(now - last, 0, 64);
      last = now;

      if (!pausedRef.current) active += delta;

      setT(Math.floor(active / 40) * 40);
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [pausedRef]);

  return t;
}

/* =========================================================
   SCENES
   ========================================================= */

function TypedField({ label, text, t, delay, speed = 40, mask = false, icon }) {
  const shown = typedText(text, t, delay, speed);
  const typing = t >= delay && t < delay + text.length * speed + 350;

  return (
    <div>
      <span className="demo-label">{label}</span>

      <div className={typing ? 'demo-input is-focus' : 'demo-input'}>
        {icon && (
          <span className="demo-input__icon">
            <Icon name={icon} size={13} />
          </span>
        )}

        <span className="demo-input__text">
          {mask ? '\u2022'.repeat(shown.length) : shown}
        </span>

        {typing && <span className="demo-caret" />}
      </div>
    </div>
  );
}

function ConsentRow({ on, children }) {
  return (
    <div className={on ? 'demo-consent__row is-on' : 'demo-consent__row'}>
      <span className="demo-consent__box">
        {on && <Icon name="check" size={12} strokeWidth={2.6} />}
      </span>
      <span>{children}</span>
    </div>
  );
}

function AccountScene() {
  const t = useSceneClock();
  const consentOne = t > 2500;
  const consentTwo = t > 3100;
  const ready = t > 3600;

  return (
    <div className="finedai-demo__scene">
      <div className="demo-account">
        <div className="demo-card demo-account__form">
          <div className="demo-account__head">
            <div className="demo-account__logo">F</div>

            <div>
              <div className="demo-account__heading">
                Create your FinEdAI account
              </div>
              <div className="demo-account__sub">
                Start your student funding journey.
              </div>
            </div>
          </div>

          <div className="demo-account__fields">
            <TypedField
              label="Full name"
              text="Alex Mwangi"
              t={t}
              delay={300}
              speed={45}
              icon="user"
            />

            <TypedField
              label="Email"
              text="alex@email.com"
              t={t}
              delay={1000}
              speed={36}
              icon="mail"
            />

            <TypedField
              label="Password"
              text="password"
              t={t}
              delay={1800}
              speed={70}
              mask
              icon="lock"
            />
          </div>

          <button
            type="button"
            tabIndex={-1}
            className={
              ready
                ? 'demo-button demo-account__button is-ready'
                : 'demo-button demo-account__button'
            }
          >
            Create account
            <Icon name="arrowRight" size={14} />
          </button>
        </div>

        <div className="demo-card demo-consent">
          <div className="demo-consent__shield">
            <Icon name="shield" size={22} />
          </div>

          <div className="demo-consent__title">You decide what we process</div>

          <div className="demo-consent__text">
            FinEdAI asks for consent before reading any document, and shows how
            it will be used.
          </div>

          <div className="demo-consent__list">
            <ConsentRow on={consentOne}>
              I agree to FinEdAI processing the documents I choose to upload.
            </ConsentRow>

            <ConsentRow on={consentTwo}>
              I understand I can delete my documents at any time.
            </ConsentRow>
          </div>

          <div className="demo-consent__note">
            <Icon name="lock" size={14} />
            <span>
              No M-Pesa PIN, bank password or account access is ever requested.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const profileFields = [
  ['Institution', "St. Paul's University", 'building'],
  ['Course', 'BSc Computer Science', 'cap'],
  ['Level', 'Year 3 \u00b7 Undergraduate', 'book'],
  ['County', 'Nakuru', 'pin'],
  ['Funding sought', 'Bursary + HELB appeal', 'wallet'],
  ['Financial situation', 'Reduced family income', 'trendDown'],
];

const profileSteps = [
  ['Personal', 700],
  ['Education', 1700],
  ['Funding need', 3200],
  ['Documents', 99999],
];

function ProfileScene() {
  const t = useSceneClock();
  const completeness = Math.round(easeOut(progressOf(t, 300, 3400)) * 86);

  return (
    <div className="finedai-demo__scene">
      <div className="demo-profile">
        <div className="demo-card demo-profile__side">
          <div className="demo-profile__avatar">AM</div>

          <div className="demo-profile__name">Alex Mwangi</div>
          <div className="demo-profile__status">Student profile</div>

          <div className="demo-profile__steps">
            {profileSteps.map(([label, doneAt], index) => {
              const previousDone =
                index === 0 || t >= profileSteps[index - 1][1];
              const done = t >= doneAt;
              const state = done
                ? 'is-done'
                : previousDone
                ? 'is-active'
                : '';

              return (
                <div
                  className={`demo-profile__step ${state}`}
                  key={label}
                >
                  <span className="demo-profile__step-dot">
                    {done && <Icon name="check" size={10} strokeWidth={3} />}
                  </span>
                  {label}
                </div>
              );
            })}
          </div>
        </div>

        <div className="demo-card demo-profile__main">
          <div className="demo-profile__heading">
            Tell us about your situation
          </div>

          <div className="demo-profile__grid">
            {profileFields.map(([label, value, icon], index) => {
              const revealAt = 450 + index * 430;
              const visible = t >= revealAt;

              return (
                <div
                  key={label}
                  className={
                    visible
                      ? 'demo-card demo-profile__field demo-pop'
                      : 'demo-card demo-profile__field is-empty'
                  }
                >
                  <span className="demo-label">{label}</span>

                  <div className="demo-profile__field-row">
                    <span className="demo-profile__field-icon">
                      <Icon name={icon} size={13} />
                    </span>
                    <span>{value}</span>
                    <span className="demo-profile__field-check">
                      <Icon name="check" size={13} strokeWidth={2.4} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="demo-card demo-profile__complete">
            <div className="demo-profile__complete-top">
              <div className="demo-profile__complete-label">
                Profile completeness
              </div>
              <div className="demo-profile__complete-value">
                {completeness}%
              </div>
            </div>

            <div className="demo-meter">
              <div
                className="demo-meter__fill"
                style={{ width: `${completeness}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const uploadFiles = [
  { name: 'MPESA_Statement.pdf', size: '2.1 MB', type: 'PDF', start: 400 },
  { name: 'Bank_Statement.pdf', size: '1.6 MB', type: 'PDF', start: 1300 },
  { name: 'Fee_Receipt_scan.jpg', size: '0.9 MB', type: 'IMG', start: 2200 },
  { name: 'Support_Letter.pdf', size: '0.4 MB', type: 'PDF', start: 3100 },
];

function UploadScene() {
  const t = useSceneClock();

  return (
    <div className="finedai-demo__scene">
      <div className="demo-upload">
        <div className="demo-upload__dropzone">
          <div className="demo-doc" aria-hidden="true">
            <div className="demo-doc__line demo-doc__line--gold" />
            <div className="demo-doc__line" />
            <div className="demo-doc__line demo-doc__line--short" />
            <div className="demo-doc__line" />
            <div className="demo-doc__line" />
            <div className="demo-doc__line demo-doc__line--short" />
            <div className="demo-doc__line" />
            <div className="demo-doc__beam" />
          </div>

          <div className="demo-upload__title">Add supporting documents</div>

          <div className="demo-upload__sub">
            Statements, receipts and letters that help explain your situation.
            You choose what to upload.
          </div>

          <div className="demo-upload__consent">
            <span className="demo-chip">
              <Icon name="shield" size={11} />
              Consent given
            </span>
          </div>
        </div>

        <div className="demo-files">
          {uploadFiles.map((file, index) => {
            const p = progressOf(t, file.start, 1700);
            const done = p >= 1;
            const status =
              p < 0.35 ? 'Uploading' : p < 1 ? 'Reading text (OCR)' : 'Ready';

            return (
              <div
                className="demo-card demo-file"
                key={file.name}
                style={{ animationDelay: `${file.start - 250}ms` }}
              >
                <div className="demo-file__icon">
                  <Icon name={file.type === 'IMG' ? 'scan' : 'file'} size={15} />
                </div>

                <div className="demo-file__info">
                  <div className="demo-file__name">{file.name}</div>

                  <div className="demo-file__meta">
                    <span>{file.size}</span>
                    <span>{status}</span>
                  </div>

                  <div className="demo-meter">
                    <div
                      className="demo-meter__fill"
                      style={{ width: `${Math.round(easeOut(p) * 100)}%` }}
                    />
                  </div>
                </div>

                {done ? (
                  <div className="demo-file__done demo-pop">
                    <Icon name="check" size={12} strokeWidth={2.6} />
                  </div>
                ) : (
                  <div className="demo-spinner" style={{ opacity: p > 0 ? 1 : 0 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const transactionRows = [
  ['03 Mar', 'Received \u00b7 Mum', '+4,500', 'in', 'Income'],
  ['05 Mar', 'University fees top-up', '\u22126,000', 'out', 'Fees'],
  ['07 Mar', 'Rent \u00b7 Landlord', '\u22125,500', 'out', 'Rent'],
  ['09 Mar', 'Naivas Supermarket', '\u22121,850', 'out', 'Food'],
  ['12 Mar', 'Cash withdrawal', '\u22122,000', 'out', 'Withdrawal'],
  ['15 Mar', 'Balance fell to KSh 120', '120', 'flag', 'Low balance'],
];

const tagClass = {
  Income: 'demo-chip',
  Fees: 'demo-chip demo-chip--gold',
  Rent: 'demo-chip demo-chip--gold',
  Food: 'demo-chip demo-chip--gold',
  Withdrawal: 'demo-chip demo-chip--muted',
  'Low balance': 'demo-chip demo-chip--gold',
};

function ExtractScene() {
  const t = useSceneClock();
  const found = Math.round(easeOut(progressOf(t, 300, 4200)) * 248);
  const pages = Math.round(easeOut(progressOf(t, 300, 2600)) * 12);

  return (
    <div className="finedai-demo__scene">
      <div className="demo-extract">
        <div className="demo-extract__top">
          <div className="demo-badge">
            <Icon name="scan" size={16} />
          </div>

          <div>
            <div className="demo-extract__title">Reading your statements</div>
            <div className="demo-extract__sub">
              Text and tables extracted, then grouped by type
            </div>
          </div>

          <div className="demo-extract__stats">
            <div className="demo-extract__stat">
              <div className="demo-extract__stat-value">{pages}</div>
              <div className="demo-extract__stat-label">Pages</div>
            </div>

            <div className="demo-extract__stat">
              <div className="demo-extract__stat-value">{found}</div>
              <div className="demo-extract__stat-label">Transactions</div>
            </div>
          </div>
        </div>

        <div className="demo-card demo-table">
          <div className="demo-table__head">
            <span>Date</span>
            <span>Description</span>
            <span style={{ textAlign: 'right' }}>KSh</span>
            <span>Type</span>
          </div>

          {transactionRows.map(([date, desc, amount, kind, tag], index) => (
            <div
              className={
                kind === 'flag'
                  ? 'demo-table__row is-flag'
                  : 'demo-table__row'
              }
              key={date}
              style={{ animationDelay: `${450 + index * 520}ms` }}
            >
              <span className="demo-table__date">{date}</span>
              <span className="demo-table__desc">{desc}</span>
              <span
                className={`demo-table__amount demo-table__amount--${kind}`}
              >
                {amount}
              </span>
              <span>
                <span className={tagClass[tag]}>{tag}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const incomeBars = [
  ['Oct', 62, '12k'],
  ['Nov', 20, '4k'],
  ['Dec', 72, '14k'],
  ['Jan', 36, '7k'],
  ['Feb', 8, '1k'],
  ['Mar', 46, '9k'],
];

function SummaryScene() {
  const t = useSceneClock();
  const essential = Math.round(easeOut(progressOf(t, 700, 1400)) * 90);
  const lowPeriods = Math.round(easeOut(progressOf(t, 1200, 900)) * 4);
  const showButton = t > 3200;

  return (
    <div className="finedai-demo__scene">
      <div className="demo-summary">
        <div className="demo-card demo-summary__chart">
          <div className="demo-summary__chart-top">
            <div className="demo-summary__chart-title">
              Money received each month
            </div>
            <span className="demo-chip demo-chip--gold">
              <Icon name="trendDown" size={11} />
              Irregular
            </span>
          </div>

          <div className="demo-bars">
            {incomeBars.map(([month, height, label], index) => (
              <div className="demo-bars__col" key={month}>
                <span
                  className="demo-bars__value"
                  style={{ animationDelay: `${500 + index * 140}ms` }}
                >
                  {label}
                </span>
                <div
                  className={
                    height < 25
                      ? 'demo-bars__bar demo-bars__bar--low'
                      : 'demo-bars__bar'
                  }
                  style={{
                    height: `${height}%`,
                    animationDelay: `${300 + index * 140}ms`,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="demo-bars__months">
            {incomeBars.map(([month]) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>

        <div className="demo-summary__tiles">
          <div className="demo-card demo-tile" style={{ animationDelay: '300ms' }}>
            <div className="demo-badge">
              <Icon name="wallet" size={16} />
            </div>

            <div className="demo-tile__body">
              <div className="demo-tile__label">Essential expenses</div>
              <div className="demo-tile__value">{essential}%</div>

              <div className="demo-stack">
                <span
                  style={{ width: '42%', background: '#d0aa59', animationDelay: '700ms' }}
                />
                <span
                  style={{ width: '28%', background: '#8bb795', animationDelay: '850ms' }}
                />
                <span
                  style={{ width: '20%', background: '#5f8a6c', animationDelay: '1000ms' }}
                />
              </div>
            </div>
          </div>

          <div className="demo-card demo-tile" style={{ animationDelay: '550ms' }}>
            <div className="demo-badge">
              <Icon name="alert" size={16} />
            </div>

            <div className="demo-tile__body">
              <div className="demo-tile__label">Low-balance periods</div>
              <div className="demo-tile__value">{lowPeriods}</div>
              <div className="demo-tile__sub">Balance under KSh 200</div>
            </div>
          </div>

          <div className="demo-card demo-tile" style={{ animationDelay: '800ms' }}>
            <div className="demo-badge">
              <Icon name="clock" size={16} />
            </div>

            <div className="demo-tile__body">
              <div className="demo-tile__label">Income pattern</div>
              <div className="demo-tile__value">Uneven</div>
              <div className="demo-tile__sub">Rent, food and fees come first</div>
            </div>
          </div>
        </div>

        <div className="demo-card demo-summary__note">
          <Icon name="shield" size={15} />

          <div className="demo-summary__note-text">
            A summary to help explain your situation, not an official HELB or
            HEF score.
          </div>

          <button
            type="button"
            tabIndex={-1}
            className={
              showButton
                ? 'demo-button demo-button--gold-outline demo-pop'
                : 'demo-button demo-button--gold-outline'
            }
            style={{ opacity: showButton ? 1 : 0 }}
          >
            <Icon name="edit" size={12} />
            Review and correct
          </button>
        </div>
      </div>
    </div>
  );
}

const coachMessages = [
  { from: 'ai', text: 'Has your family lost any parental income?', at: 500 },
  { from: 'you', text: 'Yes, my father\u2019s contract ended in June.', at: 1500 },
  { from: 'ai', text: 'Are there medical expenses at home?', at: 2500 },
  { from: 'you', text: 'Yes, ongoing treatment costs.', at: 3400 },
  { from: 'ai', text: 'How many siblings are in school?', at: 4200 },
  { from: 'you', text: 'Two, both in secondary school.', at: 5000 },
];

const coachDocs = [
  ['file', 'Letter confirming the loss of parental income', 1800],
  ['plus', 'Medical receipts or a doctor\u2019s letter', 3700],
  ['users', 'Fee statements for your siblings', 5300],
];

function CoachScene() {
  const t = useSceneClock();
  const visible = coachMessages.filter((message) => t >= message.at);
  const typing = coachMessages.find(
    (message) => message.from === 'ai' && t >= message.at - 750 && t < message.at
  );
  const docs = coachDocs.filter(([, , at]) => t >= at);

  return (
    <div className="finedai-demo__scene">
      <div className="demo-coach">
        <div className="demo-card demo-chat">
          <div className="demo-chat__head">
            <div className="demo-badge">
              <Icon name="sparkles" size={15} />
            </div>
            Appeal coach
          </div>

          {visible.map((message) => (
            <div
              key={message.at}
              className={
                message.from === 'ai'
                  ? 'demo-msg demo-msg--ai'
                  : 'demo-msg demo-msg--you'
              }
            >
              {message.text}
            </div>
          ))}

          {typing && (
            <div className="demo-typing" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        <div className="demo-card demo-checklist">
          <div className="demo-checklist__title">Documents you may need</div>

          {docs.map(([icon, label]) => (
            <div className="demo-checklist__item" key={label}>
              <Icon name={icon} size={14} />
              <span>{label}</span>
            </div>
          ))}

          {t > 5700 && (
            <div className="demo-checklist__ready">
              <Icon name="check" size={14} strokeWidth={2.4} />
              Draft appeal letter ready
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const opportunities = [
  {
    name: 'County Bursary Fund',
    source: 'County government',
    deadline: 'Closes 30 Nov',
    reasons: ['County match', 'Stated need'],
  },
  {
    name: 'University Needy Students Bursary',
    source: 'Your university',
    deadline: 'Closes 15 Dec',
    reasons: ['Course match', 'Level match', 'Stated need'],
  },
  {
    name: 'Education Foundation Grant',
    source: 'Foundation',
    deadline: 'Closes 10 Jan',
    reasons: ['Course match', 'Education level', 'Stated need'],
  },
];

function MatchScene() {
  return (
    <div className="finedai-demo__scene">
      <div className="demo-match">
        <div className="demo-match__top">
          <div className="demo-match__top-left">
            <div className="demo-badge">
              <Icon name="search" size={15} />
            </div>
            Opportunities compared with your profile
          </div>

          <span className="demo-chip">
            <Icon name="shield" size={11} />
            Verified sources
          </span>
        </div>

        {opportunities.map((item, index) => (
          <div
            className="demo-card demo-opp"
            key={item.name}
            style={{ animationDelay: `${300 + index * 650}ms` }}
          >
            <div className="demo-badge">
              <Icon name="building" size={16} />
            </div>

            <div style={{ minWidth: 0 }}>
              <div className="demo-opp__name">{item.name}</div>

              <div className="demo-opp__source">
                <Icon name="link" size={10} />
                {item.source} {'\u00b7'} source link {'\u00b7'} checked 02 Oct
              </div>

              <div className="demo-opp__why">
                <span className="demo-opp__why-label">Why it may fit</span>

                {item.reasons.map((reason, reasonIndex) => (
                  <span
                    className="demo-chip demo-pop"
                    key={reason}
                    style={{
                      animationDelay: `${
                        750 + index * 650 + reasonIndex * 160
                      }ms`,
                    }}
                  >
                    <Icon name="check" size={10} strokeWidth={2.8} />
                    {reason}
                  </span>
                ))}
              </div>
            </div>

            <div className="demo-opp__side">
              <span className="demo-chip demo-chip--gold">
                <Icon name="calendar" size={10} />
                {item.deadline}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const letterParagraph =
  'I am a Year 3 BSc Computer Science student at St. Paul\u2019s University. Since June, my family\u2019s income has become irregular after my father\u2019s contract ended, and my statements show several weeks with a balance below KSh 200. I kindly request that my funding award be reviewed.';

const draftTypes = [
  ['Appeal letter', 'file'],
  ['Bursary application', 'file'],
  ['Personal statement', 'file'],
  ['Grant proposal', 'file'],
];

function DraftScene() {
  const t = useSceneClock();
  const body = typedText(letterParagraph, t, 900, 15);
  const writing = t >= 900 && body.length < letterParagraph.length;
  const finished = body.length >= letterParagraph.length;

  return (
    <div className="finedai-demo__scene">
      <div className="demo-draft">
        <div className="demo-draft__paper">
          <div className="demo-draft__paper-head">
            <div className="demo-draft__paper-title">
              <Icon name="file" size={14} />
              Appeal letter
            </div>

            <div className="demo-draft__tag">DRAFT FOR YOUR REVIEW</div>
          </div>

          <div className="demo-draft__body">
            <div className="demo-draft__meta">
              To: Funding review committee
              <br />
              Re: Request to review my funding award
            </div>

            <div>Dear Sir or Madam,</div>

            <div style={{ marginTop: 6 }}>
              {body}
              {writing && <span className="demo-draft__caret" />}
            </div>
          </div>

          <div className="demo-draft__actions">
            {finished && (
              <>
                <button type="button" tabIndex={-1} className="demo-button demo-button--ghost demo-pop">
                  <Icon name="edit" size={12} />
                  Edit
                </button>

                <button
                  type="button"
                  tabIndex={-1}
                  className="demo-button demo-button--ghost demo-pop"
                  style={{ animationDelay: '120ms' }}
                >
                  <Icon name="download" size={12} />
                  Download
                </button>
              </>
            )}
          </div>
        </div>

        <div className="demo-card demo-docs">
          <div className="demo-docs__title">Drafts</div>

          {draftTypes.map(([label, icon], index) => (
            <div
              key={label}
              className={
                index === 0 ? 'demo-docs__item is-active' : 'demo-docs__item'
              }
              style={{ animationDelay: `${200 + index * 150}ms` }}
            >
              <Icon name={icon} size={13} />
              <span>{label}</span>
              {index === 0 &&
                (finished ? (
                  <Icon name="check" size={12} strokeWidth={2.6} />
                ) : (
                  <span className="demo-spinner" />
                ))}
            </div>
          ))}

          <div className="demo-docs__note">
            Written only from the information you provide.
          </div>
        </div>
      </div>
    </div>
  );
}

const reviewItems = [
  {
    icon: 'edit',
    name: 'Drafts reviewed and edited by you',
    sub: 'Nothing is written without your knowledge',
    doneAt: 800,
  },
  {
    icon: 'file',
    name: 'Documents attached',
    sub: 'Only the statements and letters you chose',
    doneAt: 1700,
  },
  {
    icon: 'send',
    name: 'You submit your application',
    sub: 'FinEdAI never submits for you',
    doneAt: 2600,
  },
  {
    icon: 'building',
    name: 'Institution decision',
    sub: 'HELB, HEF or the funder decides',
    doneAt: 99999,
  },
];

function ReviewScene() {
  const t = useSceneClock();

  return (
    <div className="finedai-demo__scene">
      <div className="demo-review">
        <div className="demo-card demo-review__panel">
          <div className="demo-review__top">
            <div className="demo-review__authority">
              <Icon name="building" size={19} />
            </div>

            <div>
              <div className="demo-review__name">Funding institution</div>
              <div className="demo-review__role">
                HELB, HEF, bursary committees and funders
              </div>
            </div>

            <div className="demo-review__status">
              <span className="demo-chip demo-chip--gold">Student in control</span>
            </div>
          </div>

          <div className="demo-review__timeline">
            {reviewItems.map((item, index) => {
              const done = t >= item.doneAt;
              const previousDone =
                index === 0 || t >= reviewItems[index - 1].doneAt;
              const isNow = !done && previousDone && index < 3;
              const isNext = index === 3 && t >= reviewItems[2].doneAt;

              const state = done
                ? 'is-done'
                : isNow
                ? 'is-now'
                : isNext
                ? 'is-next'
                : '';

              const statusLabel = done
                ? 'Done'
                : isNow
                ? index === 2
                  ? 'Your turn'
                  : 'In progress'
                : 'Next';

              return (
                <div
                  className={`demo-review__item ${state}`}
                  key={item.name}
                >
                  <div className="demo-review__icon">
                    <Icon
                      name={done ? 'check' : item.icon}
                      size={13}
                      strokeWidth={done ? 2.6 : 1.8}
                    />
                  </div>

                  <div>
                    <div className="demo-review__item-name">{item.name}</div>
                    <div className="demo-review__item-sub">{item.sub}</div>
                  </div>

                  <div className="demo-review__item-status">
                    <span
                      className={
                        done ? 'demo-chip' : 'demo-chip demo-chip--gold'
                      }
                    >
                      {statusLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="demo-review__footer">
            <Icon name="trash" size={13} />
            You can delete your documents at any time.
          </div>
        </div>
      </div>
    </div>
  );
}

function StageScene({ stageIndex }) {
  switch (stageIndex) {
    case 0:
      return <AccountScene />;
    case 1:
      return <ProfileScene />;
    case 2:
      return <UploadScene />;
    case 3:
      return <ExtractScene />;
    case 4:
      return <SummaryScene />;
    case 5:
      return <CoachScene />;
    case 6:
      return <MatchScene />;
    case 7:
      return <DraftScene />;
    case 8:
      return <ReviewScene />;
    default:
      return <AccountScene />;
  }
}

/* =========================================================
   HERO
   ========================================================= */

export default function Hero() {
  const [typedLines, setTypedLines] = useState(
    headlineLines.map(() => '')
  );

  const [currentLine, setCurrentLine] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [demoKey, setDemoKey] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const [inView, setInView] = useState(true);

  const windowRef = useRef(null);
  const pausedRef = useRef(false);
  const stageRef = useRef(0);
  const elapsedRef = useRef(0);
  const fillRefs = useRef([]);

  const paused = manualPause || !inView;

  const typingSpeed = useMemo(() => {
    return [78, 68, 72];
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  /*
   * TYPEWRITER
   *
   * The headline starts again whenever the page reloads.
   */
  useEffect(() => {
    let characterIndex = 0;
    let timeoutId;

    const typeCurrentLine = () => {
      const line = headlineLines[currentLine];

      if (characterIndex < line.length) {
        characterIndex += 1;

        setTypedLines((previous) => {
          const updated = [...previous];
          updated[currentLine] = line.slice(0, characterIndex);
          return updated;
        });

        timeoutId = window.setTimeout(
          typeCurrentLine,
          typingSpeed[currentLine]
        );
      } else if (currentLine < headlineLines.length - 1) {
        timeoutId = window.setTimeout(() => {
          setCurrentLine((previous) => previous + 1);
        }, 220);
      }
    };

    typeCurrentLine();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [currentLine, typingSpeed]);

  /*
   * ONLY PLAY WHILE VISIBLE
   */
  useEffect(() => {
    const node = windowRef.current;

    if (!node || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  /*
   * PRODUCT WALKTHROUGH
   *
   * One continuous clock drives the whole timeline. The progress bar is
   * updated on every frame, so it moves smoothly instead of jumping.
   */
  useEffect(() => {
    let frame;
    let last = null;

    const tick = (now) => {
      if (last === null) last = now;
      const delta = clamp(now - last, 0, 64);
      last = now;

      if (!pausedRef.current) {
        elapsedRef.current += delta;

        if (elapsedRef.current >= stages[stageRef.current].duration) {
          const next = (stageRef.current + 1) % stages.length;

          elapsedRef.current = 0;
          stageRef.current = next;
          setStageIndex(next);
        }
      }

      const current = stageRef.current;
      const currentProgress = clamp(
        elapsedRef.current / stages[current].duration,
        0,
        1
      );

      fillRefs.current.forEach((element, index) => {
        if (!element) return;

        const value =
          index < current ? 1 : index === current ? currentProgress : 0;

        element.style.transform = `scaleX(${value})`;
      });

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const goToStage = useCallback((index) => {
    stageRef.current = index;
    elapsedRef.current = 0;
    setStageIndex(index);
    setDemoKey((previous) => previous + 1);
  }, []);

  const restartDemo = () => {
    goToStage(0);
  };

  const stage = stages[stageIndex];

  return (
    <>
      <style>{heroStyles}</style>

      <section className="finedai-hero" id="hero">
        <div className="finedai-hero__inner">

          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <div className="finedai-hero__copy">
            <div className="finedai-hero__eyebrow">
              <span className="finedai-hero__eyebrow-dot" />
              AI funding support for Kenyan students
            </div>

            <h1 className="finedai-hero__title">
              {typedLines.map((line, index) => (
                <span
                  key={headlineLines[index]}
                  className={
                    index === 2
                      ? 'finedai-hero__title-line finedai-hero__title-line--gold'
                      : 'finedai-hero__title-line'
                  }
                >
                  {line}

                  {currentLine === index && (
                    <span className="finedai-hero__cursor" />
                  )}
                </span>
              ))}
            </h1>

            <p className="finedai-hero__description">
              FinEdAI helps students understand their financial situation,
              organise their documents, discover verified funding
              opportunities and prepare clear appeals and applications. Every
              draft is reviewed by the student before anything is submitted.
            </p>

            <div className="finedai-hero__actions">
              <a
                className="finedai-hero__button finedai-hero__button--primary"
                href="#start"
              >
                Start the demo
                <span>→</span>
              </a>

              <a
                className="finedai-hero__button finedai-hero__button--secondary"
                href="#how-it-works"
              >
                See how it works
              </a>
            </div>

            <div className="finedai-hero__trust">
              <div className="finedai-hero__trust-icon">
                <Icon name="check" size={16} strokeWidth={2.4} />
              </div>

              <span>
                Built to assist students. Final funding decisions remain with
                HELB, HEF and the responsible institution.
              </span>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE — ANIMATED PRODUCT WALKTHROUGH
          ================================================== */}

          <div className="finedai-demo">
            <div className="finedai-demo__glow" />

            <div
              ref={windowRef}
              className={
                paused
                  ? 'finedai-demo__window is-paused'
                  : 'finedai-demo__window'
              }
            >

              <div className="finedai-demo__topbar">
                <div className="finedai-demo__traffic">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="finedai-demo__brand">
                  <span className="finedai-demo__brand-mark">
                    F
                  </span>
                  FinEdAI SYSTEM PREVIEW
                </div>

                <div className="finedai-demo__status">
                  <span className="finedai-demo__status-dot" />
                  LIVE PREVIEW
                </div>
              </div>

              <div className="finedai-demo__body">

                <div className="finedai-demo__stage-header">
                  <div
                    className="finedai-demo__stage-head-main"
                    key={`head-${stageIndex}-${demoKey}`}
                  >
                    <div className="finedai-demo__stage-icon">
                      <Icon name={stage.icon} size={19} />
                    </div>

                    <div>
                      <div className="finedai-demo__stage-number">
                        STEP {stage.number}
                      </div>

                      <div className="finedai-demo__stage-title">
                        {stage.title}
                      </div>

                      <div className="finedai-demo__stage-description">
                        {stage.description}
                      </div>
                    </div>
                  </div>

                  <div className="finedai-demo__counter">
                    {stageIndex + 1} / {stages.length}
                  </div>
                </div>

                <div className="finedai-demo__screen">
                  <PauseContext.Provider value={pausedRef}>
                    <StageScene
                      key={`${stageIndex}-${demoKey}`}
                      stageIndex={stageIndex}
                    />
                  </PauseContext.Provider>
                </div>

                <div className="finedai-demo__timeline">
                  <div className="finedai-demo__steps">
                    {stages.map((item, index) => {
                      const state =
                        index === stageIndex
                          ? 'is-active'
                          : index < stageIndex
                          ? 'is-done'
                          : '';

                      return (
                        <button
                          type="button"
                          key={item.number}
                          className={`finedai-demo__step ${state}`}
                          onClick={() => goToStage(index)}
                          aria-label={`Step ${item.number}: ${item.title}`}
                          aria-current={index === stageIndex ? 'step' : undefined}
                          title={item.title}
                        >
                          <span className="finedai-demo__step-icon">
                            <Icon
                              name={index < stageIndex ? 'check' : item.icon}
                              size={13}
                              strokeWidth={index < stageIndex ? 2.6 : 1.8}
                            />
                          </span>

                          <span className="finedai-demo__step-track">
                            <span
                              className="finedai-demo__step-fill"
                              ref={(element) => {
                                fillRefs.current[index] = element;
                              }}
                            />
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="finedai-demo__controls">
                    <div className="finedai-demo__progress-label">
                      UPLOAD → UNDERSTAND → APPLY
                    </div>

                    <div className="finedai-demo__buttons">
                      <button
                        type="button"
                        className="finedai-demo__restart"
                        onClick={() => setManualPause((previous) => !previous)}
                        aria-label={
                          manualPause ? 'Play walkthrough' : 'Pause walkthrough'
                        }
                      >
                        <Icon name={manualPause ? 'play' : 'pause'} size={11} />
                        {manualPause ? 'Play' : 'Pause'}
                      </button>

                      <button
                        type="button"
                        className="finedai-demo__restart"
                        onClick={restartDemo}
                      >
                        <Icon name="restart" size={11} />
                        Restart
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}