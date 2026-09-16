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
    // Meta SEO por vista: el hook afterEach actualiza <title> y
    // Open Graph en cada navegación (crítico para crawlers que
    // renderizan JS y para pestañas compartidas).
    meta: {
      title: "Daniel Losada 💎 — Full-Stack Developer",
      description:
        "Portfolio: skills, projects, CV and contact. Frontend, backend and AI automation.",
    },
  },
  {
    path: "/about-me",
    name: "about-me",
    component: () => import("../components/views/about-me/AboutMe.vue"),
    meta: {
      title: "About Me — Daniel Losada",
      description:
        "Full-stack developer with real industrial experience at Renault Sofasa: AI and process automation.",
    },
  },
  {
    path: "/cv",
    name: "cv",
    component: () => import("../components/views/cv/Cv.vue"),
    meta: {
      title: "CV — Daniel Losada",
      description: "Curriculum Vitae of Daniel Losada, full-stack developer.",
    },
  },
  {
    path: "/web-portfolio",
    name: "web-portfolio",
    component: () => import("../components/views/web-portfolio/WebPortfolio.vue"),
    meta: {
      title: "Projects — Daniel Losada",
      description: "Selected projects: frontend, backend and mobile.",
    },
  },
  {
    path: "/ai-integrations",
    name: "ai-integrations",
    component: () => import("../components/views/ai-integrations/AiIntegrations.vue"),
    meta: {
      title: "Services — Automation & AI for Businesses — Daniel Losada",
      description:
        "Workflow automation and AI integration for micro and small businesses. Free quote in under 24h.",
    },
  },
  {
    path: "/contact-me",
    name: "contact-me",
    component: () => import("../components/views/contact-me/ContactMe.vue"),
    meta: {
      title: "Contact — Daniel Losada",
      description: "Get in touch: email, WhatsApp, LinkedIn or the contact form.",
    },
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

/**
 * SEO por vista: actualiza <title>, meta description y Open Graph
 * con el meta de la ruta activa. Sin esto, compartir cualquier URL
 * interna mostraría siempre el título genérico del index.html.
 */
const SITE_URL = "https://portfolio-daniellosada.vercel.app";
const setMeta = (selector, attr, content) => {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, content);
};

router.afterEach((to) => {
  const { title, description } = to.meta;
  if (title) document.title = title;
  if (description) {
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title ?? "");
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", SITE_URL + to.path);
  }
});

export default router;