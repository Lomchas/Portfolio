<template>
  <div class="main-container">
    <Nav :small-navbar="isSmall" />
    <!-- v-if desmonta el spinner del DOM cuando no se necesita
         (libera nodos/memoria en vez de solo ocultarlo). -->
    <Loading v-if="state.loading" />
    <RouterView />
    <Footer />
  </div>
</template>

<script setup>
/**
 * App.vue
 * ---------------------------------------------------------------
 * Componente raíz: orquesta el layout (Nav, Loading, vistas, Footer)
 * y realiza la carga inicial de datos de la API.
 *
 * Migrado a <script setup> (Composition API estándar de Vue 3):
 *  - Menos boilerplate: no hace falta export default, ni registrar
 *    componentes, ni retornar bindings manualmente.
 *  - Mejor rendimiento: el compilador genera código más optimizado
 *    al conocer estáticamente las variables usadas en el template.
 *
 * Las 3 peticiones iniciales se ejecutan EN PARALELO con Promise.all
 * y el listener de scroll se limpia en onBeforeUnmount (sin leaks).
 */
import Footer from "./components/layout/footer/Footer.vue";
import Nav from "./components/layout/nav/Nav.vue";
import Loading from "./components/layout/loading/Loading.vue";
import { RouterView } from "vue-router";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useState } from "./utils/globalState";
import {
  getAboutMeInformation,
  getHomeInformation,
  getProjectsInformation,
} from "./controllers/getAboutMeInformation";

/** Indica si la página está desplazada (nav compacto). */
const isSmall = ref(false);

const state = useState();

/** Referencia a la función manejadora para poder desregistrarla. */
const handleScroll = () => {
  isSmall.value = window.scrollY > 20;
};

onMounted(() => {
  // Peticiones en paralelo: reduce el tiempo de carga inicial
  // de ~3x RTT a 1x RTT respecto a la versión secuencial.
  // Cada service desactiva `loading` al terminar.
  Promise.all([
    getHomeInformation("/experiences", state),
    getAboutMeInformation("/aboutMe", state),
    getProjectsInformation("/projects", state),
  ]).catch((err) => console.error("Initial data load failed:", err));

  // passive: true permite al navegador hacer scroll sin esperar.
  window.addEventListener("scroll", handleScroll, { passive: true });
});

// Limpieza del listener: sin esto quedaría registrado aunque el
// componente se destruyera (memory leak típico en SPA).
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.main-container {
  position: relative;
}
</style>

<style scoped>
.main-container {
  position: relative;
}
</style>
