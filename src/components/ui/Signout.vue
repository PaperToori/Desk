<script setup>
import { signOut } from 'firebase/auth';
import { useAuthStore } from '@/stores/store';
import { ref, watch } from 'vue';

let profile = ref();
const Auth = useAuthStore();
Auth.Inject();
profile.value=Auth.auth.currentUser;
console.log(profile);
async function signout() {
    console.log("attempting to signout");
    signOut(Auth.auth)
        .then(() => {
            // Sign-out successful.
            console.log('logged out');
            window.location.reload();
        })
        .catch((error) => {
            console.log("an error occured");
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode);
            console.error(errorMessage);
        });
}
</script>

<template>

    <div v-if="profile">
        <a href="/#/profile">{{ profile.displayName }}</a>

        <button @click="signout">Logga Ut</button>
    </div>
    <a href="/#/profile" v-else>logga in</a>
</template>
<style scoped></style>