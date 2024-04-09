<script setup>
import { ref, onBeforeMount } from 'vue';
import NavBar from '../ui/NavBar.vue';
</script>
<template>
    <div class="Screen">
        <div class="Bar">
            <NavBar />
            <div>Nyehehehehe</div>
        </div>
        Bonjour Comrades
    </div>
</template>

<style scoped>
.Screen {
    display: grid;
    grid-template-columns: 15fr 85fr;
    width: 100vw;
    height: 100vh;
}

.Bar {
    display: grid;
    grid-template-rows: 1fr 5fr;
    background-color: rgb(180, 180, 180);
    width: 15vw;
}

.schedule {
    display: grid;
    grid-template-rows: repeat(144, 10px);
    grid-template-columns: repeat(5, 1fr);
    width: 85vw;
    background-color: rgb(80, 80, 80);
}
</style>