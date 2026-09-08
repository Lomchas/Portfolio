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
          {{ t(link.key) }}
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
          {{ t(link.key) }}
        </RouterLink>
      </ol>
    </nav>
    <!-- Botón de tema + idioma + menú móvil: siempre visibles. -->
    <div class="container-button-bar">
      <!-- Selector de idioma (ES default, EN, PT, ZH). -->
      <div class="lang-selector" ref="langSelectorRef">
        <button
          class="lang-btn"
          type="button"
          aria-label="Change language"
          :title="currentLanguage.label"
          @click="langOpen = !langOpen"
        >
          <svg class="lang-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span class="lang-code">{{ locale.toUpperCase() }}</span>
        </button>
        <Transition name="lang-drop">
          <ul class="lang-menu" v-if="langOpen">
            <li v-for="lang in languages" :key="lang.code">
              <button
                type="button"
                :class="{ current: lang.code === locale }"
                @click="selectLanguage(lang.code)"
              >
                <span class="flag">{{ lang.flag }}</span>
                <span>{{ lang.label }}</span>
                <span class="check" v-if="lang.code === locale">✔</span>
              </button>
            </li>
          </ul>
        </Transition>
      </div>

      <button
        class="theme-toggle"
        type="button"
        :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
        :title="theme === 'dark' ? 'Light mode' : 'Dark mode'"
        @click="toggleTheme"
      >
        <svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <g v-if="theme === 'dark'">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </g>
          <path v-else d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>
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
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useState } from "../../../utils/globalState";
import { useTheme } from "../../../composables/useTheme";
import { useI18n } from "../../../composables/useI18n";

/** Props: true cuando la página está desplazada > 20px (nav compacto). */
defineProps({
  smallNavbar: { type: Boolean, default: false },
});

/** Definición única de las secciones del menú (traducidas con i18n). */
const menuLinks = [
  { path: "/", key: "nav.home" },
  { path: "/about-me", key: "nav.about" },
  { path: "/cv", key: "nav.cv" },
  { path: "/web-portfolio", key: "nav.portfolio" },
  { path: "/ai-integrations", key: "nav.ai" },
  { path: "/contact-me", key: "nav.contact" },
];

/** Estado del menú móvil (abierto/cerrado). */
const isOpen = ref(false);

const state = useState();

/** Tema claro/oscuro (compartido globalmente, persiste en localStorage). */
const { theme, toggleTheme } = useTheme();

/** Idioma: ES (default), EN, PT, ZH. */
const { t, locale, languages, setLocale } = useI18n();
const langOpen = ref(false);
const langSelectorRef = ref(null);
const currentLanguage = computed(
  () => languages.find((l) => l.code === locale.value) ?? languages[0]
);

const selectLanguage = (code) => {
  setLocale(code);
  langOpen.value = false;
};

/** Cierra el dropdown al hacer click fuera. */
const onClickOutside = (event) => {
  if (langSelectorRef.value && !langSelectorRef.value.contains(event.target)) {
    langOpen.value = false;
  }
};

const openMenu = () => { isOpen.value = true; };
const closeMenu = () => { isOpen.value = false; };

/** Cierra el menú móvil cuando el usuario vuelve arriba. */
const handleScroll = () => {
  if (window.scrollY < 20) isOpen.value = false;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("click", onClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", onClickOutside);
});
</script>

<style lang="sass">
@use './styles/nav.scss' as *
</style>
