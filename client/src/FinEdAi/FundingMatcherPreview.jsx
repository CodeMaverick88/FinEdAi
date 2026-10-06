import React, { useEffect, useRef, useState } from 'react';
import {
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  Landmark,
  Search,
  Sparkles,
} from 'lucide-react';

const styles = `
  .finedai-funding {
    --green: #243d2d;
    --green-dark: #17271d;
    --gold: #d5bd87;
    --cream: #f7f5ee;
    --paper: #ffffff;
    --muted: #69736c;
    --line: rgba(36,61,45,0.1);

    width: 100%;
    padding: 120px 24px;
    background: var(--cream);
  }

  .funding-inner {
    width: min(1160px, 100%);
    margin: 0 auto;
  }

  .funding-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 40px;
    margin-bottom: 45px;
  }

  .funding-title {
    max-width: 700px;
  }

  .funding-eyebrow {
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

  .funding-eyebrow span {
    width: 23px;
    height: 1px;
    background: var(--gold);
  }

  .funding-title h2 {
    margin: 0;
    color: var(--green);
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(36px, 4.8vw, 61px);
    line-height: 1;
    letter-spacing: -0.055em;
  }

  .funding-title p {
    max-width: 620px;
    margin: 20px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.75;
  }

  .funding-search {
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 210px;
    padding: 12px 14px;
    border: 1px solid var(--line);
    border-radius: 12px;
    color: #8b938d;
    background: rgba(255,255,255,0.6);
    font-size: 11px;
  }

  .funding-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .funding-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 355px;
    padding: 23px;
    border: 1px solid var(--line);
    border-radius: 22px;
    background: rgba(255,255,255,0.72);
    box-shadow: 0 20px 55px rgba(23,39,29,0.05);
    transition:
      transform 260ms ease,
      box-shadow 260ms ease,
      border-color 260ms ease;
  }

  .funding-card:hover {
    transform: translateY(-8px);
    border-color: rgba(213,189,135,0.55);
    box-shadow: 0 30px 70px rgba(23,39,29,0.11);
  }

  .funding-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 15px;
  }

  .funding-provider {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .funding-provider-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 39px;
    height: 39px;
    border-radius: 12px;
    color: var(--green);
    background: rgba(36,61,45,0.07);
  }

  .funding-provider strong {
    display: block;
    color: var(--green);
    font-size: 11px;
  }

  .funding-provider span {
    display: block;
    margin-top: 3px;
    color: #8d958f;
    font-size: 9px;
  }

  .funding-fit {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    border-radius: 8px;
    color: #52755d;
    background: rgba(82,117,93,0.08);
    font-size: 9px;
    font-weight: 800;
  }

  .funding-card h3 {
    margin: 28px 0 9px;
    color: var(--green);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 21px;
    line-height: 1.15;
    letter-spacing: -0.035em;
  }

  .funding-card-description {
    margin: 0;
    color: var(--muted);
    font-size: 11px;
    line-height: 1.65;
  }

  .funding-meta {
    display: grid;
    gap: 9px;
    margin-top: 22px;
  }

  .funding-meta-row {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #737c75;
    font-size: 9px;
  }

  .funding-meta-row svg {
    color: #8e9e91;
  }

  .funding-reason {
    margin-top: auto;
    padding-top: 18px;
    color: var(--green);
    font-size: 10px;
    font-weight: 700;
  }

  .funding-reason span {
    color: var(--muted);
    font-weight: 500;
  }

  .funding-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 17px;
    padding-top: 14px;
    border-top: 1px solid var(--line);
  }

  .funding-more {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: var(--green);
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
  }

  .funding-more:hover {
    text-decoration: underline;
  }

  .funding-info {
    margin-top: 35px;
    padding: 17px 20px;
    border: 1px solid rgba(213,189,135,0.28);
    border-radius: 15px;
    background: rgba(213,189,135,0.07);
    color: #756b56;
    font-size: 10px;
    line-height: 1.6;
  }

  .funding-info strong {
    color: var(--green);
  }

  .funding-reveal {
    opacity: 0;
    transform: translateY(35px);
    transition:
      opacity 800ms ease,
      transform 800ms cubic-bezier(0.2,0.8,0.2,1);
  }

  .funding-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .funding-card:nth-child(2) {
    transition-delay: 100ms;
  }

  .funding-card:nth-child(3) {
    transition-delay: 200ms;
  }

  @media (max-width: 900px) {
    .funding-heading {
      align-items: flex-start;
      flex-direction: column;
    }

    .funding-cards {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .finedai-funding {
      padding: 85px 18px;
    }

    .funding-search {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .funding-reveal,
    .funding-card {
      transition: none;
    }
  }

  /* Glass + glow treatment and scroll motion */
  .finedai-funding {
    position: relative; isolation: isolate; overflow: hidden;
    background: radial-gradient(ellipse at 8% 12%, rgba(213,189,135,.16), transparent 34%), radial-gradient(ellipse at 92% 78%, rgba(82,117,93,.12), transparent 38%), var(--cream);
  }
  .finedai-funding::before, .finedai-funding::after {
    position:absolute; z-index:-1; width:390px; height:390px; border-radius:50%; content:'';
    filter:blur(82px); opacity:.3; pointer-events:none; animation:funding-aura 8s ease-in-out infinite alternate;
  }
  .finedai-funding::before { top:-170px; left:-190px; background:rgba(213,189,135,.72); }
  .finedai-funding::after { right:-190px; bottom:-170px; background:rgba(82,117,93,.46); animation-delay:-4s; }
  @keyframes funding-aura { from {transform:translate3d(0,0,0) scale(.86)} to {transform:translate3d(34px,-26px,0) scale(1.12)} }
  .funding-inner { position:relative; }
  .funding-eyebrow span { box-shadow:0 0 13px rgba(213,189,135,.9); }
  .funding-search {
    border-color:rgba(255,255,255,.82); border-radius:14px;
    background:linear-gradient(145deg,rgba(255,255,255,.78),rgba(255,255,255,.46));
    box-shadow:0 12px 30px rgba(23,39,29,.07),inset 0 1px rgba(255,255,255,.9);
    backdrop-filter:blur(18px) saturate(135%); -webkit-backdrop-filter:blur(18px) saturate(135%);
    transition:transform 350ms ease,box-shadow 350ms ease,border-color 350ms ease;
  }
  .funding-search:hover { transform:translateY(-5px) scale(1.025); border-color:rgba(213,189,135,.7); box-shadow:0 20px 42px rgba(23,39,29,.12),0 0 26px rgba(213,189,135,.2); }
  .funding-card {
    overflow:hidden; border-color:rgba(255,255,255,.82); border-radius:23px;
    background:linear-gradient(145deg,rgba(255,255,255,.82),rgba(255,255,255,.53));
    box-shadow:0 22px 58px rgba(23,39,29,.08),inset 0 1px rgba(255,255,255,.94);
    backdrop-filter:blur(22px) saturate(140%); -webkit-backdrop-filter:blur(22px) saturate(140%);
    transition:opacity 900ms ease,filter 900ms ease,transform 500ms cubic-bezier(.16,1,.3,1),box-shadow 420ms ease,border-color 420ms ease;
  }
  .funding-card::before {
    position:absolute; z-index:0; inset:0; border-radius:inherit;
    background:linear-gradient(115deg,transparent 20%,rgba(255,255,255,.62) 48%,transparent 72%);
    content:''; opacity:0; transform:translateX(-120%); pointer-events:none;
  }
  .funding-card:hover::before { opacity:1; transform:translateX(120%); transition:transform 850ms ease,opacity 150ms ease; }
  .funding-card:hover, .funding-card.funding-reveal.visible:hover {
    z-index:2; transform:translateY(-14px) scale(1.035); border-color:rgba(213,189,135,.85);
    box-shadow:0 38px 82px rgba(23,39,29,.17),0 0 40px rgba(213,189,135,.27),inset 0 1px rgba(255,255,255,.98);
  }
  .funding-provider-icon { box-shadow:inset 0 0 0 1px rgba(36,61,45,.04),0 0 20px rgba(82,117,93,.1); transition:transform 350ms ease,box-shadow 350ms ease; }
  .funding-card:hover .funding-provider-icon { transform:rotate(-8deg) scale(1.12); box-shadow:inset 0 0 0 1px rgba(36,61,45,.07),0 0 26px rgba(213,189,135,.3); }
  .funding-fit { box-shadow:0 0 18px rgba(82,117,93,.12); transition:transform 280ms ease,box-shadow 280ms ease; }
  .funding-card:hover .funding-fit { transform:translateY(-2px); box-shadow:0 0 24px rgba(82,117,93,.24); }
  .funding-info {
    border-color:rgba(213,189,135,.42); border-radius:17px;
    background:linear-gradient(145deg,rgba(255,255,255,.64),rgba(213,189,135,.09));
    box-shadow:0 14px 35px rgba(23,39,29,.06),inset 0 1px rgba(255,255,255,.85); backdrop-filter:blur(16px);
  }
  .funding-detail-reveal { animation:funding-detail-in 420ms cubic-bezier(.16,1,.3,1) both; }
  @keyframes funding-detail-in { from {opacity:0;transform:translateY(12px) scale(.98);filter:blur(6px)} to {opacity:1;transform:translateY(0) scale(1);filter:blur(0)} }
  .funding-reveal {
    opacity:0; filter:blur(13px); transform:translateY(54px) scale(.95);
    transition:opacity 900ms ease,filter 900ms ease,transform 900ms cubic-bezier(.16,1,.3,1);
    will-change:opacity,transform,filter;
  }
  .funding-reveal.visible { opacity:1; filter:blur(0); transform:translateY(0) scale(1); }
  .funding-heading.funding-reveal.visible { transition-delay:40ms; }
  .funding-card:nth-child(2).funding-reveal.visible { transition-delay:110ms; }
  .funding-card:nth-child(3).funding-reveal.visible { transition-delay:220ms; }
  .funding-card:nth-child(2).funding-reveal:not(.visible), .funding-card:nth-child(3).funding-reveal:not(.visible) { transition-delay:0ms; }
  .funding-more { border:0; padding:0; background:transparent; transition:color 220ms ease,transform 220ms ease; }
  .funding-more:hover { color:#52755d; transform:translateX(3px); text-decoration:none; }
  .funding-more:focus-visible { outline:3px solid rgba(213,189,135,.8); outline-offset:4px; border-radius:4px; }
  .funding-card:focus-within { border-color:rgba(213,189,135,.8); box-shadow:0 0 0 3px rgba(213,189,135,.2),0 28px 65px rgba(23,39,29,.1); }
  @media (prefers-reduced-motion: reduce) {
    .finedai-funding::before,.finedai-funding::after { animation:none; }
    .funding-reveal { opacity:1; filter:none; transform:none; transition:none; will-change:auto; }
    .funding-card,.funding-search,.funding-provider-icon,.funding-fit,.funding-more,.funding-detail-reveal { transition:none; animation:none; }
    .funding-card:hover,.funding-card.funding-reveal.visible:hover,.funding-search:hover,.funding-card:hover .funding-provider-icon,.funding-card:hover .funding-fit,.funding-more:hover { transform:none; }
  }
`;

