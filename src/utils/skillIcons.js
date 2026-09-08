/**
 * skillIcons.js
 * ---------------------------------------------------------------
 * Overrides de iconos de skills: la API devuelve URLs que a veces
 * están caídas o bloquean hotlinking (Wikimedia 403, iconduck, etc.).
 * Este mapa apunta a CDNs confiables (devicon vía jsDelivr) SOLO para
 * los iconos rotos; los que funcionan se usan tal cual.
 * Colores originales de cada logo se preservan.
 */
export const SKILL_ICON_OVERRIDES = {
  // Frontend
  VueJs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  ReactJs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  SCSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  Bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  Tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",

  // Backend
  NodeJs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "Rest-API": "https://cdn.simpleicons.org/openapiinitiative/00935B",
  "Socket.IO": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",

  // Plus
  Linux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  GoogleCloud: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  Azure: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  Bitbucket: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg",
};

/**
 * Devuelve la URL del icono: override si existe, si no el de la API.
 * @param {{ name?: string, img?: string }} skill
 * @returns {string} URL del icono a renderizar.
 */
export const getSkillIcon = (skill) => {
  if (!skill) return "";
  return SKILL_ICON_OVERRIDES[skill.name] ?? skill.img ?? "";
};