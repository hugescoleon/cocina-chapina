"use client";

import { useEffect } from "react";
import { getSettings } from "@/lib/settingsStore";

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const applyTheme = (theme) => {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else if (theme === "light") {
        root.classList.remove("dark");
      } else {
        // system
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.toggle("dark", prefersDark);
      }
    };

    const settings = getSettings();
    applyTheme(settings.theme);

    // Listen for system preference changes (only relevant when theme=system)
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      const currentSettings = getSettings();
      if (currentSettings.theme === "system") {
        applyTheme("system");
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);

    // Listen for storage changes (theme changed in settings page)
    const handleStorage = () => {
      const updatedSettings = getSettings();
      applyTheme(updatedSettings.theme);
    };
    window.addEventListener("storage", handleStorage);
    // Also listen for custom event from within the same tab
    window.addEventListener("themeChange", handleStorage);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("themeChange", handleStorage);
    };
  }, []);

  return <>{children}</>;
}
