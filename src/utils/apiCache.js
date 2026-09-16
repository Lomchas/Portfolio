/**
 * apiCache.js
 * ---------------------------------------------------------------
 * Caché SWR (Stale-While-Revalidate) de los datos de la API en
 * localStorage.
 *
 * Problema que resuelve: el backend vive en Render free tier, que
 * tarda ~50s en "despertar" tras inactividad. Sin caché, CADA visita
 * de un usuario recurrente paga ese cold start completo.
 *
 * Estrategia SWR (la misma que usan CDNs y PWA de nivel producción):
 *  1. Al arrancar, si existe caché válida (< TTL) se hidrata el estado
 *     global AL INSTANTE (cero espera) y `loading` se apaga.
 *  2. En paralelo se refrescan los datos reales contra la API y se
 *     reescribe la caché (revalidación en background, invisible
 *     para el usuario).
 *  3. Si no hay caché (primera visita), el flujo es el clásico con
 *     spinner.
 *
 * TTL de 24h: el portafolio cambia poco (skills, proyectos); si
 * expira, simplemente se muestra el spinner como siempre.
 */
const CACHE_KEY = "portfolio-api-cache";
const TTL_MS = 24 * 60 * 60 * 1000; // 24 horas

/** Campos del estado global que persistimos. */
const CACHED_FIELDS = ["aboutMe", "projects", "languages", "areaName"];

/**
 * Lee la caché si existe y no ha expirado.
 * @returns {object|null} Payload cacheado o null.
 */
export const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw);
    if (!cache?.ts || Date.now() - cache.ts > TTL_MS) return null;
    return cache;
  } catch {
    return null; // localStorage corrupto o indisponible: flujo normal
  }
};

/**
 * Hidrata el estado global desde la caché (si es válida).
 * @param {GlobalState} state
 * @returns {boolean} true si se hidrató (había caché válida).
 */
export const hydrateFromCache = (state) => {
  const cache = readCache();
  if (!cache) return false;
  CACHED_FIELDS.forEach((field) => {
    if (cache[field] != null) state[field] = cache[field];
  });
  state.loading = false; // UI lista al instante
  return true;
};

/**
 * Reescribe la caché con los datos frescos (llamar tras el fetch).
 * @param {GlobalState} state
 */
export const writeCache = (state) => {
  try {
    const payload = { ts: Date.now() };
    CACHED_FIELDS.forEach((field) => {
      payload[field] = state[field];
    });
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Cuota excedida o modo privado: la app funciona igual sin caché.
  }
};