/**
 * Servicios de datos de la aplicación.
 * ---------------------------------------------------------------
 * Cada servicio encapsula una llamada a la API y actualiza el estado
 * global. Se unificaron los tres controllers en un mismo módulo para
 * eliminar duplicación y centralizar el manejo de errores.
 *
 * Patrones aplicados:
 *  - try/catch/finally consistente: el error se registra y persiste
 *    en el estado global; `loading` siempre se libera en `finally`
 *    (evita estados de carga infinitos ante un fallo).
 *  - JSDoc para autodocumentación.
 */
import axiosInstance from "../plugins/axios";

/**
 * Manejador de errores común para los servicios GET.
 * @param {unknown} err        Error capturado por Axios.
 * @param {GlobalState} state  Estado global de la app.
 * @param {string} context     Descripción de la operación fallida.
 */
const handleRequestError = (err, state, context) => {
  state.error = `An error has occurred in ${context}: ${err}`;
  // console.error preserva el stack trace (mejor que console.log).
  console.error(state.error);
};

/**
 * Obtiene la información personal (about me) desde la API.
 * @param {string} route       Endpoint relativo, p. ej. "/aboutMe".
 * @param {GlobalState} state  Estado global donde se guarda el resultado.
 * @returns {Promise<void>}
 */
export const getAboutMeInformation = async (route, state) => {
  try {
    const { data } = await axiosInstance.get(route);
    state.aboutMe = data;
  } catch (err) {
    handleRequestError(err, state, "about me");
  } finally {
    state.loading = false;
  }
};

/**
 * Obtiene la información del home (skills por área) desde la API.
 * También deriva la lista de nombres de áreas a partir de las claves
 * del objeto recibido (se descarta la primera clave, que no es un área).
 * @param {string} route       Endpoint relativo, p. ej. "/experiences".
 * @param {GlobalState} state  Estado global donde se guarda el resultado.
 * @returns {Promise<void>}
 */
export const getHomeInformation = async (route, state) => {
  try {
    const { data } = await axiosInstance.get(route);

    // El primer elemento del array contiene las skills agrupadas.
    state.languages = data[0];

    // Se derivan los títulos de las áreas (todas las claves menos la primera).
    const [, ...areaNames] = Object.keys(state.languages);
    state.areaName = areaNames;
  } catch (err) {
    handleRequestError(err, state, "home");
  } finally {
    state.loading = false;
  }
};

/**
 * Obtiene el listado de proyectos desde la API.
 * @param {string} route       Endpoint relativo, p. ej. "/projects".
 * @param {GlobalState} state  Estado global donde se guarda el resultado.
 * @returns {Promise<void>}
 */
export const getProjectsInformation = async (route, state) => {
  try {
    const { data } = await axiosInstance.get(route);
    state.projects = data;
  } catch (err) {
    handleRequestError(err, state, "projects");
  } finally {
    state.loading = false;
  }
};
