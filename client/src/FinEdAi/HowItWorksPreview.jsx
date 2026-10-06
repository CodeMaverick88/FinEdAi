import React, { useEffect, useRef } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  GraduationCap,
  Lightbulb,
  SearchCheck,
} from 'lucide-react';

const styles = `
  .finedai-how-preview {
    --green: #243d2d;
    --green-dark: #17271d;
    --green-light: #52755d;
    --gold: #d5bd87;
    --cream: #f7f4ec;
    --paper: #ffffff;
    --muted: #667068;
    --line: rgba(36, 61, 45, 0.11);

    position: relative;
    width: 100%;
    padding: 120px 24px;
    overflow: hidden;
    background: var(--cream);
    color: var(--green);
  }

  .how-preview-orb {
    position: absolute;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    right: -180px;
    top: 100px;
    background: rgba(213, 189, 135, 0.13);
    filter: blur(2px);
    pointer-events: none;
  }

  .how-preview-inner {
    position: relative;
    z-index: 1;
    width: min(1160px, 100%);
    margin: 0 auto;
  }

  .how-preview-heading {
    max-width: 720px;
    margin-bottom: 70px;
  }

  .how-preview-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
    color: #927c4e;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .how-preview-eyebrow span {
    width: 24px;
    height: 1px;
    background: var(--gold);
  }

  .how-preview-heading h2 {
    margin: 0;
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(38px, 5vw, 68px);
    line-height: 0.98;
    letter-spacing: -0.055em;
  }

  .how-preview-heading p {
    max-width: 650px;
    margin: 22px 0 0;
    color: var(--muted);
    font-size: 16px;
    line-height: 1.75;
  }

  .how-preview-flow {
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
  }

  .how-preview-line {
    position: absolute;
    top: 39px;
    left: 8%;
    right: 8%;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(213, 189, 135, 0),
      rgba(213, 189, 135, 0.9),
      rgba(213, 189, 135, 0)
    );
  }

  .how-preview-card {
    position: relative;
    z-index: 2;
    min-height: 285px;
    padding: 26px 22px;
    border: 1px solid var(--line);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.62);
    box-shadow: 0 18px 50px rgba(23, 39, 29, 0.05);
    backdrop-filter: blur(16px);
    transition:
      transform 260ms ease,
      box-shadow 260ms ease,
      border-color 260ms ease,
      background 260ms ease;
  }

  .how-preview-card:hover {
    transform: translateY(-9px);
    border-color: rgba(213, 189, 135, 0.55);
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 25px 65px rgba(23, 39, 29, 0.1);
  }

  .how-preview-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-bottom: 48px;
    border: 1px solid rgba(213, 189, 135, 0.5);
    border-radius: 50%;
    color: var(--green);
    background: rgba(213, 189, 135, 0.16);
    font-size: 12px;
    font-weight: 800;
  }

  .how-preview-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    margin-bottom: 16px;
    border-radius: 14px;
    color: var(--green);
    background: rgba(36, 61, 45, 0.08);
  }

  .how-preview-card h3 {
    margin: 0 0 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 19px;
    letter-spacing: -0.035em;
  }

  .how-preview-card p {
    margin: 0;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.65;
  }

  .how-preview-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    margin-top: 42px;
    padding: 22px 24px;
    border: 1px solid var(--line);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.48);
  }

  .how-preview-bottom-copy {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.5;
  }

  .how-preview-bottom-copy svg {
    flex: 0 0 auto;
    color: #708b76;
  }

  .how-preview-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex: 0 0 auto;
    padding: 12px 17px;
    border-radius: 11px;
    border: 1px solid rgba(36, 61, 45, 0.12);
    color: #ffffff;
    background: var(--green);
    text-decoration: none;
    font-size: 12px;
    font-weight: 700;
    transition:
      transform 220ms ease,
      box-shadow 220ms ease;
  }

  .how-preview-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(36, 61, 45, 0.18);
  }

  .how-preview-reveal {
    opacity: 0;
    transform: translateY(35px);
    transition:
      opacity 750ms ease,
      transform 750ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .how-preview-reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .how-preview-card:nth-child(2) {
    transition-delay: 70ms;
  }

  .how-preview-card:nth-child(3) {
    transition-delay: 140ms;
  }

  .how-preview-card:nth-child(4) {
    transition-delay: 210ms;
  }

  .how-preview-card:nth-child(5) {
    transition-delay: 280ms;
  }

  @media (max-width: 1000px) {
    .how-preview-flow {
      grid-template-columns: repeat(2, 1fr);
    }

    .how-preview-line {
      display: none;
    }
  }

  @media (max-width: 620px) {
    .finedai-how-preview {
      padding: 85px 18px;
    }

    .how-preview-heading {
      margin-bottom: 45px;
    }

    .how-preview-flow {
      grid-template-columns: 1fr;
    }

    .how-preview-card {
      min-height: auto;
    }

    .how-preview-number {
      margin-bottom: 28px;
    }

    .how-preview-bottom {
      align-items: flex-start;
      flex-direction: column;
    }

    .how-preview-button {
      width: 100%;
      justify-content: center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .how-preview-reveal,
    .how-preview-card,
    .how-preview-button {
      transition: none;
    }
  }

  /* Strong glass surfaces, ambient glow and scroll motion */
  .finedai-how-preview {
    isolation: isolate;
    background:
      radial-gradient(ellipse at 8% 12%, rgba(213,189,135,.17), transparent 35%),
      radial-gradient(ellipse at 91% 72%, rgba(82,117,93,.14), transparent 38%),
      var(--cream);
  }

  .finedai-how-preview::before,
  .finedai-how-preview::after {
    position:absolute; z-index:-1; width:390px; height:390px; border-radius:50%; content:'';
    filter:blur(85px); opacity:.3; pointer-events:none; animation:how-aura 8s ease-in-out infinite alternate;
  }
  .finedai-how-preview::before { top:-180px; left:-190px; background:rgba(213,189,135,.72); }
  .finedai-how-preview::after { right:-200px; bottom:-170px; background:rgba(82,117,93,.48); animation-delay:-4s; }
  @keyframes how-aura { from {transform:translate3d(0,0,0) scale(.86)} to {transform:translate3d(34px,-27px,0) scale(1.12)} }

  .how-preview-orb {
    background:radial-gradient(circle,rgba(213,189,135,.28),rgba(82,117,93,.08) 48%,transparent 72%);
    filter:blur(30px);
    animation:how-orb-drift 9s ease-in-out infinite alternate;
  }
  @keyframes how-orb-drift { from {transform:translate3d(0,0,0) scale(.9)} to {transform:translate3d(-45px,35px,0) scale(1.14)} }
  .how-preview-eyebrow span { box-shadow:0 0 13px rgba(213,189,135,.9); }

  .how-preview-line {
    transform-origin:left center;
    background:linear-gradient(90deg,transparent,rgba(213,189,135,.96),rgba(82,117,93,.64),transparent);
    box-shadow:0 0 14px rgba(213,189,135,.34);
    animation:how-line-glow 3.4s ease-in-out infinite alternate;
  }
  @keyframes how-line-glow { from {opacity:.55;filter:brightness(.9)} to {opacity:1;filter:brightness(1.3)} }

  .how-preview-card {
    overflow:hidden;
    border-color:rgba(255,255,255,.84);
    background:linear-gradient(145deg,rgba(255,255,255,.79),rgba(255,255,255,.48));
    box-shadow:0 24px 62px rgba(23,39,29,.08),inset 0 1px rgba(255,255,255,.94);
    backdrop-filter:blur(22px) saturate(140%);
    -webkit-backdrop-filter:blur(22px) saturate(140%);
    transition:opacity 900ms ease,filter 900ms ease,transform 500ms cubic-bezier(.16,1,.3,1),box-shadow 400ms ease,border-color 400ms ease,background 400ms ease;
  }
  .how-preview-card::before {
    position:absolute; inset:0; border-radius:inherit;
    background:linear-gradient(115deg,transparent 18%,rgba(255,255,255,.6) 48%,transparent 75%);
    content:''; opacity:0; transform:translateX(-125%); pointer-events:none;
  }
  .how-preview-card:hover::before { opacity:1; transform:translateX(125%); transition:transform 850ms ease,opacity 150ms ease; }
  .how-preview-card:hover,
  .how-preview-card.how-preview-reveal.is-visible:hover {
    z-index:4; transform:translateY(-15px) scale(1.045); border-color:rgba(213,189,135,.88);
    background:linear-gradient(145deg,rgba(255,255,255,.94),rgba(255,255,255,.7));
    box-shadow:0 38px 84px rgba(23,39,29,.17),0 0 40px rgba(213,189,135,.28),inset 0 1px white;
  }

  .how-preview-number {
    box-shadow:0 0 0 7px rgba(213,189,135,.08),0 0 22px rgba(213,189,135,.24),inset 0 1px rgba(255,255,255,.7);
    transition:transform 350ms ease,box-shadow 350ms ease,background 350ms ease;
  }
  .how-preview-card:hover .how-preview-number { transform:rotate(-9deg) scale(1.12); box-shadow:0 0 0 10px rgba(213,189,135,.12),0 0 30px rgba(213,189,135,.42); }
  .how-preview-icon { box-shadow:inset 0 0 0 1px rgba(36,61,45,.04),0 0 20px rgba(82,117,93,.12); transition:transform 350ms ease,box-shadow 350ms ease; }
  .how-preview-card:hover .how-preview-icon { transform:rotate(7deg) scale(1.12); box-shadow:0 0 28px rgba(82,117,93,.24); }

  .how-preview-bottom {
    border-color:rgba(255,255,255,.78);
    background:linear-gradient(145deg,rgba(255,255,255,.73),rgba(255,255,255,.43));
    box-shadow:0 16px 40px rgba(23,39,29,.06),inset 0 1px rgba(255,255,255,.9);
    backdrop-filter:blur(18px) saturate(135%);
    transition:transform 420ms cubic-bezier(.16,1,.3,1),border-color 350ms ease,box-shadow 350ms ease;
  }
  .how-preview-bottom:hover { transform:translateY(-7px); border-color:rgba(213,189,135,.68); box-shadow:0 26px 55px rgba(23,39,29,.12),0 0 28px rgba(213,189,135,.18); }
  .how-preview-button { background:linear-gradient(135deg,#2f513c,var(--green-dark)); box-shadow:0 9px 22px rgba(36,61,45,.2); transition:transform 320ms cubic-bezier(.16,1,.3,1),box-shadow 320ms ease,filter 320ms ease; }
  .how-preview-button:hover { transform:translateY(-6px) scale(1.045); filter:brightness(1.15); box-shadow:0 18px 34px rgba(36,61,45,.28),0 0 26px rgba(213,189,135,.26); }
  .how-preview-button:focus-visible { outline:3px solid rgba(213,189,135,.82); outline-offset:4px; }

  .how-preview-reveal {
    opacity:0; filter:blur(13px); transform:translateY(56px) scale(.95);
    transition:opacity 900ms ease,filter 900ms ease,transform 900ms cubic-bezier(.16,1,.3,1);
    will-change:opacity,transform,filter;
  }
  .how-preview-reveal.is-visible { opacity:1; filter:blur(0); transform:translateY(0) scale(1); }
  .how-preview-heading.how-preview-reveal.is-visible { transition-delay:40ms; }
  .how-preview-bottom.how-preview-reveal.is-visible { transition-delay:360ms; }
  .how-preview-card:nth-child(2).how-preview-reveal.is-visible { transition-delay:90ms; }
  .how-preview-card:nth-child(3).how-preview-reveal.is-visible { transition-delay:160ms; }
  .how-preview-card:nth-child(4).how-preview-reveal.is-visible { transition-delay:230ms; }
  .how-preview-card:nth-child(5).how-preview-reveal.is-visible { transition-delay:300ms; }
  .how-preview-card:nth-child(6).how-preview-reveal.is-visible { transition-delay:370ms; }
  .how-preview-card:nth-child(2).how-preview-reveal:not(.is-visible),
  .how-preview-card:nth-child(3).how-preview-reveal:not(.is-visible),
  .how-preview-card:nth-child(4).how-preview-reveal:not(.is-visible),
  .how-preview-card:nth-child(5).how-preview-reveal:not(.is-visible),
  .how-preview-card:nth-child(6).how-preview-reveal:not(.is-visible) { transition-delay:0ms; }

  @media (prefers-reduced-motion: reduce) {
    .finedai-how-preview::before,.finedai-how-preview::after,.how-preview-orb,.how-preview-line { animation:none; }
    .how-preview-reveal { opacity:1;filter:none;transform:none;transition:none;will-change:auto; }
    .how-preview-card,.how-preview-bottom,.how-preview-button,.how-preview-number,.how-preview-icon { transition:none; }
    .how-preview-card:hover,.how-preview-card.how-preview-reveal.is-visible:hover,.how-preview-bottom:hover,.how-preview-button:hover,.how-preview-card:hover .how-preview-number,.how-preview-card:hover .how-preview-icon { transform:none; }
  }
`;

