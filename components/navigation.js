// Single source of truth for in-page navigation.
//
// Every target here maps to a section that actually exists on the home page,
// so no link is ever a dead end. Keeping the list in one module stops the
// navbar, the dropdown menu and the footer from drifting apart as sections
// get added or renamed.
//
// `target: "top"` is a sentinel for "scroll to the very top of the document"
// (the hero owns the first viewport and needs no anchor of its own).
export const NAV_ITEMS = [
  { label: "Início", target: "top" },
  { label: "Benefícios", target: "about" },
  { label: "Investimentos", target: "projects-section" },
  { label: "App", target: "app-section" },
  { label: "Cartão", target: "card-section" },
];

// The navbar shows every entry; the footer adds the contact section, which
// the header reaches through its "Criar Conta" button instead.
export const FOOTER_NAV_ITEMS = [
  ...NAV_ITEMS.filter((item) => item.target !== "top"),
  { label: "Contato", target: "contact-section" },
];

// Smooth-scroll to an in-page section. Uses the global Lenis instance exposed
// by SmoothScroll (window.__lenis) so nav clicks feel identical to any other
// scroll on the site, and falls back to native scrollIntoView when Lenis
// isn't ready yet (e.g. during hydration).
export const scrollToSection = (id) => {
  if (typeof window === "undefined") return;
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target == null) return;

  const lenis = window.__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    return;
  }
  if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// `href` for an item — real anchors keep the links crawlable and let the user
// open them in a new tab, while the click handler does the smooth scroll.
export const hrefFor = (target) => (target === "top" ? "#" : `#${target}`);
