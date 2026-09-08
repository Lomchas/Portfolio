<template>
  <div class="background-3d" aria-hidden="true">
    <!-- Orbes de luz con gradiente (efecto aurora flotante) -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    <!-- Estrellas 3D: campo de partículas con proyección en perspectiva -->
    <canvas ref="canvasRef" class="starfield"></canvas>
  </div>
</template>

<script setup>
/**
 * Background3D.vue
 * ---------------------------------------------------------------
 * Fondo animado "tipo render 3D" sin dependencias externas:
 *  - Canvas con campo de estrellas: cada estrella tiene posición
 *    (x, y, z) real y se proyecta con perspectiva (z como profundidad),
 *    avanzando hacia el observador → efecto warp sutil.
 *  - Orbes CSS con blur y drift lento (aurora).
 *  - Lee el color del tema vía la variable CSS --star-color.
 *  - Respeta prefers-reduced-motion y se pausa con pestaña oculta.
 */
import { onBeforeUnmount, onMounted, ref } from "vue";

const canvasRef = ref(null);
let animationId = null;
let stars = [];

const STAR_COUNT = 160;

const initStars = (w, h) => {
  stars = Array.from({ length: STAR_COUNT }, () => ({
    x: (Math.random() - 0.5) * w,
    y: (Math.random() - 0.5) * h,
    z: Math.random() * w, // profundidad: menor = más lejos
  }));
};

onMounted(() => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w, h;

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    initStars(w, h);
  };
  resize();
  window.addEventListener("resize", resize);

  // Color de estrella según el tema activo (var CSS --star-color).
  const getStarRgb = () => {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--star-color")
      .trim();
    return raw || "200, 225, 255";
  };
  let starRgb = getStarRgb();
  // Relee el color al alternar el tema (el atributo data-theme cambia).
  const themeObserver = new MutationObserver(() => {
    starRgb = getStarRgb();
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  const drawFrame = () => {
    ctx.clearRect(0, 0, w, h);

    for (const star of stars) {
      star.z -= 1.2; // avance hacia el observador
      if (star.z <= 1) {
        star.z = w;
        star.x = (Math.random() - 0.5) * w;
        star.y = (Math.random() - 0.5) * h;
      }

      // Proyección en perspectiva: x/z escala al acercarse.
      const k = 128 / star.z;
      const px = star.x * k + w / 2;
      const py = star.y * k + h / 2;

      if (px < 0 || px > w || py < 0 || py > h) continue;

      // Tamaño y opacidad crecen con la cercanía (profundidad).
      const size = Math.max(0.4, (1 - star.z / w) * 2.4);
      const alpha = Math.min(1, (1 - star.z / w) * 1.2);

      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${starRgb}, ${alpha})`;
      ctx.fill();

      // Estela luminosa en las estrellas cercanas (efecto warp).
      if (alpha > 0.7) {
        ctx.strokeStyle = `rgba(${starRgb}, ${(alpha - 0.7) * 0.5})`;
        ctx.lineWidth = size / 2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px - star.x * k * 0.015, py - star.y * k * 0.015);
        ctx.stroke();
      }
    }

    animationId = requestAnimationFrame(drawFrame);
  };

  if (reducedMotion) {
    drawFrame();
    cancelAnimationFrame(animationId); // un solo frame estático
  } else {
    animationId = requestAnimationFrame(drawFrame);
  }

  // Pausa cuando la pestaña no es visible (ahorro de batería/CPU).
  const onVisibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else if (!reducedMotion) {
      animationId = requestAnimationFrame(drawFrame);
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", onVisibility);
    themeObserver.disconnect();
  });
});
</script>

<style lang="sass">
.background-3d
  position: fixed
  inset: 0
  z-index: -1
  overflow: hidden
  pointer-events: none

  .starfield
    position: absolute
    inset: 0
    width: 100%
    height: 100%

  .orb
    position: absolute
    border-radius: 50%
    filter: blur(90px)
    opacity: var(--hero-glow-opacity)
    animation: orb-drift 24s ease-in-out infinite alternate

  .orb-1
    width: 45vw
    height: 45vw
    top: -15%
    left: -10%
    background: radial-gradient(circle, var(--accent), transparent 70%)

  .orb-2
    width: 38vw
    height: 38vw
    bottom: -12%
    right: -8%
    background: radial-gradient(circle, var(--accent-2), transparent 70%)
    animation-delay: -8s

  .orb-3
    width: 28vw
    height: 28vw
    top: 40%
    left: 55%
    background: radial-gradient(circle, #a855f7, transparent 70%)
    animation-delay: -16s

@keyframes orb-drift
  0%
    transform: translate(0, 0) scale(1)
  50%
    transform: translate(6vw, -4vh) scale(1.12)
  100%
    transform: translate(-4vw, 5vh) scale(0.94)

@media (prefers-reduced-motion: reduce)
  .background-3d .orb
    animation: none
</style>