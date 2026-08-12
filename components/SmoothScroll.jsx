"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none), (pointer: coarse)").matches || window.innerWidth < 1024);

    // `smooth` / `smoothTouch` were Lenis v0 option names — v1 silently ignores
    // them, so the config below reads as intended but wasn't actually doing
    // anything. The v1 equivalents are `smoothWheel` and `syncTouch`.
    //
    // `syncTouch` stays off on purpose: hijacking touch means Lenis has to call
    // preventDefault() on every touchmove, which trades the phone's native
    // (and already smooth) scrolling for something that stutters and fights
    // the browser. Touch devices get native scrolling; the wheel gets Lenis.
    const lenis = new Lenis({
      duration: isTouch ? 1.0 : 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !isTouch,
      syncTouch: false,
      touchMultiplier: isTouch ? 1.5 : 0.25,
    });

    // Expose the active Lenis instance globally so other components (e.g. the
    // navbar menu) can request smooth scroll-to-section animations through
    // the same engine that's already running. Falling back to native
    // window.scrollTo would fight Lenis and feel jumpy.
    if (typeof window !== "undefined") {
      window.__lenis = lenis;
    }

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      if (typeof window !== "undefined" && window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, []);

  return children;
};

export default SmoothScroll;
