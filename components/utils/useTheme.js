"use client";

import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    const current = root.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const newTheme = root.dataset.theme === "dark" ? "dark" : "light";
          setTheme(newTheme);
        }
      });
    });

    observer.observe(root, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return theme;
}
