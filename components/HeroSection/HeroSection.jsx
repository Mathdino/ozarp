"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Small circular country flags for the eyebrow badge. Inline SVG instead of
// emoji flags because Windows/Chrome renders 🇧🇷-style emoji as bare letter
// pairs, which would break the badge on a large share of visitors.
const FlagBR = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#009B3A" />
    <path d="M12 4.2 20.4 12 12 19.8 3.6 12z" fill="#FEDF00" />
    <circle cx="12" cy="12" r="3.4" fill="#002776" />
  </svg>
);

const FlagUS = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#F7F7F7" />
    <path d="M0 4h24v2.6H0zM0 9.4h24V12H0zM0 14.8h24v2.6H0zM0 20.2h24v2.6H0z" fill="#B22234" />
    <path d="M0 4h11v9.4H0z" fill="#3C3B6E" />
  </svg>
);

const FlagEU = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#003399" />
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      return (
        <circle
          key={i}
          cx={12 + Math.sin(angle) * 5.6}
          cy={12 - Math.cos(angle) * 5.6}
          r="1.15"
          fill="#FFCC00"
        />
      );
    })}
  </svg>
);

const FlagGB = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#012169" />
    <path d="M0 12h24M12 0v24" stroke="#FFF" strokeWidth="7" />
    <path d="M0 12h24M12 0v24" stroke="#C8102E" strokeWidth="4" />
  </svg>
);

const FLAGS = [FlagBR, FlagUS, FlagEU, FlagGB];

// Same Lenis-aware smooth scroll the navbar uses, so the hero CTAs glide to
// their section instead of hard-jumping past the smooth-scroll engine.
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

const HeroSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const asideRef = useRef(null);
  const loaderRef = useRef(null);
  const loaderCounterRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    document.body.style.overflow = "hidden";

    const titleLines = titleRef.current
      ? titleRef.current.querySelectorAll(".hero-line__inner")
      : [];
    const asideItems = asideRef.current ? asideRef.current.querySelectorAll(".hero-reveal") : [];

    // Initial state — everything is staged off-screen before the loader lifts.
    gsap.set(bgRef.current, { scale: 1.14 });
    // 130 rather than 115: `.hero-line` is padded at the bottom to give
    // descenders room, so the line has to travel further to start fully
    // hidden below its clipping window.
    gsap.set(titleLines, { yPercent: 130 });
    gsap.set([badgeRef.current, ...asideItems], { autoAlpha: 0, y: 28 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });

    const counter = { value: 0 };

    // Loader counter: 0 → 100
    tl.to(
      counter,
      {
        value: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          if (loaderCounterRef.current) {
            loaderCounterRef.current.innerText = `${Math.floor(counter.value)}`;
          }
        },
      },
      "anim",
    );

    tl.to(
      loaderCounterRef.current,
      { autoAlpha: 0, duration: 0.6, ease: "power2.out" },
      "anim+=1.6",
    );

    tl.to(loaderRef.current, { y: "-100%", duration: 1.3, ease: "power3.inOut" }, "anim+=1.8");

    // The photo settles out of its slight zoom as the loader clears — the
    // whole hero feels like one continuous camera move.
    tl.to(bgRef.current, { scale: 1, duration: 2.2, ease: "power2.out" }, "anim+=2.0");

    tl.to(
      badgeRef.current,
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "anim+=2.35",
    );

    tl.to(
      titleLines,
      { yPercent: 0, duration: 1.1, stagger: 0.1, ease: "power4.out" },
      "anim+=2.45",
    );

    tl.to(
      asideItems,
      { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09, ease: "power3.out" },
      "anim+=2.7",
    );

    // Gentle parallax: the photo drifts slower than the page as the user
    // scrolls away from the hero.
    const parallax = gsap.to(bgRef.current, {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tl.kill();
      if (parallax.scrollTrigger) parallax.scrollTrigger.kill();
      parallax.kill();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Loader */}
      <div id="loader" ref={loaderRef}>
        <div id="loader-counter" ref={loaderCounterRef}>
          0
        </div>
      </div>

      {/* Hero — full-bleed photograph with the copy laid over it */}
      <section id="hero-section" ref={sectionRef}>
        <div id="hero-media">
          <img
            id="hero-bg"
            ref={bgRef}
            src="/banner.png"
            alt="Cliente sorrindo ao ar livre segurando o cartão"
            draggable="false"
          />
          {/* Scrim keeps the white type legible over the bright photo */}
          <div id="hero-scrim" aria-hidden="true" />
        </div>

        <div id="hero-content">
          <div id="hero-badge" ref={badgeRef}>
            <span className="hero-badge__flags" aria-hidden="true">
              {FLAGS.map((Flag, i) => (
                <span className="hero-badge__flag" key={i}>
                  <Flag />
                </span>
              ))}
            </span>
            <span className="hero-badge__text">Seu dinheiro sem fronteiras</span>
          </div>

          <div id="hero-grid">
            <h1 id="hero-title" ref={titleRef}>
              <span className="hero-line">
                <span className="hero-line__inner">Viaje, invista</span>
              </span>
              <span className="hero-line">
                <span className="hero-line__inner">e viva global</span>
              </span>
            </h1>

            <div id="hero-aside" ref={asideRef}>
              <p className="hero-reveal" id="hero-lede">
                A conta global da nova geração. Compre moedas, invista lá fora e use seu dinheiro em
                qualquer lugar do mundo.
              </p>
              <div className="hero-reveal" id="hero-actions">
                <a
                  href="#contact-section"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact-section");
                  }}
                  className="hero-btn hero-btn--primary"
                >
                  Começar agora
                </a>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("about");
                  }}
                  className="hero-btn hero-btn--ghost"
                >
                  Saiba Mais
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
