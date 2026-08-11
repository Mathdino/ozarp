"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Logo from "../Logo/Logo";

// Real contact info — kept in sync with what's already in `SiteFooter`.
// If any of these change, update them in both places.
const EMAIL = "abdelruhamanelfekky@gmail.com";
const WHATSAPP_URL = "https://wa.me/201080620024";

const ArrowUpRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const Contact = () => {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const emailRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const eyebrowChars = eyebrowRef.current?.querySelectorAll(".ct-char") ?? [];
      const headlineChars = headlineRef.current?.querySelectorAll(".ct-char") ?? [];

      // Mirror the slogan/Subscribe character-reveal so the contact section
      // feels like part of the same family of scroll moments.
      gsap.from(eyebrowChars, {
        opacity: 0,
        y: 40,
        duration: 1.0,
        stagger: { amount: 0.4, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: eyebrowRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 120,
        scale: 0.9,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from([emailRef.current, ctaRef.current], {
        autoAlpha: 0,
        y: 50,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: emailRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const splitChars = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="ct-char" style={{ display: "inline-block" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section id="contact-section" ref={sectionRef}>
      <div id="ct-eyebrow" ref={eyebrowRef}>
        {splitChars("O mundo inteiro no seu bolso")}
      </div>

      <div id="ct-headline" ref={headlineRef}>
        <Logo alt="Ozarp logo" />
      </div>

      <a id="ct-email" href="#" ref={emailRef} aria-label="Download Nova">
        Download gratuito · Sem mensalidades
      </a>

      <div id="ct-actions" ref={ctaRef}>
        <a id="ct-btn" href="#">
          <span>APP STORE</span>
          <ArrowUpRight />
        </a>
        <a id="ct-btn-secondary" href="#">
          <span>GOOGLE PLAY</span>
          <ArrowUpRight />
        </a>
      </div>
    </section>
  );
};

export default Contact;
