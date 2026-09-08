<template>
  <footer class="container-footer">
    <div class="footer-content">
      <!-- Bloque de información: alineado a la izquierda, filas
           etiqueta/valor para una lectura limpia y ordenada. -->
      <div class="footer-info">
        <h2 class="footer-name">
          {{ state.aboutMe[0]?.name }}
          <span class="footer-alias">({{ state.aboutMe[0]?.alias }})</span>
        </h2>
        <ul class="info-list">
          <li>
            <span class="label">Cargo</span>
            <span class="value">{{ state.aboutMe[0]?.position }}</span>
          </li>
          <li>
            <span class="label">Ubicación</span>
            <span class="value">{{ state.aboutMe[0]?.location }}</span>
          </li>
          <li>
            <span class="label">Correo</span>
            <a
              class="value"
              :href="`https://mail.google.com/mail/?view=cm&to=${state.aboutMe[0]?.email}`"
              target="_blank"
              rel="noopener noreferrer"
            >{{ state.aboutMe[0]?.email }}</a>
          </li>
        </ul>
      </div>
      <!-- Redes sociales: se generan desde una constante para evitar
           duplicar la misma estructura tres veces. -->
      <div class="footer-links">
        <a
          v-for="social in socialLinks"
          :key="social.alt"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="social.alt"
        >
          <img :src="social.icon" :alt="social.alt" loading="lazy" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
/**
 * Footer.vue
 * ---------------------------------------------------------------
 * Pie de página con información de contacto y redes sociales.
 *
 * Migrado a <script setup>. Los enlaces sociales se derivan de los
 * datos de la API con `computed` (no se recalculan si los datos no
 * cambian) y se renderizan con v-for.
 */
import iconGitH from "../../../assets/icons/socials/iconGitH.png";
import iconLinkedin from "../../../assets/icons/socials/iconLinkedin.png";
import iconWpp from "../../../assets/icons/socials/iconWpp.png";
import { computed } from "vue";
import { useState } from "../../../utils/globalState";

const state = useState();

/**
 * Enlaces sociales derivados de los datos de la API.
 * `computed` evita recalcular si los datos no cambian.
 */
const socialLinks = computed(() => [
  { href: state.aboutMe[0]?.github, icon: iconGitH, alt: "GitHub" },
  { href: state.aboutMe[0]?.linkedin, icon: iconLinkedin, alt: "LinkedIn" },
  { href: `https://wa.me/${state.aboutMe[0]?.phone}`, icon: iconWpp, alt: "WhatsApp" },
]);
</script>

<style lang="sass">
@use "./styles/footer.scss" as *
</style>
