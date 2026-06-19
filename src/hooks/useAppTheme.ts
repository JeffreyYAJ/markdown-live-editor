import { useCallback, useState } from "react";
import type { ThemeKey } from "../pages/landing-themes";

const STORAGE_KEY = "architect-os-theme";

function readStoredTheme(): ThemeKey {
  if (typeof window === "undefined") return "cyber-green";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (
    stored === "light-blue" ||
    stored === "cyber-green" ||
    stored === "obsidian-silver"
  ) {
    return stored;
  }
  return "cyber-green";
}

export function useAppTheme(defaultTheme?: ThemeKey) {
  const [theme, setThemeState] = useState<ThemeKey>(
    () => defaultTheme ?? readStoredTheme(),
  );

  const setTheme = useCallback((key: ThemeKey) => {
    setThemeState(key);
    localStorage.setItem(STORAGE_KEY, key);
  }, []);

  return { theme, setTheme };
}
