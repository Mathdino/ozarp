import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Epilogue — display face for the section headlines. Self-hosted from the
// variable woff2, so a single 80KB file covers the whole 100–900 range
// instead of one request per weight.
const epilogue = localFont({
  src: "../public/fonts/Epilogue-Variable.woff2",
  variable: "--font-epilogue",
  weight: "100 900",
  style: "normal",
  display: "swap",
});

// Poppins is the body typeface: everything that isn't a headline inherits it.
// Loading it through next/font exposes a CSS variable (`--font-poppins`) we can
// reference from any global CSS rule, while `poppins.className` applies it as
// the default font on the body so every component picks it up automatically.
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Ozarp - Conta Global",
  description: "Ozarp é um banco global que te ajuda a gerenciar seus recursos de forma eficiente.",
  icons: {
    icon: "/icon.png",
  },
};

// Tiny script that runs synchronously before the body paints. It reads the
// theme the user previously picked from localStorage and applies the
// corresponding `data-theme` attribute on the <html> element. Without this,
// the page would flash the default light theme for one frame on every reload
// when the user is using dark mode. Default is light when nothing is saved.
const themeBootstrap = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var theme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${epilogue.variable}`} data-theme="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
