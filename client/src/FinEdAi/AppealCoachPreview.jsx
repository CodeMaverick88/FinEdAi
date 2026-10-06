import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  FileEdit,
  HeartPulse,
  Home,
  Users,
} from 'lucide-react';

const styles = `
  .finedai-appeal {
    --green: #243d2d;
    --green-dark: #17271d;
    --gold: #d5bd87;
    --cream: #f8f6ef;
    --paper: #ffffff;
    --muted: #69736c;
    --line: rgba(36, 61, 45, 0.1);

    position: relative;
    isolation: isolate;
    width: 100%;
    padding: 120px 24px;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 8% 12%, rgba(213,189,135,0.16), transparent 34%),
      radial-gradient(ellipse at 92% 72%, rgba(82,117,93,0.12), transparent 38%),
      #f8f6ef;
  }

  .finedai-appeal::before,
  .finedai-appeal::after {
    position: absolute;
    z-index: -1;
    width: 390px;
    height: 390px;
    border-radius: 50%;
    content: '';
    filter: blur(82px);
    opacity: 0.3;
    pointer-events: none;
    animation: appeal-aura 8s ease-in-out infinite alternate;
  }

  .finedai-appeal::before {
    top: -170px;
    left: -180px;
    background: rgba(213,189,135,0.72);
  }

  .finedai-appeal::after {
    right: -200px;
    bottom: -170px;
    background: rgba(82,117,93,0.48);
    animation-delay: -4s;
  }

  @keyframes appeal-aura {
    from { transform: translate3d(0, 0, 0) scale(0.86); }
    to { transform: translate3d(35px, -28px, 0) scale(1.12); }
  }

  .appeal-inner {
    position: relative;
    width: min(1160px, 100%);
    margin: 0 auto;
  }

  .appeal-heading {
    max-width: 700px;
    margin-bottom: 55px;
  }

  .appeal-eyebrow {
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

  .appeal-eyebrow span {
    width: 23px;
    height: 1px;
    background: var(--gold);
    box-shadow: 0 0 13px rgba(213,189,135,0.9);
  }

  .appeal-heading h2 {
    margin: 0;
    color: var(--green);
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(36px, 4.8vw, 61px);
    line-height: 1;
    letter-spacing: -0.055em;
  }

  .appeal-heading p {
    margin: 20px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.75;
  }

  .appeal-workspace {
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: 16px;
  }

  .appeal-panel {
    position: relative;
    border: 1px solid rgba(255,255,255,0.78);
    border-radius: 25px;
    background: linear-gradient(145deg, rgba(255,255,255,0.78), rgba(255,255,255,0.48));
    box-shadow: 0 24px 64px rgba(23,39,29,0.09), inset 0 1px rgba(255,255,255,0.92);
    backdrop-filter: blur(22px) saturate(140%);
    -webkit-backdrop-filter: blur(22px) saturate(140%);
    transition:
      transform 420ms cubic-bezier(0.16,1,0.3,1),
      box-shadow 420ms ease,
      border-color 420ms ease;
  }

  .appeal-panel:hover,
  .appeal-panel.appeal-reveal.visible:hover {
    z-index: 2;
    transform: translateY(-10px) scale(1.012);
    border-color: rgba(213,189,135,0.78);
    box-shadow: 0 34px 82px rgba(23,39,29,0.15), 0 0 38px rgba(213,189,135,0.24), inset 0 1px rgba(255,255,255,0.98);
  }

  .appeal-questions {
    padding: 27px;
  }

  .appeal-panel-header {
    margin-bottom: 25px;
  }

  .appeal-panel-header span {
    display: block;
    margin-bottom: 7px;
    color: #8b948d;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .appeal-panel-header h3 {
    margin: 0;
    color: var(--green);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    letter-spacing: -0.035em;
  }

  .appeal-options {
    display: grid;
    gap: 9px;
  }

  .appeal-option {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 13px;
    border: 1px solid var(--line);
    border-radius: 13px;
    color: var(--muted);
    background: rgba(255,255,255,0.45);
    text-align: left;
    cursor: pointer;
    backdrop-filter: blur(12px);
    transition:
      transform 350ms cubic-bezier(0.16,1,0.3,1),
      border-color 300ms ease,
      background 300ms ease,
      color 300ms ease,
      box-shadow 350ms ease;
  }

  .appeal-option:hover {
    transform: translateX(8px) scale(1.025);
    border-color: rgba(213,189,135,0.82);
    background: rgba(255,255,255,0.82);
    box-shadow: 0 12px 28px rgba(23,39,29,0.1), 0 0 22px rgba(213,189,135,0.22);
  }

  .appeal-questions.visible .appeal-option {
    animation: appeal-option-in 720ms cubic-bezier(0.16,1,0.3,1) both;
  }

  .appeal-questions.visible .appeal-option:nth-child(1) { animation-delay: 80ms; }
  .appeal-questions.visible .appeal-option:nth-child(2) { animation-delay: 150ms; }
  .appeal-questions.visible .appeal-option:nth-child(3) { animation-delay: 220ms; }
  .appeal-questions.visible .appeal-option:nth-child(4) { animation-delay: 290ms; }

  @keyframes appeal-option-in {
    from { opacity: 0; transform: translateX(-24px) scale(0.94); filter: blur(7px); }
    to { opacity: 1; transform: translateX(0) scale(1); filter: blur(0); }
  }

  .appeal-option:focus-visible,
  .appeal-review-button:focus-visible {
    outline: 3px solid rgba(213,189,135,0.75);
    outline-offset: 3px;
  }

  .appeal-option.active {
    border-color: rgba(82,117,93,0.35);
    color: var(--green);
    background: rgba(82,117,93,0.08);
  }

  .appeal-option-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33px;
    height: 33px;
    flex: 0 0 auto;
    border-radius: 10px;
    background: rgba(36,61,45,0.07);
    box-shadow: inset 0 0 0 1px rgba(36,61,45,0.04), 0 0 17px rgba(82,117,93,0.08);
    transition: transform 300ms ease, box-shadow 300ms ease;
  }

  .appeal-option:hover .appeal-option-icon {
    transform: rotate(-7deg) scale(1.1);
    box-shadow: inset 0 0 0 1px rgba(36,61,45,0.07), 0 0 22px rgba(213,189,135,0.28);
  }

  .appeal-option strong {
    display: block;
    font-size: 12px;
  }

  .appeal-check {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    border: 1px solid var(--line);
  }

  .appeal-option.active .appeal-check {
    color: white;
    border-color: var(--green);
    background: var(--green);
  }

  .appeal-draft {
    position: relative;
    min-height: 440px;
    padding: 27px;
    overflow: hidden;
  }

  .appeal-draft::before {
    position: absolute;
    top: 0;
    right: 0;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: rgba(213,189,135,0.08);
    content: '';
    transform: translate(40%, -40%);
  }

  .appeal-draft-head {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 27px;
  }

  .appeal-draft-label {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  .appeal-draft-label-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 10px;
    color: var(--green);
    background: rgba(36,61,45,0.07);
  }

  .appeal-draft-label strong {
    color: var(--green);
    font-size: 12px;
  }

  .appeal-draft-label span {
    display: block;
    margin-top: 3px;
    color: #8b948d;
    font-size: 9px;
  }

  .appeal-edit-badge {
    padding: 7px 9px;
    border-radius: 8px;
    color: #52755d;
    background: rgba(82,117,93,0.08);
    font-size: 9px;
    font-weight: 700;
  }

  .appeal-paper {
    position: relative;
    padding: 25px;
    border: 1px solid rgba(255,255,255,0.86);
    border-radius: 17px;
    background: linear-gradient(145deg, rgba(255,255,255,0.88), rgba(255,255,255,0.66));
    box-shadow: 0 20px 48px rgba(23,39,29,0.08), inset 0 1px rgba(255,255,255,0.95);
    backdrop-filter: blur(20px) saturate(135%);
    transition:
      transform 380ms cubic-bezier(0.16,1,0.3,1),
      border-color 350ms ease,
      box-shadow 380ms ease;
  }

  .appeal-paper:hover {
    transform: translateY(-7px) scale(1.012);
    border-color: rgba(213,189,135,0.55);
    box-shadow: 0 30px 62px rgba(23,39,29,0.13), 0 0 28px rgba(213,189,135,0.16), inset 0 1px white;
  }

  .appeal-paper small {
    color: #8a918b;
    font-size: 9px;
  }

  .appeal-paper h4 {
    margin: 20px 0 14px;
    color: var(--green);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
  }

  .appeal-paper p {
    min-height: 105px;
    margin: 0;
    color: #657069;
    font-size: 11px;
    line-height: 1.75;
  }

  .appeal-highlight {
    color: var(--green);
    font-weight: 700;
  }

  .appeal-paper-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
    padding-top: 14px;
    border-top: 1px solid var(--line);
  }

  .appeal-paper-footer span {
    color: #929993;
    font-size: 9px;
  }

  .appeal-review-button {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 10px 13px;
    border: 0;
    border-radius: 9px;
    color: white;
    background: linear-gradient(135deg, #2f513c, var(--green-dark));
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(36,61,45,0.18), 0 0 0 rgba(213,189,135,0);
    transition:
      transform 300ms cubic-bezier(0.16,1,0.3,1),
      box-shadow 300ms ease,
      background 300ms ease;
  }

  .appeal-review-button:hover {
    transform: translateY(-5px) scale(1.045);
    background: linear-gradient(135deg, #3a6248, #1d3325);
    box-shadow: 0 16px 30px rgba(36,61,45,0.27), 0 0 24px rgba(213,189,135,0.26);
  }

  .appeal-message {
    margin-top: 13px;
    padding: 11px 13px;
    border-radius: 10px;
    color: #52755d;
    background: rgba(82,117,93,0.08);
    font-size: 9px;
    line-height: 1.5;
    animation: appeal-message-in 240ms ease both;
  }

  @keyframes appeal-message-in {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .appeal-reveal {
    opacity: 0;
    filter: blur(14px);
    transform: translateY(58px) scale(0.95);
    transition:
      opacity 950ms ease,
      filter 950ms ease,
      transform 950ms cubic-bezier(0.16,1,0.3,1);
    will-change: opacity, transform, filter;
  }

  .appeal-reveal.visible {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0) scale(1);
  }

  .appeal-heading.appeal-reveal.visible { transition-delay: 40ms; }
  .appeal-questions.appeal-reveal.visible { transition-delay: 110ms; }
  .appeal-draft.appeal-reveal.visible { transition-delay: 230ms; }

  @media (max-width: 800px) {
    .appeal-workspace {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .finedai-appeal {
      padding: 85px 18px;
    }

    .appeal-questions,
    .appeal-draft {
      padding: 20px;
    }

    .appeal-paper {
      padding: 18px;
    }

    .appeal-paper-footer {
      align-items: flex-start;
      flex-direction: column;
    }

    .appeal-review-button {
      width: 100%;
      justify-content: center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .finedai-appeal::before,
    .finedai-appeal::after {
      animation: none;
    }

    .appeal-reveal {
      opacity: 1;
      filter: none;
      transform: none;
      transition: none;
      will-change: auto;
    }

    .appeal-panel,
    .appeal-option,
    .appeal-paper,
    .appeal-review-button,
    .appeal-message,
    .appeal-option-icon {
      transition: none;
      animation: none;
    }

    .appeal-panel:hover,
    .appeal-panel.appeal-reveal.visible:hover,
    .appeal-option:hover,
    .appeal-paper:hover,
    .appeal-review-button:hover,
    .appeal-option:hover .appeal-option-icon {
      transform: none;
    }
  }
`;

