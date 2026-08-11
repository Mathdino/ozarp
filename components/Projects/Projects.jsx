"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Looping staircase clip. The file isn't in the repo yet: until
// `public/video/escada.mp4` exists the panel falls back to a labelled
// placeholder, and picks the video up automatically once it's dropped in.
const VIDEO_SRC = "/video/escada.mp4";

const FEATURES = [
  {
    title: "Ações americanas",
    body: "Invista nas maiores empresas do mundo.",
  },
  {
    title: "ETFs globais",
    body: "Diversifique sua carteira globalmente.",
  },
  {
    title: "Renda fixa internacional",
    body: "Títulos do tesouro americano e bonds corporativos.",
  },
  {
    title: "Câmbio em tempo real",
    body: "Converta moedas com a cotação do mercado, sem spread escondido.",
  },
  {
    title: "Cripto integrada",
    body: "Compre e acompanhe ativos digitais.",
  },
];

// Lenis-aware smooth scroll, matching the header and hero CTAs.
const scrollToSection = (id) => {
  if (typeof window === "undefined") return;
  const target = document.getElementById(id);
  if (!target) return;
  const lenis = window.__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    return;
  }
  target.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Projects = () => {
  const sectionRef = useRef(null);
  const [videoMissing, setVideoMissing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const headline = sectionRef.current.querySelectorAll(".pj-head__line");
      const aside = sectionRef.current.querySelectorAll(".pj-aside > *");
      const panel = sectionRef.current.querySelector(".pj-panel");
      const items = sectionRef.current.querySelectorAll(".pj-feature");

      gsap.from(headline, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });

      gsap.from(aside, {
        opacity: 0,
        y: 26,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      gsap.from(panel, {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: panel, start: "top 88%", once: true },
      });

      gsap.from(items, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: panel, start: "top 72%", once: true },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects-section" ref={sectionRef}>
      <div className="pj-top">
        <h2 className="pj-headline">
          {["Tudo que você", "precisa pra mover seu", "dinheiro pelo mundo"].map((line) => (
            // Each line is its own clipping window so the reveal slides the
            // text up from behind its baseline. The padding/negative-margin
            // pair keeps descenders from being cropped by that window.
            <span className="pj-head__mask" key={line}>
              <span className="pj-head__line">{line}</span>
            </span>
          ))}
        </h2>

        <div className="pj-aside">
          <p className="pj-aside__text">
            Uma conta criada pra
            <br />
            quem vive sem fronteiras
          </p>
          <a
            href="#contact-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact-section");
            }}
            className="pj-aside__btn"
          >
            Começar agora
          </a>
        </div>
      </div>

      <div className="pj-panel">
        <div className="pj-panel__content">
          <h3 className="pj-panel__title">Investimentos Globais</h3>
          <p className="pj-panel__subtitle">Seu dinheiro em movimento além do Brasil.</p>

          <ul className="pj-features">
            {FEATURES.map((feature) => (
              <li className="pj-feature" key={feature.title}>
                <h4 className="pj-feature__title">{feature.title}</h4>
                <p className="pj-feature__body">{feature.body}</p>
              </li>
            ))}
          </ul>

          <a
            href="#contact-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact-section");
            }}
            className="pj-panel__link"
          >
            Conhecer investimentos
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className={`pj-panel__media${videoMissing ? " pj-panel__media--empty" : ""}`}>
          {videoMissing ? (
            <span className="pj-panel__placeholder">Vídeo em breve</span>
          ) : (
            <video
              className="pj-panel__video"
              src={VIDEO_SRC}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              onError={() => setVideoMissing(true)}
            />
          )}
          {/* Feathers the clip's left edge into the panel so there's no hard
              seam between the video and the copy. */}
          <span className="pj-panel__fade" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default Projects;
