import React, { useEffect, useRef } from 'react';
import {
  Banknote,
  Check,
  FileText,
  LockKeyhole,
  Receipt,
  ShieldCheck,
  Upload,
} from 'lucide-react';

const styles = `
  .finedai-evidence {
    --green: #243d2d;
    --green-dark: #17271d;
    --gold: #d5bd87;
    --muted: #69736c;
    --line: rgba(36, 61, 45, 0.12);

    position: relative;
    isolation: isolate;
    width: 100%;
    padding: 120px 24px;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 12% 18%, rgba(213,189,135,0.14), transparent 35%),
      radial-gradient(ellipse at 88% 58%, rgba(82,117,93,0.12), transparent 37%),
      #fbfaf6;
  }

  .finedai-evidence::before,
  .finedai-evidence::after {
    position: absolute;
    z-index: -1;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    content: '';
    filter: blur(75px);
    opacity: 0.28;
    pointer-events: none;
    animation: evidence-aura 9s ease-in-out infinite alternate;
  }

  .finedai-evidence::before {
    top: 4%;
    left: -190px;
    background: rgba(213,189,135,0.62);
  }

  .finedai-evidence::after {
    right: -190px;
    bottom: 3%;
    background: rgba(82,117,93,0.42);
    animation-delay: -4.5s;
  }

  @keyframes evidence-aura {
    from { transform: translate3d(0, 0, 0) scale(0.88); }
    to { transform: translate3d(35px, -24px, 0) scale(1.12); }
  }

  .evidence-inner {
    position: relative;
    width: min(1160px, 100%);
    margin: 0 auto;
  }

  .evidence-grid {
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    align-items: center;
    gap: 90px;
  }

  .evidence-copy .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 18px;
    color: #927c4e;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .evidence-copy .eyebrow span {
    width: 23px;
    height: 1px;
    background: var(--gold);
    box-shadow: 0 0 12px rgba(213,189,135,0.8);
  }

  .evidence-copy h2 {
    margin: 0;
    color: var(--green);
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(36px, 4.5vw, 60px);
    line-height: 1;
    letter-spacing: -0.055em;
  }

  .evidence-copy > p {
    max-width: 520px;
    margin: 24px 0 30px;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  .evidence-security {
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    overflow: hidden;
    border: 1px solid rgba(82,117,93,0.2);
    border-radius: 18px;
    background: rgba(255,255,255,0.52);
    box-shadow: 0 12px 32px rgba(23,39,29,0.055), inset 0 1px rgba(255,255,255,0.8);
    backdrop-filter: blur(18px);
    transition: transform 350ms ease, box-shadow 350ms ease, border-color 350ms ease;
  }

  .evidence-security::after,
  .evidence-mini::after,
  .evidence-document::after {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.48) 48%, transparent 72%);
    content: '';
    opacity: 0;
    transform: translateX(-120%);
    pointer-events: none;
  }

  .evidence-security:hover {
    transform: translateY(-6px) scale(1.015);
    border-color: rgba(213,189,135,0.62);
    box-shadow: 0 20px 42px rgba(23,39,29,0.11), 0 0 28px rgba(213,189,135,0.2);
  }

  .evidence-security:hover::after,
  .evidence-mini:hover::after,
  .evidence-document:hover::after {
    opacity: 1;
    transform: translateX(120%);
    transition: transform 800ms ease, opacity 150ms ease;
  }

  .evidence-security-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 36px;
    height: 36px;
    border-radius: 11px;
    color: var(--green);
    background: rgba(82,117,93,0.11);
    box-shadow: inset 0 0 0 1px rgba(82,117,93,0.08), 0 0 18px rgba(82,117,93,0.1);
  }

  .evidence-security strong {
    display: block;
    margin-bottom: 4px;
    color: var(--green);
    font-size: 12px;
  }

  .evidence-security span {
    display: block;
    color: var(--muted);
    font-size: 11px;
    line-height: 1.55;
  }

  .evidence-board {
    position: relative;
    min-height: 500px;
    perspective: 1100px;
  }

  .evidence-document {
    position: absolute;
    z-index: 1;
    width: 255px;
    padding: 20px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.78);
    border-radius: 21px;
    background: linear-gradient(145deg, rgba(255,255,255,0.84), rgba(255,255,255,0.57));
    box-shadow: 0 28px 70px rgba(23,39,29,0.12), inset 0 1px rgba(255,255,255,0.9);
    backdrop-filter: blur(22px) saturate(140%);
    -webkit-backdrop-filter: blur(22px) saturate(140%);
    transition:
      opacity 850ms ease,
      filter 850ms ease,
      transform 850ms cubic-bezier(0.16,1,0.3,1),
      box-shadow 350ms ease,
      border-color 350ms ease;
    will-change: opacity, transform, filter;
  }

  .evidence-document::before {
    position: absolute;
    inset: 0 0 auto;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(213,189,135,0.9), rgba(82,117,93,0.65), transparent);
    content: '';
    opacity: 0.85;
  }

  .evidence-document--one {
    --tilt: -5deg;
    left: 2%;
    top: 42px;
  }

  .evidence-document--two {
    --tilt: 5deg;
    right: 4%;
    top: 15px;
    transition-delay: 100ms;
  }

  .evidence-document--three {
    --tilt: 2deg;
    left: 20%;
    bottom: 25px;
    transition-delay: 200ms;
  }

  .evidence-document.evidence-reveal {
    opacity: 0;
    filter: blur(12px);
    transform: translateY(48px) rotate(var(--tilt)) scale(0.9);
  }

  .evidence-document.evidence-reveal.visible {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0) rotate(var(--tilt)) scale(1);
  }

  .evidence-document:hover,
  .evidence-document.evidence-reveal.visible:hover {
    z-index: 8;
    border-color: rgba(213,189,135,0.9);
    transform: translateY(-16px) rotate(0deg) scale(1.055);
    box-shadow: 0 38px 90px rgba(23,39,29,0.2), 0 0 34px rgba(213,189,135,0.34), inset 0 1px rgba(255,255,255,0.95);
  }

  .evidence-document-head {
    display: flex;
    align-items: center;
    gap: 11px;
    margin-bottom: 20px;
  }

  .evidence-file-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 39px;
    height: 39px;
    border-radius: 11px;
    color: var(--green);
    background: rgba(36,61,45,0.07);
    box-shadow: inset 0 0 0 1px rgba(36,61,45,0.04);
  }

  .evidence-document-head strong {
    display: block;
    color: var(--green);
    font-size: 12px;
  }

  .evidence-document-head span {
    display: block;
    margin-top: 3px;
    color: #8a918b;
    font-size: 10px;
  }

  .evidence-lines {
    display: grid;
    gap: 8px;
  }

  .evidence-line {
    height: 7px;
    border-radius: 99px;
    background: rgba(36,61,45,0.07);
    animation: evidence-line-glow 3.8s ease-in-out infinite;
  }

  .evidence-line:nth-child(1) { width: 92%; }
  .evidence-line:nth-child(2) { width: 73%; animation-delay: 180ms; }
  .evidence-line:nth-child(3) { width: 84%; animation-delay: 360ms; }
  .evidence-line:nth-child(4) { width: 58%; animation-delay: 540ms; }

  @keyframes evidence-line-glow {
    0%, 100% { background: rgba(36,61,45,0.07); }
    50% { background: rgba(82,117,93,0.17); }
  }

  .evidence-status {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 17px;
    color: #52755d;
    font-size: 10px;
    font-weight: 700;
  }

  .evidence-status svg {
    width: 13px;
    height: 13px;
  }

  .evidence-center {
    position: absolute;
    z-index: 5;
    left: 50%;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 104px;
    height: 104px;
    border: 1px solid rgba(213,189,135,0.75);
    border-radius: 50%;
    color: var(--green);
    background: radial-gradient(circle, rgba(255,255,255,0.98), rgba(255,255,255,0.72));
    box-shadow: 0 25px 55px rgba(23,39,29,0.15), 0 0 0 13px rgba(213,189,135,0.08), 0 0 42px rgba(213,189,135,0.32);
    transform: translate(-50%, -50%);
    animation: evidence-core-pulse 3s ease-in-out infinite;
  }

  @keyframes evidence-core-pulse {
    0%, 100% { box-shadow: 0 25px 55px rgba(23,39,29,0.15), 0 0 0 11px rgba(213,189,135,0.07), 0 0 32px rgba(213,189,135,0.24); }
    50% { box-shadow: 0 30px 65px rgba(23,39,29,0.2), 0 0 0 20px rgba(213,189,135,0.12), 0 0 52px rgba(213,189,135,0.4); }
  }

  .evidence-center::after {
    position: absolute;
    width: 130px;
    height: 130px;
    border: 1px dashed rgba(213,189,135,0.52);
    border-radius: 50%;
    content: '';
    animation: evidence-spin 13s linear infinite;
  }

  @keyframes evidence-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .evidence-center.evidence-reveal {
    transform: translate(-50%, calc(-50% + 28px)) scale(0.82);
  }

  .evidence-center.evidence-reveal.visible {
    transform: translate(-50%, -50%) scale(1);
  }

  .evidence-center span {
    position: absolute;
    top: calc(100% + 13px);
    width: 160px;
    text-align: center;
    color: var(--muted);
    font-size: 10px;
    font-weight: 700;
  }

  .evidence-bottom {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-top: 65px;
  }

  .evidence-mini {
    position: relative;
    padding: 22px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.8);
    border-radius: 20px;
    background: linear-gradient(145deg, rgba(255,255,255,0.76), rgba(255,255,255,0.46));
    box-shadow: 0 15px 38px rgba(23,39,29,0.06), inset 0 1px rgba(255,255,255,0.85);
    backdrop-filter: blur(18px) saturate(130%);
    -webkit-backdrop-filter: blur(18px) saturate(130%);
    transition:
      opacity 800ms ease,
      filter 800ms ease,
      transform 500ms cubic-bezier(0.16,1,0.3,1),
      box-shadow 350ms ease,
      border-color 350ms ease;
  }

  .evidence-mini:nth-child(2) { transition-delay: 100ms; }
  .evidence-mini:nth-child(3) { transition-delay: 200ms; }

  .evidence-mini.evidence-reveal {
    opacity: 0;
    filter: blur(10px);
    transform: translateY(42px) scale(0.94);
  }

  .evidence-mini.evidence-reveal.visible {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0) scale(1);
  }

  .evidence-mini:hover {
    z-index: 2;
    border-color: rgba(213,189,135,0.72);
    transform: translateY(-11px) scale(1.035) !important;
    box-shadow: 0 28px 60px rgba(23,39,29,0.12), 0 0 32px rgba(213,189,135,0.23), inset 0 1px rgba(255,255,255,0.95);
  }

  .evidence-mini svg {
    color: var(--green);
    margin-bottom: 13px;
    filter: drop-shadow(0 3px 7px rgba(82,117,93,0.18));
  }

  .evidence-mini strong {
    display: block;
    margin-bottom: 5px;
    color: var(--green);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 15px;
  }

  .evidence-mini span {
    color: var(--muted);
    font-size: 11px;
    line-height: 1.55;
  }

  .evidence-reveal {
    opacity: 0;
    filter: blur(12px);
    transform: translateY(48px) scale(0.96);
    transition:
      opacity 900ms ease,
      filter 900ms ease,
      transform 900ms cubic-bezier(0.16,1,0.3,1);
    will-change: opacity, transform, filter;
  }

  .evidence-reveal.visible {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0) scale(1);
  }

  @media (max-width: 900px) {
    .evidence-grid {
      grid-template-columns: 1fr;
      gap: 50px;
    }

    .evidence-board {
      max-width: 650px;
      width: 100%;
      margin: 0 auto;
    }
  }

  @media (max-width: 620px) {
    .finedai-evidence {
      padding: 85px 18px;
    }

    .evidence-board { min-height: 450px; }
    .evidence-document { width: 205px; }
    .evidence-document--one { left: 0; }
    .evidence-document--two { right: 0; }
    .evidence-document--three { left: 13%; }
    .evidence-center { width: 84px; height: 84px; }
    .evidence-bottom { grid-template-columns: 1fr; }
  }

  @media (max-width: 430px) {
    .evidence-document { width: 175px; padding: 15px; }
    .evidence-document--one { top: 65px; }
    .evidence-document--two { top: 15px; }
    .evidence-document--three { bottom: 35px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .finedai-evidence::before,
    .finedai-evidence::after,
    .evidence-center,
    .evidence-center::after,
    .evidence-line {
      animation: none;
    }

    .evidence-reveal,
    .evidence-document.evidence-reveal,
    .evidence-mini.evidence-reveal {
      opacity: 1;
      filter: none;
      transform: none;
      transition: none;
      will-change: auto;
    }

    .evidence-document,
    .evidence-mini,
    .evidence-security {
      transition: none;
    }

    .evidence-document:hover,
    .evidence-document.evidence-reveal.visible:hover,
    .evidence-mini:hover,
    .evidence-security:hover {
      transform: none !important;
    }

    .evidence-center.evidence-reveal,
    .evidence-center.evidence-reveal.visible {
      transform: translate(-50%, -50%);
    }
  }
`;

