import { a, useSpring } from "@react-spring/web";
import { Trail } from "./TrailText";
import React, { useEffect, useState } from "react";

const GlobeIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
  </svg>
);

const Header = () => {
  const [open, set] = useState();

  useEffect(() => {
    set(true);
  }, []);

  const [horizontal, api] = useSpring(() => ({ from: { transform: "translateX(0%)" } }));

  const horizontalCallback = (open) =>
    api.start({ transform: `translateX(${open ? "20%" : "0%"})` });
  return (
    <div className="w-full z-10 relative px-4 md:px-0 md:pl-6 text-center md:text-left">
      {/* Eyebrow badge — sits above the headline and shares its left edge.
          Kept outside <Trail> because the trail locks each child to a fixed
          140px row height, which is sized for the headline lines only. */}

      <div
        className="font-Epilogue mt-5 md:mt-7 font-semibold text-5xl sm:text-6xl md:text-[9rem] leading-[0.95] md:leading-none"
        style={{ letterSpacing: "-0.07em" }}
      >
        <Trail callback={horizontalCallback}>
          <a.div
            className="flex justify-center md:justify-start flex-wrap md:flex-nowrap"
            style={horizontal}
          >
            <div>Benefícios&nbsp;</div>
          </a.div>
          <div className="flex justify-center md:justify-start flex-wrap md:flex-nowrap">
            <div>para&nbsp;</div>
            <div>você&nbsp;</div>
          </div>
        </Trail>
      </div>
    </div>
  );
};

export default Header;
