<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

let currentPage = 'dashboard';
let selecttion = ref('');
const pages = [
    {
        value: "dashboard",
        name: "Dashboard",
        url: "/"
    },
    {
        value: "admin",
        name: "Admin",
        url: "/admin"
    },
    {
        value: "schedule",
        name: "Schedule",
        url: "/schedule"
    },
    {
        value: "profile",
        name: "Profile",
        url: "/profile"
    },
]

const router = useRouter();
router.push('/');

function updateRoute(e) {
    router.push(e.target.value);
}

function updatePage(page) {
    router.push(page.url);
    currentPage = page.value;
}
</script>
<template>
    <div class="container">
        <!-- <v-select v-model="selection" density="compact" label="Compact" :items="[
                'Dashboard',
                'Admin',
                'Schedule',
                'Profile',
            ]">
        </v-select> -->
        <select v-on:click="updateRoute" name="" id="routeSelect">
            <option value="/">Dashboard</option>
            <option value="/admin">Admin</option>
            <option value="/schedule">Schedule</option>
            <option value="/profile">Profile</option>
        </select>
        <!-- <button
            v-for="page in pages"
            v-on:click="() => updatePage(page)"
            :id="page.value"
            :class="currentPage == page.value"
            class="navButton"
            >
            {{ page.name }}
        </button> -->
    </div>
</template>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.selected {
    background-color: red;
}

.navButton {
    border: none;
    border-radius: 12px;
    height: 32px;
    width: 5rem;
}
</style>