import { createContext, useContext } from "react";

export type Theme = "neon" | "obsidian" | "white";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "neon",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}
