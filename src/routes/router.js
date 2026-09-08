/**
 * router.js
 * ---------------------------------------------------------------
 * Configuración central de rutas de la aplicación (vue-router v4).
 *
 * Mejoras aplicadas:
 *  - Code-splitting automático: cada vista se carga con import()
 *    dinámico (lazy loading). Vite genera un chunk independiente por
 *    ruta, de modo que el usuario solo descarga el JS de la página
 *    que visita, reduciendo el tiempo de carga inicial.
 *  - scrollBehavior(): restaura el scroll al inicio en cada cambio de
 *    ruta de forma declarativa (mejor que window.scrollTo en afterEach,
 *    porque respeta la navegación atrás/adelante del navegador).
 */
import { createRouter, createWebHistory } from "vue-router";

/**
 * Definición de rutas.
 * @type {import('vue-router').RouteRecordRaw[]}
 */
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../components/views/home/Home.vue"),
  },
  {
    path: "/about-me",
    name: "about-me",
    component: () => import("../components/views/about-me/AboutMe.vue"),
  },
  {
    path: "/cv",
    name: "cv",
    component: () => import("../components/views/cv/Cv.vue"),
  },
  {
    path: "/web-portfolio",
    name: "web-portfolio",
    component: () => import("../components/views/web-portfolio/WebPortfolio.vue"),
  },
  {
    path: "/ai-integrations",
    name: "ai-integrations",
    component: () => import("../components/views/ai-integrations/AiIntegrations.vue"),
  },
  {
    path: "/contact-me",
    name: "contact-me",
    component: () => import("../components/views/contact-me/ContactMe.vue"),
  },
  // Ruta de respaldo: cualquier URL desconocida redirige al home.
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Clase CSS aplicada al enlace cuya ruta coincide exactamente.
  linkExactActiveClass: "active",
  // Al navegar, vuelve siempre al inicio de la página.
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;