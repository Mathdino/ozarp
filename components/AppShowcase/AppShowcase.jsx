"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// App mockup shot. Same convention as the benefit cards and the investments
// clip: until `public/app-mockup.png` exists the panel shows a labelled
// placeholder and picks the real image up as soon as it's dropped in.
const IMAGE_SRC = "/app-mockup.png";

const HEADLINE = ["Seu banco global", "na palma da mão"];

const FEATURES = [
  {
    title: "Saldo em tempo real",
    body: "Acompanhe entradas e saídas no instante em que acontecem.",
  },
  {
    title: "Investimentos no mesmo app",
    body: "Renda fixa, fundos e cripto sem trocar de plataforma.",
  },
  {
    title: "Cartão digital na hora",
    body: "Gere o cartão virtual e comece a usar antes do plástico chegar.",
  },
];

const STATS = [
  { value: "R$ 1.250,00", label: "Rendimentos em 30 dias" },
  { value: "+8,75%", label: "No período" },
];

// Lenis-aware smooth scroll, matching the header, hero and projects CTAs.
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

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const [imageMissing, setImageMissing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const root = sectionRef.current;
      const lines = root.querySelectorAll(".app-head__line");
      const copy = root.querySelectorAll(".app-reveal");
      const media = root.querySelector(".app-showcase__media");

      gsap.from(lines, {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 78%", once: true },
      });

      gsap.from(copy, {
        opacity: 0,
        y: 26,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 74%", once: true },
      });

      gsap.from(media, {
        opacity: 0,
        y: 50,
        scale: 0.96,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 80%", once: true },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="app-section" ref={sectionRef}>
      <div className="app-showcase">
        <div className="app-showcase__content">
          <h2 className="app-headline">
            {HEADLINE.map((line) => (
              // One clipping window per line, with the padding / negative
              // margin pair that keeps descenders from being cropped.
              <span className="app-head__mask" key={line}>
                <span className="app-head__line">{line}</span>
              </span>
            ))}
          </h2>

          <ul className="app-features">
            {FEATURES.map((feature) => (
              <li className="app-feature app-reveal" key={feature.title}>
                <h3 className="app-feature__title">{feature.title}</h3>
                <p className="app-feature__body">{feature.body}</p>
              </li>
            ))}
          </ul>

          <div className="app-stats app-reveal">
            {STATS.map((stat) => (
              <div className="app-stat" key={stat.label}>
                <span className="app-stat__value">{stat.value}</span>
                <span className="app-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>

          <a
            href="#contact-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact-section");
            }}
            className="app-cta app-reveal"
          >
            Criar conta grátis
          </a>
        </div>

        <div className={`app-showcase__media${imageMissing ? " app-showcase__media--empty" : ""}`}>
          {imageMissing ? (
            <span className="app-showcase__placeholder">Imagem em breve</span>
          ) : (
            <img
              src={IMAGE_SRC}
              alt="App da Ozarp mostrando saldo, investimentos e cartão digital"
              loading="lazy"
              draggable="false"
              onError={() => setImageMissing(true)}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
