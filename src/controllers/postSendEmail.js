/**
 * postSendEmail.js
 * ---------------------------------------------------------------
 * Service para el envío del formulario de contacto.
 *
 * Mejoras aplicadas:
 *  - Se elimina el `console.log` de datos sensibles en producción.
 *  - `finally` restaura `state.loading` para no dejar la UI bloqueada.
 *  - El estado del formulario lo resetea el componente (responsabilidad
 *    de la vista), el service solo comunica con la API.
 */
import Swal from "sweetalert2";
import axiosInstance from "../plugins/axios";

/** Configuración visual compartida de los diálogos SweetAlert. */
const swalTheme = {
  background: "#242424",
  color: "#f0f0f0",
  confirmButtonColor: "#3085d6",
};

/**
 * Envía el mensaje de contacto al backend.
 * @param {string} route       Endpoint relativo, p. ej. "sendEmail".
 * @param {GlobalState} state  Estado global (contiene `contactMe` y `error`).
 * @returns {Promise<boolean>} `true` si el envío fue exitoso.
 */
export const postSendEmail = async (route, state) => {
  try {
    const { data } = await axiosInstance.post(route, state?.contactMe);

    Swal.fire({
      ...swalTheme,
      title: "Perfect",
      text: data?.message,
      icon: "success",
      confirmButtonText: "Alright",
    });

    return true;
  } catch (err) {
    state.error = `An error has occurred, Email was not sent: ${err}`;
    console.error(state.error);

    Swal.fire({
      ...swalTheme,
      title: "Oops...",
      text: "The email could not be sent. Please try again later.",
      icon: "error",
      confirmButtonText: "Ok",
    });

    return false;
  } finally {
    state.loading = false;
  }
};
