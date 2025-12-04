import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import Dashboard from '../views/DashboardView.vue'          
import MaintenanceList from '../views/MaintenanceListView.vue'
import MaintenanceFormView from '../views/MaintenanceFormView.vue' 
import CalendarView from '../views/CalendarView.vue'
import LoginPage from '../views/LoginPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'login', component: LoginPage},
    { path: '/home', name: 'home', component: Homepage }, 
    { path: '/dashboard', name: 'dashboard', component: Dashboard }, 
    { path: '/lista', name: 'lista', component: MaintenanceList },
    { path: '/formview', name: 'formview', component: MaintenanceFormView }, 
    { path: '/calendario', name: 'calendario', component: CalendarView },
  ]
})

export default router