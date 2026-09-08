/**
 * useTheme.js
 * ---------------------------------------------------------------
 * Composable del tema claro/oscuro.
 *  - Estado compartido (una sola instancia a nivel de módulo).
 *  - Persistencia en localStorage.
 *  - Fallback: prefers-color-scheme del sistema.
 *  - Aplica el atributo data-theme en <html> para que los CSS
 *    tokens de style.css cambien globalmente.
 */
import { ref } from "vue";

const THEME_KEY = "portfolio-theme";

/** Lee el tema inicial: localStorage → preferencia del sistema. */
const getInitialTheme = () => {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

const theme = ref(getInitialTheme());

const applyTheme = (value) => {
  document.documentElement.setAttribute("data-theme", value);
};

// Aplica el tema lo antes posible (evita "flash" del tema incorrecto).
applyTheme(theme.value);

export const useTheme = () => {
  const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, theme.value);
    applyTheme(theme.value);
  };

  return { theme, toggleTheme };
};