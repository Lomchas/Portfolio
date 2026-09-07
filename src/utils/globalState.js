/**
 * globalState.js
 * ---------------------------------------------------------------
 * Estado global reactivo de la aplicación (patrón "store" ligero,
 * sin Pinia/Vuex dado el tamaño del proyecto).
 *
 * Se crea UNA única instancia `reactive` a nivel de módulo: todos los
 * componentes que llamen a `useState()` comparten la misma referencia,
 * lo que evita duplicar datos en memoria.
 */
import { reactive } from "vue";

/**
 * @typedef {Object} GlobalState
 * @property {Object} languages   - Skills agrupadas por área (frontend, backend...).
 * @property {Object} aboutMe     - Información personal (nombre, posición, contacto...).
 * @property {Array}  projects    - Listado de proyectos por categoría.
 * @property {string|null} error  - Último mensaje de error producido.
 * @property {boolean} loading    - Indica si hay peticiones en curso.
 * @property {Array}  areaName    - Nombres de las áreas de skills (claves de `languages`).
 * @property {Object} contactMe   - Datos del formulario de contacto en curso.
 */
const globalState = reactive({
  languages: [],
  aboutMe: {},
  projects: [],
  error: null,
  loading: true,
  areaName: [],
  contactMe: {},
});

/**
 * Acceso al estado global compartido.
 * @returns {GlobalState} Instancia reactiva única del estado.
 */
export const useState = () => globalState;