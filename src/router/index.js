import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/DashboardView.vue'
import Register from '../views/RegisterView.vue'
import Login from '../views/LoginView.vue'
import Account from '../views/AccountView.vue'
import Tasks from '../views/TaskView.vue'
import Projects from '../views/ProjectView.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: Tasks
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router