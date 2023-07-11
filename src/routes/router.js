import { createRouter, createWebHistory} from 'vue-router'
import HomeView from '../components/views/home/Home.vue'
import AboutMeView from '../components/views/about-me/AboutMe.vue'
import CvView from '../components/views/cv/Cv.vue'
import WebPortfolioView from '../components/views/web-portfolio/WebPortfolio.vue'
import ContactMeView from '../components/views/contact-me/ContactMe.vue'

const routes = [
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/about-me',
        component: AboutMeView
    },
    {
        path: '/cv',
        component: CvView
    },
    {
        path: '/web-portfolio',
        component: WebPortfolioView
    },
    {
        path: '/contact-me',
        component: ContactMeView
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: 'active',
})

export default router