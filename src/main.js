import './style.css'
import App from './App.vue'
import router from './routes/router'
import { createApp } from 'vue'
import { vReveal } from './composables/useReveal'

const app = createApp(App)
app.use(router)
// Directiva global de animaciones on-scroll (v-reveal).
app.directive('reveal', vReveal)
app.mount('#app')
