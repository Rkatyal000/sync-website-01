import { createContext, useContext, useEffect, useState } from "react";

const ThemeCtx = createContext({ theme: "light", mode: "auto", setMode: () => {} });

function resolveTheme(mode) {
  if (mode === "auto") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return mode;
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem("sm_theme_mode") || "light");
  const [theme, setTheme] = useState(() => resolveTheme(localStorage.getItem("sm_theme_mode") || "light"));

  useEffect(() => {
    localStorage.setItem("sm_theme_mode", mode);
    setTheme(resolveTheme(mode));
  }, [mode]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (mode !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setTheme(mq.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode]);

  const cycle = () => {
    setMode((m) => (m === "light" ? "dark" : m === "dark" ? "auto" : "light"));
  };

  return (
    <ThemeCtx.Provider value={{ theme, mode, setMode, cycle }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
