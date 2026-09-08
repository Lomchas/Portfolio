<template>
  <div class="container-contactMe">
    <div class="contact-card">
      <!-- ---- Panel izquierdo: info de contacto directa ---- -->
      <aside class="contact-info" v-reveal>
        <p class="eyebrow">{{ t('contact.eyebrow') }}</p>
        <h2 class="title">{{ t('contact.title') }}</h2>
        <p class="lead">{{ t('contact.lead') }}</p>

        <!-- Estado de disponibilidad (innovador para reclutadores) -->
        <div class="availability">
          <span class="pulse-dot" aria-hidden="true"></span>
          {{ t('contact.availability') }}
        </div>

        <!-- Filas de contacto con acción real -->
        <ul class="contact-rows">
          <li>
            <span class="row-icon">📧</span>
            <div class="row-body">
              <span class="row-label">{{ t('contact.email') }}</span>
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
              :title="copied ? t('contact.copied') : t('contact.copyEmail')"
              @click="copyEmail"
            >
              {{ copied ? "✔" : "⧉" }}
            </button>
          </li>
          <li>
            <span class="row-icon">💬</span>
            <div class="row-body">
              <span class="row-label">{{ t('contact.whatsapp') }}</span>
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
              <span class="row-label">{{ t('contact.linkedin') }}</span>
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
              <span class="row-label">{{ t('contact.location') }}</span>
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
          <p>{{ t('contact.sendingText') }}</p>
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
              :placeholder="t('contact.messagePlaceholder')"
              v-model.trim="form.name"
              @blur="touched.name = true"
            />
            <label for="nameField">{{ t('contact.nameLabel') }}</label>
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
            <label for="emailField">{{ t('contact.emailLabel') }}</label>
            <span class="field-error" v-if="touched.email && !fieldsValid.email">
              {{ t('contact.emailError') }}
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
            <label for="msgField">{{ t('contact.messageLabel') }}</label>
            <span class="char-counter" :class="{ limit: form.message.length >= 550 }">
              {{ form.message.length }}/600
            </span>
          </div>

          <button class="btn-submit" type="submit" :disabled="loadingForm">
            {{ loadingForm ? t('contact.sendingButton') : t('contact.sendMessage') }}
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
import { useI18n } from "../../../composables/useI18n";
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
const { t } = useI18n();

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
    Swal.fire(t('contact.validationError'));
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
