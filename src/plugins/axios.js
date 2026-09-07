/**
 * axios.js
 * ---------------------------------------------------------------
 * Instancia centralizada de Axios usada por todos los servicios.
 *
 * Centralizar la configuración permite:
 *  - Cambiar la URL base del backend en un único punto.
 *  - Aplicar timeouts para no dejar peticiones colgadas
 *    (buena práctica de gestión de memoria/recursos).
 *  - Añadir interceptores globales (auth, logging, etc.) en el futuro.
 */
import axios from "axios";

/**
 * Instancia configurada de Axios.
 * baseURL: API del portfolio alojada en Render (free tier).
 * timeout: se cancela la petición tras 60 s (el free tier de Render
 * puede tardar ~50 s en "despertar" tras inactividad).
 */
const axiosInstance = axios.create({
  baseURL: "https://portfolio-backend-1-yhze.onrender.com/portfolioDaniellosada",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
