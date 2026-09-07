<template>
  <div class="container-home">
    <div class="container-greeting">
      <div class="container-illustration">
        <a href="https://www.linkedin.com/in/daniel-losada17/" target="_blank" rel="noopener noreferrer">
          <!-- Imagen de perfil: el tamaño se controla por CSS. -->
          <img :src="state.aboutMe[0]?.picture_url" alt="Yo" />
        </a>
      </div>
      <div class="container-skills">
        <!-- Un bloque por cada área de skills (frontend, backend...).
             `area` es la clave del objeto `state.languages`. -->
        <div class="skill" v-for="area in state.areaName" :key="area">
          <h2 class="title">{{ area }} skills</h2>
          <hr width="100%" />
          <div class="container-skill-item">
            <div class="skills-wrapper">
              <div
                class="skill-item"
                v-for="(language, index) in state.languages[area]"
                :key="language.name ?? index"
              >
                <img width="40" :src="language.img" :alt="language.name" loading="lazy" />
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
  </div>
</template>

<script setup>
/**
 * Home.vue
 * ---------------------------------------------------------------
 * Vista principal: muestra el perfil y las skills organizadas por
 * áreas con barras de progreso.
 *
 * Migrado a <script setup>. keys estables por nombre (no índice) y
 * loading="lazy" en los logos (difieren imágenes fuera de viewport).
 */
import Progress from "../../layout/progress-bar/Progress.vue";
import { useState } from "../../../utils/globalState.js";

const state = useState();
</script>

<style lang="sass">
@use './styles/home.scss' as *
</style>
