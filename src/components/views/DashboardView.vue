<script setup>
import NavBar from '../ui/NavBar.vue';
</script>

<template>
    <div class="Screen">
        <div class="Bar">
            <NavBar />
        </div>
        <div>Hello</div>
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
</style>