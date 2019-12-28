import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import Tag from '../views/Tag.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Main,
    children: [
        { path: "/dashboard", component: Dashboard },
        { path: "/tag", component: Tag }
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