/**
 * useReveal.js
 * ---------------------------------------------------------------
 * Directiva global `v-reveal`: anima la entrada del elemento cuando
 * entra en viewport (IntersectionObserver, sin librerías externas).
 *
 * Uso: <div v-reveal>              → aparición con fade+slide
 *      <div v-reveal="200">        → con retardo de 200ms (efecto cascada)
 */
const observer =
  typeof IntersectionObserver !== "undefined"
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-visible");
              observer.unobserve(entry.target); // anima solo una vez
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      )
    : null;

export const vReveal = {
  mounted(el, binding) {
    el.classList.add("reveal");
    if (typeof binding.value === "number") {
      el.style.transitionDelay = `${binding.value}ms`;
    }
    if (observer) {
      observer.observe(el);
    } else {
      el.classList.add("reveal-visible"); // fallback: sin animación
    }
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};