<template>
  <div class="container-webPortfolio">
    <div class="container-title">
      <img :src="illustration3" alt="illustration3">
      <h2 class="title">Portfolio</h2>
      <div class="nav-projects">
        <button :class="{'active': type_frontend }" class="btn-kindOfProject" @click="change_type(true)">Frontend</button>
        <button :class="{'active': !type_frontend }" class="btn-kindOfProject" @click="change_type(false)">Backend</button>
      </div>
    </div>
    <hr />
    <div class="container-projects">
      <div class="wrapper-projects">
        <div class="project" v-show="type_frontend" v-for="(project, i) in state.projects[0]?.frontend_projects" :key="i">
          <div class="info">
            <h3 class="name">{{ project.name }}</h3>
            <p class="desc">{{ project.description }}</p>
            <div class="wrapper-src">
              <a :href="project.url_repository" target="_blank" class="btn-go go_repository">Open repository! 💻</a>
              <a :href="project.url_deploy" target="_blank" class="btn-go go_deploy">Open deploy! 🚀</a>
            </div>
          </div>
          <div class="wrapper-illustration">
            <img :src="project.img" alt="project-img" />
          </div>
        </div>
        <div class="project" v-show="!type_frontend" v-for="(project, i2) in state.projects[0]?.backend_projects" :key="i2">
          <div class="info">
            <h3 class="name">{{ project.name }}</h3>
            <p class="desc">{{ project.description }}</p>
            <div class="wrapper-src">
              <a :href="project.url_repository" target="_blank" class="btn-go go_repository">Open repository! 💻</a>
              <a :href="project.url_deploy" target="_blank" class="btn-go go_deploy">Open deploy! 🚀</a>
            </div>
          </div>
          <div class="wrapper-illustration">
            <img :src="project.img" alt="project-img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import illustration3 from '../../../assets/illustrations/illustration3.png'
import { ref } from "vue";
import { useState } from "../../../utils/globalState";

export default {
  setup() {
    const type_frontend = ref(true);
    const state = useState();


    const change_type = (isFrontend) => {
      if(isFrontend && type_frontend){
        type_frontend.value = true
      }
      else if(!isFrontend && !type_frontend){
        type_frontend.value = false
      }
      else if(isFrontend && !type_frontend){
        type_frontend.value = true
      }
      else if(!isFrontend && type_frontend){
        type_frontend.value = false
      }
    }

    return {
      state,
      type_frontend,
      change_type,
      illustration3,
    };
  },
};
</script>

<style lang="sass">
@import './styles/webPortfolio.scss'
</style>