const steps = [
  {
    number: '01',
    icon: GraduationCap,
    title: 'Build your profile',
    text: 'Tell FinEdAI about your education, funding needs and circumstances.',
  },
  {
    number: '02',
    icon: FileSearch,
    title: 'Add your evidence',
    text: 'Bring together statements, receipts and supporting documents.',
  },
  {
    number: '03',
    icon: SearchCheck,
    title: 'Understand hardship',
    text: 'FinEdAI organises evidence into understandable financial patterns.',
  },
  {
    number: '04',
    icon: Lightbulb,
    title: 'Prepare your case',
    text: 'Answer guided questions and create an editable funding appeal.',
  },
  {
    number: '05',
    icon: CheckCircle2,
    title: 'Find opportunities',
    text: 'Discover funding options that may fit your profile and needs.',
  },
];

export default function HowItWorksPreview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const targets = section.querySelectorAll('.how-preview-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
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

      <section
        ref={sectionRef}
        id="how-it-works"
        className="finedai-how-preview"
      >
        <div className="how-preview-orb" />

        <div className="how-preview-inner">
          <div
            className="how-preview-heading how-preview-reveal"
          >
            <div className="how-preview-eyebrow">
              <span />
              The FinEdAI journey
            </div>

            <h2>
              From financial
              <br />
              uncertainty to a
              <br />
              clearer next step.
            </h2>

            <p>
              FinEdAI brings the pieces together. Instead of asking
              students to figure everything out alone, it helps turn
              financial evidence into a structured, reviewable funding case.
            </p>
          </div>

          <div className="how-preview-flow">
            <div className="how-preview-line" />

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="how-preview-card how-preview-reveal"
                >
                  <div className="how-preview-number">
                    {step.number}
                  </div>

                  <div className="how-preview-icon">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>
                </article>
              );
            })}
          </div>

          <div
            className="how-preview-bottom how-preview-reveal"
          >
            <div className="how-preview-bottom-copy">
              <CheckCircle2 size={18} />
              <span>
                You remain in control. FinEdAI assists with preparation;
                official funding decisions remain with the relevant institution.
              </span>
            </div>

            <a
              href="/how-it-works"
              className="how-preview-button"
            >
              Explore the full journey
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}