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

<script setup>
/**
 * ContactMe.vue
 * ---------------------------------------------------------------
 * Vista del formulario de contacto.
 *
 * Migrado a <script setup>. async/await coherente, validación con
 * trim() y reset del formulario gestionado por la vista (el service
 * solo comunica con la API y muestra los diálogos).
 */
import illustration4 from "../../../assets/illustrations/illustration4.png";
import iconWpp from "../../../assets/icons/socials/iconWpp.png";
import iconGml from "../../../assets/icons/socials/iconGmail.png";
import { ref, reactive } from "vue";
import { useState } from "../../../utils/globalState";
import { postSendEmail } from "../../../controllers/postSendEmail";

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
    // Import dinámico: sweetalert2 solo se descarga cuando se usa.
    const Swal = (await import("sweetalert2")).default;
    Swal.fire("There are some blank fields!");
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
</script>

<style lang="sass">
@use './styles/contactMe.scss' as *
</style>
