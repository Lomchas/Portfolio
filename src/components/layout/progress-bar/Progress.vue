<template>
  <div class="bar">
    <!-- Barra de progreso con estilo en línea dinámico. -->
    <div
      class="progress"
      :style="{ background: colorProgress, width: percentProgress + '%' }"
    >
      {{ percentProgress }}%
    </div>
  </div>
</template>

<script setup>
/**
 * Progress.vue
 * ---------------------------------------------------------------
 * Barra de progreso reutilizable para representar el nivel de cada
 * skill en la vista Home.
 *
 * Migrado a <script setup>: defineProps declara los props con tipo,
 * valor por defecto y validación, quedando automáticamente
 * disponibles en el template.
 */
/** Porcentaje de dominio de la skill (0-100). */
defineProps({
  percentProgress: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100,
  },
  /** Color CSS de la barra. */
  colorProgress: {
    type: String,
    default: "#3085d6",
  },
});
</script>

<style lang="sass">
@use './style/progress.scss' as *
</style>