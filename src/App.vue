<template>
  <div class="main-container">
    <Nav :smallNavbar="isSmall" />
    <loading v-show="state.loading" />
    <RouterView />
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/layout/footer/Footer.vue";
import Nav from "./components/layout/nav/Nav.vue";
import { getAboutMeInformation } from "./controllers/getAboutMeInformation";
import { getHomeInformation } from "./controllers/getHomeInformation";
import { getProjectsInformation } from "./controllers/getProjectsInformation";
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import { useState } from "./utils/globalState";
import Loading from "./components/layout/loading/Loading.vue";

export default {
  name: "App",
  components: {
    Footer,
    Loading,
    Nav,
    RouterView,
  },
  setup(props) {
    const isSmall = ref(false);
    const state = useState();

    onMounted(async () => {
      // API request!
      await getHomeInformation("/experiences", state);

      await getAboutMeInformation("/aboutMe", state);

      await getProjectsInformation("/projects", state)

    // Restarting scroll on each page!
      window.addEventListener("scroll", () => {
        isSmall.value = window.scrollY > 20;
      });
    });

    return {
      isSmall,
      state,
      getHomeInformation,
      getAboutMeInformation,
    };
  },
};
</script>

<style scoped>
.main-container {
  position: relative;
}
</style>
