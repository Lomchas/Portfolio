<template>
  <div class="container-nav" :class="{ smallNav: smallNavbar }">
    <div class="container-mainIfo">
      <a :href="state.aboutMe[0]?.linkedin" target="_blank" rel="noopener noreferrer">
        <div class="info">
          <h1 class="name">{{ state.aboutMe[0]?.name }}</h1>
          <p class="position">{{ state.aboutMe[0]?.position }}</p>
        </div>
      </a>
    </div>
    <!-- Menú principal (desktop) -->
    <nav class="menu-options">
      <ol>
        <RouterLink
          v-for="link in menuLinks"
          :key="link.path"
          class="led-effect"
          :to="{ path: link.path }"
        >
          {{ link.label }}
        </RouterLink>
      </ol>
    </nav>

    <!-- Menú móvil desplegable -->
    <nav class="second-menu-options" :class="{ open: isOpen }">
      <button class="btn-close-second-menu" type="button" aria-label="Close menu" @click="closeMenu()">
        X
      </button>
      <ol>
        <RouterLink
          v-for="link in menuLinks"
          :key="link.path"
          class="led-effect"
          :to="{ path: link.path }"
          @click="closeMenu()"
        >
          {{ link.label }}
        </RouterLink>
      </ol>
    </nav>
    <div class="container-button-bar">
      <button class="btn-bar" type="button" aria-label="Open menu" @click="openMenu()">
        <img :src="barsIcon" alt="Menu" />
      </button>
    </div>
  </div>
</template>

<script>
/**
 * Nav.vue
 * ---------------------------------------------------------------
 * Barra de navegación con versión compacta al hacer scroll y menú
 * desplegable para móvil.
 *
 * Mejoras aplicadas:
 *  - Los enlaces se renderizan con v-for desde una constante
 *    `menuLinks` (elimina duplicación entre menú desktop y móvil).
 *  - Enlaces con rel="noopener noreferrer" (seguridad).
 *  - Listener de scroll con { passive: true } y limpieza correcta.
 *  - Se eliminaron importaciones sin uso (profileImg, RouterLink).
 *  - Corregido el bug `window.screenY` (typo de `scrollY`).
 */
import barsIcon from "../../../assets/icons/nav/bars-icon-menu.png";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useState } from "../../../utils/globalState";

/** Definición única de las secciones del menú. */
const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/about-me", label: "About-Me" },
  { path: "/cv", label: "CV" },
  { path: "/web-portfolio", label: "Web-Portfolio" },
  { path: "/contact-me", label: "Contact-Me" },
];

export default {
  name: "Nav",
  components: { RouterLink },
  props: {
    /** True cuando la página está desplazada > 20px (nav compacto). */
    smallNavbar: { type: Boolean, default: false },
  },

  setup() {
    /** Estado del menú móvil (abierto/cerrado). */
    const isOpen = ref(false);
    const state = useState();

    const openMenu = () => { isOpen.value = true; };
    const closeMenu = () => { isOpen.value = false; };

    /** Cierra el menú móvil cuando el usuario vuelve arriba. */
    const handleScroll = () => {
      if (window.scrollY < 20) isOpen.value = false;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return { barsIcon, isOpen, openMenu, closeMenu, menuLinks, state };
  },
};
</script>

<style lang="sass">
@import './styles/nav.scss'
</style>
