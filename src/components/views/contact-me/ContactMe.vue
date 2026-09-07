<template>
  <div class="container-contactMe">
    <div class="container-title">
      <img :src="illustration4" alt="Illustration4" />
      <h2 class="title">Contact me</h2>
    </div>
    <!-- Spinner externo: se muestra solo mientras se envía el formulario. -->
    <img
      src="https://i.gifer.com/ZKZg.gif"
      width="40"
      alt="Loading..."
      v-if="loadingForm"
    />
    <div class="container-form" v-else>
      <form
        @submit.prevent="onSubmit"
        class="form-contactMe"
        autocomplete="off"
      >
        <input
          type="text"
          id="nameField"
          name="name"
          placeholder="Name"
          v-model.trim="form.name"
        />
        <input
          type="email"
          id="emailField"
          name="email"
          placeholder="Email"
          v-model.trim="form.email"
          required
        />
        <textarea
          id="msgField"
          name="msg"
          placeholder="Message"
          v-model.trim="form.message"
        />
        <button class="btn-submit" type="submit">Send message!</button>
      </form>
      <div class="container-socials">
        <a :href="`https://wa.me/${state.aboutMe[0]?.phone}`" target="_blank" rel="noopener noreferrer">
          <img :src="iconWpp" alt="Whatsapp" />
        </a>
        <a
          :href="`https://mail.google.com/mail/?view=cm&to=${state.aboutMe[0]?.email}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img :src="iconGml" alt="Gmail" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * ContactMe.vue
 * ---------------------------------------------------------------
 * Vista del formulario de contacto.
 *
 * Mejoras aplicadas:
 *  - async/await coherente (antes mezclaba .then() dentro de una
 *    función async, lo que ocultaba errores no manejados).
 *  - Validación con trim() para ignorar espacios en blanco.
 *  - v-model.trim limpia los inputs directamente en el binding.
 *  - El reset del formulario se maneja aquí (responsabilidad de la
 *    vista), no dentro del service.
 *  - Se eliminó el import de Swal sin usar (el service lo maneja).
 */
import illustration4 from "../../../assets/illustrations/illustration4.png";
import iconWpp from "../../../assets/icons/socials/iconWpp.png";
import iconGml from "../../../assets/icons/socials/iconGmail.png";
import { ref, reactive } from "vue";
import { useState } from "../../../utils/globalState";
import { postSendEmail } from "../../../controllers/postSendEmail";

export default {
  name: "ContactMe",

  setup() {
    /** Datos del formulario (reactive: no necesita .value en el template). */
    const form = reactive({
      name: "",
      email: "",
      message: "",
    });

    /** Estado de envío del formulario (spinner). */
    const loadingForm = ref(false);

    const state = useState();

    /**
     * Valida y envía el formulario de contacto.
     */
    const onSubmit = async () => {
      // Validación: rechaza campos vacíos o con solo espacios.
      const isEmpty = [form.name, form.email, form.message]
        .some((field) => field.trim().length === 0);

      if (isEmpty) {
        import("sweetalert2").then(({ default: Swal }) =>
          Swal.fire("There are some blank fields!")
        );
        return;
      }

      loadingForm.value = true;
      state.contactMe = { ...form };

      const success = await postSendEmail("sendEmail", state);

      if (success) {
        // Reset del formulario tras un envío exitoso.
        Object.assign(form, { name: "", email: "", message: "" });
      }
      loadingForm.value = false;
    };

    return {
      loadingForm,
      form,
      state,
      illustration4,
      iconWpp,
      iconGml,
      onSubmit,
    };
  },
};
</script>

<style lang="sass">
@import './styles/contactMe.scss'
</style>
