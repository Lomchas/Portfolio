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

<script>
/**
 * AboutMe.vue
 * ---------------------------------------------------------------
 * Vista con la descripción personal y accesos a contacto/CV.
 *
 * Mejoras aplicadas:
 *  - RouterLink importado explícitamente (mejor tree-shaking).
 *  - loading="lazy" en la ilustración.
 */
import illustration1 from "../../../assets/illustrations/illustration1.png";
import { RouterLink } from "vue-router";
import { useState } from "../../../utils/globalState";

export default {
  name: "AboutMe",
  components: { RouterLink },

  setup() {
    const state = useState();

    return { illustration1, state };
  },
};
</script>

<style lang="sass">
@import './styles/aboutMe.scss'
</style>
