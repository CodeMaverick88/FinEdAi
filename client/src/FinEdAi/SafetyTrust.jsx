import React, { useEffect, useRef } from 'react';
import {
  Check,
  Eye,
  FileCheck2,
  LockKeyhole,
  ShieldCheck,
  UserCheck,
  X,
} from 'lucide-react';

const styles = `
  .finedai-safety {
    --green: #243d2d;
    --green-dark: #17271d;
    --gold: #d5bd87;
    --cream: #f5f2e9;
    --paper: #ffffff;
    --muted: #69736c;
    --line: rgba(36,61,45,0.1);

    width: 100%;
    padding: 120px 24px 105px;
    background: var(--cream);
  }

  .safety-inner {
    width: min(1160px, 100%);
    margin: 0 auto;
  }

  .safety-heading {
    max-width: 720px;
    margin-bottom: 50px;
  }

  .safety-eyebrow {
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

  .safety-eyebrow span {
    width: 23px;
    height: 1px;
    background: var(--gold);
  }

  .safety-heading h2 {
    margin: 0;
    color: var(--green);
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(36px, 4.8vw, 61px);
    line-height: 1;
    letter-spacing: -0.055em;
  }

  .safety-heading p {
    margin: 20px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.75;
  }

  .safety-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .safety-card {
    min-height: 230px;
    padding: 22px;
    border: 1px solid var(--line);
    border-radius: 20px;
    background: rgba(255,255,255,0.64);
    transition:
      transform 250ms ease,
      border-color 250ms ease,
      box-shadow 250ms ease;
  }

  .safety-card:hover {
    transform: translateY(-7px);
    border-color: rgba(213,189,135,0.5);
    box-shadow: 0 22px 50px rgba(23,39,29,0.08);
  }

  .safety-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    margin-bottom: 30px;
    border-radius: 13px;
    color: var(--green);
    background: rgba(36,61,45,0.07);
  }

  .safety-card h3 {
    margin: 0 0 9px;
    color: var(--green);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 17px;
    letter-spacing: -0.025em;
  }

  .safety-card p {
    margin: 0;
    color: var(--muted);
    font-size: 11px;
    line-height: 1.7;
  }

  .safety-boundary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-top: 15px;
  }

  .safety-boundary-card {
    padding: 23px;
    border-radius: 19px;
  }

  .safety-boundary-card--yes {
    border: 1px solid rgba(82,117,93,0.18);
    background: rgba(82,117,93,0.055);
  }

  .safety-boundary-card--no {
    border: 1px solid rgba(150,100,82,0.12);
    background: rgba(150,100,82,0.035);
  }

  .boundary-heading {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 16px;
    color: var(--green);
    font-size: 11px;
    font-weight: 800;
  }

  .boundary-heading svg {
    width: 16px;
    height: 16px;
  }

  .safety-boundary-card--no .boundary-heading {
    color: #765a4e;
  }

  .boundary-list {
    display: grid;
    gap: 9px;
  }

  .boundary-item {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    color: var(--muted);
    font-size: 10px;
    line-height: 1.5;
  }

  .boundary-item svg {
    flex: 0 0 auto;
    margin-top: 1px;
  }

  .safety-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    margin-top: 42px;
    color: #79837c;
    font-size: 10px;
    text-align: center;
  }

  .safety-footer svg {
    color: #52755d;
  }

  .safety-reveal {
    opacity: 0;
    transform: translateY(35px);
    transition:
      opacity 800ms ease,
      transform 800ms cubic-bezier(0.2,0.8,0.2,1);
  }

  .safety-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .safety-card:nth-child(2) {
    transition-delay: 80ms;
  }

  .safety-card:nth-child(3) {
    transition-delay: 160ms;
  }

  .safety-card:nth-child(4) {
    transition-delay: 240ms;
  }

  @media (max-width: 900px) {
    .safety-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 650px) {
    .finedai-safety {
      padding: 85px 18px;
    }

    .safety-grid,
    .safety-boundary {
      grid-template-columns: 1fr;
    }

    .safety-card {
      min-height: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .safety-reveal,
    .safety-card {
      transition: none;
    }
  }

  /* Glass, glow and staged reveals */
  .finedai-safety {
    position:relative; isolation:isolate; overflow:hidden;
    background:radial-gradient(ellipse at 8% 12%,rgba(213,189,135,.16),transparent 35%),radial-gradient(ellipse at 92% 76%,rgba(82,117,93,.13),transparent 38%),var(--cream);
  }
  .finedai-safety::before,.finedai-safety::after {
    position:absolute;z-index:-1;width:390px;height:390px;border-radius:50%;content:'';
    filter:blur(84px);opacity:.3;pointer-events:none;animation:safety-aura 8s ease-in-out infinite alternate;
  }
  .finedai-safety::before {top:-180px;left:-190px;background:rgba(213,189,135,.72)}
  .finedai-safety::after {right:-190px;bottom:-170px;background:rgba(82,117,93,.46);animation-delay:-4s}
  @keyframes safety-aura {from {transform:translate3d(0,0,0) scale(.86)} to {transform:translate3d(34px,-27px,0) scale(1.12)}}
  .safety-inner {position:relative}
  .safety-eyebrow span {box-shadow:0 0 13px rgba(213,189,135,.9)}

  .safety-card {
    position:relative;overflow:hidden;
    border-color:rgba(255,255,255,.84);
    background:linear-gradient(145deg,rgba(255,255,255,.8),rgba(255,255,255,.49));
    box-shadow:0 22px 58px rgba(23,39,29,.08),inset 0 1px rgba(255,255,255,.94);
    backdrop-filter:blur(21px) saturate(140%);-webkit-backdrop-filter:blur(21px) saturate(140%);
    transition:opacity 900ms ease,filter 900ms ease,transform 480ms cubic-bezier(.16,1,.3,1),box-shadow 380ms ease,border-color 380ms ease;
  }
  .safety-card::before {
    position:absolute;inset:0;border-radius:inherit;background:linear-gradient(115deg,transparent 18%,rgba(255,255,255,.58) 48%,transparent 75%);content:'';opacity:0;transform:translateX(-125%);pointer-events:none;
  }
  .safety-card:hover::before {opacity:1;transform:translateX(125%);transition:transform 850ms ease,opacity 150ms ease}
  .safety-card:hover,.safety-card.safety-reveal.visible:hover {
    transform:translateY(-13px) scale(1.035);border-color:rgba(213,189,135,.85);
    box-shadow:0 35px 76px rgba(23,39,29,.16),0 0 36px rgba(213,189,135,.26),inset 0 1px white;
  }
  .safety-icon {box-shadow:inset 0 0 0 1px rgba(36,61,45,.04),0 0 20px rgba(82,117,93,.11);transition:transform 330ms ease,box-shadow 330ms ease}
  .safety-card:hover .safety-icon {transform:rotate(-8deg) scale(1.12);box-shadow:0 0 28px rgba(213,189,135,.3)}

  .safety-boundary-card {
    border:1px solid rgba(255,255,255,.78);border-radius:21px;
    box-shadow:0 18px 42px rgba(23,39,29,.06),inset 0 1px rgba(255,255,255,.88);
    backdrop-filter:blur(18px) saturate(135%);
    transition:transform 420ms cubic-bezier(.16,1,.3,1),box-shadow 380ms ease,border-color 380ms ease;
  }
  .safety-boundary-card--yes {background:linear-gradient(145deg,rgba(255,255,255,.68),rgba(82,117,93,.08))}
  .safety-boundary-card--no {background:linear-gradient(145deg,rgba(255,255,255,.66),rgba(150,100,82,.055))}
  .safety-boundary-card:hover,.safety-boundary-card.safety-reveal.visible:hover {transform:translateY(-9px) scale(1.018);border-color:rgba(213,189,135,.64);box-shadow:0 28px 58px rgba(23,39,29,.11),0 0 25px rgba(213,189,135,.17)}
  .boundary-item {transition:transform 240ms ease,color 240ms ease}
  .safety-boundary-card:hover .boundary-item {transform:translateX(3px)}
  .safety-boundary-card--yes .boundary-item svg {filter:drop-shadow(0 2px 5px rgba(82,117,93,.2))}
  .safety-boundary-card--no .boundary-item svg {filter:drop-shadow(0 2px 5px rgba(150,100,82,.14))}
  .safety-footer {padding:14px 18px;border:1px solid rgba(255,255,255,.7);border-radius:14px;background:rgba(255,255,255,.42);backdrop-filter:blur(14px)}

  .safety-reveal {
    opacity:0;filter:blur(13px);transform:translateY(54px) scale(.95);
    transition:opacity 900ms ease,filter 900ms ease,transform 900ms cubic-bezier(.16,1,.3,1);
    will-change:opacity,transform,filter;
  }
  .safety-reveal.visible {opacity:1;filter:blur(0);transform:translateY(0) scale(1)}
  .safety-heading.safety-reveal.visible {transition-delay:40ms}
  .safety-card:nth-child(1).safety-reveal.visible {transition-delay:90ms}
  .safety-card:nth-child(2).safety-reveal.visible {transition-delay:160ms}
  .safety-card:nth-child(3).safety-reveal.visible {transition-delay:230ms}
  .safety-card:nth-child(4).safety-reveal.visible {transition-delay:300ms}
  .safety-boundary-card--yes.safety-reveal.visible {transition-delay:100ms}
  .safety-boundary-card--no.safety-reveal.visible {transition-delay:220ms}
  .safety-footer.safety-reveal.visible {transition-delay:180ms}
  .safety-card.safety-reveal:not(.visible) {transition-delay:0ms}

  @media (prefers-reduced-motion: reduce) {
    .finedai-safety::before,.finedai-safety::after {animation:none}
    .safety-reveal {opacity:1;filter:none;transform:none;transition:none;will-change:auto}
    .safety-card,.safety-icon,.safety-boundary-card,.boundary-item {transition:none}
    .safety-card:hover,.safety-card.safety-reveal.visible:hover,.safety-icon,.safety-boundary-card:hover,.safety-boundary-card.safety-reveal.visible:hover,.safety-boundary-card:hover .boundary-item {transform:none}
  }
`;

