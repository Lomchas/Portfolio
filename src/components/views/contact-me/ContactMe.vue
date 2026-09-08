<template>
  <div class="container-contactMe">
    <div class="contact-card">
      <!-- ---- Panel izquierdo: info de contacto directa ---- -->
      <aside class="contact-info" v-reveal>
        <p class="eyebrow">— Contact me</p>
        <h2 class="title">Let's build something together</h2>
        <p class="lead">
          Have a project, an idea or an automation in mind?
          Tell me about it and I'll get back to you fast.
        </p>

        <!-- Estado de disponibilidad (innovador para reclutadores) -->
        <div class="availability">
          <span class="pulse-dot" aria-hidden="true"></span>
          Available for new projects
        </div>

        <!-- Filas de contacto con acción real -->
        <ul class="contact-rows">
          <li>
            <span class="row-icon">📧</span>
            <div class="row-body">
              <span class="row-label">Email</span>
              <a
                class="row-value"
                :href="`https://mail.google.com/mail/?view=cm&to=${state.aboutMe[0]?.email}`"
                target="_blank"
                rel="noopener noreferrer"
              >{{ state.aboutMe[0]?.email }}</a>
            </div>
            <button
              class="copy-btn"
              type="button"
              :title="copied ? 'Copied!' : 'Copy email'"
              @click="copyEmail"
            >
              {{ copied ? "✔" : "⧉" }}
            </button>
          </li>
          <li>
            <span class="row-icon">💬</span>
            <div class="row-body">
              <span class="row-label">WhatsApp</span>
              <a
                class="row-value"
                :href="`https://wa.me/${state.aboutMe[0]?.phone}`"
                target="_blank"
                rel="noopener noreferrer"
              >+{{ state.aboutMe[0]?.phone }}</a>
            </div>
          </li>
          <li>
            <span class="row-icon">💼</span>
            <div class="row-body">
              <span class="row-label">LinkedIn</span>
              <a
                class="row-value"
                :href="state.aboutMe[0]?.linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >{{ state.aboutMe[0]?.name }}</a>
            </div>
          </li>
          <li>
            <span class="row-icon">📍</span>
            <div class="row-body">
              <span class="row-label">Location</span>
              <span class="row-value">{{ state.aboutMe[0]?.location }}</span>
            </div>
          </li>
        </ul>

        <!-- El muñequito: mitad visible junto al divisor — el
             formulario es su otra mitad (corte estético). -->
        <img
          class="contact-mascot"
          :src="illustration4"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      </aside>

      <!-- ---- Panel derecho: formulario moderno ---- -->
      <section class="contact-form-panel" v-reveal="120">
        <!-- Spinner CSS propio (nada de GIFs externos). -->
        <div class="form-loading" v-if="loadingForm">
          <span class="spinner" aria-hidden="true"></span>
          <p>Sending your message…</p>
        </div>

        <form
          v-else
          @submit.prevent="onSubmit"
          class="form-contactMe"
          autocomplete="off"
          novalidate
        >
          <div class="field" :class="{ invalid: touched.name && !fieldsValid.name }">
            <input
              id="nameField"
              name="name"
              type="text"
              placeholder=" "
              v-model.trim="form.name"
              @blur="touched.name = true"
            />
            <label for="nameField">Your name</label>
            <span class="field-error" v-if="touched.name && !fieldsValid.name">
              Please tell me your name
            </span>
          </div>

          <div class="field" :class="{ invalid: touched.email && !fieldsValid.email }">
            <input
              id="emailField"
              name="email"
              type="email"
              placeholder=" "
              v-model.trim="form.email"
              @blur="touched.email = true"
              required
            />
            <label for="emailField">Your email</label>
            <span class="field-error" v-if="touched.email && !fieldsValid.email">
              Enter a valid email
            </span>
          </div>

          <div class="field" :class="{ invalid: touched.message && !fieldsValid.message }">
            <textarea
              id="msgField"
              name="msg"
              placeholder=" "
              rows="5"
              maxlength="600"
              v-model.trim="form.message"
              @blur="touched.message = true"
            ></textarea>
            <label for="msgField">Tell me about your project…</label>
            <span class="char-counter" :class="{ limit: form.message.length >= 550 }">
              {{ form.message.length }}/600
            </span>
          </div>

          <button class="btn-submit" type="submit" :disabled="loadingForm">
            {{ loadingForm ? "Sending…" : "Send message 🚀" }}
          </button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
/**
 * ContactMe.vue
 * ---------------------------------------------------------------
 * Vista de contacto moderna: panel de info con copiar-email,
 * disponibilidad, formulario con labels flotantes, validación en
 * vivo y botón con estado de envío (spinner CSS propio).
 */
import { ref, reactive, computed } from "vue";
import { useState } from "../../../utils/globalState";
import { postSendEmail } from "../../../controllers/postSendEmail";
import illustration4 from "../../../assets/illustrations/illustration4.png";

/** Datos del formulario (reactive: no necesita .value en el template). */
const form = reactive({
  name: "",
  email: "",
  message: "",
});

/** Campos ya visitados (los errores solo se muestran tras interactuar). */
const touched = reactive({ name: false, email: false, message: false });

/** Estado de envío del formulario. */
const loadingForm = ref(false);

/** Feedback del botón de copiar email. */
const copied = ref(false);

const state = useState();

/** Validaciones en vivo por campo. */
const fieldsValid = computed(() => ({
  name: form.name.length > 0,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
  message: form.message.trim().length > 0,
}));

/** Copia el email al portapapeles con feedback visual. */
const copyEmail = async () => {
  const email = state.aboutMe[0]?.email ?? "";
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    // Fallback para contextos sin Clipboard API.
    const ta = document.createElement("textarea");
    ta.value = email;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};

/**
 * Valida y envía el formulario de contacto.
 */
const onSubmit = async () => {
  // Marca todos los campos como tocados para revelar errores.
  Object.keys(touched).forEach((k) => (touched[k] = true));

  if (!fieldsValid.value.name || !fieldsValid.value.email || !fieldsValid.value.message) {
    const Swal = (await import("sweetalert2")).default;
    Swal.fire("Please check the highlighted fields");
    return;
  }

  loadingForm.value = true;
  state.contactMe = { ...form };

  const success = await postSendEmail("sendEmail", state);

  if (success) {
    Object.assign(form, { name: "", email: "", message: "" });
    Object.keys(touched).forEach((k) => (touched[k] = false));
  }
  loadingForm.value = false;
};
</script>

<style lang="scss">
@use "./styles/contactMe.scss" as *;
</style>
