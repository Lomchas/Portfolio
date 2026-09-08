<template>
  <!-- Nivel de skill con puntos: más creíble que un % exacto.
       5 puntos se rellenan según el dominio, con etiqueta legible. -->
  <div class="skill-level" :title="levelLabel">
    <div class="level-dots">
      <span
        v-for="i in 5"
        :key="i"
        class="dot"
        :class="{ filled: i <= filledDots }"
        :style="i <= filledDots ? { background: colorProgress, boxShadow: `0 0 6px ${colorProgress}` } : {}"
      />
    </div>
    <span class="level-label">{{ levelLabel }}</span>
  </div>
</template>

<script setup>
/**
 * Progress.vue → ahora "SkillLevel"
 * ---------------------------------------------------------------
 * Representa el dominio de cada skill con 5 puntos y una etiqueta
 * de nivel. Los porcentajes exactos resultan poco creíbles; los
 * niveles por categorías comunican la misma información de forma
 * honesta y más legible.
 */
import { computed } from "vue";

const props = defineProps({
  percentProgress: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100,
  },
  /** Color CSS de los puntos (el de la skill). */
  colorProgress: {
    type: String,
    default: "#38bdf8",
  },
});

/** Número de puntos rellenos (1-5) según el porcentaje. */
const filledDots = computed(() => Math.max(1, Math.ceil(props.percentProgress / 20)));

/** Etiqueta de nivel legible en lugar del número crudo. */
const levelLabel = computed(() => {
  const p = props.percentProgress;
  if (p >= 90) return "Expert";
  if (p >= 75) return "Advanced";
  if (p >= 60) return "Proficient";
  if (p >= 40) return "Intermediate";
  return "Familiar";
});
</script>

<style lang="sass">
@use './style/progress.scss' as *
</style>