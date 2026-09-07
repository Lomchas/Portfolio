<template>
  <div class="container-webPortfolio">
    <div class="container-title">
      <img :src="illustration3" alt="illustration3" loading="lazy" />
      <h2 class="title">Portfolio</h2>
      <!-- Filtro por tipo de proyecto, generado con v-for. -->
      <div class="nav-projects">
        <button
          v-for="type in projectTypes"
          :key="type"
          :class="{ active: currentProjectType === type }"
          class="btn-kindOfProject"
          @click="changeType(type)"
        >
          {{ type.charAt(0).toUpperCase() + type.slice(1) }}
        </button>
      </div>
    </div>
    <hr />
    <div class="container-projects">
      <div class="wrapper-projects">
        <div class="project" v-for="project in projectsToShow" :key="project.name">
          <div class="info">
            <h3 class="name">{{ project.name }}</h3>
            <p class="desc">{{ project.description }}</p>
            <div class="wrapper-src">
              <a
                :href="project.url_repository"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-go go_repository"
              >Open repository! 💻</a>
              <a
                :href="project.url_deploy"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-go go_deploy"
              >{{ currentProjectType === 'mobile' ? 'Try app!📲' : 'Open deploy!🚀' }}</a>
            </div>
          </div>
          <div class="wrapper-illustration">
            <img :src="project.img" :alt="project.name" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * WebPortfolio.vue
 * ---------------------------------------------------------------
 * Vista del listado de proyectos con filtro por tipo.
 *
 * Mejoras aplicadas:
 *  - Los botones de filtro se generan con v-for desde la constante
 *    `projectTypes` (elimina HTML repetido y facilita añadir tipos).
 *  - `projectsToShow` usa un mapa en lugar de un switch (más limpio
 *    y extensible).
 *  - key por nombre de proyecto (estabilidad del DOM en el v-for).
 *  - rel="noopener noreferrer" en enlaces externos.
 */
import illustration3 from "../../../assets/illustrations/illustration3.png";
import { computed, ref } from "vue";
import { useState } from "../../../utils/globalState";

/** Tipos de proyecto disponibles (coinciden con las claves de la API). */
const projectTypes = ["frontend", "backend", "mobile"];

export default {
  name: "WebPortfolio",

  setup() {
    const state = useState();

    /** Tipo de proyecto seleccionado actualmente. */
    const currentProjectType = ref("frontend");

    const changeType = (type) => {
      currentProjectType.value = type;
    };

    /**
     * Proyectos filtrados según el tipo seleccionado.
     * El fallback `?? []` evita errores si la API aún no respondió.
     */
    const projectsToShow = computed(() => {
      const grouped = state.projects[0] ?? {};
      return grouped[`${currentProjectType.value}_projects`] ?? [];
    });

    return {
      state,
      currentProjectType,
      changeType,
      illustration3,
      projectTypes,
      projectsToShow,
    };
  },
};
</script>

<style lang="sass">
@import './styles/webPortfolio.scss'
</style>
