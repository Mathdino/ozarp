"use client";

import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

// `wide` cards span two of the three grid columns, producing the alternating
// 2/3 + 1/3 → 1/3 + 2/3 rhythm from the reference layout.
//
// The "Spread Baixo" artwork hasn't been supplied yet: the card renders a
// labelled placeholder until `/card/spread-baixo.png` exists, and picks the
// real image up automatically the moment the file is dropped in.
const BENEFITS = [
  {
    title: "Cartão Global",
    body: "Use em qualquer país sem IOF abusivo, com cartão físico e virtual direto no app.",
    image: "/card/cartao-global.png",
    wide: true,
  },
  {
    title: "Indique Amigos",
    body: "Cada amigo que entra com você rende recompensas reais, não migalhas.",
    image: "/card/indique-amigos.png",
  },
  {
    title: "+40 Moedas",
    body: "Dólar, euro, libra, iene e mais de 40 moedas direto pelo app, sem burocracia.",
    image: "/card/40-moedas.png",
  },
  {
    title: "Spread Baixo",
    body: "Veja a cotação real antes de confirmar. Sem taxas escondidas ou letras miúdas.",
    image: "/card/spread-baixo.png",
    wide: true,
  },
];

const BenefitCard = ({ benefit, index }) => {
  // An image that 404s (or is simply not there yet) flips the media area to
  // the placeholder treatment instead of showing a broken-image icon.
  const [missing, setMissing] = useState(false);

  return (
    <article
      className={`bn-card${benefit.wide ? " bn-card--wide" : ""}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className={`bn-card__media${missing ? " bn-card__media--empty" : ""}`}>
        {missing ? (
          <span className="bn-card__placeholder">Imagem em breve</span>
        ) : (
          <img
            src={benefit.image}
            alt={benefit.title}
            loading="lazy"
            draggable="false"
            onError={() => setMissing(true)}
          />
        )}
      </div>
      <div className="bn-card__body">
        <h3 className="bn-card__title">{benefit.title}</h3>
        <p className="bn-card__text">{benefit.body}</p>
      </div>
    </article>
  );
};

const SubHeader = () => {
  const [ref, inView] = useInView({ rootMargin: "-60px 0px", triggerOnce: true });

  return (
    <div
      className={`benefits__grid${inView ? " is-visible" : ""}`}
      ref={ref}
    >
      {BENEFITS.map((benefit, i) => (
        <BenefitCard key={benefit.title} benefit={benefit} index={i} />
      ))}
    </div>
  );
};

export default SubHeader;
