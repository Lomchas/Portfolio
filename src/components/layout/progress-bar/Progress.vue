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

<script>
/**
 * Progress.vue
 * ---------------------------------------------------------------
 * Barra de progreso reutilizable para representar el nivel de cada
 * skill en la vista Home.
 *
 * Mejoras aplicadas:
 *  - Props con tipo, valor por defecto y validación (before v2 de
 *    Vue se usaba un array de strings sin validación).
 *  - v-bind corta (`:style`) en lugar de la forma verbosa.
 */
export default {
  name: "ProgressBar",
  props: {
    /** Porcentaje de dominio de la skill (0-100). */
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
  },
};
</script>

<style lang="sass">
@import './style/progress.scss'
</style>