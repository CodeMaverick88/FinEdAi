import React from 'react';

import Hero from '../components/Hero';

import HowItWorksPreview from '../FinEdAi/HowItWorksPreview';
import EvidenceIntelligence from '../FinEdAi/EvidenceIntelligence';
import HardshipInsights from '../FinEdAi/HardshipInsights';
import AppealCoachPreview from '../FinEdAi/AppealCoachPreview';
import FundingMatcherPreview from '../FinEdAi/FundingMatcherPreview';
import SafetyTrust from '../FinEdAi/SafetyTrust';

export default function Home() {
  return (
    <main className="finedai-home">
      <Hero />

      <HowItWorksPreview />

      <EvidenceIntelligence />

      <HardshipInsights />

      <AppealCoachPreview />

      <FundingMatcherPreview />

      <SafetyTrust />

      <section
        id="start"
        className="finedai-final-cta"
      >
        <div className="finedai-final-cta-inner">
          <span className="finedai-final-cta-eyebrow">
            FINEDAI STUDENT SUPPORT
          </span>

          <h2>
            Your financial situation
            <br />
            deserves to be understood.
          </h2>

          <p>
            Start with your story, organise your evidence and take a
            clearer next step toward finding education funding support.
          </p>

          <a
            href="/demo"
            className="finedai-final-cta-button"
          >
            Start the FinEdAI demo
            <span>→</span>
          </a>
        </div>
      </section>

      <style>{`
        .finedai-home {
          width: 100%;
          min-height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .finedai-final-cta {
          position: relative;
          width: 100%;
          padding: 125px 24px;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 80% 20%,
              rgba(213, 189, 135, 0.13),
              transparent 28%
            ),
            #243d2d;
          color: #ffffff;
        }

        .finedai-final-cta::before {
          position: absolute;
          width: 500px;
          height: 500px;
          right: -240px;
          bottom: -260px;
          border: 1px solid rgba(213, 189, 135, 0.16);
          border-radius: 50%;
          content: '';
        }

        .finedai-final-cta::after {
          position: absolute;
          width: 360px;
          height: 360px;
          right: -170px;
          bottom: -190px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 50%;
          content: '';
        }

        .finedai-final-cta-inner {
          position: relative;
          z-index: 2;
          width: min(900px, 100%);
          margin: 0 auto;
          text-align: center;
        }

        .finedai-final-cta-eyebrow {
          display: inline-block;
          margin-bottom: 22px;
          color: #d5bd87;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.18em;
        }

        .finedai-final-cta h2 {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(38px, 6vw, 72px);
          line-height: 0.98;
          letter-spacing: -0.06em;
        }

        .finedai-final-cta p {
          max-width: 600px;
          margin: 25px auto 32px;
          color: rgba(255, 255, 255, 0.68);
          font-size: 15px;
          line-height: 1.75;
        }

        .finedai-final-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 13px;
          min-height: 50px;
          padding: 0 20px;
          border: 1px solid rgba(213, 189, 135, 0.5);
          border-radius: 12px;
          color: #17271d;
          background: #d5bd87;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 12px 30px rgba(0,0,0,0.14);
          transition:
            transform 220ms ease,
            box-shadow 220ms ease;
        }

        .finedai-final-cta-button:hover {
          transform: translateY(-4px);
          box-shadow:
            0 18px 38px rgba(0,0,0,0.2),
            0 0 25px rgba(213,189,135,0.12);
        }

        .finedai-final-cta-button span {
          font-size: 17px;
          transition: transform 220ms ease;
        }

        .finedai-final-cta-button:hover span {
          transform: translateX(4px);
        }

        @media (max-width: 600px) {
          .finedai-final-cta {
            padding: 90px 18px;
          }

          .finedai-final-cta-button {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .finedai-final-cta-button,
          .finedai-final-cta-button span {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}