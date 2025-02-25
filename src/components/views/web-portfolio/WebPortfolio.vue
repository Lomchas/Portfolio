<template>
  <div class="container-webPortfolio">
    <div class="container-title">
      <img :src="illustration3" alt="illustration3" />
      <h2 class="title">Portfolio</h2>
      <div class="nav-projects">
        <button
          :class="{ active: currentProjectType === 'frontend' }"
          class="btn-kindOfProject"
          @click="change_type('frontend')"
        >
          Frontend
        </button>
        <button
          :class="{ active: currentProjectType === 'backend' }"
          class="btn-kindOfProject"
          @click="change_type('backend')"
        >
          Backend
        </button>
        <button
          :class="{ active: currentProjectType === 'mobile' }"
          class="btn-kindOfProject"
          @click="change_type('mobile')"
        >
          Mobile
        </button>
      </div>
    </div>
    <hr />
    <div class="container-projects">
      <div class="wrapper-projects">
        <div class="project" v-for="(project, i) in projectsToShow" :key="i">
          <div class="info">
            <h3 class="name">{{ project.name }}</h3>
            <p class="desc">{{ project.description }}</p>
            <div class="wrapper-src">
              <a
                :href="project.url_repository"
                target="_blank"
                class="btn-go go_repository"
                >Open repository! 💻</a
              >
              <a
                :href="project.url_deploy"
                target="_blank"
                class="btn-go go_deploy"
                > {{currentProjectType === 'mobile'? 'Try app!📲' : 'Open deploy!🚀' }}</a
              >
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
import illustration3 from "../../../assets/illustrations/illustration3.png";
import { computed, ref } from "vue";
import { useState } from "../../../utils/globalState";

export default {
  setup() {
    const currentProjectType = ref("frontend");
    const state = useState();

    const change_type = (type) => {
      currentProjectType.value = type;
    };

    const projectsToShow = computed(() => {
      switch (currentProjectType.value) {
        case "frontend":
          return state.projects[0]?.frontend_projects || [];
        case "backend":
          return state.projects[0]?.backend_projects || [];
        case "mobile":
          return state.projects[0]?.mobile_projects || [];
        default:
          return [];
      }
    });

    return {
      state,
      currentProjectType,
      change_type,
      illustration3,
      projectsToShow,
    };
  },
};
</script>

<style lang="sass">
@import './styles/webPortfolio.scss'
</style>
