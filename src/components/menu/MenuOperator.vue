<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import ScheduleMenu from './ScheduleMenu.vue';
import AdminMenu from './AdminMenu.vue';

const route = useRoute();

watch(() => route.fullPath, () => { 
    // Hide all Menus
    document.getElementById('schedule').style.display = 'none';
    document.getElementById('admin').style.display = 'none';

    // // Display if matching route
    if (route.path === '/admin') {
        document.getElementById('admin').style.display = 'inline';
    }
    if (route.path === '/schedule'){
        document.getElementById('schedule').style.display = 'inline';
    }
});

</script>

<template>
    <div></div>
    <div id="admin">
        <AdminMenu/>
    </div>
    <div id="schedule">
        <ScheduleMenu/>
    </div>
</template>

<style scoped>
#schedule{ display:none; }
#admin { display: none; }
</style>