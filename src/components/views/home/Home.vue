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
