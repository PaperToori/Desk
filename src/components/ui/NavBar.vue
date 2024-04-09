<script setup>
import { useRoute, useRouter } from 'vue-router';


const router = useRouter();
let route = useRoute();

function updateRoute(e) {
    router.push(e.target.value);
}

</script>
<template>
    <div class="container">
        <select v-on:change="updateRoute" name="" id="routeSelect">
            <option value="/admin">Admin</option>
            <option value="/">Dashboard</option>
            <option value="/schedule">Schedule</option>
        </select>
    </div>
</template>
<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>