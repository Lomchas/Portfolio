/**
 * useI18n.js
 * ---------------------------------------------------------------
 * Internacionalización ligera (sin librerías externas).
 *  - 4 idiomas: es (default), en, pt, zh.
 *  - Persistencia en localStorage.
 *  - t('ruta.clave', {param}) con reemplazo de parámetros {x}.
 *  - levelKey(percent): clave del nivel de skill según porcentaje.
 */
import { ref } from "vue";
import es from "../i18n/locales/es";
import en from "../i18n/locales/en";
import pt from "../i18n/locales/pt";
import zh from "../i18n/locales/zh";

const LOCALE_KEY = "portfolio-locale";

export const LANGUAGES = [
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "pt", flag: "🇧🇷", label: "Português" },
  { code: "zh", flag: "🇨🇳", label: "中文" },
];

const dictionaries = { es, en, pt, zh };

const getInitialLocale = () => {
  const stored = localStorage.getItem(LOCALE_KEY);
  if (stored && dictionaries[stored]) return stored;
  return "es"; // Español por defecto.
};

const locale = ref(getInitialLocale());

/** Clave de nivel de skill según porcentaje (0-100) — exportada. */
export const levelKey = (percent) => {
  if (percent >= 90) return "levels.expert";
  if (percent >= 75) return "levels.advanced";
  if (percent >= 60) return "levels.proficient";
  if (percent >= 40) return "levels.intermediate";
  return "levels.familiar";
};

/** Busca una clave anidada "a.b.c" en el diccionario. */
const resolve = (dict, path) =>
  path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), dict);

export const useI18n = () => {
  /** Traduce una clave; fallback: español, luego la clave cruda. */
  const t = (key, params = {}) => {
    let text =
      resolve(dictionaries[locale.value], key) ??
      resolve(dictionaries.es, key) ??
      key;
    Object.entries(params).forEach(([k, v]) => {
      text = text.replaceAll(`{${k}}`, v);
    });
    return text;
  };

  /** Clave de nivel de skill según porcentaje (reutiliza la exportada). */
  const levelKeyFn = levelKey;

  const setLocale = (code) => {
    if (!dictionaries[code]) return;
    locale.value = code;
    localStorage.setItem(LOCALE_KEY, code);
  };

  return { locale, t, levelKey: levelKeyFn, setLocale, languages: LANGUAGES };
};