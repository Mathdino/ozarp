import { useSpring, a } from "@react-spring/web";
import React, { useEffect, useRef, useState } from "react";

import { NAV_ITEMS, scrollToSection, hrefFor } from "../navigation";

const Menu = ({ open, onOutsideClick, onClose }) => {
  const ref = useRef();
  const handleChildClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onOutsideClick(event);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleChildClick);
    return () => {
      document.removeEventListener("click", handleChildClick);
    };
  }, []);

  const [contents, contentsApi] = useSpring(() => ({
    from: { y: 100, opacity: 0, transform: "rotate(20deg)" },
  }));

  const [news, newsApi] = useSpring(() => ({
    from: { y: 100, opacity: 0, transform: "rotate(-20deg)" },
  }));
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    if (open == false) {
      setTimeout(() => {
        setHidden(false);
      }, 500);
    } else {
      setHidden(true);
    }

    contentsApi.start({
      y: open ? 0 : 100,
      opacity: open ? 1 : 0,
      transform: open ? `rotate(0deg)` : `rotate(20deg)`,
    });

    newsApi.start({
      y: open ? 0 : 100,
      opacity: open ? 1 : 0,
      transform: open ? `rotate(0deg)` : `rotate(-20deg)`,
    });
  }, [open]);

  // The site is single-page, so these never navigate — they smooth scroll to
  // the matching section through Lenis. Labels and targets come from the
  // shared nav config, so the menu can't drift out of sync with the header
  // or the footer.
  const handleNavClick = (e, target) => {
    e.preventDefault();
    scrollToSection(target);
    if (typeof onClose === "function") onClose();
  };

  return (
    <>
      {hidden && (
        <div className="absolute top-[4rem] right-0 w-[20rem] " ref={ref}>
          {/* Site navigation — smooth scroll, never redirect */}
          <a.div
            className="rounded-xl bg-bg-alt text-fg flex flex-col font-Aeonik text-3xl p-8"
            style={contents}
          >
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.target}
                href={hrefFor(item.target)}
                onClick={(e) => handleNavClick(e, item.target)}
                className={`menu-link ${
                  i === 0 ? "pb-3" : i === NAV_ITEMS.length - 1 ? "pt-3" : "py-3"
                }`}
              >
                <span>{item.label}</span>
                <span className="menu-link__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </a.div>

          {/* Get in touch — mirrors what the contact section offers. */}
          <a.div className="rounded-xl bg-bg-alt text-fg flex flex-col p-8 my-2" style={news}>
            <div className="font-Aeonik text-3xl leading-tight">
              Pronto pra
              <br />
              começar?
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <a
                href="#contact-section"
                onClick={(e) => handleNavClick(e, "contact-section")}
                className="flex items-center justify-between bg-fg text-bg rounded-xl px-4 py-3 text-sm tracking-widest font-semibold transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span>ABRIR CONTA</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href="#card-section"
                onClick={(e) => handleNavClick(e, "card-section")}
                className="flex items-center justify-between border-2 border-fg text-fg rounded-xl px-4 py-3 text-sm tracking-widest font-semibold transition-colors duration-200 hover:bg-accent-soft"
              >
                <span>VER O CARTÃO</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </a.div>
        </div>
      )}
    </>
  );
};

export default Menu;
