<template>
  <div class="container-loading" role="status" aria-live="polite">
    <img src="../../../assets/icons/Loading/loading.svg" alt="Loading..." />
    Loading...
    <span
      >Please wait a few seconds, I'm using a free hosting so i have to wait 50
      secs for the first request. Beforehand thanks a lot!</span
    >
  </div>
</template>

<script setup>
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
