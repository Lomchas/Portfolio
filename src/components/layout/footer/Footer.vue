<template>
  <footer class="container-footer">
    <div class="footer-content">
      <div class="footer-info">
        <h2>Daniel Losada</h2>
        <p>(Lomchas)</p>
        <p>Cargo: Fullstack Developer</p>
        <p>Ubicación: Medellín, Antioquia</p>
        <p>
          Correo:
          <a href="mailto:daniellosada17@gmail.com">daniellosada17@gmail.com</a>
        </p>
      </div>
      <div class="footer-links">
        <a href="https://github.com/TuUsuarioGitHub" target="_blank">
          <img src="../../../assets/icons/socials/iconGitH.png" alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/TuPerfilLinkedIn" target="_blank">
          <img src="../../../assets/icons/socials/iconLinkedin.png" alt="LinkedIn" />
        </a>
        <a href="https://wa.me/+573225227473" target="_blank">
          <img src="../../../assets/icons/socials/iconWpp.png" alt="WhatsApp" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  setup(props) {
    return {};
  },
};
</script>

<style lang="sass">
@import "./styles/footer.scss"
</style>
