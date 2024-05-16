<script setup>
import { signOut } from 'firebase/auth';
import { useAuthStore } from '@/stores/store';
import { ref, watch } from 'vue';


let profile = ref();
const Auth = useAuthStore();
Auth.Inject();
await checkAuthState();
async function checkAuthState() {
    await Auth.auth.authStateReady();
    if (Auth.auth.currentUser) {

        profile.value = Auth.auth.currentUser;
    }
}

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

        <v-btn @click="signout">Logga Ut</v-btn>
    </div>
    <a href="/#/profile" v-else>logga in</a>
</template>
<style scoped></style>