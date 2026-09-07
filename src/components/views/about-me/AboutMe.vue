<template>
  <div class="container-aboutMe">
    <div class="wrapper-aboutMe">
      <div class="container-illustration">
        <img :src="illustration1" alt="illustration" loading="lazy" />
      </div>
      <div class="container-info">
        <h2 class="title">¡About Me!</h2>
        <hr />
        <p class="info">{{ state.aboutMe[0]?.description }}</p>
        <div class="container-btns">
          <RouterLink to="/contact-me">Hire Me!</RouterLink>
          <RouterLink to="/cv">Check out my dope CV, buddy!</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * AboutMe.vue
 * ---------------------------------------------------------------
 * Vista con la descripción personal y accesos a contacto/CV.
 *
 * Migrado a <script setup>. RouterLink importado explícitamente
 * (mejor tree-shaking) y loading="lazy" en la ilustración.
 */
import illustration1 from "../../../assets/illustrations/illustration1.png";
import { RouterLink } from "vue-router";
import { useState } from "../../../utils/globalState";

const state = useState();
</script>

<style lang="sass">
@use './styles/aboutMe.scss' as *
</style>
