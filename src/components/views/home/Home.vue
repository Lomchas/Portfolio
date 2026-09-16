<template>
  <div class="container-home">
    <!-- HERO: saludo + tarjeta de perfil con tilt 3D -->
    <section class="hero" v-reveal>
      <div class="hero-text">
        <p class="hero-hi">{{ t("home.hi") }}</p>
        <h1 class="hero-name">{{ state.aboutMe[0]?.name }}</h1>
        <p class="hero-role">{{ state.aboutMe[0]?.position }}</p>
        <div class="hero-cta">
          <RouterLink to="/web-portfolio" class="btn-primary">{{ t("home.viewWork") }}</RouterLink>
          <RouterLink to="/contact-me" class="btn-ghost">{{ t("home.getInTouch") }}</RouterLink>
        </div>
      </div>

      <!-- Tarjeta 3D: rota en perspectiva siguiendo el ratón. -->
      <div
        class="card-3d"
        :style="tiltStyle"
        @mousemove="onTilt"
        @mouseleave="resetTilt"
      >
        <div class="container-illustration">
          <a href="https://www.linkedin.com/in/daniel-losada17/" target="_blank" rel="noopener noreferrer">
            <img :src="state.aboutMe[0]?.picture_url" alt="Me" />
          </a>
        </div>
      </div>
    </section>

    <div class="container-skills">
      <div class="skill" v-for="(area, i) in state.areaName" :key="area" v-reveal="i * 80">
        <h2 class="title">{{ t("home.skillsArea", { area }) }}</h2>
        <hr width="100%" />
        <div class="container-skill-item">
          <div class="skills-wrapper">
            <div
              class="skill-item"
              v-for="(language, index) in state.languages[area]"
              :key="language.name ?? index"
            >
              <img width="40" :src="getSkillIcon(language)" :alt="language.name" loading="lazy" />
              <span>{{ language.name }}</span>
              <Progress
                :percent-progress="language.percent"
                :color-progress="language.color"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- HABILIDADES FULLSTACK: demostrar capacidades reales, no solo
         herramientas. Las herramientas de arriba se apoyan en estas
         habilidades probadas en contexto industrial real. -->
    <section class="fullstack-section" v-reveal>
      <p class="fs-eyebrow">{{ t("home.abilities.eyebrow") }}</p>
      <h2 class="fs-title">{{ t("home.abilities.title") }}</h2>
      <p class="fs-lead">{{ t("home.abilities.lead") }}</p>

      <div class="fs-grid">
        <article
          class="fs-card"
          v-for="(item, i) in abilityKeys"
          :key="item"
          :style="{ '--d': i * 60 + 'ms' }"
        >
          <span class="fs-icon">{{ abilityIcons[i] }}</span>
          <h3>{{ t(`home.abilities.items.${item}.t`) }}</h3>
          <p>{{ t(`home.abilities.items.${item}.x`) }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * Home.vue
 * ---------------------------------------------------------------
 * Vista principal: hero con tarjeta de perfil con efecto tilt 3D
 * (perspectiva CSS que sigue al ratón) + skills por áreas con
 * barras de progreso. Animaciones de entrada con v-reveal.
 */
import Progress from "../../layout/progress-bar/Progress.vue";
import { RouterLink } from "vue-router";
import { reactive, computed } from "vue";
import { useState } from "../../../utils/globalState.js";
import { getSkillIcon } from "../../../utils/skillIcons.js";
import { useI18n } from "../../../composables/useI18n.js";

const { t } = useI18n();

const state = useState();

/** Habilidades fullstack demostradas en la sección inferior. */
const abilityKeys = ["problems", "industrial", "apis", "ai", "architecture", "delivery"];
const abilityIcons = ["🧠", "🏭", "🔌", "🤖", "📐", "🤝"];

/** Estado del tilt 3D (grados de rotación según posición del ratón). */
const tilt = reactive({ x: 0, y: 0 });

const onTilt = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  // Normaliza la posición del ratón a [-1, 1] dentro de la tarjeta.
  tilt.x = ((event.clientY - rect.top) / rect.height - 0.5) * -14;
  tilt.y = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
};

const resetTilt = () => {
  tilt.x = 0;
  tilt.y = 0;
};

const tiltStyle = computed(() => ({
  transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
}));
</script>

<style lang="sass">
@use './styles/home.scss' as *
</style>
