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
    <span class="level-label" :class="sizeClass">{{ levelLabel }}</span>
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
import { useI18n, levelKey } from "../../../composables/useI18n";

const { t } = useI18n();

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

/** Etiqueta de nivel legible (traducida con i18n). */
const levelLabel = computed(() => t(levelKey(props.percentProgress)));

/**
 * Escala de la etiqueta según su longitud: en vez de partir el texto
 * en dos líneas (wrap), reduce el font-size para que SIEMPRE quepa
 * en una sola línea dentro de la tarjeta de skill.
 */
const sizeClass = computed(() => {
  const len = levelLabel.value.length;
  if (len <= 7) return "";
  if (len <= 10) return "sm";
  return "xs";
});
</script>

<style lang="sass">
@use './style/progress.scss' as *
</style>