const opportunities = [
  {
    provider: 'Education funding',
    title: 'HEF / Student Support',
    fit: '94%',
    description:
      'A funding pathway students may explore depending on their programme, eligibility and current requirements.',
    deadline: 'Check official deadline',
    type: 'Education support',
    icon: Landmark,
    reason: 'Profile and financial need may be relevant.',
  },
  {
    provider: 'University support',
    title: 'University Bursary',
    fit: '87%',
    description:
      'Institution-specific support that may assist students experiencing demonstrated financial pressure.',
    deadline: 'Varies by institution',
    type: 'Bursary',
    icon: GraduationCap,
    reason: 'Education costs are a strong matching factor.',
  },
  {
    provider: 'Scholarship programme',
    title: 'Merit & Need Scholarship',
    fit: '81%',
    description:
      'Illustrative scholarship opportunity combining academic and financial-need considerations.',
    deadline: 'Programme dependent',
    type: 'Scholarship',
    icon: BadgeCheck,
    reason: 'Academic profile and need may both matter.',
  },
];

export default function FundingMatcherPreview() {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return undefined;
    const targets = section.querySelectorAll('.funding-reveal');
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
        id="opportunities"
        className="finedai-funding"
      >
        <div className="funding-inner">
          <div
            className="funding-heading funding-reveal"
          >
            <div className="funding-title">
              <div className="funding-eyebrow">
                <span />
                Funding opportunities
              </div>

              <h2>
                Don't just search.
                <br />
                Understand the fit.
              </h2>

              <p>
                FinEdAI is designed to help students discover potential
                bursaries, scholarships, grants and other funding
                pathways while explaining why an opportunity may be worth
                investigating.
              </p>
            </div>

            <div className="funding-search">
              <Search size={15} />
              Searching relevant opportunities
            </div>
          </div>

          <div className="funding-cards">
            {opportunities.map((item, index) => {
              const Icon = item.icon;
              const isExpanded = expanded === index;

              return (
                <article
                  key={item.title}
                  className="funding-card funding-reveal"
                >
                  <div className="funding-card-top">
                    <div className="funding-provider">
                      <div className="funding-provider-icon">
                        <Icon size={18} />
                      </div>

                      <div>
                        <strong>{item.provider}</strong>
                        <span>Illustrative opportunity</span>
                      </div>
                    </div>

                    <div className="funding-fit">
                      <Sparkles size={10} />
                      {item.fit} fit
                    </div>
                  </div>

                  <h3>{item.title}</h3>

                  <p className="funding-card-description">
                    {item.description}
                  </p>

                  <div className="funding-meta">
                    <div className="funding-meta-row">
                      <CalendarDays size={13} />
                      {item.deadline}
                    </div>

                    <div className="funding-meta-row">
                      <BadgeCheck size={13} />
                      {item.type}
                    </div>
                  </div>

                  <div className="funding-reason">
                    Why it may fit:{' '}
                    <span>{item.reason}</span>
                  </div>

                  <div className="funding-card-footer">
                    <button
                      type="button"
                      className="funding-more"
                      onClick={() =>
                        setExpanded(isExpanded ? null : index)
                      }
                    >
                      {isExpanded ? 'Hide details' : 'Why this may fit'}
                      <ChevronDown
                        size={12}
                        style={{
                          transform: isExpanded
                            ? 'rotate(180deg)'
                            : 'rotate(0)',
                          transition: 'transform 180ms ease',
                        }}
                      />
                    </button>

                    <ExternalLink size={13} color="#89928b" />
                  </div>

                  {isExpanded && (
                    <div className="funding-info funding-detail-reveal">
                      FinEdAI would ultimately connect this type of card
                      to a verified source, eligibility information,
                      requirements and a last-checked date. Students
                      should always confirm details with the official
                      funding provider.
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="funding-info funding-reveal">
            <strong>Important:</strong> opportunity matches are
            recommendations, not guarantees of eligibility or funding.
            Official requirements, deadlines and decisions belong to the
            respective funding organisation.
          </div>
        </div>
      </section>
    </>
  );
}