const options = [
  {
    id: 'income',
    title: 'Household income changed',
    icon: null,
  },
  {
    id: 'medical',
    title: 'Unexpected medical costs',
    icon: HeartPulse,
  },
  {
    id: 'siblings',
    title: 'More dependants',
    icon: Users,
  },
  {
    id: 'housing',
    title: 'Housing pressure',
    icon: Home,
  },
];

export default function AppealCoachPreview() {
  const ref = useRef(null);
  const [selected, setSelected] = useState(['income']);
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    const section = ref.current;
    if (!section) return undefined;

    const targets = section.querySelectorAll('.appeal-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('visible', entry.isIntersecting);
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const toggleOption = (id) => {
    setReviewed(false);
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const hasMedical = selected.includes('medical');
  const hasDependants = selected.includes('siblings');
  const hasHousing = selected.includes('housing');

  return (
    <>
      <style>{styles}</style>

      <section ref={ref} id="appeal" className="finedai-appeal">
        <div className="appeal-inner">
          <div className="appeal-heading appeal-reveal">
            <div className="appeal-eyebrow">
              <span />
              Appeal coach
            </div>

            <h2>
              Explain what
              <br />
              changed.
            </h2>

            <p>Answer a few questions to create an editable first draft.</p>
          </div>

          <div className="appeal-workspace">
            <div className="appeal-panel appeal-questions appeal-reveal">
              <div className="appeal-panel-header">
                <span>Step 01 · Guided questions</span>
                <h3>What applies to you?</h3>
              </div>

              <div className="appeal-options">
                {options.map((option) => {
                  const Icon = option.icon;
                  const active = selected.includes(option.id);

                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={`appeal-option ${active ? 'active' : ''}`}
                      aria-pressed={active}
                      onClick={() => toggleOption(option.id)}
                    >
                      <div className="appeal-option-icon">
                        {Icon ? (
                          <Icon size={16} />
                        ) : (
                          <span style={{ fontSize: 10, fontWeight: 800 }}>KSh</span>
                        )}
                      </div>

                      <div>
                        <strong>{option.title}</strong>
                      </div>

                      <div className="appeal-check" aria-hidden="true">
                        {active && <Check size={12} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="appeal-panel appeal-draft appeal-reveal">
              <div className="appeal-draft-head">
                <div className="appeal-draft-label">
                  <div className="appeal-draft-label-icon">
                    <FileEdit size={17} />
                  </div>

                  <div>
                    <strong>Draft appeal</strong>
                    <span>Based on your answers</span>
                  </div>
                </div>

                <div className="appeal-edit-badge">Editable</div>
              </div>

              <div className="appeal-paper" aria-live="polite">
                <small>FUNDING APPEAL · DRAFT</small>

                <h4>Request for reconsideration</h4>

                <p>
                  I am requesting reconsideration because my household has
                  experienced
                  <span className="appeal-highlight">
                    {' '}changes in financial circumstances
                  </span>
                  {hasMedical && <> and unexpected medical costs</>}
                  {hasDependants && <> and increased dependant responsibilities</>}
                  {hasHousing && <> and additional housing costs</>}
                  . These changes affect my ability to meet education costs.
                  Please consider my application and supporting evidence.
                </p>

                <div className="appeal-paper-footer">
                  <span>Check and edit the draft before using it.</span>

                  <button
                    type="button"
                    className="appeal-review-button"
                    onClick={() => setReviewed(true)}
                  >
                    {reviewed ? 'Draft reviewed' : 'Review draft'}
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {reviewed && (
                <div className="appeal-message" role="status">
                  Review the facts and use only information you can support.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
