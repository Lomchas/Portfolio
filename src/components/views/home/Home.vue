<template>
  <div class="container-home">
    <div class="container-greeting">
      <div class="container-illustration">
        <a href="https://www.linkedin.com/in/daniel-losada17/" target="_blank">
          <img :src="state.aboutMe[0]?.picture_url" alt="Yo" />
        </a>
      </div>
      <div class="container-skills">
        <div class="skill" v-for="(area, i) in state.areaName" :key="i">
          <h2 class="title">{{ area }} skills</h2>
          <hr width="100%" />
          <div class="container-skill-item">
            <!-- <button class="scroll-button prev">◄</button> -->
            <div class="skills-wrapper">
              <div
                class="skill-item"
                v-for="(l, index) in state.languages[area]"
                :key="index"
              >
                <img width="40" :src="l.img" alt="logo" />
                <span>{{ l.name }}</span>
                <Progress
                  :percentProgress="l.percent"
                  :colorProgress="l.color"
                />
              </div>
            </div>
            <!-- <button class="scroll-button next">►</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Progress from "../../layout/progress-bar/Progress.vue";
import { useState } from "../../../utils/globalState.js"

export default {
  name: "Home",
  components: {
    Progress,
  },
  setup(props) {
    const state = useState();

    return {
      state,
    };
  },
};
</script>

<style lang="sass">
@import './styles/home.scss'
</style>
