import { createRouter, createWebHashHistory } from 'vue-router';
import DashboardView from './components/views/DashboardView.vue';
import ScheduleView from './components/views/ScheduleView.vue';
import AdminView from './components/views/AdminView.vue';
import ScheduleEdit from './components/views/ScheduleEdit.vue';

const routes = [
    {
        path: "/",
        component: DashboardView
    },
    {
        path: "/schedule",
        component: ScheduleView
    },
    {
        path: "/admin", 
        component: AdminView
    },
    {
        path: "/editschedule", 
        component: ScheduleEdit
    }
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes
});