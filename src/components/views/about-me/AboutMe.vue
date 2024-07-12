<template>
  <div class="container-aboutMe">
    <div class="wrapper-aboutMe">
      <div class="container-illustration">
        <img :src="illustration1" alt="illustration" />
      </div>
      <div class="container-info">
        <h2 class="title">¡About Me!</h2>
        <hr />
        <p class="info">
          {{ state.aboutMe[0]?.description }}
        </p>
        <div class="container-btns">
          <router-link to="/contact-me">Hire Me!</router-link>
          <router-link to="/cv">Check out my dope CV, buddy!</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import illustration1 from "../../../assets/illustrations/illustration1.png";
import { useState } from "../../../utils/globalState";

export default {
  setup() {

    const state = useState();

    return {
      illustration1,
      state,
    };
  },
};
</script>

<style lang="sass">
@import './styles/aboutMe.scss'
</style>
