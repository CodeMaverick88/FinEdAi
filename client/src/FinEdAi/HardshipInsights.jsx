import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  CircleDollarSign,
  GraduationCap,
  Home,
  Utensils,
} from 'lucide-react';

const styles = `
  .finedai-insights {
    --green: #243d2d;
    --green-dark: #17271d;
    --gold: #d5bd87;
    --cream: #f3f0e7;
    --paper: #ffffff;
    --muted: #6b756e;
    --line: rgba(36, 61, 45, 0.1);

    width: 100%;
    padding: 120px 24px;
    background: var(--cream);
  }

  .insights-inner {
    width: min(1160px, 100%);
    margin: 0 auto;
  }

  .insights-top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 40px;
    margin-bottom: 55px;
  }

  .insights-heading {
    max-width: 650px;
  }

  .insights-eyebrow {
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

  .insights-eyebrow span {
    width: 23px;
    height: 1px;
    background: var(--gold);
  }

  .insights-heading h2 {
    margin: 0;
    color: var(--green);
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(36px, 4.8vw, 61px);
    line-height: 1;
    letter-spacing: -0.055em;
  }

  .insights-heading p {
    margin: 20px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.75;
  }

  .insights-note {
    max-width: 300px;
    padding: 14px 16px;
    border-left: 2px solid var(--gold);
    color: var(--muted);
    font-size: 11px;
    line-height: 1.6;
  }

  .insights-dashboard {
    display: grid;
    grid-template-columns: 1.25fr 0.75fr;
    gap: 16px;
  }

  .insights-card {
    border: 1px solid var(--line);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.68);
    box-shadow: 0 20px 55px rgba(23, 39, 29, 0.05);
    backdrop-filter: blur(14px);
  }

  .insights-overview {
    padding: 28px;
  }

  .insights-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 30px;
  }

  .insights-card-title {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .insights-card-title-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 12px;
    color: var(--green);
    background: rgba(36, 61, 45, 0.07);
  }

  .insights-card-title strong {
    display: block;
    color: var(--green);
    font-size: 13px;
  }

  .insights-card-title span {
    display: block;
    margin-top: 3px;
    color: #8a928c;
    font-size: 10px;
  }

  .insights-period {
    padding: 7px 10px;
    border: 1px solid var(--line);
    border-radius: 8px;
    color: var(--muted);
    background: rgba(255,255,255,0.6);
    font-size: 10px;
  }

  .insights-metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 35px;
  }

  .insight-metric {
    padding: 17px;
    border-radius: 15px;
    background: rgba(36, 61, 45, 0.045);
  }

  .insight-metric-label {
    display: block;
    margin-bottom: 8px;
    color: var(--muted);
    font-size: 10px;
  }

  .insight-metric strong {
    display: block;
    color: var(--green);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 21px;
    letter-spacing: -0.04em;
  }

  .insight-metric small {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 5px;
    color: #708b76;
    font-size: 9px;
  }

  .insights-chart {
    height: 175px;
    display: flex;
    align-items: flex-end;
    gap: 9px;
    padding: 15px 0 0;
    border-bottom: 1px solid var(--line);
  }

  .chart-bar {
    position: relative;
    flex: 1;
    min-width: 8px;
    border-radius: 7px 7px 0 0;
    background: linear-gradient(
      to top,
      rgba(36, 61, 45, 0.15),
      rgba(82, 117, 93, 0.65)
    );
    transform-origin: bottom;
    transition: transform 250ms ease;
  }

  .chart-bar:hover {
    transform: scaleY(1.07);
  }

  .chart-bar::after {
    position: absolute;
    left: 50%;
    bottom: -22px;
    color: #969d97;
    content: attr(data-label);
    font-size: 8px;
    transform: translateX(-50%);
  }

  .insights-side {
    display: flex;
    flex-direction: column;
    padding: 28px;
  }

  .insights-side h3 {
    margin: 0 0 8px;
    color: var(--green);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 21px;
    letter-spacing: -0.035em;
  }

  .insights-side > p {
    margin: 0 0 25px;
    color: var(--muted);
    font-size: 11px;
    line-height: 1.65;
  }

  .indicator-list {
    display: grid;
    gap: 10px;
  }

  .indicator {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 12px;
    border: 1px solid var(--line);
    border-radius: 13px;
    background: rgba(255,255,255,0.45);
  }

  .indicator-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 31px;
    height: 31px;
    flex: 0 0 auto;
    border-radius: 9px;
    color: var(--green);
    background: rgba(36,61,45,0.07);
  }

  .indicator strong {
    display: block;
    color: var(--green);
    font-size: 10px;
  }

  .indicator span {
    display: block;
    margin-top: 2px;
    color: #858e87;
    font-size: 9px;
  }

  .insights-disclaimer {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    margin-top: auto;
    padding-top: 25px;
    color: #858e87;
    font-size: 9px;
    line-height: 1.55;
  }

  .insights-disclaimer svg {
    flex: 0 0 auto;
    margin-top: 1px;
    color: #a18c60;
  }

  .insights-reveal {
    opacity: 0;
    transform: translateY(35px);
    transition:
      opacity 800ms ease,
      transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .insights-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 850px) {
    .insights-top {
      align-items: flex-start;
      flex-direction: column;
    }

    .insights-dashboard {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .finedai-insights {
      padding: 85px 18px;
    }

    .insights-metrics {
      grid-template-columns: 1fr;
    }

    .insights-overview,
    .insights-side {
      padding: 20px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .insights-reveal,
    .chart-bar {
      transition: none;
    }
  }

  /* Premium glass surfaces, ambient light and stronger motion */
  .finedai-insights {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    background:
      radial-gradient(ellipse at 8% 10%, rgba(213,189,135,.16), transparent 35%),
      radial-gradient(ellipse at 92% 76%, rgba(82,117,93,.14), transparent 38%),
      var(--cream);
  }

  .finedai-insights::before,
  .finedai-insights::after {
    position: absolute;
    z-index: -1;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    content: '';
    filter: blur(85px);
    opacity: .3;
    pointer-events: none;
    animation: insights-aura 8s ease-in-out infinite alternate;
  }

  .finedai-insights::before { top: -180px; left: -190px; background: rgba(213,189,135,.72); }
  .finedai-insights::after { right: -200px; bottom: -170px; background: rgba(82,117,93,.48); animation-delay: -4s; }
  @keyframes insights-aura { from {transform:translate3d(0,0,0) scale(.86)} to {transform:translate3d(32px,-25px,0) scale(1.12)} }
  .insights-inner { position: relative; }
  .insights-eyebrow span { box-shadow: 0 0 13px rgba(213,189,135,.9); }

  .insights-note {
    border: 1px solid rgba(255,255,255,.78);
    border-left: 2px solid var(--gold);
    border-radius: 16px;
    background: linear-gradient(145deg,rgba(255,255,255,.72),rgba(255,255,255,.43));
    box-shadow: 0 16px 38px rgba(23,39,29,.07),inset 0 1px rgba(255,255,255,.9);
    backdrop-filter: blur(18px) saturate(135%);
    transition: transform 350ms ease,box-shadow 350ms ease;
  }
  .insights-note:hover { transform:translateY(-6px); box-shadow:0 24px 48px rgba(23,39,29,.12),0 0 26px rgba(213,189,135,.18); }

  .insights-card {
    border-color: rgba(255,255,255,.8);
    background: linear-gradient(145deg,rgba(255,255,255,.79),rgba(255,255,255,.49));
    box-shadow: 0 25px 65px rgba(23,39,29,.09),inset 0 1px rgba(255,255,255,.93);
    backdrop-filter: blur(22px) saturate(140%);
    -webkit-backdrop-filter: blur(22px) saturate(140%);
    transition: opacity 900ms ease,filter 900ms ease,transform 500ms cubic-bezier(.16,1,.3,1),box-shadow 400ms ease,border-color 400ms ease;
  }
  .insights-card.insights-reveal.visible:hover {
    transform:translateY(-12px) scale(1.018);
    border-color:rgba(213,189,135,.82);
    box-shadow:0 38px 85px rgba(23,39,29,.16),0 0 38px rgba(213,189,135,.24),inset 0 1px white;
  }
  .insights-card-title-icon {
    box-shadow:inset 0 0 0 1px rgba(36,61,45,.04),0 0 20px rgba(82,117,93,.12);
    transition:transform 350ms ease,box-shadow 350ms ease;
  }
  .insights-card:hover .insights-card-title-icon { transform:rotate(-7deg) scale(1.1); box-shadow:0 0 26px rgba(213,189,135,.28); }
  .insights-period {
    border-color:rgba(255,255,255,.8);
    background:rgba(255,255,255,.55);
    box-shadow:inset 0 1px rgba(255,255,255,.9);
    backdrop-filter:blur(12px);
  }

  .insight-metric {
    border:1px solid rgba(255,255,255,.7);
    background:linear-gradient(145deg,rgba(255,255,255,.64),rgba(36,61,45,.035));
    box-shadow:0 10px 22px rgba(23,39,29,.04),inset 0 1px rgba(255,255,255,.85);
    transition:transform 350ms cubic-bezier(.16,1,.3,1),box-shadow 350ms ease,border-color 350ms ease;
  }
  .insight-metric:hover { transform:translateY(-7px) scale(1.035); border-color:rgba(213,189,135,.65); box-shadow:0 18px 34px rgba(23,39,29,.1),0 0 23px rgba(213,189,135,.2); }
  .insight-metric strong { text-shadow:0 3px 14px rgba(82,117,93,.12); }

  .insights-chart { position:relative; }
  .chart-bar {
    border:1px solid rgba(255,255,255,.38);
    background:linear-gradient(to top,rgba(36,61,45,.2),rgba(82,117,93,.72),rgba(213,189,135,.84));
    box-shadow:0 0 16px rgba(82,117,93,.16);
    transition:height 950ms cubic-bezier(.16,1,.3,1),transform 300ms ease,filter 300ms ease,box-shadow 300ms ease;
  }
  .chart-bar:hover { transform:scaleY(1.1) scaleX(1.08); filter:brightness(1.12); box-shadow:0 0 27px rgba(213,189,135,.42); }
  .chart-bar:nth-child(2n) { transition-delay:70ms; }
  .chart-bar:nth-child(3n) { transition-delay:140ms; }

  .indicator {
    border-color:rgba(255,255,255,.78);
    background:linear-gradient(145deg,rgba(255,255,255,.72),rgba(255,255,255,.42));
    box-shadow:0 9px 22px rgba(23,39,29,.045),inset 0 1px rgba(255,255,255,.88);
    backdrop-filter:blur(14px);
    transition:transform 350ms cubic-bezier(.16,1,.3,1),border-color 300ms ease,box-shadow 350ms ease;
  }
  .indicator:hover { transform:translateX(7px) scale(1.025); border-color:rgba(213,189,135,.72); box-shadow:0 14px 30px rgba(23,39,29,.1),0 0 23px rgba(213,189,135,.2); }
  .indicator-icon { transition:transform 300ms ease,box-shadow 300ms ease; }
  .indicator:hover .indicator-icon { transform:rotate(-8deg) scale(1.1); box-shadow:0 0 22px rgba(82,117,93,.23); }

  .insights-disclaimer {
    padding:16px;
    border:1px solid rgba(213,189,135,.3);
    border-radius:14px;
    background:rgba(255,255,255,.42);
    backdrop-filter:blur(12px);
  }

  .insights-reveal {
    opacity:0;
    filter:blur(13px);
    transform:translateY(54px) scale(.95);
    transition:opacity 900ms ease,filter 900ms ease,transform 900ms cubic-bezier(.16,1,.3,1);
    will-change:opacity,transform,filter;
  }
  .insights-reveal.visible { opacity:1; filter:blur(0); transform:translateY(0) scale(1); }
  .insights-top.insights-reveal.visible { transition-delay:40ms; }
  .insights-overview.insights-reveal.visible { transition-delay:130ms; }
  .insights-side.insights-reveal.visible { transition-delay:250ms; }

  .insights-side.visible .indicator { animation:insights-item-in 720ms cubic-bezier(.16,1,.3,1) both; }
  .insights-side.visible .indicator:nth-child(1) { animation-delay:80ms; }
  .insights-side.visible .indicator:nth-child(2) { animation-delay:150ms; }
  .insights-side.visible .indicator:nth-child(3) { animation-delay:220ms; }
  .insights-side.visible .indicator:nth-child(4) { animation-delay:290ms; }
  @keyframes insights-item-in { from {opacity:0;transform:translateX(22px) scale(.96);filter:blur(7px)} to {opacity:1;transform:translateX(0) scale(1);filter:blur(0)} }

  @media (prefers-reduced-motion: reduce) {
    .finedai-insights::before,.finedai-insights::after { animation:none; }
    .insights-reveal { opacity:1;filter:none;transform:none;transition:none;will-change:auto; }
    .insights-card,.insights-note,.insight-metric,.chart-bar,.indicator,.indicator-icon { transition:none;animation:none; }
    .insights-side.visible .indicator { animation:none; }
    .insights-card.insights-reveal.visible:hover,.insights-note:hover,.insight-metric:hover,.chart-bar:hover,.indicator:hover,.indicator:hover .indicator-icon { transform:none; }
  }
`;

