<template>
  <div class="container-aboutMe">
    <div class="wrapper-aboutMe">
      <!-- HERO: foto + nombre + chips de tecnologías -->
      <header class="about-hero" v-reveal>
        <div class="about-photo">
          <img :src="state.aboutMe[0]?.picture_url" :alt="state.aboutMe[0]?.name" />
          <span class="photo-ring" aria-hidden="true"></span>
        </div>
        <div class="about-heading">
          <p class="eyebrow">— About Me</p>
          <h2 class="title">{{ state.aboutMe[0]?.name }}</h2>
          <p class="role">
            {{ state.aboutMe[0]?.position }}
            <span class="dot-sep">·</span>
            📍 {{ state.aboutMe[0]?.location }}
          </p>
          <!-- Chips con las tecnologías (iconos reales de la API) -->
          <div class="tech-chips" v-if="featuredSkills.length">
            <span class="chip" v-for="skill in featuredSkills" :key="skill.name" :title="skill.name">
              <img :src="getSkillIcon(skill)" :alt="skill.name" loading="lazy" />
            </span>
            <span class="chip chip-more" v-if="totalSkills > featuredSkills.length">
              +{{ totalSkills - featuredSkills.length }}
            </span>
          </div>
        </div>
      </header>

      <!-- GRID: descripción + tarjetas por área de skills -->
      <div class="about-grid">
        <article class="about-card card-bio" v-reveal>
          <h3 class="card-title">Who am I? 🙋‍♂️</h3>
          <p class="info">{{ state.aboutMe[0]?.description }}</p>
          <div class="container-btns">
            <RouterLink to="/contact-me" class="btn-primary">Hire Me! 🚀</RouterLink>
            <RouterLink to="/cv" class="btn-ghost">Check out my CV 📄</RouterLink>
          </div>
        </article>

        <!-- Una tarjeta por área de skill (frontend, backend, plus...),
             generada dinámicamente con los datos de la API. -->
        <div class="about-side">
          <article
            class="about-card card-area"
            v-for="(area, i) in state.areaName"
            :key="area"
            v-reveal="i * 90"
          >
            <div class="area-head">
              <h3 class="card-title">{{ area }}</h3>
              <span class="area-count">{{ skillCount(area) }} skills</span>
            </div>
            <div class="area-icons">
              <span class="chip chip-sm" v-for="s in state.languages[area]" :key="s.name" :title="`${s.name} — ${levelLabel(s.percent)}`">
                <img :src="getSkillIcon(s)" :alt="s.name" loading="lazy" />
              </span>
            </div>
          </article>
        </div>
      </div>

      <!-- Accesos rápidos a redes -->
      <div class="about-socials" v-reveal>
        <a
          v-for="social in socialLinks"
          :key="social.alt"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          class="social-pill"
          :aria-label="social.alt"
        >
          <img :src="social.icon" :alt="social.alt" loading="lazy" />
          <span>{{ social.alt }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * AboutMe.vue
 * ---------------------------------------------------------------
 * Sección "About" moderna: hero con foto + chips de tecnologías,
 * bio, tarjetas por área de skill (datos reales de la API) y
 * accesos sociales. Todo derivado del estado global: si la API
 * añade una skill/área, la UI se actualiza sola.
 */
import iconGitH from "../../../assets/icons/socials/iconGitH.png";
import iconLinkedin from "../../../assets/icons/socials/iconLinkedin.png";
import iconWpp from "../../../assets/icons/socials/iconWpp.png";
import iconGml from "../../../assets/icons/socials/iconGmail.png";
import { RouterLink } from "vue-router";
import { computed } from "vue";
import { useState } from "../../../utils/globalState";
import { getSkillIcon } from "../../../utils/skillIcons.js";

const state = useState();

/** Todas las skills en un solo array (de todas las áreas). */
const allSkills = computed(() =>
  state.areaName.flatMap((area) => state.languages[area] ?? [])
);

/** Chips destacados del hero (máx. 10). */
const featuredSkills = computed(() => allSkills.value.slice(0, 10));
const totalSkills = computed(() => allSkills.value.length);

/** Cantidad de skills de un área. */
const skillCount = (area) => (state.languages[area] ?? []).length;

/** Etiqueta de nivel coherente con la vista Home. */
const levelLabel = (percent) => {
  if (percent >= 90) return "Expert";
  if (percent >= 75) return "Advanced";
  if (percent >= 60) return "Proficient";
  if (percent >= 40) return "Intermediate";
  return "Familiar";
};

const socialLinks = computed(() => [
  { href: state.aboutMe[0]?.github, icon: iconGitH, alt: "GitHub" },
  { href: state.aboutMe[0]?.linkedin, icon: iconLinkedin, alt: "LinkedIn" },
  { href: `https://wa.me/${state.aboutMe[0]?.phone}`, icon: iconWpp, alt: "WhatsApp" },
  {
    href: `https://mail.google.com/mail/?view=cm&to=${state.aboutMe[0]?.email}`,
    icon: iconGml,
    alt: "Gmail",
  },
]);
</script>

<style lang="sass">
@use './styles/aboutMe.scss' as *
</style>
