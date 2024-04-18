<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthStore } from '@/stores/store'
import { database } from '/src/firebase.js'
import { doc, setDoc } from "firebase/firestore";

const Auth = useAuthStore();
Auth.Inject();

let email = ref('');
let password = ref('');
let permissions = ref('');

async function login() {
    console.log("login called");
    await signInWithEmailAndPassword(Auth, email._value, password._value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(auth.currentUser);
            console.log(
                `logged in account ${email} pswd: ******`
            );
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}
async function signup() {
    console.log("signup called!");
    //if(permissions._value && email.match(/@+.{2,}/g))
    await createUserWithEmailAndPassword(Auth.auth, email._value, password._value)
        .then(async (userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(database)
            await setDoc(doc(database, 'Users', user.uid), {
                email: user.email,
                permissions: permissions._value
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
    <input type="number" min="0" max="4" step="1" placeholder="permission level" v-model="permissions">
    <button @click="signup">sign up</button>
</template>
<style scoped>
button {
    width: 10vh;
    height: 2vh;
}
</style>