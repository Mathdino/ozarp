"use client";

import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import Link from "next/link";

import MenuButton from "./MenuButton";
import ThemeButton from "./MusicButton";
import Logo from "../Logo/Logo";

import { NAV_ITEMS, scrollToSection, hrefFor } from "../navigation";

function Navbar() {
  const headerRef = useRef(null);

  const [rotate, setRotate] = useSpring(() => ({
    transform: `rotate(0deg)`,
    config: { tension: 300, friction: 20, mass: 1 },
  }));

  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Scroll animation ──────────────────────────────────────────────────
  // Two states drive the header's motion, both applied as classes so the
  // actual animation lives in CSS transitions (cheap, GPU friendly):
  //
  //   .is-scrolled — past the top of the page: the pill condenses (narrower,
  //                  tighter padding, solid background + shadow).
  //   .is-hidden   — the user is scrolling *down*: the bar slides out of view
  //                  and slides back in the moment they scroll up again.
  //
  // Lenis drives the page with native scroll under the hood, so a passive
  // window scroll listener stays perfectly in sync with the smooth scrolling.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = headerRef.current;
    if (!el) return;

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;

      el.classList.toggle("is-scrolled", y > 24);

      // Never hide the bar while the mobile menu is open, and always keep it
      // visible near the very top of the page.
      const goingDown = y > lastY;
      const shouldHide = goingDown && y > 220 && !mobileOpen;
      el.classList.toggle("is-hidden", shouldHide);

      lastY = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  // Lock body scroll while the mobile menu is open so the user doesn't
  // accidentally scroll the page behind the overlay.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    scrollToSection(target);
  };

  const handleMobileNav = (e, target) => {
    e.preventDefault();
    setMobileOpen(false);
    setRotate({ transform: "rotate(0deg)" });
    // Give the overlay a frame to close before scrolling so the user sees the
    // motion rather than a jumpy pre-scroll flash.
    setTimeout(() => scrollToSection(target), 50);
  };

  return (
    <>
      {/* ── Floating header ───────────────────────────────────────────────
          z-[100001] keeps the header (and the dropdown menu it contains) on
          top of every other layer — including the footer (z: 100000) and the
          GradualBlur overlay (z: 99999) — so the menu is always accessible
          and never clipped by another stacking context. */}
      <header id="site-header" className="site-header" ref={headerRef}>
        <div className="site-header__bar">
          <Link
            href="/"
            aria-label="Início"
            className="hd-logo"
            onClick={(e) => handleNavClick(e, "top")}
          >
            <Logo alt="Logo" className="hd-logo__img" />
          </Link>

          {/* Center navigation — desktop only */}
          <nav className="hd-nav" aria-label="Main">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.target}
                href={hrefFor(item.target)}
                onClick={(e) => handleNavClick(e, item.target)}
                className="hd-nav__link"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right-hand actions */}
          <div className="hd-actions">
            <a
              href="#contact-section"
              onClick={(e) => handleNavClick(e, "contact-section")}
              className="hd-cta"
            >
              Criar Conta
            </a>

            {/* Existing dropdown menu — same open/close animation as before */}
            <div className="hd-menu">
              <MenuButton />
            </div>

            {/* Dark / light switch — unchanged behaviour, compact styling */}
            <ThemeButton compact />

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              className="hd-burger nav_btn_sm flex items-center justify-center cursor-pointer"
              onMouseEnter={() => !mobileOpen && setRotate({ transform: "rotate(90deg)" })}
              onMouseLeave={() => !mobileOpen && setRotate({ transform: "rotate(0deg)" })}
              onClick={() => {
                const next = !mobileOpen;
                setMobileOpen(next);
                setRotate({ transform: next ? "rotate(45deg)" : "rotate(0deg)" });
              }}
            >
              <animated.div className="text-[0.55rem] leading-none" style={rotate}>
                {mobileOpen ? "✕" : "⬤ ⬤"}
              </animated.div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay — only rendered on small screens. Covers the
          viewport below the header with navigation + store buttons. */}
      <div
        className={`fixed inset-0 z-[100000] lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-bg"
          onClick={() => {
            setMobileOpen(false);
            setRotate({ transform: "rotate(0deg)" });
          }}
        />
        <div className="relative z-10 h-full w-full flex flex-col pt-28 pb-8 px-6">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.target}
                href={hrefFor(item.target)}
                onClick={(e) => handleMobileNav(e, item.target)}
                className="flex items-center justify-between py-4 border-b border-theme-border text-fg text-3xl font-semibold transition-colors duration-200 hover:text-brblue"
                style={{
                  letterSpacing: "-0.03em",
                  transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: mobileOpen ? 1 : 0,
                  transition: `transform 0.4s ease ${0.05 + i * 0.05}s, opacity 0.4s ease ${
                    0.05 + i * 0.05
                  }s, color 0.2s ease`,
                }}
              >
                <span>{item.label.toUpperCase()}</span>
                <span className="text-fg-muted text-base">0{i + 1}</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8 flex flex-col gap-3">
            <p className="text-fg-muted text-xs tracking-[0.2em] uppercase">Baixe o app</p>
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between bg-fg text-bg rounded-full px-5 py-4 text-sm tracking-[0.2em] font-semibold"
            >
              <span>APP STORE</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between border-2 border-fg text-fg rounded-full px-5 py-4 text-sm tracking-[0.2em] font-semibold"
            >
              <span>GOOGLE PLAY</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
