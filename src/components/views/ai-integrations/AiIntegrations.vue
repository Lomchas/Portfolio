<template>
  <div class="container-ai">
    <!-- HERO -->
    <header class="ai-hero" v-reveal>
      <p class="eyebrow">— AI Integrations</p>
      <h2 class="title">Artificial Intelligence, applied for real</h2>
      <p class="subtitle">
        I connect AI to products, processes and people: from prompt
        engineering to automations that save hours of work every week.
      </p>
      <div class="hero-badges">
        <span class="badge">🧠 LLMs</span>
        <span class="badge">🔌 APIs</span>
        <span class="badge">⚙️ Automations</span>
        <span class="badge">🎨 Generative content</span>
      </div>
    </header>

    <!-- CAPABILITIES GRID -->
    <div class="ai-grid">
      <article class="ai-card" v-reveal>
        <div class="card-icon">🧠</div>
        <h3 class="card-title">AI Prompting</h3>
        <p class="card-text">
          Advanced prompt engineering: structured prompts, role/system design
          and iterative refinement to get consistent, production-ready
          outputs from LLMs (ChatGPT, Claude, Gemini).
        </p>
      </article>

      <article class="ai-card" v-reveal="80">
        <div class="card-icon">🔌</div>
        <h3 class="card-title">Apps & API Integrations</h3>
        <p class="card-text">
          I connect AI models to real products: REST APIs, webhooks,
          databases and existing apps — adding chat, analysis and
          generation features where they actually create value.
        </p>
      </article>

      <article class="ai-card" v-reveal="160">
        <div class="card-icon">🎨</div>
        <h3 class="card-title">Design & Illustrative Content</h3>
        <p class="card-text">
          Creation of illustrative and visual content with generative
          tools: assets for web, presentations and branding, keeping a
          coherent visual identity across the product.
        </p>
      </article>

      <!-- AUTOMATIZACIONES: tarjeta ancha con experiencia demostrable -->
      <article class="ai-card card-automation" v-reveal="240">
        <div class="automation-head">
          <div class="card-icon">⚙️</div>
          <div>
            <h3 class="card-title">Automations & Time Savings</h3>
            <p class="card-tagline">Less repetitive work, more production.</p>
          </div>
          <span class="exp-badge" title="Real professional experience">
            ✅ Proven experience · Renault Sofasa Colombia
          </span>
        </div>

        <div class="automation-grid">
          <div class="automation-item">
            <h4>Administrative & industrial processes</h4>
            <p>
              Automation of repetitive flows: reporting, document handling,
              data entry and internal requests, combining AI with scripts
              and integrations.
            </p>
          </div>
          <div class="automation-item">
            <h4>Production maximization</h4>
            <p>
              AI-assisted planning and monitoring to identify bottlenecks
              and increase throughput in industrial environments.
            </p>
          </div>
          <div class="automation-item">
            <h4>Time & resource reduction</h4>
            <p>
              Measurable savings: fewer manual hours, fewer errors and
              better use of existing tools before buying new ones.
            </p>
          </div>
          <div class="automation-item">
            <h4>Real-world impact</h4>
            <p>
              Applied in a manufacturing context at
              <strong>Renault Sofasa Colombia</strong>, where automation
              meets strict quality and traceability standards.
            </p>
          </div>
        </div>
      </article>
    </div>

    <!-- CTA -->
    <div class="ai-cta" v-reveal>
      <p>Want to bring AI into your project or process?</p>
      <RouterLink to="/contact-me" class="btn-primary">Let's talk 🚀</RouterLink>
    </div>
  </div>
</template>

<script setup>
/**
 * AiIntegrations.vue
 * ---------------------------------------------------------------
 * Módulo de integraciones con IA: prompting, integraciones con
 * apps/APIs, contenido generativo y automatizaciones (con
 * experiencia demostrable en Renault Sofasa Colombia).
 * Reutiliza el lenguaje visual del portafolio (glass + tokens).
 */
import { RouterLink } from "vue-router";
</script>