export default function EvidenceIntelligence() {
  const ref = useRef(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return undefined;

    const targets = section.querySelectorAll('.evidence-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('visible', entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -4% 0px' }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>

      <section ref={ref} id="evidence" className="finedai-evidence">
        <div className="evidence-inner">
          <div className="evidence-grid">
            <div className="evidence-copy evidence-reveal">
              <div className="eyebrow">
                <span />
                Evidence intelligence
              </div>

              <h2>
                Your documents
                <br />
                tell a story.
              </h2>

              <p>Bring key documents together to build a clearer funding case.</p>

              <div className="evidence-security">
                <div className="evidence-security-icon">
                  <LockKeyhole size={17} />
                </div>

                <div>
                  <strong>No PINs. No bank passwords.</strong>
                  <span>Only use documents you choose to provide.</span>
                </div>
              </div>
            </div>

            <div className="evidence-board">
              <article className="evidence-document evidence-document--one evidence-reveal">
                <div className="evidence-document-head">
                  <div className="evidence-file-icon"><FileText size={18} /></div>
                  <div>
                    <strong>M-Pesa statement</strong>
                    <span>Financial evidence</span>
                  </div>
                </div>

                <div className="evidence-lines" aria-hidden="true">
                  <div className="evidence-line" />
                  <div className="evidence-line" />
                  <div className="evidence-line" />
                  <div className="evidence-line" />
                </div>

                <div className="evidence-status"><Check /> Evidence organised</div>
              </article>

              <article className="evidence-document evidence-document--two evidence-reveal">
                <div className="evidence-document-head">
                  <div className="evidence-file-icon"><Banknote size={18} /></div>
                  <div>
                    <strong>Bank statement</strong>
                    <span>Financial evidence</span>
                  </div>
                </div>

                <div className="evidence-lines" aria-hidden="true">
                  <div className="evidence-line" />
                  <div className="evidence-line" />
                  <div className="evidence-line" />
                  <div className="evidence-line" />
                </div>

                <div className="evidence-status"><Check /> Pattern available</div>
              </article>

              <article className="evidence-document evidence-document--three evidence-reveal">
                <div className="evidence-document-head">
                  <div className="evidence-file-icon"><Receipt size={18} /></div>
                  <div>
                    <strong>Fee structure</strong>
                    <span>Education evidence</span>
                  </div>
                </div>

                <div className="evidence-lines" aria-hidden="true">
                  <div className="evidence-line" />
                  <div className="evidence-line" />
                  <div className="evidence-line" />
                  <div className="evidence-line" />
                </div>

                <div className="evidence-status"><Check /> Supporting evidence</div>
              </article>

              <div className="evidence-center evidence-reveal">
                <ShieldCheck size={31} strokeWidth={1.5} />
                <span>Reviewable evidence</span>
              </div>
            </div>
          </div>

          <div className="evidence-bottom">
            <div className="evidence-mini evidence-reveal">
              <Upload size={20} />
              <strong>Bring your evidence</strong>
              <span>Choose documents that explain your circumstances.</span>
            </div>

            <div className="evidence-mini evidence-reveal">
              <FileText size={20} />
              <strong>Organise information</strong>
              <span>Build a clearer picture of your funding needs.</span>
            </div>

            <div className="evidence-mini evidence-reveal">
              <ShieldCheck size={20} />
              <strong>Review before use</strong>
              <span>Check all details before sharing or submitting.</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
