<template>
  <div class="container-ai">
    <!-- ================= HERO ================= -->
    <header class="ai-hero" v-reveal>
      <span class="exp-badge">{{ t("ai.expBadge") }}</span>
      <p class="eyebrow">{{ t("ai.eyebrow") }}</p>
      <h2 class="title">{{ t("ai.title") }}</h2>
      <p class="subtitle">{{ t("ai.subtitle") }}</p>
      <div class="hero-badges">
        <span class="badge">{{ t("ai.badges.workflows") }}</span>
        <span class="badge">{{ t("ai.badges.ai") }}</span>
        <span class="badge">{{ t("ai.badges.apis") }}</span>
        <span class="badge">{{ t("ai.badges.data") }}</span>
      </div>
    </header>

    <!-- ================= PILARES ================= -->
    <section class="ai-section" v-reveal>
      <h3 class="section-title">{{ t("ai.pillarsTitle") }}</h3>
      <div class="pillars-grid">
        <div class="pillar" v-for="(key, i) in pillarKeys" :key="key" :style="{ '--d': i * 60 + 'ms' }">
          <span class="pillar-icon">{{ pillarIcons[i] }}</span>
          <h4>{{ t(`ai.pillars.${key}.t`) }}</h4>
          <p>{{ t(`ai.pillars.${key}.x`) }}</p>
        </div>
      </div>
    </section>

    <!-- ================= DEMO ROBOT 3D =================
         Escena de fábrica (CSS 3D puro): el brazo toma los procesos
         del caos manual y los ordena en la zona automatizada. -->
    <section class="ai-section" v-reveal>
      <h3 class="section-title">{{ t("ai.demo.title") }}</h3>
      <p class="examples-lead">{{ t("ai.demo.lead") }}</p>

      <div class="factory-scene" ref="sceneEl" @mousemove="onSceneMove" @mouseleave="resetScene">
        <span class="gear gear-1" aria-hidden="true">⚙️</span>
        <span class="gear gear-2" aria-hidden="true">⚙️</span>
        <span class="gear gear-3" aria-hidden="true">⚙️</span>

        <div class="factory-floor" :style="sceneTilt">
          <!-- Zona manual: cajas dispersas y torcidas -->
          <div class="zone zone-manual">
            <span class="zone-label">{{ t("ai.demo.manual") }}</span>
            <div class="chaos">
              <div
                class="crate loose"
                :class="{ targeted: robotPhase === 'reach' && i === 0 }"
                v-for="(item, i) in looseItems"
                :key="'loose-' + item.label"
              >
                <span class="crate-icon">{{ item.icon }}</span>
                <span class="crate-name">{{ item.label }}</span>
              </div>
            </div>
          </div>

          <!-- Brazo robótico industrial.
               Fases sincronizadas: reach → grip → carry → release → return.
               La caja viaja SUJETA a la garra (no vuela sola). -->
          <div
            class="robot"
            :class="'phase-' + robotPhase"
            :style="{ rotate: pose.lean + 'deg' }"
            aria-hidden="true"
          >
            <span class="robot-shadow"></span>
            <div class="pedestal">
              <span class="warning-stripes"></span>
              <span class="pedestal-screen"></span>
              <span class="status-led" :class="{ busy: robotPhase !== 'idle' }"></span>
            </div>
            <div class="shoulder">
              <span class="servo"></span>
              <div class="arm-upper" :style="{ transform: `rotate(${pose.a1}deg)` }">
                <span class="panel-line"></span>
                <span class="hydraulic"><span class="hydraulic-rod"></span></span>
                <div class="elbow">
                  <span class="servo"></span>
                  <div class="arm-fore" :style="{ transform: `rotate(${pose.a2}deg)` }">
                    <span class="panel-line"></span>
                    <!-- Tubo telescópico hidráulico: se estira lo necesario -->
                    <span class="telescope">
                      <span
                        class="telescope-rod"
                        :style="{ height: pose.ext + 'px' }"
                      ></span>
                    </span>
                    <div
                      class="wrist"
                      :style="{ top: -(15 + pose.ext) + 'px' }"
                    >
                      <span class="servo sm"></span>
                      <div
                        class="claw"
                        :style="{ rotate: -(pose.a1 + pose.a2) + 'deg' }"
                      >
                        <span class="claw-palm"></span>
                        <span class="claw-hinge left">
                          <span
                            class="claw-finger left"
                            :style="{ rotate: pose.claw + 'deg' }"
                          ></span>
                        </span>
                        <span class="claw-hinge right">
                          <span
                            class="claw-finger right"
                            :style="{ rotate: -pose.claw + 'deg' }"
                          ></span>
                        </span>
                        <div
                          class="held-crate"
                          :class="{ dropping: heldCrate.dropping }"
                          v-if="heldCrate"
                        >
                          <span class="crate-icon">{{ heldCrate.icon }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Zona automatizada: slots ordenados + banda transportadora -->
          <div class="zone zone-auto">
            <span class="zone-label">{{ t("ai.demo.auto") }}</span>
            <div class="slots">
              <div class="slot" v-for="i in DEMO_TOTAL" :key="i">
                <div class="crate placed" v-if="doneCount >= i">
                  <span class="crate-icon">{{ demoItems[i - 1].icon }}</span>
                  <span class="crate-name">{{ demoItems[i - 1].label }}</span>
                </div>
              </div>
            </div>
            <div class="conveyor" aria-hidden="true"></div>
          </div>
        </div>
      </div>

      <p class="demo-counter" :class="{ done: doneCount >= DEMO_TOTAL }">
        {{ t("ai.demo.counter", { done: doneCount, total: DEMO_TOTAL }) }}
      </p>
      <button class="demo-restart" type="button" @click="restartDemo">
        {{ t("ai.demo.restart") }} ↺
      </button>
      <p class="cases-note">{{ t("ai.demo.caption") }}</p>
    </section>

    <!-- ================= SERVICIOS ================= -->
    <section class="ai-section" v-reveal>
      <h3 class="section-title">{{ t("ai.servicesTitle") }}</h3>
      <div class="services-grid">
        <article class="service-card" v-for="(key, i) in serviceKeys" :key="key" :style="{ '--d': i * 50 + 'ms' }">
          <span class="service-icon">{{ serviceIcons[i] }}</span>
          <h4>{{ t(`ai.services.${key}.t`) }}</h4>
          <p>{{ t(`ai.services.${key}.x`) }}</p>
        </article>
      </div>
    </section>

    <!-- ================= CASOS ================= -->
    <section class="ai-section" v-reveal>
      <h3 class="section-title">{{ t("ai.casesTitle") }}</h3>
      <div class="cases-grid">
        <article class="case-card" v-for="key in caseKeys" :key="key">
          <span class="case-tag">{{ t(`ai.cases.${key}.tag`) }}</span>
          <h4>{{ t(`ai.cases.${key}.title`) }}</h4>
          <p>{{ t(`ai.cases.${key}.text`) }}</p>
          <span class="case-result">{{ t(`ai.cases.${key}.result`) }}</span>
        </article>
      </div>
      <p class="cases-note">{{ t("ai.casesNote") }}</p>
    </section>

    <!-- ================= EJEMPLOS INTERACTIVOS =================
         Procesos comunes que casi toda empresa hace a mano hoy.
         Se expanden con clic y cada uno tiene su CTA de cotización. -->
    <section class="ai-section" v-reveal>
      <h3 class="section-title">{{ t("ai.examples.title") }}</h3>
      <p class="examples-lead">{{ t("ai.examples.lead") }}</p>
      <div class="examples-list">
        <article
          class="example"
          :class="{ open: expandedExample === key }"
          v-for="key in exampleKeys"
          :key="key"
        >
          <button class="example-head" type="button" @click="toggleExample(key)">
            <span class="example-name">{{ t(`ai.examples.items.${key}.t`) }}</span>
            <span class="example-toggle" aria-hidden="true">{{ expandedExample === key ? "−" : "+" }}</span>
          </button>
          <div class="example-body" v-show="expandedExample === key">
            <div class="example-col manual">
              <span class="col-label">{{ t("ai.examples.beforeLabel") }}</span>
              <p>{{ t(`ai.examples.items.${key}.manual`) }}</p>
            </div>
            <span class="example-arrow" aria-hidden="true">➜</span>
            <div class="example-col auto">
              <span class="col-label">{{ t("ai.examples.afterLabel") }}</span>
              <p>{{ t(`ai.examples.items.${key}.auto`) }}</p>
            </div>
            <div class="example-save">
              <span class="col-label">{{ t("ai.examples.saveLabel") }}</span>
              <strong>{{ t(`ai.examples.items.${key}.save`) }}</strong>
              <a class="example-cta" :href="exampleMailto(key)">
                {{ t("ai.examples.quoteBtn") }}
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ================= SIMULADOR DE AHORRO =================
         El visitante ingresa los datos de SU empresa y ve en vivo
         cuánto le cuesta el trabajo manual vs. automatizarlo. -->
    <section class="ai-section" v-reveal>
      <h3 class="section-title">{{ t("ai.simulator.title") }}</h3>
      <p class="examples-lead">{{ t("ai.simulator.lead") }}</p>
      <div class="sim-card" :style="simTilt" @mousemove="onSimTilt" @mouseleave="resetSimTilt">
        <div class="sim-controls">
          <div class="sim-field">
            <label>{{ t("ai.simulator.currencyLabel") }}</label>
            <div class="sim-chips">
              <button
                type="button"
                class="sim-chip"
                :class="{ active: currency === 'COP' }"
                @click="setCurrency('COP')"
              >{{ t("ai.simulator.currencies.cop") }}</button>
              <button
                type="button"
                class="sim-chip"
                :class="{ active: currency === 'USD' }"
                @click="setCurrency('USD')"
              >{{ t("ai.simulator.currencies.usd") }}</button>
            </div>
          </div>
          <div class="sim-field">
            <label>{{ t("ai.simulator.step1") }}</label>
            <div class="sim-chips">
              <button
                type="button"
                class="sim-chip"
                :class="{ active: sim.process === key }"
                v-for="key in simProcessKeys"
                :key="key"
                @click="sim.process = key"
              >{{ t(`ai.simulator.processes.${key}`) }}</button>
            </div>
          </div>
          <div class="sim-field">
            <label>{{ t("ai.simulator.step2") }}</label>
            <div class="sim-slider-row">
              <input type="range" min="1" max="80" v-model.number="sim.hours" />
              <span class="sim-value">{{ sim.hours }} h/semana</span>
            </div>
          </div>
          <div class="sim-field">
            <label>{{ t("ai.simulator.step3") }}</label>
            <div class="sim-slider-row">
              <input
                type="range"
                :min="costRange.min"
                :max="costRange.max"
                :step="costRange.step"
                v-model.number="sim.cost"
              />
              <span class="sim-value">{{ fmtMoney(sim.cost) }}/hora</span>
            </div>
            <p class="sim-hint">{{ t("ai.simulator.costHint") }}</p>
          </div>
          <div class="sim-field">
            <label>{{ t("ai.simulator.peopleLabel") }}</label>
            <div class="sim-slider-row">
              <input type="range" min="1" max="20" v-model.number="sim.people" />
              <span class="sim-value">{{ sim.people }} 👥</span>
            </div>
          </div>
        </div>

        <div class="sim-results">
          <div class="sim-block current">
            <span class="sim-block-label">{{ t("ai.simulator.resultsTitle") }}</span>
            <div class="sim-metrics">
              <div class="metric">
                <strong>{{ simHoursMonth }} h</strong>
                <span>{{ t("ai.simulator.hoursMonth") }}</span>
              </div>
              <div class="metric">
                <strong>{{ fmtMoney(displayMonth) }}</strong>
                <span>{{ t("ai.simulator.costMonth") }}</span>
              </div>
              <div class="metric">
                <strong>{{ fmtMoney(displayYear) }}</strong>
                <span>{{ t("ai.simulator.costYear") }}</span>
              </div>
            </div>
          </div>
          <div class="sim-block automated">
            <span class="sim-block-label">{{ t("ai.simulator.autoTitle") }}</span>
            <div class="sim-metrics">
              <div class="metric">
                <strong>{{ fmtMoney(displayEstimate) }}</strong>
                <span>{{ t("ai.simulator.autoOnce") }}</span>
              </div>
              <div class="metric">
                <strong>{{ fmtMoney(displaySavings) }}</strong>
                <span>{{ t("ai.simulator.savingsYear") }}</span>
              </div>
              <div class="metric">
                <strong>{{ simPaybackText }}</strong>
                <span>{{ t("ai.simulator.paybackLabel") }}</span>
              </div>
            </div>
            <a class="sim-cta" :href="simMailto">{{ t("ai.simulator.cta") }}</a>
          </div>
        </div>

        <p class="cases-note">{{ t("ai.simulator.disclaimer") }}</p>
      </div>
    </section>

    <!-- ================= PROCESO ================= -->
    <section class="ai-section" v-reveal>
      <h3 class="section-title">{{ t("ai.processTitle") }}</h3>
      <div class="process-track">
        <div class="step" v-for="key in processKeys" :key="key">
          <h4>{{ t(`ai.process.${key}.t`) }}</h4>
          <p>{{ t(`ai.process.${key}.x`) }}</p>
        </div>
      </div>
    </section>

    <!-- ================= PLANES ================= -->
    <section class="ai-section" v-reveal>
      <h3 class="section-title">{{ t("ai.plansTitle") }}</h3>
      <div class="plans-grid">
        <article
          class="plan-card"
          :class="{ featured: key === 'p2' }"
          v-for="key in planKeys"
          :key="key"
        >
          <span class="plan-flag" v-if="key === 'p2'">{{ t("ai.plans.p2.featured") }}</span>
          <h4 class="plan-name">{{ t(`ai.plans.${key}.name`) }}</h4>
          <p class="plan-price">{{ t(`ai.plans.${key}.price`) }}</p>
          <p class="plan-desc">{{ t(`ai.plans.${key}.desc`) }}</p>
          <ul class="plan-features">
            <li>{{ t(`ai.plans.${key}.f1`) }}</li>
            <li>{{ t(`ai.plans.${key}.f2`) }}</li>
            <li>{{ t(`ai.plans.${key}.f3`) }}</li>
            <li>{{ t(`ai.plans.${key}.f4`) }}</li>
          </ul>
          <a class="plan-cta" :href="mailtoUrl">{{ t(`ai.plans.${key}.cta`) }}</a>
        </article>
      </div>
      <p class="cases-note">{{ t("ai.plansNote") }}</p>
    </section>

    <!-- ================= CTA FINAL ================= -->
    <section class="ai-final-cta" v-reveal>
      <h3>{{ t("ai.ctaTitle") }}</h3>
      <p>{{ t("ai.ctaText") }}</p>
      <a class="btn-mail" :href="mailtoUrl">{{ t("ai.ctaButton") }}</a>
    </section>
  </div>
</template>

<script setup>
/**
 * AiIntegrations.vue — Landing de servicios freelance.
 * ---------------------------------------------------------------
 * Sub-página orientada a VENTA de servicios de automatización de
 * flujos de trabajo e integración de IA para micro y medianas
 * empresas: pilares (automatizar/agilizar/optimizar/maximizar),
 * servicios, casos, proceso, planes y CTA de cotización por email.
 */
import { computed, reactive, ref, watch, onBeforeUnmount } from "vue";
import { useState } from "../../../utils/globalState";
import { useI18n } from "../../../composables/useI18n";

const { t } = useI18n();
const state = useState();

const pillarKeys = ["automate", "speed", "optimize", "maximize"];
const pillarIcons = ["⚙️", "⚡", "🎯", "📈"];
const serviceKeys = ["s1", "s2", "s3", "s4", "s5", "s6"];
const serviceIcons = ["🔄", "💬", "📊", "🔗", "📝", "🧾"];
const caseKeys = ["c1", "c2", "c3"];
const processKeys = ["step1", "step2", "step3", "step4"];
const planKeys = ["p1", "p2", "p3"];

/** Enlace mailto precargado con asunto y plantilla de cotización. */
const mailtoUrl = computed(() => {
  const to = state.aboutMe[0]?.email ?? "";
  const subject = encodeURIComponent(t("ai.ctaMailSubject"));
  const body = encodeURIComponent(t("ai.ctaMailBody"));
  return `mailto:${to}?subject=${subject}&body=${body}`;
});

// ---- Ejemplos expandibles (antes/después) ----
const exampleKeys = ["reports", "invoices", "emails", "support"];
const expandedExample = ref(null);
const toggleExample = (key) => {
  expandedExample.value = expandedExample.value === key ? null : key;
};

/** mailto con el proceso elegido como asunto. */
const exampleMailto = (key) => {
  const to = state.aboutMe[0]?.email ?? "";
  const name = t(`ai.examples.items.${key}.t`);
  const subject = encodeURIComponent(t("ai.examples.mailSubject", { name }));
  const body = encodeURIComponent(t("ai.examples.mailBody", { name }));
  return `mailto:${to}?subject=${subject}&body=${body}`;
};

// ---- Simulador de ahorro (calculadora ROI) ----
const simProcessKeys = ["reports", "invoices", "emails", "support", "other"];
/** Base del estimado por complejidad del proceso (USD). */
const SIM_COMPLEXITY = { reports: 400, invoices: 650, emails: 500, support: 700, other: 550 };

const sim = reactive({ process: "reports", hours: 8, cost: 40000, people: 3 });

// ---- Divisa (COP por defecto) ----
const currency = ref("COP");
const USD_COP = 4000; // Tasa aproximada COP/USD — actualizar según la TRM.
const fmtMoney = (v) =>
  new Intl.NumberFormat(currency.value === "COP" ? "es-CO" : "en-US", {
    style: "currency",
    currency: currency.value,
    maximumFractionDigits: 0,
  }).format(v);

const costRange = computed(() =>
  currency.value === "COP"
    ? { min: 8000, max: 150000, step: 1000 }
    : { min: 2, max: 40, step: 1 }
);

const setCurrency = (c) => {
  if (c === currency.value) return;
  sim.cost =
    c === "COP"
      ? Math.min(150000, Math.max(8000, Math.round((sim.cost * USD_COP) / 1000) * 1000))
      : Math.min(40, Math.max(2, Math.round(sim.cost / USD_COP)));
  currency.value = c;
};

/** Convierte un valor base en USD a la divisa activa. */
const conv = (usd) => (currency.value === "COP" ? usd * USD_COP : usd);

const simHoursMonth = computed(() => Math.round(sim.hours * sim.people * 4.33));
const simCostMonth = computed(() => Math.round(sim.hours * sim.people * 4.33 * sim.cost));
const simCostYear = computed(() => Math.round(simCostMonth.value * 12));
/** Ahorro anual: la automatización elimina ~70% del costo del proceso. */
const simSavingsYear = computed(() => Math.round(simCostYear.value * 0.7));

/** Estimado de pago único: base USD convertida, escala con el alcance. */
const simEstimate = computed(() => {
  const base = SIM_COMPLEXITY[sim.process] ?? 550;
  return Math.round(conv(base) * (1 + Math.max(0, sim.hours - 4) * 0.05));
});

/** Retorno: en cuántos meses el ahorro mensual paga la inversión. */
const simPaybackText = computed(() => {
  const months = simEstimate.value / Math.max(simCostMonth.value * 0.7, 1);
  return months < 1
    ? t("ai.simulator.paybackFast")
    : t("ai.simulator.payback", { n: Math.max(1, Math.ceil(months)) });
});

// ---- Números animados (count-up al cambiar los sliders) ----
const animated = (source, dur = 600) => {
  const d = ref(source.value);
  watch(source, (to) => {
    const from = d.value;
    if (from === to) return;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      d.value = Math.round(from + (to - from) * e);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
  return d;
};
const displayMonth = animated(simCostMonth);
const displayYear = animated(simCostYear);
const displayEstimate = animated(simEstimate);
const displaySavings = animated(simSavingsYear);

/** mailto con los NÚMEROS que calculó el visitante (ya en su divisa). */
const simMailto = computed(() => {
  const to = state.aboutMe[0]?.email ?? "";
  const process = t(`ai.simulator.processes.${sim.process}`);
  const subject = encodeURIComponent(t("ai.simulator.mailSubject"));
  const body = encodeURIComponent(
    t("ai.simulator.mailBody", {
      process,
      hours: sim.hours,
      cost: fmtMoney(sim.cost),
      people: sim.people,
      month: fmtMoney(displayMonth.value),
      year: fmtMoney(displayYear.value),
    })
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
});

// ---- Tilt 3D de la tarjeta del simulador ----
const simTilt = ref({});
const onSimTilt = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  simTilt.value = {
    transform: `perspective(1200px) rotateY(${(x * 4).toFixed(2)}deg) rotateX(${(-y * 3).toFixed(2)}deg)`,
  };
};
const resetSimTilt = () => (simTilt.value = {});

// ---- Demo del robot industrial (fases sincronizadas) ----
const DEMO_TOTAL = 6;
const demoItems = computed(() =>
  ["📄", "🧾", "✉️", "📝", "📦", "📋"].map((icon, i) => ({
    icon,
    label: t(`ai.demo.items.c${i + 1}`),
  }))
);
const doneCount = ref(0);
const robotPhase = ref("idle"); // idle | reach | grip | carry | release | return
const heldCrate = ref(null);
const demoReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** La caja en agarre no aparece en el caos (la sostiene el brazo). */
const looseItems = computed(() =>
  demoItems.value.slice(
    doneCount.value +
      (["grip", "lift", "carry"].includes(robotPhase.value) ? 1 : 0)
  )
);

const demoTimeouts = [];
const later = (fn, ms) => demoTimeouts.push(setTimeout(fn, ms));
const clearDemoTimeouts = () => {
  demoTimeouts.forEach(clearTimeout);
  demoTimeouts.length = 0;
};

/** Secuencia pick-and-place con IK real: el brazo calcula los ángulos
 *  exactos de hombro/codo para llegar a la caja y al slot de destino. */
const CYCLE = [
  { phase: "reach", ms: 1050 }, // estira el brazo hasta la caja objetivo
  { phase: "grip", ms: 380 }, // la garra cierra sobre la caja
  { phase: "lift", ms: 480 }, // eleva la caja (movimiento de robot real)
  { phase: "carry", ms: 1300 }, // traslada la caja exactamente al slot
  { phase: "release", ms: 560 }, // abre suave y descarga con delicadeza
  { phase: "return", ms: 800 }, // vuelve a la pose de reposo
];

// ---- Cinemática inversa de 2 eslabones + extensión telescópica ----
const L1 = 104; // brazo superior (px)
const L2 = 86; // antebrazo base (px)
const EXT_MAX = 90; // recorrido máximo del tubo telescópico (px)
const sceneEl = ref(null);
// a1: hombro, a2: codo, claw: apertura de garra, ext: telescópico, lean: inclinación
const pose = reactive({ a1: -6, a2: 16, claw: 22, ext: 0, lean: 0 });

/** Resuelve hombro/codo/telescópico para llevar la garra al punto
 *  (rect.top + dy) del destino. Si el punto está fuera del alcance
 *  normal, el antebrazo SE ESTIRA como un cilindro hidráulico. */
const solveIK = (rect, dy = 0) => {
  const shoulder = sceneEl.value?.querySelector(".shoulder");
  if (!shoulder || !rect) return;
  const s = shoulder.getBoundingClientRect();
  const sx = s.left + s.width / 2;
  const sy = s.top + s.height / 2;
  const tx = rect.left + rect.width / 2 - sx;
  const ty = sy - (rect.top + dy); // y positiva hacia arriba
  pose.lean = +Math.max(-7, Math.min(7, tx / 28)).toFixed(1); // se inclina hacia el objetivo

  const raw = Math.hypot(tx, ty);
  // El telescópico se extiende SOLO lo necesario para alcanzar el punto
  pose.ext = +Math.max(0, Math.min(EXT_MAX, raw - (L1 + L2) + 10)).toFixed(0);
  const L2e = L2 + pose.ext; // longitud efectiva del antebrazo
  const d = Math.min(raw, L1 + L2e - 8, L1 + L2 - 8 + pose.ext);
  const dd = Math.max(Math.abs(L1 - L2e) + 8, Math.min(d, L1 + L2e - 8));
  const cosElbow = Math.min(1, Math.max(-1, (dd * dd - L1 * L1 - L2e * L2e) / (2 * L1 * L2e)));
  const elbow = Math.acos(cosElbow);
  const base = Math.atan2(tx, ty); // ángulo desde la vertical (clockwise +)
  const bias = Math.atan2(L2e * Math.sin(elbow), L1 + L2e * Math.cos(elbow));
  pose.a1 = +(((base - bias) * 180) / Math.PI).toFixed(1);
  pose.a2 = +((elbow * 180) / Math.PI).toFixed(1);
};

/** Apunta a la caja objetivo (por arriba) y abre la garra al máximo.
 *  Guarda el rect: el "lift" reutiliza esa medida tras ocultar la caja. */
let lastTargetRect = null;
const aimAtTarget = () => {
  const crate = sceneEl.value?.querySelector(".zone-manual .chaos .crate");
  lastTargetRect = crate?.getBoundingClientRect() ?? null;
  solveIK(lastTargetRect, 6);
  pose.claw = 44;
};

/** Apunta EXACTO al slot que le toca (horizontal o vertical) y deja la
 *  caja con su parte superior a la altura del borde del slot. */
const aimAtSlot = () => {
  const slot = sceneEl.value?.querySelectorAll(".zone-auto .slot")[
    doneCount.value
  ];
  solveIK(slot?.getBoundingClientRect(), 6);
  pose.claw = 5;
};

const restPose = () => {
  pose.a1 = -6;
  pose.a2 = 16;
  pose.claw = 22;
  pose.ext = 0;
  pose.lean = 0;
};

const runSequence = () => {
  if (doneCount.value >= DEMO_TOTAL) {
    later(startDemo, 4200); // pausa con todo ordenado y reinicia
    return;
  }
  const item = demoItems.value[doneCount.value];
  let acc = 0;
  CYCLE.forEach(({ phase, ms }) => {
    later(() => {
      robotPhase.value = phase;
      if (phase === "reach") aimAtTarget(); // estira hasta la caja, garra abierta
      if (phase === "grip") {
        // La garra cierra sobre la caja y la sujeta
        heldCrate.value = { icon: item.icon, dropping: false };
        pose.claw = 5;
      }
      if (phase === "lift") {
        // Eleva la caja unos px con precisión (movimiento de robot real)
        solveIK(lastTargetRect, -16);
      }
      if (phase === "carry") aimAtSlot(); // lleva la caja EXACTA al slot
      if (phase === "release") {
        // Apertura suave + descenso delicado de la caja (sin "pop")
        heldCrate.value = { ...heldCrate.value, dropping: true };
        pose.claw = 44;
        later(() => {
          doneCount.value += 1;
          heldCrate.value = null;
        }, 320);
      }
      if (phase === "return") restPose();
    }, acc);
    acc += ms;
  });
  later(() => {
    robotPhase.value = "idle";
    runSequence();
  }, acc);
};

const startDemo = () => {
  clearDemoTimeouts();
  doneCount.value = 0;
  heldCrate.value = null;
  robotPhase.value = "idle";
  if (demoReduced) {
    doneCount.value = DEMO_TOTAL; // sin animación: todo ordenado
    return;
  }
  later(runSequence, 500);
};

const restartDemo = () => startDemo();
startDemo();

// ---- Parallax 3D de la escena de fábrica ----
const sceneTilt = ref({});
const onSceneMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  sceneTilt.value = {
    transform: `perspective(1100px) rotateY(${(x * 7).toFixed(2)}deg) rotateX(${(-y * 4).toFixed(2)}deg)`,
  };
};
const resetScene = () => (sceneTilt.value = {});

onBeforeUnmount(clearDemoTimeouts);
</script>

<style lang="scss">
// Estilos de la landing de servicios (mismo lenguaje visual: glass + tokens).
.container-ai {
  width: 88vw;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 56px;
  padding-bottom: 40px;

  .section-title {
    margin: 0 0 22px;
    font-family: var(--font-display);
    font-size: clamp(1.3rem, 2.6vw, 1.7rem);
    text-align: center;
    color: var(--text);
  }

  // ---- Hero ----
  .ai-hero {
    text-align: center;
    padding: 40px 20px 0;

    .exp-badge {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 999px;
      font-family: var(--font-display);
      font-size: 0.74rem;
      letter-spacing: 0.5px;
      color: #fff;
      background: linear-gradient(120deg, var(--accent), var(--accent-2));
      box-shadow: 0 6px 20px var(--accent-glow);
      margin-bottom: 18px;
    }

    .eyebrow {
      margin: 0;
      font-family: var(--font-display);
      font-size: 0.8rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--accent);
    }

    .title {
      margin: 12px 0;
      font-family: var(--font-display);
      font-size: clamp(2rem, 5vw, 3.2rem);
      line-height: 1.12;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .subtitle {
      margin: 0 auto 22px;
      max-width: 680px;
      color: var(--text-muted);
      line-height: 1.75;
    }

    .hero-badges {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;

      .badge {
        padding: 8px 16px;
        border-radius: 999px;
        background: var(--card);
        border: 1px solid var(--border);
        backdrop-filter: var(--glass-blur);
        font-family: var(--font-display);
        font-size: 0.78rem;
        color: var(--text);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          border-color: var(--accent);
        }
      }
    }
  }

  // ---- Pilares ----
  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    .pillar {
      padding: 26px 20px;
      border-radius: 16px;
      background: var(--card);
      border: 1px solid var(--border);
      backdrop-filter: var(--glass-blur);
      text-align: center;
      transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease;

      &:hover {
        transform: translateY(-6px);
        border-color: var(--accent);
      }

      .pillar-icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 12px;
      }

      h4 {
        margin: 0 0 8px;
        font-family: var(--font-display);
        font-size: 1rem;
        color: var(--accent);
        letter-spacing: 1px;
        text-transform: uppercase;
      }

      p {
        margin: 0;
        font-size: 0.86rem;
        line-height: 1.65;
        color: var(--text-muted);
      }
    }
  }

  // ---- Servicios ----
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    .service-card {
      padding: 24px 22px;
      border-radius: 16px;
      background: var(--card);
      border: 1px solid var(--border);
      backdrop-filter: var(--glass-blur);
      transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
        border-color 0.35s ease, box-shadow 0.35s ease;

      &:hover {
        transform: translateY(-5px);
        border-color: var(--accent);
        box-shadow: 0 0 22px var(--accent-glow);
      }

      .service-icon {
        font-size: 1.6rem;
        display: block;
        margin-bottom: 10px;
      }

      h4 {
        margin: 0 0 8px;
        font-family: var(--font-display);
        font-size: 0.98rem;
        color: var(--text);
      }

      p {
        margin: 0;
        font-size: 0.85rem;
        line-height: 1.65;
        color: var(--text-muted);
      }
    }
  }

  // ---- Casos ----
  .cases-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    .case-card {
      display: flex;
      flex-direction: column;
      padding: 22px;
      border-radius: 16px;
      background: var(--card);
      border: 1px solid var(--border);
      backdrop-filter: var(--glass-blur);

      .case-tag {
        align-self: flex-start;
        padding: 5px 12px;
        border-radius: 999px;
        font-size: 0.72rem;
        font-family: var(--font-display);
        background: var(--card-hover);
        border: 1px solid var(--border);
        color: var(--text-muted);
        margin-bottom: 12px;
      }

      h4 {
        margin: 0 0 8px;
        font-family: var(--font-display);
        font-size: 1rem;
        color: var(--text);
      }

      p {
        margin: 0 0 14px;
        font-size: 0.84rem;
        line-height: 1.65;
        color: var(--text-muted);
        flex: 1;
      }

      .case-result {
        padding-top: 12px;
        border-top: 1px dashed var(--border);
        font-family: var(--font-display);
        font-size: 0.84rem;
        font-weight: bold;
        color: var(--accent);
      }
    }
  }

  .cases-note {
    margin: 14px 0 0;
    text-align: center;
    font-size: 0.78rem;
    font-style: italic;
    color: var(--text-muted);
    opacity: 0.75;
  }
  // ---- Proceso ----
  .process-track {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;

    .step {
      position: relative;
      padding: 20px 18px 20px 26px;
      border-left: 2px solid var(--border);

      &::before {
        content: "";
        position: absolute;
        left: -7px;
        top: 26px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: linear-gradient(120deg, var(--accent), var(--accent-2));
        box-shadow: 0 0 10px var(--accent-glow);
      }

      h4 {
        margin: 0 0 8px;
        font-family: var(--font-display);
        font-size: 0.92rem;
        color: var(--accent);
      }

      p {
        margin: 0;
        font-size: 0.82rem;
        line-height: 1.6;
        color: var(--text-muted);
      }
    }
  }

  // ---- Planes ----
  .plans-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    align-items: stretch;

    .plan-card {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 28px 24px;
      border-radius: 18px;
      background: var(--card);
      border: 1px solid var(--border);
      backdrop-filter: var(--glass-blur);
      transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease;

      &:hover {
        transform: translateY(-6px);
        border-color: var(--accent);
      }

      &.featured {
        border-color: var(--accent);
        box-shadow: 0 0 28px var(--accent-glow);
      }

      .plan-flag {
        position: absolute;
        top: -13px;
        left: 50%;
        transform: translateX(-50%);
        padding: 5px 14px;
        border-radius: 999px;
        font-family: var(--font-display);
        font-size: 0.72rem;
        white-space: nowrap;
        color: #fff;
        background: linear-gradient(120deg, var(--accent), var(--accent-2));
        box-shadow: 0 4px 14px var(--accent-glow);
      }

      .plan-name {
        margin: 0 0 6px;
        font-family: var(--font-display);
        font-size: 1.1rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: var(--text);
      }

      .plan-price {
        margin: 0 0 4px;
        font-family: var(--font-display);
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--accent);
      }

      .plan-desc {
        margin: 0 0 16px;
        font-size: 0.8rem;
        color: var(--text-muted);
      }

      .plan-features {
        list-style: none;
        margin: 0 0 22px;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 9px;
        flex: 1;

        li {
          font-size: 0.85rem;
          color: var(--text);
          line-height: 1.5;
        }
      }

      .plan-cta {
        display: block;
        text-align: center;
        padding: 11px 18px;
        border-radius: 12px;
        font-family: var(--font-display);
        font-size: 0.9rem;
        color: var(--text);
        border: 1px solid var(--accent);
        transition: all 0.3s ease;

        &:hover {
          color: #fff;
          background: linear-gradient(120deg, var(--accent), var(--accent-2));
          box-shadow: 0 6px 20px var(--accent-glow);
        }
      }
    }
  }

  // ---- Ejemplos expandibles ----
  .examples-lead {
    margin: -14px auto 22px;
    max-width: 620px;
    text-align: center;
    font-size: 0.9rem;
    line-height: 1.7;
    color: var(--text-muted);
  }

  .examples-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 860px;
    margin: 0 auto;
    width: 100%;

    .example {
      border-radius: 14px;
      background: var(--card);
      border: 1px solid var(--border);
      backdrop-filter: var(--glass-blur);
      overflow: hidden;
      transition: border-color 0.3s ease;

      &.open {
        border-color: var(--accent);
      }

      .example-head {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        padding: 16px 20px;
        background: transparent;
        border: none;
        cursor: pointer;
        text-align: left;

        .example-name {
          font-family: var(--font-display);
          font-size: 0.95rem;
          color: var(--text);
        }

        .example-toggle {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          font-size: 1.1rem;
          color: var(--accent);
          background: var(--card-hover);
          border: 1px solid var(--border);
          transition: transform 0.3s ease;
        }
      }

      &.open .example-toggle {
        transform: rotate(180deg);
      }
      // __EX2__

      .example-body {
        display: flex;
        align-items: stretch;
        gap: 14px;
        padding: 0 20px 18px;
        flex-wrap: wrap;

        .example-col {
          flex: 1;
          min-width: 240px;
          padding: 14px 16px;
          border-radius: 12px;

          p {
            margin: 6px 0 0;
            font-size: 0.83rem;
            line-height: 1.6;
          }

          .col-label {
            font-family: var(--font-display);
            font-size: 0.7rem;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            opacity: 0.8;
          }

          &.manual {
            background: var(--card-hover);
            border: 1px solid var(--border);

            .col-label { color: #f87171; }
            p { color: var(--text-muted); }
          }

          &.auto {
            background: color-mix(in srgb, var(--accent) 8%, transparent);
            border: 1px solid var(--accent);

            .col-label { color: var(--accent); }
            p { color: var(--text); }
          }
        }

        .example-arrow {
          align-self: center;
          flex-shrink: 0;
          font-size: 1.2rem;
          color: var(--accent);
        }

        .example-save {
          flex: 1;
          min-width: 200px;
          padding: 14px 16px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;

          .col-label {
            font-family: var(--font-display);
            font-size: 0.7rem;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: var(--text-muted);
          }

          strong {
            font-family: var(--font-display);
            font-size: 1.05rem;
            color: var(--accent);
          }

          .example-cta {
            margin-top: 4px;
            padding: 9px 14px;
            border-radius: 10px;
            text-align: center;
            font-family: var(--font-display);
            font-size: 0.8rem;
            color: var(--text);
            border: 1px solid var(--accent);
            transition: all 0.3s ease;

            &:hover {
              color: #fff;
              background: linear-gradient(120deg, var(--accent), var(--accent-2));
            }
          }
        }
      }
    }
  }
  // ---- Simulador de ahorro ----
  .sim-card {
    max-width: 860px;
    margin: 0 auto;
    width: 100%;
    padding: 28px 26px;
    border-radius: 20px;
    background: var(--card);
    border: 1px solid var(--border);
    backdrop-filter: var(--glass-blur);
    display: flex;
    flex-direction: column;
    gap: 24px;

    .sim-controls {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;

      .sim-field {
        display: flex;
        flex-direction: column;
        gap: 10px;

        > label {
          font-family: var(--font-display);
          font-size: 0.82rem;
          color: var(--text);
          letter-spacing: 0.5px;
        }
      }
    }

    .sim-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .sim-chip {
        padding: 8px 15px;
        border-radius: 999px;
        font-family: var(--font-display);
        font-size: 0.78rem;
        color: var(--text);
        background: var(--card-hover);
        border: 1px solid var(--border);
        cursor: pointer;
        transition: all 0.25s ease;

        &:hover {
          border-color: var(--accent);
        }

        &.active {
          color: #fff;
          background: linear-gradient(120deg, var(--accent), var(--accent-2));
          border-color: transparent;
          box-shadow: 0 4px 14px var(--accent-glow);
        }
      }
    }

    .sim-slider-row {
      display: flex;
      align-items: center;
      gap: 16px;

      input[type="range"] {
        flex: 1;
        height: 5px;
        accent-color: var(--accent);
        cursor: pointer;
      }

      .sim-value {
        flex-shrink: 0;
        min-width: 110px;
        font-family: var(--font-display);
        font-size: 0.88rem;
        font-weight: bold;
        color: var(--accent);
        text-align: right;
      }
    }

    .sim-hint {
      margin: 0;
      font-size: 0.72rem;
      color: var(--text-muted);
      opacity: 0.8;
    }

    .sim-results {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;

      .sim-block {
        padding: 20px;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        gap: 14px;

        .sim-block-label {
          font-family: var(--font-display);
          font-size: 0.72rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .sim-metrics {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
          flex: 1;

          .metric {
            display: flex;
            flex-direction: column;
            gap: 3px;

            strong {
              font-family: var(--font-display);
              font-size: 1.35rem;
              line-height: 1.1;
            }

            span {
              font-size: 0.72rem;
              color: var(--text-muted);
            }
          }
        }
      }

      .sim-block.current {
        background: var(--card-hover);
        border: 1px solid var(--border);

        .sim-block-label { color: #f87171; }
        .metric strong { color: #f87171; }
      }

      .sim-block.automated {
        background: color-mix(in srgb, var(--accent) 8%, transparent);
        border: 1px solid var(--accent);

        .sim-block-label { color: var(--accent); }
        .metric strong { color: var(--accent); }
      }
    }

    .sim-cta {
      padding: 11px 18px;
      border-radius: 12px;
      text-align: center;
      font-family: var(--font-display);
      font-size: 0.88rem;
      color: #fff;
      background: linear-gradient(120deg, var(--accent), var(--accent-2));
      box-shadow: 0 6px 20px var(--accent-glow);
      transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);

      &:hover {
        transform: translateY(-2px) scale(1.02);
        color: #fff;
        box-shadow: 0 10px 28px var(--accent-glow);
      }
    }
  }
  .ai-final-cta {
    text-align: center;
    padding: 44px 24px;
    border-radius: 22px;
    background: linear-gradient(140deg, var(--card), transparent 130%);
    border: 1px solid var(--border);
    backdrop-filter: var(--glass-blur);

    h3 {
      margin: 0 0 12px;
      font-family: var(--font-display);
      font-size: clamp(1.4rem, 3vw, 1.9rem);
      color: var(--text);
    }

    p {
      margin: 0 auto 24px;
      max-width: 560px;
      color: var(--text-muted);
      line-height: 1.7;
    }

    .btn-mail {
      display: inline-block;
      padding: 14px 34px;
      border-radius: 14px;
      font-family: var(--font-display);
      font-size: 1rem;
      color: #fff;
      background: linear-gradient(120deg, var(--accent), var(--accent-2));
      box-shadow: 0 6px 24px var(--accent-glow);
      transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);

      &:hover {
        transform: translateY(-3px) scale(1.03);
        color: #fff;
        box-shadow: 0 10px 34px var(--accent-glow);
      }
    }
  }
}

  // ---- Demo robot 3D (protagonista de la página) ----
  .factory-scene {
    position: relative;
    padding: 34px 14px 30px;
    border-radius: 22px;
    background:
      radial-gradient(ellipse at 50% 120%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%),
      var(--card);
    border: 1px solid var(--border);
    backdrop-filter: var(--glass-blur);
    overflow: hidden;
    perspective: 1100px;

    .gear {
      position: absolute;
      font-size: 2.2rem;
      opacity: 0.22;
      pointer-events: none;
      animation: gear-spin 14s linear infinite;
      user-select: none;
    }

    .gear-1 { top: 6%; left: 5%; }
    .gear-2 { top: 58%; right: 4%; font-size: 3rem; animation-duration: 22s; animation-direction: reverse; }
    .gear-3 { top: 16%; right: 25%; font-size: 1.5rem; animation-duration: 9s; }
  }

  .factory-floor {
    position: relative;
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 84px;
    transform-style: preserve-3d;
    transition: transform 0.25s ease-out;
  }

  .zone {
    flex: 1;
    min-width: 190px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .zone-label {
      font-family: var(--font-display);
      font-size: 0.7rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      text-align: center;
      color: var(--text-muted);
    }
  }

  .crate {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--card-hover);
    border: 1px solid var(--border);

    .crate-icon { font-size: 1.3rem; }
    .crate-name {
      font-size: 0.64rem;
      font-family: var(--font-display);
      color: var(--text-muted);
      white-space: nowrap;
    }
  }

  // Caos manual: cajas torcidas con jitter
  .zone-manual .chaos {
    flex: 1;
    min-height: 200px;
    border: 2px dashed var(--border);
    border-radius: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    justify-content: center;
    padding: 14px;

    .crate.loose {
      animation: crate-jitter 2.4s ease-in-out infinite;

      &:nth-child(2n) { rotate: -7deg; }
      &:nth-child(3n) { rotate: 6deg; }
      &:nth-child(4n) { rotate: -4deg; }
    }
  }
  // Brazo robótico industrial — detalle metálico, servos, pistón hidráulico
  .robot {
    position: relative;
    width: 150px;
    flex-shrink: 0;
    align-self: flex-end;
    height: 250px;
    transform-style: preserve-3d;
    transform-origin: 50% 100%;
    transition: rotate 1.1s cubic-bezier(0.45, 0, 0.2, 1);
    animation: robot-bob 4.5s ease-in-out infinite;

    .robot-shadow {
      position: absolute;
      bottom: 2px;
      left: 12%;
      width: 76%;
      height: 14px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.32);
      filter: blur(5px);
    }

    // Pedestal con franjas de advertencia y pantalla de estado
    .pedestal {
      position: absolute;
      bottom: 6px;
      left: 50%;
      translate: -50% 0;
      width: 96px;
      height: 34px;
      border-radius: 10px;
      background: linear-gradient(180deg, #46536f 0%, #2a3247 60%, #1d2334 100%);
      border: 1px solid #4a5674;
      box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.18), inset 0 -4px 8px rgba(0, 0, 0, 0.4);
      overflow: hidden;

      .warning-stripes {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 9px;
        background: repeating-linear-gradient(-45deg, rgba(255, 193, 7, 0.85) 0 8px, rgba(0, 0, 0, 0.55) 8px 16px);
        opacity: 0.75;
      }

      .pedestal-screen {
        position: absolute;
        top: 6px;
        left: 10px;
        width: 34px;
        height: 12px;
        border-radius: 3px;
        background: linear-gradient(180deg, #0f1b2d, #16324f);
        box-shadow: inset 0 0 4px rgba(56, 189, 248, 0.6);
      }

      .status-led {
        position: absolute;
        top: 8px;
        right: 12px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #4ade80;
        box-shadow: 0 0 8px #4ade80;

        &.busy {
          background: #fbbf24;
          box-shadow: 0 0 10px #fbbf24;
          animation: led-blink 0.5s steps(2) infinite;
        }
      }
    }
    // Hombro: servo pivote principal
    .shoulder {
      position: absolute;
      bottom: 36px;
      left: 50%;
      translate: -50% 0;
      width: 40px;
      height: 40px;

      .servo {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: radial-gradient(circle at 35% 30%, #8b97bd, #414d70 55%, #232c44);
        border: 1px solid #55628a;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.3);

        &::after {
          content: "";
          position: absolute;
          inset: 11px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 35%, #cbd5f5, #5c6a96 70%);
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
        }
      }
    }

    // Brazo superior: rota desde el hombro
    .arm-upper {
      position: absolute;
      bottom: 30px;
      left: 50%;
      width: 17px;
      height: 104px;
      margin-left: -8px;
      border-radius: 9px;
      transform-origin: 50% 100%;
      background: linear-gradient(90deg, #7d89b3 0%, #3c4768 45%, #232c44 100%);
      border: 1px solid #55628a;
      box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.22), 0 6px 14px rgba(0, 0, 0, 0.35);
      transform: rotate(-6deg);
      transition: transform 0.9s cubic-bezier(0.45, 0, 0.2, 1);

      .panel-line {
        position: absolute;
        left: 3px;
        top: 14px;
        bottom: 12px;
        width: 1px;
        background: rgba(255, 255, 255, 0.14);
        box-shadow: 10px 0 0 rgba(255, 255, 255, 0.1);
      }

      .hydraulic {
        position: absolute;
        left: -12px;
        top: 12px;
        width: 7px;
        height: 58px;
        border-radius: 4px;
        background: linear-gradient(90deg, #2c3552, #4d5980);
        overflow: hidden;

        .hydraulic-rod {
          position: absolute;
          left: 1px;
          top: 0;
          width: 3px;
          height: 100%;
          border-radius: 3px;
          background: linear-gradient(90deg, #e2e8f8, #8b97bd);
          transition: height 0.9s cubic-bezier(0.45, 0, 0.2, 1);
        }
      }
      // Codo con servo
      .elbow {
        position: absolute;
        top: -17px;
        left: 50%;
        translate: -50% 0;
        width: 34px;
        height: 34px;

        .servo {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #8b97bd, #414d70 55%, #232c44);
          border: 1px solid #55628a;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.3);

          &::after {
            content: "";
            position: absolute;
            inset: 10px;
            border-radius: 50%;
            background: radial-gradient(circle at 40% 35%, #cbd5f5, #5c6a96 70%);
          }
        }

        .arm-fore {
          position: absolute;
          bottom: 26px;
          left: 50%;
          width: 14px;
          height: 86px;
          margin-left: -7px;
          border-radius: 8px;
          transform-origin: 50% 100%;
          background: linear-gradient(90deg, #8f9cc4 0%, #49547a 45%, #2a3247 100%);
          border: 1px solid #5d6a92;
          transform: rotate(16deg);
          transition: transform 0.9s cubic-bezier(0.45, 0, 0.2, 1);
          box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.22);

          .panel-line {
            position: absolute;
            left: 3px;
            top: 12px;
            bottom: 10px;
            width: 1px;
            background: rgba(255, 255, 255, 0.14);
          }

      // Tubo telescópico hidráulico del antebrazo
      .telescope {
        position: absolute;
        bottom: 100%;
        left: 50%;
        translate: -50% 0;
        width: 10px;
        height: 14px;
        border-radius: 4px 4px 0 0;
        background: linear-gradient(90deg, #2c3552, #55628a 50%, #232c44);
        border: 1px solid #55628a;
        border-bottom: none;

        // Vástago cromado que crece según la extensión calculada
        .telescope-rod {
          position: absolute;
          bottom: 100%;
          left: 1px;
          width: 6px;
          height: 0;
          border-radius: 3px 3px 0 0;
          background: linear-gradient(90deg, #f1f5ff 0%, #aab6dd 45%, #7d89b3 100%);
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.25);
          transition: height 1.05s cubic-bezier(0.45, 0, 0.2, 1);
        }
      }

          // Muñeca + garra de precisión
          .wrist {
            position: absolute;
            top: -15px;
            left: 50%;
            translate: -50% 0;
            width: 26px;
            height: 26px;
            z-index: 3;
            transition:
              top 1.05s cubic-bezier(0.45, 0, 0.2, 1),
              rotate 0.9s cubic-bezier(0.45, 0, 0.2, 1);

            .servo.sm {
              position: absolute;
              inset: 0;
              border-radius: 50%;
              background: radial-gradient(circle at 35% 30%, #8b97bd, #414d70 55%, #232c44);
              border: 1px solid #55628a;
            }

            .claw {
              position: absolute;
              top: 20px;
              left: 50%;
              translate: -50% 0;
              width: 48px;
              height: 34px;
              // Compensación de muñeca: contra-rota para apuntar SIEMPRE
              // hacia abajo (así la garra nunca se ve "hacia atrás").
              transition: rotate 0.9s cubic-bezier(0.45, 0, 0.2, 1);

              // Palma metálica con tornillo central
              .claw-palm {
                position: absolute;
                top: 0;
                left: 50%;
                translate: -50% 0;
                width: 30px;
                height: 10px;
                border-radius: 5px;
                background: linear-gradient(180deg, #aab6dd 0%, #6b789f 55%, #39435f 100%);
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.4);

                &::after {
                  content: "";
                  position: absolute;
                  top: 3px;
                  left: 50%;
                  translate: -50% 0;
                  width: 4px;
                  height: 4px;
                  border-radius: 50%;
                  background: rgba(0, 0, 0, 0.5);
                }
              }

              // Bisagras EXTERIORES: los dedos pivotan hacia afuera
              .claw-hinge {
                position: absolute;
                top: 6px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: radial-gradient(circle at 35% 30%, #9aa6cd, #39435f 70%);
                border: 1px solid #55628a;
                z-index: 2;

                &.left { left: -2px; }
                &.right { right: -2px; }
              }

              .claw-finger {
                position: absolute;
                top: 8px;
                width: 7px;
                height: 26px;
                border-radius: 3px;
                background: linear-gradient(90deg, #9aa6cd 0%, var(--accent) 40%, #1d6fa5 100%);
                box-shadow: 0 0 10px var(--accent-glow), inset 0 1px 2px rgba(255, 255, 255, 0.5);
                transform-origin: 50% 4px;
                transition: rotate 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);

                // Pads de agarre en el lado INTERIOR (hacia la caja)
                &::after {
                  content: "";
                  position: absolute;
                  bottom: 2px;
                  height: 9px;
                  width: 3px;
                  border-radius: 2px;
                  background: #0f172a;
                  opacity: 0.9;
                }
              }

              .claw-finger.left {
                left: 3px;
                rotate: 44deg;

                &::after { right: 0; }
              }

              .claw-finger.right {
                right: 3px;
                rotate: -44deg;

                &::after { left: 0; }
              }

              // La caja SUJETA viaja con la garra (hija del claw), nivelada
              // por la compensación de muñeca. Al soltar, desciende con
              // delicadeza (crossfade con el slot) — sin "pop".
              .held-crate {
                position: absolute;
                top: 14px;
                left: 50%;
                translate: -50% 0;
                padding: 6px 9px;
                border-radius: 9px;
                background: var(--card-hover);
                border: 1px solid var(--accent);
                box-shadow: 0 0 16px var(--accent-glow), 0 6px 14px rgba(0, 0, 0, 0.35);
                animation: crate-grab 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                transition:
                  translate 0.32s ease-in,
                  opacity 0.32s ease-in;

                &.dropping {
                  translate: -50% 12px;
                  opacity: 0;
                }

                .crate-icon { font-size: 1.15rem; display: block; }
              }
            }
          }
        }
      }
    }
    // ---- Duraciones por fase (los ángulos los calcula la IK en JS) ----
    &.phase-reach {
      .arm-upper { transition-duration: 1.05s; }
      .arm-fore { transition-duration: 1.05s; }
      .wrist { transition-duration: 1.05s; }
      .telescope-rod { transition-duration: 1.05s; }
      .claw-finger { transition-duration: 0.5s; }
    }

    &.phase-grip {
      .arm-upper { transition-duration: 0.35s; }
      .arm-fore { transition-duration: 0.35s; }
      .wrist { transition-duration: 0.35s; }
      .telescope-rod { transition-duration: 0.35s; }
      .claw-finger { transition-duration: 0.3s; }
    }

    &.phase-lift {
      .arm-upper { transition-duration: 0.48s; }
      .arm-fore { transition-duration: 0.48s; }
      .wrist { transition-duration: 0.48s; }
      .telescope-rod { transition-duration: 0.48s; }
    }

    &.phase-carry {
      .arm-upper { transition-duration: 1.3s; }
      .arm-fore { transition-duration: 1.3s; }
      .wrist { transition-duration: 1.3s; }
      .telescope-rod { transition-duration: 1.3s; }
      .claw-finger { transition-duration: 0.3s; }
    }

    &.phase-release {
      .arm-upper { transition-duration: 0.4s; }
      .arm-fore { transition-duration: 0.4s; }
      .wrist { transition-duration: 0.4s; }
      .telescope-rod { transition-duration: 0.4s; }
      .claw-finger { transition-duration: 0.32s; }
    }

    &.phase-return {
      .arm-upper { transition-duration: 0.78s; }
      .arm-fore { transition-duration: 0.78s; }
      .wrist { transition-duration: 0.78s; }
      .telescope-rod { transition-duration: 0.78s; }
      .claw-finger { transition-duration: 0.5s; }
    }

    // ---- Texturas industriales ----
    // Rejilla de ventilación en el brazo superior
    .arm-upper::before {
      content: "";
      position: absolute;
      left: 3px;
      right: 3px;
      top: 8px;
      height: 4px;
      border-radius: 2px;
      background: repeating-linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.4) 0 3px,
        rgba(255, 255, 255, 0.12) 3px 6px
      );
    }

    // Rejilla en el antebrazo
    .arm-fore::before {
      content: "";
      position: absolute;
      left: 2px;
      right: 2px;
      top: 6px;
      height: 3px;
      border-radius: 2px;
      background: repeating-linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.4) 0 2px,
        rgba(255, 255, 255, 0.12) 2px 5px
      );
    }

    // Metal cepillado: micro-líneas horizontales sobre ambos segmentos
    .arm-upper::after,
    .arm-fore::after {
      content: "";
      position: absolute;
      inset: 2px;
      border-radius: 7px;
      background: repeating-linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.055) 0 1px,
        transparent 1px 3px
      );
      pointer-events: none;
    }

    // Tornillos en los servos (4 pernos)
    .servo::before {
      content: "";
      position: absolute;
      top: 4px;
      left: 4px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.5);
      box-shadow:
        26px 0 0 rgba(0, 0, 0, 0.5),
        0 26px 0 rgba(0, 0, 0, 0.5),
        26px 26px 0 rgba(0, 0, 0, 0.5);
    }

    .servo.sm::before {
      box-shadow:
        18px 0 0 rgba(0, 0, 0, 0.5),
        0 18px 0 rgba(0, 0, 0, 0.5),
        18px 18px 0 rgba(0, 0, 0, 0.5);
    }

    // Pads de goma en las puntas de la garra
    .claw-finger::after {
      content: "";
      position: absolute;
      bottom: 1px;
      left: 0;
      right: 0;
      height: 8px;
      border-radius: 2px;
      background: #0f172a;
      opacity: 0.85;
    }

    // Resaltado del objetivo durante "reach"
    .zone-manual .crate.targeted {
      border-color: var(--accent);
      box-shadow: 0 0 16px var(--accent-glow);
      animation: target-pulse 1s ease-in-out infinite;
    }
    }
  // Zona automatizada: slots ordenados + banda
  .zone-auto .slots {
    flex: 1;
    min-height: 200px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    align-content: center;
    padding: 14px;
    border-radius: 16px;
    background: color-mix(in srgb, var(--accent) 6%, transparent);
    border: 1px solid var(--border);

    .slot {
      min-height: 64px;
      display: grid;
      place-items: center;
      border-radius: 10px;
      border: 1px dashed var(--border);
    }

    .crate.placed {
      border-color: var(--accent);
      background: color-mix(in srgb, var(--accent) 12%, var(--card-hover));
      animation: crate-land 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }
  }

  .conveyor {
    height: 8px;
    border-radius: 6px;
    background: repeating-linear-gradient(90deg, var(--border) 0 12px, transparent 12px 24px);
    animation: conveyor-move 1.2s linear infinite;
  }

  .demo-counter {
    margin: 18px 0 0;
    text-align: center;
    font-family: var(--font-display);
    font-size: 0.9rem;
    color: var(--accent);

    &.done { color: #4ade80; }
  }

  .demo-restart {
    display: block;
    margin: 12px auto 0;
    padding: 9px 18px;
    border-radius: 10px;
    background: var(--card-hover);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: var(--font-display);
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
  }

// ---- Keyframes de la fábrica ----
@keyframes gear-spin {
  to { transform: rotate(360deg); }
}

@keyframes crate-jitter {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -3px; }
}

