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

<script setup>
/**
 * Nav.vue
 * ---------------------------------------------------------------
 * Barra de navegación con versión compacta al hacer scroll y menú
 * desplegable para móvil.
 *
 * Migrado a <script setup>: defineProps declara los props con tipo
 * y los expone directamente al template; los bindings de nivel
 * superior (isOpen, menuLinks...) están disponibles sin `return`.
 *
 * El listener de scroll usa { passive: true } y se limpia al
 * desmontar el componente (sin memory leaks).
 */
import barsIcon from "../../../assets/icons/nav/bars-icon-menu.png";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useState } from "../../../utils/globalState";

/** Props: true cuando la página está desplazada > 20px (nav compacto). */
defineProps({
  smallNavbar: { type: Boolean, default: false },
});

/** Definición única de las secciones del menú. */
const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/about-me", label: "About-Me" },
  { path: "/cv", label: "CV" },
  { path: "/web-portfolio", label: "Web-Portfolio" },
  { path: "/contact-me", label: "Contact-Me" },
];

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
</script>

<style lang="sass">
@use './styles/nav.scss' as *
</style>
