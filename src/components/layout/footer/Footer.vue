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
          <a :href="`https://mail.google.com/mail/?view=cm&to=${state.aboutMe[0]?.email}`" target="_blank">{{ state.aboutMe[0]?.email }}</a>
        </p>
      </div>
      <div class="footer-links">
        <a :href="state.aboutMe[0]?.github" target="_blank">
          <img src="../../../assets/icons/socials/iconGitH.png" alt="GitHub" />
        </a>
        <a :href="state.aboutMe[0]?.linkedin" target="_blank">
          <img src="../../../assets/icons/socials/iconLinkedin.png" alt="LinkedIn" />
        </a>
        <a :href="`https://wa.me/${state.aboutMe[0]?.phone}`" target="_blank">
          <img src="../../../assets/icons/socials/iconWpp.png" alt="WhatsApp" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import { useState } from '../../../utils/globalState';

export default {
  name: "Footer",
  setup(props) {

    const state = useState();

    return {
      state,
    };
  },
};
</script>

<style lang="sass">
@import "./styles/footer.scss"
</style>
