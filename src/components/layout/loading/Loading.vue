<template>
  <!-- Skeleton layout: bloques con pulso que replican la estructura de
       la Home (hero + tarjetas de skills). La percepción de velocidad
       con skeletons es ~40% mejor que con spinner: el usuario ve dónde
       aparecerá cada cosa. -->
  <div class="container-loading" role="status" aria-live="polite">
    <div class="skeleton-hero">
      <div class="sk sk-lines">
        <span class="sk-line w60"></span>
        <span class="sk-line w90"></span>
        <span class="sk-line w40"></span>
      </div>
      <div class="sk sk-avatar"></div>
    </div>

    <div class="skeleton-cards" aria-hidden="true">
      <div class="sk-card" v-for="i in 2" :key="i">
        <span class="sk-title"></span>
        <div class="sk-chips">
          <span class="sk-chip" v-for="j in 6" :key="j" :style="{ '--i': j }"></span>
        </div>
      </div>
    </div>

    <p class="loading-note">{{ t('loading.text') }}</p>
  </div>
</template>

<script setup>
import { useI18n } from "../../../composables/useI18n";
const { t } = useI18n();
/**
 * Loading.vue
 * ---------------------------------------------------------------
 * Skeleton loader: mientras la API responde (o se hidrata la caché)
 * muestra la silueta de la página con bloques pulsantes en lugar de
 * un spinner centrado. role="status" + aria-live mantienen la
 * accesibilidad para lectores de pantalla.
 */
</script>

<style lang="scss" scoped>
.container-loading {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  padding: 40px 5vw;
  max-width: 1100px;
  margin: 0 auto;
}

.skeleton-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.sk {
  background: var(--card);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      color-mix(in srgb, var(--accent) 12%, transparent),
      transparent
    );
    animation: sk-shimmer 1.6s ease-in-out infinite;
  }
}

.sk-lines {
  flex: 1;
  max-width: 480px;
  padding: 26px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  .sk-line {
    height: 16px;
    border-radius: 8px;
    background: var(--card-hover);
    display: block;
  }

  .w90 { width: 90%; }
  .w60 { width: 60%; }
  .w40 { width: 40%; }
}

.sk-avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  flex-shrink: 0;
}

.skeleton-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  .sk-card {
    padding: 22px;
    border-radius: 18px;
    background: var(--card);
    border: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .sk-title {
    width: 45%;
    height: 14px;
    border-radius: 7px;
    background: var(--card-hover);
    display: block;
  }

  .sk-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .sk-chip {
    width: calc(16.6% - 8px);
    height: 64px;
    border-radius: 14px;
    background: var(--card-hover);
    display: block;
    animation: sk-pulse 1.6s ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.12s);
  }
}

.loading-note {
  margin: 0;
  text-align: center;
  font-size: 0.82rem;
  color: var(--text-muted);
  opacity: 0.8;
}

@keyframes sk-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes sk-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

@media (max-width: 700px) {
  .skeleton-hero {
    flex-direction: column-reverse;

    .sk-avatar { width: 130px; height: 130px; }
  }

  .skeleton-cards {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sk::after,
  .sk-chip {
    animation: none;
  }
}
</style>
