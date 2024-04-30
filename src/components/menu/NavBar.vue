<script setup>
import { useRouter } from 'vue-router';


const router = useRouter();

function updateRoute(e) {
    router.push(e.target.value);
}

</script>
<template>
    <div class="container">
        <select v-on:click="updateRoute" name="" id="routeSelect">
            <option value="/">Dashboard</option>
            <option value="/admin">Admin</option>
            <option value="/schedule">Schedule</option>
            <option value="/profile">Profile</option>
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