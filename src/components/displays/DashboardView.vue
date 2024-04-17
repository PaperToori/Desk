<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthStore } from '@/stores/store'
import { database } from '/src/firebase.js'
import { doc, setDoc } from "firebase/firestore";

let auth = getAuth();
let email = ref('');
let password = ref('');

async function login() {
    console.log("login called");
    await signInWithEmailAndPassword(auth, email._value, password._value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(auth.currentUser);
            console.log(
                `logged in account ${email} ${password[0]}${password[1]}${password[2]}${new Array(password.length - 3).fill('*').join('')}`
            );
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}
async function signup() {
    console.log("signup called!");
    console.log(auth);
    console.log(email._value, password._value);
    await createUserWithEmailAndPassword(auth, email._value, password._value)
        .then(async (userCredential) => {
            console.log("async shit");
            // Signed up
            const user = userCredential.user;
            console.log(database)
            await setDoc(doc(database, 'Users', user.uid), {
                email: user.email,
                listings: []
            });
            console.log(`Created account ${email}`);
        })
        .catch((error) => {
            console.log("an error occured");
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode);
            console.error(errorMessage);
            // ..
        });
    console.log("Mr sandman");

}

</script>
<template>
    <p>Sign in</p>
    <input type="email" placeholder="example@email.com" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <button type="submit" @click="login">login</button>
    <p>Sign up</p>
    <input type="email" placeholder="example@email.com" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <button @click="signup">sign up</button>
</template>
<style scoped>
button {
    width: 10vh;
    height: 2vh;
}
</style>