<script setup>
import {ref} from 'vue';

let name = ref();
let socialSecurityNumber = ref();
let email = ref();
let phoneNumber = ref();


async function submitForm() {
    //fetch
}

</script>

<template>

<form method="POST" @submit:prevent="submitForm">
    <label>
        Namn: <input type="text" v-model="name">
    </label>
    <label>
        person nummer: <input type="text" Placeholder="YYYYMMDD-XXXX" v-model="socialSecurityNumber">
    </label>
    <label>
        email: <input type="text" v-model="email">
    </label>
    <label>
        telefon nummer: <input type="text" v-model="phoneNumber">
    </label>
    <label>
        klass: <input type="" v-model="name" c>
    </label>
    <label>
        adress: <input type="text" v-model="name">
    </label>
    <label>
        poskod: <input type="text" v-model="name">
    </label>
    <label>
        Vårdnashavare: <input type="text" v-model="name">
    </label>
    <button type="submit">Spara ändringar</button>
</form>
</template>