<style lang="scss">
// Estilos del módulo AI (mismo lenguaje visual: glass + tokens).
.container-ai {
  width: 88vw;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;

  // ---- Hero ----
  .ai-hero {
    text-align: center;
    padding: 40px 20px 10px;

    .eyebrow {
      margin: 0;
      font-family: var(--font-display);
      font-size: 0.8rem;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--accent);
    }

    .title {
      margin: 10px 0;
      font-family: var(--font-display);
      font-size: clamp(1.8rem, 4vw, 2.8rem);
      line-height: 1.15;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .subtitle {
      margin: 0 auto 20px;
      max-width: 640px;
      color: var(--text-muted);
      line-height: 1.7;
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

  // ---- Grid de capacidades ----
  .ai-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    .ai-card {
      background: var(--card);
      border: 1px solid var(--border);
      backdrop-filter: var(--glass-blur);
      border-radius: 20px;
      padding: 26px 26px;
      transition: border-color 0.3s ease, box-shadow 0.3s ease,
        transform 0.3s ease;

      &:hover {
        border-color: var(--accent);
        box-shadow: 0 10px 34px var(--accent-glow);
        transform: translateY(-4px);
      }

      .card-icon {
        width: 54px;
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        border-radius: 14px;
        background: var(--card-hover);
        border: 1px solid var(--border);
        margin-bottom: 16px;
      }

      .card-title {
        margin: 0 0 10px;
        font-family: var(--font-display);
        font-size: 1.02rem;
        color: var(--accent);
      }

      .card-text {
        margin: 0;
        color: var(--text-muted);
        line-height: 1.75;
        font-size: 0.92rem;
      }
    }

    // Tarjeta de automatizaciones: ocupa todo el ancho (2ª fila).
    .card-automation {
      grid-column: 1 / -1;
      padding: 30px 32px;

      .automation-head {
        display: flex;
        align-items: center;
        gap: 18px;
        flex-wrap: wrap;
        margin-bottom: 22px;

        .card-icon {
          margin-bottom: 0;
        }

        .card-title {
          margin: 0 0 4px;
          font-size: 1.2rem;
        }

        .card-tagline {
          margin: 0;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .exp-badge {
          margin-left: auto;
          padding: 9px 16px;
          border-radius: 999px;
          font-family: var(--font-display);
          font-size: 0.74rem;
          letter-spacing: 0.5px;
          color: #fff;
          background: linear-gradient(120deg, var(--accent), var(--accent-2));
          box-shadow: 0 6px 20px var(--accent-glow);
          white-space: nowrap;
        }
      }

      .automation-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;

        .automation-item {
          padding: 18px;
          border-radius: 14px;
          background: var(--card-hover);
          border: 1px solid var(--border);
          transition: border-color 0.3s ease, transform 0.3s ease;

          &:hover {
            border-color: var(--accent);
            transform: translateY(-3px);
          }

          h4 {
            margin: 0 0 8px;
            font-family: var(--font-display);
            font-size: 0.88rem;
            color: var(--text);
          }

          p {
            margin: 0;
            color: var(--text-muted);
            font-size: 0.84rem;
            line-height: 1.65;

            strong {
              color: var(--accent);
            }
          }
        }
      }
    }
  }

  // ---- CTA ----
  .ai-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 34px 20px 40px;
    text-align: center;

    p {
      margin: 0;
      font-family: var(--font-display);
      font-size: 1.1rem;
      color: var(--text);
    }

    .btn-primary {
      padding: 13px 30px;
      border-radius: 12px;
      font-family: var(--font-display);
      font-size: 0.95rem;
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

// ---- Responsive ----
@media screen and (max-width: 1000px) {
  .container-ai .ai-grid {
    grid-template-columns: repeat(2, 1fr);

    .card-automation .automation-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .card-automation .automation-head .exp-badge {
      margin-left: 0;
    }
  }
}

@media screen and (max-width: 640px) {
  .container-ai {
    width: 92vw;

    .ai-grid {
      grid-template-columns: 1fr;

      .card-automation .automation-grid {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>