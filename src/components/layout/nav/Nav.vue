<template>
  <div class="container-nav" :class="{ smallNav: smallNavbar }">
    <div class="container-mainIfo">
      <a href="https://www.linkedin.com/in/daniel-losada-194673186/" target="_blank">
        <div class="info">
          <h1 class="name">Daniel Losada</h1>
          <p class="position">¡Full-Stack Developer!</p>
        </div>
      </a>
    </div>
    <nav class="menu-options">
      <ol>
        <router-link class="led-effect" :to="{ path: '/', exact: true }"
          >Home</router-link
        >
        <router-link class="led-effect" :to="{ path: '/about-me', exact: true }"
          >About-Me</router-link
        >
        <router-link class="led-effect" :to="{ path: '/cv', exact: true }"
          >CV</router-link
        >
        <router-link class="led-effect" :to="{ path: '/web-portfolio', exact: true }"
          >Web-Portfolio</router-link
        >
        <router-link class="led-effect" :to="{ path: '/contact-me', exact: true }"
          >Contact-Me</router-link
        >
      </ol>
    </nav>

    <nav class="second-menu-options" :class="{ open: isOpen }">
      <button class="btn-close-second-menu" type="button" @click="toggleSecondMenu()">
        X
      </button>
      <ol>
        <router-link class="led-effect" :to="{ path: '/', exact: true }"
          >Home</router-link
        >
        <router-link class="led-effect" :to="{ path: '/about-me', exact: true }"
          >About-Me</router-link
        >
        <router-link class="led-effect" :to="{ path: '/cv', exact: true }"
          >CV</router-link
        >
        <router-link class="led-effect" :to="{ path: '/web-portfolio', exact: true }"
          >Web-Portfolio</router-link
        >
        <router-link class="led-effect" :to="{ path: '/contact-me', exact: true }"
          >Contact-Me</router-link
        >
      </ol>
    </nav>
    <div class="container-button-bar">
      <button class="btn-bar" type="button" @click="toggleSecondMenu()">
        <img :src="barsIcon" alt="Menu" />
      </button>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import barsIcon from "../../../assets/icons/nav/bars-icon-menu.png";
import profileImg from "../../../assets/profile.png";
import { onBeforeUnmount, onMounted, ref } from "vue";

export default {
  name: "Nav",
  props: ["smallNavbar"],

  setup(props) {
    const isOpen = ref(false);

    const toggleSecondMenu = () => {
      isOpen.value = !isOpen.value;
    };

    const handleScroll = () => {
      if (window.scrollY < 20) {
        isOpen.value = false;
      } else if (window.screenY == 0) {
        isOpen.value = false;
      }
    };

// ---------------------------------------------------------------------
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });


    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });


    return {
      barsIcon,
      profileImg,
      isOpen,
      toggleSecondMenu,
    };
  },
};
</script>

<style lang="sass">
@import './styles/nav.scss'
</style>
