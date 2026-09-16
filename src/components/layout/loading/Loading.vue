<template>
  <div class="container-loading" role="status" aria-live="polite">
    <img src="../../../assets/icons/Loading/loading.svg" alt="Loading..." />
    {{ t('loading.text') }}
  </div>
</template>

<script setup>
import { useI18n } from "../../../composables/useI18n";
const { t } = useI18n();
/**
 * Loading.vue
 * ---------------------------------------------------------------
 * Componente de carga (spinner) mostrado mientras la API responde.
 * role="status" + aria-live permiten a lectores de pantalla anunciar
 * el estado de carga (accesibilidad).
 *
 * Migrado a <script setup> (componente sin lógica: solo el template
 * y sus estilos).
 */
</script>

<style lang="sass" scoped>
@use './styles/loading.scss' as *
</style>
