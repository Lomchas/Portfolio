<template>
  <footer class="container-footer">
    <div class="footer-content">
      <div class="footer-info">
        <h2>{{ state.aboutMe[0]?.name }}</h2>
        <p>({{ state.aboutMe[0]?.alias }})</p>
        <p>Cargo: {{ state.aboutMe[0]?.position }}</p>
        <p>Ubicación: {{ state.aboutMe[0]?.location }}</p>
        <p>
          Correo:
          <a
            :href="`https://mail.google.com/mail/?view=cm&to=${state.aboutMe[0]?.email}`"
            target="_blank"
            rel="noopener noreferrer"
          >{{ state.aboutMe[0]?.email }}</a>
        </p>
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
        >
          <img :src="social.icon" :alt="social.alt" loading="lazy" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
/**
 * Footer.vue
 * ---------------------------------------------------------------
 * Pie de página con información de contacto y redes sociales.
 *
 * Mejoras aplicadas:
 *  - Enlaces sociales generados con v-for (menos HTML duplicado).
 *  - rel="noopener noreferrer" en enlaces externos (seguridad).
 *  - loading="lazy" en los iconos (no bloquean el render inicial).
 */
import iconGitH from "../../../assets/icons/socials/iconGitH.png";
import iconLinkedin from "../../../assets/icons/socials/iconLinkedin.png";
import iconWpp from "../../../assets/icons/socials/iconWpp.png";
import { computed } from "vue";
import { useState } from "../../../utils/globalState";

export default {
  name: "Footer",

  setup() {
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

    return { state, socialLinks };
  },
};
</script>

<style lang="sass">
@import "./styles/footer.scss"
</style>
