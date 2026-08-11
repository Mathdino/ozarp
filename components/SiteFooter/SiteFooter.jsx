"use client";

import React from "react";

import Logo from "../Logo/Logo";

import { FOOTER_NAV_ITEMS, scrollToSection, hrefFor } from "../navigation";

const Icon = ({ children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const InstagramIcon = () => (
  <Icon>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </Icon>
);

const TikTokIcon = () => (
  <Icon>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </Icon>
);

const YoutubeIcon = () => (
  <Icon>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </Icon>
);

const LinkedinIcon = () => (
  <Icon>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </Icon>
);

const MailIcon = () => (
  <Icon>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Icon>
);

const SOCIALS = [
  { href: "https://www.instagram.com/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.tiktok.com/", label: "TikTok", Icon: TikTokIcon },
  { href: "https://www.youtube.com/", label: "YouTube", Icon: YoutubeIcon },
  { href: "https://www.linkedin.com/", label: "LinkedIn", Icon: LinkedinIcon },
];

const SUPPORT_LINKS = [
  { label: "Central de ajuda", href: "#" },
  { label: "Baixar para iOS", href: "#" },
  { label: "Baixar para Android", href: "#" },
  { label: "Segurança", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Termos de uso", href: "#" },
  { label: "Privacidade", href: "#" },
  { label: "Tarifas", href: "#" },
];

const EMAIL = "contato@ozarp.com.br";

const SiteFooter = () => {
  const handleNavClick = (e, target) => {
    e.preventDefault();
    scrollToSection(target);
  };

  return (
    <footer id="main-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a
            href="#"
            aria-label="Início"
            className="f-logo"
            onClick={(e) => handleNavClick(e, "top")}
          >
            <Logo alt="Ozarp" className="f-logo__img" />
          </a>

          <p className="f-desc">
            A conta global da nova geração.
            <br />
            Seu dinheiro sem fronteiras.
          </p>

          <a className="f-mail" href={`mailto:${EMAIL}`}>
            <MailIcon />
            <span>{EMAIL}</span>
          </a>

          <div className="f-socials">
            {SOCIALS.map(({ href, label, Icon: SocialIcon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <SocialIcon />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-links">
          <div className="f-col">
            <h3>Navegue</h3>
            {FOOTER_NAV_ITEMS.map((item) => (
              <a
                key={item.target}
                href={hrefFor(item.target)}
                onClick={(e) => handleNavClick(e, item.target)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="f-col">
            <h3>Suporte</h3>
            {SUPPORT_LINKS.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="f-col">
            <h3>Termos</h3>
            {LEGAL_LINKS.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Ozarp. Todos os direitos reservados.</p>
        <p>A Ozarp é uma instituição de pagamento, não é um banco.</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
