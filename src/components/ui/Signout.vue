<script setup>

import { useAuthStore } from '@/stores/store'

const Auth = useAuthStore();
Auth.Inject();
console.log(Auth.auth.currentUser);
</script>

<template>
    <h1 v-if="Auth.auth.currentUser"> User: {{ Auth.auth.currentUser.displayName }}</h1>
</template>
<style scoped></style>