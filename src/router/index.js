import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Tasks from '../views/Tasks.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {auth: true}
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
    meta: {auth: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(localStorage.getItem('token') && !to.meta.auth){
    next('/dashboard')
    console.log('logged in')
  } else {
    next();
    console.log('home')
  }
})

export default router
