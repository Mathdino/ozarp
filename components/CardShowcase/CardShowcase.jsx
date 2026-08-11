"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Hand-holding-the-card shot that fills the panel. Same convention as the
// other art on the page: until `public/cartao.png` exists the panel falls
// back to its blue gradient alone, and picks the photo up once it's added.
const IMAGE_SRC = "/cartao.png";

const HEADLINE = ["Um cartão", "que parece", "do futuro"];

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" strokeLinecap="round" />
    <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
  </svg>
);

const CardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="M2.5 10h19" strokeLinecap="round" />
    <path d="M6 15h3" strokeLinecap="round" />
  </svg>
);

const LockClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3 1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path
      d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9z"
      strokeLinejoin="round"
    />
  </svg>
);

const FEATURES = [
  {
    Icon: GlobeIcon,
    title: "Global Ready",
    body: "Use seu cartão em qualquer lugar do mundo.",
  },
  {
    Icon: CardIcon,
    title: "Virtual Instantâneo",
    body: "Crie seu cartão e comece a usar em segundos.",
  },
  {
    Icon: LockClockIcon,
    title: "Controle em Tempo Real",
    body: "Bloqueie e desbloqueie direto pelo app.",
  },
  {
    Icon: StarIcon,
    title: "Design Premium",
    body: "Um cartão moderno, feito pra durar.",
  },
];

const CardShowcase = () => {
  const sectionRef = useRef(null);
  const [imageMissing, setImageMissing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const root = sectionRef.current;
      const lines = root.querySelectorAll(".cx-head__line");
      const copy = root.querySelectorAll(".cx-reveal");
      const cards = root.querySelectorAll(".cx-card");

      gsap.from(lines, {
        yPercent: 118,
        duration: 1.1,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });

      gsap.from(copy, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 74%", once: true },
      });

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 62%", once: true },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="card-section" ref={sectionRef}>
      <div className="cx-panel">
        {/* The cut-out needs to overhang the panel's top edge but stop dead at
            its bottom one. A wrapper that starts above the panel and ends
            flush with its base does exactly that: `overflow: hidden` here
            trims the wrist without touching the overhang up top. */}
        {!imageMissing && (
          <div className="cx-panel__media" aria-hidden="true">
            <img
              className="cx-panel__bg"
              src={IMAGE_SRC}
              alt="Mão segurando o cartão Ozarp contra o céu azul"
              loading="lazy"
              draggable="false"
              onError={() => setImageMissing(true)}
            />
          </div>
        )}
        {/* Wash on the left so the white type stays readable over the photo. */}
        <span className="cx-panel__wash" aria-hidden="true" />

        <div className="cx-panel__inner">
          <div className="cx-copy">
            <span className="cx-badge cx-reveal">
              <GlobeIcon />
              Seu dinheiro sem fronteiras
            </span>

            <h2 className="cx-headline">
              {HEADLINE.map((line) => (
                // One clipping window per line; the padding / negative margin
                // pair keeps descenders from being cropped by that window.
                <span className="cx-head__mask" key={line}>
                  <span className="cx-head__line">{line}</span>
                </span>
              ))}
            </h2>

            <p className="cx-lede cx-reveal">
              Físico e virtual. Sem IOF abusivo. Sem cara de banco antigo.
            </p>
          </div>

          <ul className="cx-grid">
            {FEATURES.map(({ Icon, title, body }) => (
              <li className="cx-card" key={title}>
                <span className="cx-card__icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="cx-card__title">{title}</h3>
                <p className="cx-card__body">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CardShowcase;
