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

<script setup>
/**
 * Cv.vue
 * ---------------------------------------------------------------
 * Vista que embebe y permite descargar el CV (Google Drive).
 *
 * Migrado a <script setup>. Las URLs del archivo derivan de una
 * única constante `CV_FILE_ID` (sin repetir el ID en dos sitios).
 */

/** ID del archivo del CV en Google Drive. */
const CV_FILE_ID = "1JrgENjJKH6ouVq4I1mDJ3YtRH1hzPZ9s";

const illustration2 = new URL(
  "../../../assets/illustrations/illustration2.png",
  import.meta.url
).href;

const cvPreviewUrl = `https://drive.google.com/file/d/${CV_FILE_ID}/preview`;
const cvDownloadUrl = `https://drive.google.com/file/d/${CV_FILE_ID}/view`;
</script>

<style lang="sass">
@use './styles/cv.scss' as *
</style>
