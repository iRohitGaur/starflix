import React from "react";
import { useState, useEffect } from "react";
import { NotoV1Owl, NotoChicken } from "../../assets/Icons";

const preferDarkQuery = "(prefers-color-scheme: dark)";

function DarkModeButton() {
  // RG: PERF: lazy state initialization
  // RG: Check if user has a prefered mode set in localStorage.
  // If not then check for system preference match and provide the mode
  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem("sui-mode") ??
      (window.matchMedia(preferDarkQuery).matches ? "dark" : "light")
  );

  // RG: Every time the "theme" changes, update the document and localStorage
  useEffect(() => {
    document.documentElement.setAttribute("sui-mode", theme);
    localStorage.setItem("sui-mode", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return (
    <button
      title={theme === "light" ? "dark mode" : "light mode"}
      className="btn_icon_fa"
      onClick={toggleTheme}
    >
      {theme === "light" && <NotoV1Owl />}
      {theme === "dark" && <NotoChicken />}
    </button>
  );
}

export default DarkModeButton;
