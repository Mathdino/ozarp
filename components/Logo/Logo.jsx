"use client";

import React from "react";
import useTheme from "../utils/useTheme";

const Logo = ({ className = "", alt = "Ozarp logo", ...props }) => {
  const theme = useTheme();
  const src = theme === "dark" ? "/logo-dark.png" : "/logo.png";

  return <img src={src} alt={alt} className={className} {...props} />;
};

export default Logo;