@keyframes led-blink {
  50% { opacity: 0.25; }
}

@keyframes crate-grab {
  0% { scale: 0.6; opacity: 0; }
  100% { scale: 1; opacity: 1; }
}

@keyframes robot-bob {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -3px; }
}

@keyframes crate-land {
  0% { translate: 0 -10px; scale: 1.05; opacity: 0; }
  70% { translate: 0 2px; scale: 0.99; opacity: 1; }
  100% { translate: 0 0; scale: 1; opacity: 1; }
}

@keyframes target-pulse {
  0%, 100% { box-shadow: 0 0 10px var(--accent-glow); }
  50% { box-shadow: 0 0 22px var(--accent-glow); }
}

@keyframes conveyor-move {
  to { background-position-x: 24px; }
}

@media (prefers-reduced-motion: reduce) {
  .factory-scene .gear,
  .zone-manual .crate.loose,
  .conveyor,
  .robot {
    animation: none;
  }
  .robot .arm-upper,
  .robot .arm-fore,
  .robot .claw-finger,
  .robot .wrist,
  .robot .telescope-rod {
    transition: none;
  }
}

// ---- Responsive ----
@media screen and (max-width: 1000px) {
  .container-ai {
    .pillars-grid,
    .process-track {
      grid-template-columns: repeat(2, 1fr);
    }

    .services-grid,
    .cases-grid,
    .plans-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    // La fábrica pasa a vertical ANTES de que se desborde
    .factory-floor {
      flex-direction: column;
      gap: 26px;
      align-items: center;

      .zone {
        width: 100%;
        min-width: 0;
      }

      .robot {
        order: 2;
        align-self: center;
        height: 220px;
      }

      .zone-manual { order: 1; }
      .zone-auto { order: 3; }
    }

    .zone-auto .slots {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .zone-manual .chaos {
      min-height: 140px;
      padding: 12px;
    }
  }
}

@media screen and (max-width: 640px) {
  .container-ai {
    width: 92%;

    .pillars-grid,
    .services-grid,
    .cases-grid,
    .plans-grid,
    .process-track {
      grid-template-columns: 1fr;
    }

    // Fábrica compacta: todo cabe sin desbordes
    .factory-scene {
      padding: 22px 10px 24px;
    }

    .factory-floor {
      gap: 20px;

      .robot {
        width: 120px;
        height: 200px;
        scale: 0.92;
      }
    }

    .zone-manual .chaos {
      min-height: 110px;
      gap: 8px;
      padding: 10px;

      .crate {
        padding: 7px 9px;

        .crate-icon { font-size: 1.05rem; }
        .crate-name { font-size: 0.58rem; }
      }
    }

    .zone-auto .slots {
      gap: 7px;
      padding: 10px;
      min-height: 0;

      .slot { min-height: 54px; }
    }

    .sim-card {
      padding: 20px 16px;

      .sim-results {
        grid-template-columns: 1fr;
      }

      .sim-metrics { gap: 14px; }
    }
  }
}
</style>
