<template>
  <div class="container-cv">
    <!-- Encabezado: presentación + acciones rápidas -->
    <header class="cv-header" v-reveal>
      <div class="cv-heading">
        <div class="container-illustration">
          <img :src="illustration2" alt="CV" loading="lazy" />
        </div>
        <div>
          <h2 class="title">My Curriculum Vitae</h2>
          <p class="cv-meta">
            <span class="meta-chip">👤 {{ state.aboutMe[0]?.name }}</span>
            <span class="meta-chip">💼 {{ state.aboutMe[0]?.position }}</span>
            <span class="meta-chip">📍 {{ state.aboutMe[0]?.location }}</span>
          </p>
        </div>
      </div>

      <div class="cv-actions">
        <button class="btn-ghost" type="button" @click="toggleFullscreen" :title="isFullscreen ? t('cv.exitFullscreen') : t('cv.fullscreen')">
          {{ isFullscreen ? "⤡ " + t('cv.exitFullscreen') : "⛶ " + t('cv.fullscreen') }}
        </button>
        <a class="btn-primary" :href="cvDownloadUrl" target="_blank" rel="noopener noreferrer">
          {{ t('cv.download') }} ⬇
        </a>
      </div>
    </header>

    <!-- Visor embebido del CV con marco tipo "documento" -->
    <div class="viewer-frame" v-reveal="100" :class="{ fullscreen: isFullscreen }">
      <div class="viewer-bar">
        <span class="dot red" aria-hidden="true"></span>
        <span class="dot yellow" aria-hidden="true"></span>
        <span class="dot green" aria-hidden="true"></span>
        <span class="viewer-title">{{ t('cv.title') }} — {{ state.aboutMe[0]?.name }} ({{ state.aboutMe[0]?.alias }})</span>
        <a class="viewer-link" :href="cvOpenUrl" target="_blank" rel="noopener noreferrer">
          {{ t('cv.openDrive') }}
        </a>
      </div>
      <div class="wrapper-cv">
        <!-- Visor embebido del CV alojado en Google Drive. -->
        <embed zoom="90" class="cv" :src="cvPreviewUrl" type="application/pdf" />
      </div>
    </div>

    <a class="download-btn" :href="cvDownloadUrl" target="_blank" rel="noopener noreferrer">
      {{ t('cv.downloadBottom') }} ⬇
    </a>
  </div>
</template>

<script setup>
/**
 * Cv.vue
 * ---------------------------------------------------------------
 * Vista del CV: visor embebido (Google Drive) con marco tipo
 * "documento", barra de acciones (descarga, Drive, pantalla
 * completa) y chips de resumen personal desde la API.
 */
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useState } from "../../../utils/globalState";

/** ID del archivo del CV en Google Drive. */
const CV_FILE_ID = "1JrgENjJKH6ouVq4I1mDJ3YtRH1hzPZ9s";

const illustration2 = new URL(
  "../../../assets/illustrations/illustration2.png",
  import.meta.url
).href;

const cvPreviewUrl = `https://drive.google.com/file/d/${CV_FILE_ID}/preview`;
const cvDownloadUrl = `https://drive.google.com/file/d/${CV_FILE_ID}/view`;
const cvOpenUrl = `https://drive.google.com/file/d/${CV_FILE_ID}/view`;

/** Modo pantalla completa del visor (Fullscreen API). */
const { t } = useI18n();
const isFullscreen = ref(false);

const toggleFullscreen = () => {
  const frame = document.querySelector(".viewer-frame");
  if (!document.fullscreenElement) {
    frame?.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
};

// Sincroniza el estado si el usuario sale con ESC.
const onFullscreenChange = () => {
  isFullscreen.value = Boolean(document.fullscreenElement);
};

onMounted(() => document.addEventListener("fullscreenchange", onFullscreenChange));
onBeforeUnmount(() => document.removeEventListener("fullscreenchange", onFullscreenChange));

const state = useState();
</script>

<style lang="scss">
@use "./styles/cv.scss" as *;
</style>