const cards = [
  {
    icon: LockKeyhole,
    title: 'No financial passwords',
    text: 'The product should never require an M-Pesa PIN, bank password or direct account credentials.',
  },
  {
    icon: Eye,
    title: 'Transparent assistance',
    text: 'Students should be able to understand what information contributed to an AI-generated explanation.',
  },
  {
    icon: UserCheck,
    title: 'Human review',
    text: 'Generated summaries and appeals remain editable. The student reviews them before use.',
  },
  {
    icon: ShieldCheck,
    title: 'Student control',
    text: 'Students should control the evidence they provide and be able to remove documents when appropriate.',
  },
];

export default function SafetyTrust() {
  const ref = useRef(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return undefined;
    const targets = section.querySelectorAll('.safety-reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('visible', entry.isIntersecting)),
      { threshold: 0.12, rootMargin: '0px 0px -4% 0px' }
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>

      <section
        ref={ref}
        id="safety"
        className="finedai-safety"
      >
        <div className="safety-inner">
          <div
            className="safety-heading safety-reveal"
          >
            <div className="safety-eyebrow">
              <span />
              Trust & responsibility
            </div>

            <h2>
              Helpful AI needs
              <br />
              clear boundaries.
            </h2>

            <p>
              FinEdAI is designed to support students, not replace the
              institutions responsible for funding decisions.
            </p>
          </div>

          <div className="safety-grid">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="safety-card safety-reveal"
                >
                  <div className="safety-icon">
                    <Icon size={19} />
                  </div>

                  <h3>{card.title}</h3>

                  <p>{card.text}</p>
                </article>
              );
            })}
          </div>

          <div className="safety-boundary">
            <div className="safety-boundary-card safety-boundary-card--yes safety-reveal">
              <div className="boundary-heading">
                <Check />
                FinEdAI can help with
              </div>

              <div className="boundary-list">
                <div className="boundary-item">
                  <Check size={13} />
                  Understanding financial evidence
                </div>

                <div className="boundary-item">
                  <Check size={13} />
                  Preparing editable funding appeals
                </div>

                <div className="boundary-item">
                  <Check size={13} />
                  Organising supporting information
                </div>

                <div className="boundary-item">
                  <Check size={13} />
                  Discovering potential opportunities
                </div>
              </div>
            </div>

            <div className="safety-boundary-card safety-boundary-card--no safety-reveal">
              <div className="boundary-heading">
                <X />
                FinEdAI does not
              </div>

              <div className="boundary-list">
                <div className="boundary-item">
                  <X size={13} />
                  Guarantee that a student will receive funding
                </div>

                <div className="boundary-item">
                  <X size={13} />
                  Make official funding decisions
                </div>

                <div className="boundary-item">
                  <X size={13} />
                  Replace HELB, HEF, universities or other authorities
                </div>

                <div className="boundary-item">
                  <X size={13} />
                  Submit an application without student approval
                </div>
              </div>
            </div>
          </div>

          <div className="safety-footer safety-reveal">
            <FileCheck2 size={14} />
            Every generated document should be reviewed before submission.
          </div>
        </div>
      </section>
    </>
  );
}