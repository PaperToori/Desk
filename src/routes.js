import { createRouter, createWebHashHistory } from 'vue-router';
import AdminView from './components/displays/AdminView.vue';
import DashboardView from './components/displays/DashboardView.vue';
import ScheduleView from './components/displays/ScheduleView.vue';
import ProfileView from './components/displays/ProfileView.vue';


const routes = [
    {
        path: "/",
        component: DashboardView
    },
    {
        path: "/admin", 
        component: AdminView
    },
    {
        path: "/schedule",
        component: ScheduleView
    },
    {
        path: "/profile", 
        component: ProfileView
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});