const bars = [
  ['Jun', 52],
  ['Jul', 71],
  ['Aug', 44],
  ['Sep', 82],
  ['Oct', 58],
  ['Nov', 92],
  ['Dec', 68],
  ['Jan', 84],
  ['Feb', 57],
  ['Mar', 76],
  ['Apr', 64],
  ['May', 88],
];

export default function HardshipInsights() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = ref.current;
    if (!section) return undefined;

    const targets = section.querySelectorAll('.insights-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === section) setVisible(entry.isIntersecting);
          else entry.target.classList.toggle('visible', entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -4% 0px' }
    );

    observer.observe(section);
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>

      <section
        ref={ref}
        id="capabilities"
        className="finedai-insights"
      >
        <div className="insights-inner">
          <div
            className="insights-top insights-reveal"
          >
            <div className="insights-heading">
              <div className="insights-eyebrow">
                <span />
                Financial hardship insights
              </div>

              <h2>
                Numbers become
                <br />
                understandable.
              </h2>

              <p>
                Instead of leaving students with a pile of statements,
                FinEdAI can help surface patterns such as income
                irregularity, essential spending and periods of financial
                pressure.
              </p>
            </div>

            <div className="insights-note">
              This is an assistant-generated view for review. It is
              <strong> not an official funding score</strong> and does not
              determine whether a student receives funding.
            </div>
          </div>

          <div
            className="insights-dashboard"
          >
            <div className="insights-card insights-overview insights-reveal">
              <div className="insights-card-header">
                <div className="insights-card-title">
                  <div className="insights-card-title-icon">
                    <BarChart3 size={18} />
                  </div>

                  <div>
                    <strong>Financial overview</strong>
                    <span>Illustrative student profile</span>
                  </div>
                </div>

                <div className="insights-period">
                  12 month view
                </div>
              </div>

              <div className="insights-metrics">
                <div className="insight-metric">
                  <span className="insight-metric-label">
                    Avg. income
                  </span>

                  <strong>KSh 18.5K</strong>

                  <small>
                    <ArrowUpRight size={10} />
                    Variable
                  </small>
                </div>

                <div className="insight-metric">
                  <span className="insight-metric-label">
                    Essential costs
                  </span>

                  <strong>KSh 14.8K</strong>

                  <small>
                    <CircleDollarSign size={10} />
                    High pressure
                  </small>
                </div>

                <div className="insight-metric">
                  <span className="insight-metric-label">
                    Education costs
                  </span>

                  <strong>KSh 6.2K</strong>

                  <small>
                    <GraduationCap size={10} />
                    Recurring
                  </small>
                </div>
              </div>

              <div className="insights-chart">
                {bars.map(([label, value]) => (
                  <div
                    key={label}
                    className="chart-bar"
                    data-label={label}
                    style={{
                      height: visible ? `${value}%` : '0%',
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="insights-card insights-side insights-reveal">
              <h3>Signals worth reviewing</h3>

              <p>
                FinEdAI can highlight areas that may deserve attention
                when preparing a funding explanation.
              </p>

              <div className="indicator-list">
                <div className="indicator">
                  <div className="indicator-icon">
                    <CircleDollarSign size={15} />
                  </div>

                  <div>
                    <strong>Irregular household income</strong>
                    <span>Income changes across periods</span>
                  </div>
                </div>

                <div className="indicator">
                  <div className="indicator-icon">
                    <Home size={15} />
                  </div>

                  <div>
                    <strong>High essential expenses</strong>
                    <span>Rent and household costs</span>
                  </div>
                </div>

                <div className="indicator">
                  <div className="indicator-icon">
                    <Utensils size={15} />
                  </div>

                  <div>
                    <strong>Recurring daily needs</strong>
                    <span>Food and transport pressure</span>
                  </div>
                </div>

                <div className="indicator">
                  <div className="indicator-icon">
                    <GraduationCap size={15} />
                  </div>

                  <div>
                    <strong>Education-related costs</strong>
                    <span>Fees and academic requirements</span>
                  </div>
                </div>
              </div>

              <div className="insights-disclaimer">
                <AlertCircle size={13} />
                <span>
                  All figures shown here are illustrative interface
                  data for the FinEdAI prototype.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}