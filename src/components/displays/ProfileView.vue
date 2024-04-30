<script setup>
import {ref} from 'vue';

let name = ref();

async function submitForm() {

}

</script>

<template>

<form method="POST" @submit:prevent="submitForm">
    <label>
        Namn: <input type="text" v-model="name">
    </label>
    <button type="submit">Spara ändringar</button>
</form>
</template>