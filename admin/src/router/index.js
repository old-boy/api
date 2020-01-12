import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Login from '../views/Login.vue'
import Tag from '../components/views/Tag.vue'
import Faq from '../components/views/Faq.vue'
import StaticPage from '../components/views/StaticPage.vue'
import StaticDetails from '../components/views/StaticDatials.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Layout,
    redirect: "/product/tag",
    children: [
        { path: "/dashboard", component: Dashboard },
        { path: "/product/tag", component: Tag },
        { path: "/product/faq", component: Faq },
        { path: "/product/staticPage", component: StaticPage },
        { path: "/product/staticPage/details", component: StaticDetails }
    ]
}, {
    path: '/login',
    name: 'login',
    component: Login
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router