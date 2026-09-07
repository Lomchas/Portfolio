<template>
  <div class="container-cv">
    <div class="container-title">
      <div class="container-illustration">
        <img :src="illustration2" alt="illustration2" loading="lazy" />
      </div>
      <h2 class="title">¡My Curriculum Vitae!</h2>
    </div>
    <hr />
    <div class="wrapper-cv">
      <!-- Visor embebido del CV alojado en Google Drive. -->
      <embed
        zoom="90"
        class="cv"
        :src="cvPreviewUrl"
        type="application/pdf"
      />
    </div>
    <a
      class="download-btn"
      :href="cvDownloadUrl"
      target="_blank"
      rel="noopener noreferrer"
    >
      Download it here!
    </a>
  </div>
</template>

<script>
/**
 * Cv.vue
 * ---------------------------------------------------------------
 * Vista que embebe y permite descargar el CV (Google Drive).
 *
 * Mejoras aplicadas:
 *  - Las URLs del archivo están centralizadas en constantes (evita
 *    repetir el ID del archivo en dos sitios distintos).
 *  - rel="noopener noreferrer" en el enlace de descarga.
 */

/** ID del archivo del CV en Google Drive. */
const CV_FILE_ID = "1JrgENjJKH6ouVq4I1mDJ3YtRH1hzPZ9s";

export default {
  name: "Cv",

  setup() {
    const illustration2 = new URL(
      "../../../assets/illustrations/illustration2.png",
      import.meta.url
    ).href;

    return {
      illustration2,
      cvPreviewUrl: `https://drive.google.com/file/d/${CV_FILE_ID}/preview`,
      cvDownloadUrl: `https://drive.google.com/file/d/${CV_FILE_ID}/view`,
    };
  },
};
</script>

<style lang="sass">
@import './styles/cv.scss'
</style>
