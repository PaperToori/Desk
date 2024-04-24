<script setup>
import { ref } from 'vue';
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthStore } from '@/stores/store'
import { database } from '/src/firebase.js'
import { doc, setDoc } from "firebase/firestore";

const Auth = useAuthStore();
Auth.Inject();

let email = ref('');
let password = ref('');
let permissions = ref(0);
let response = ref(0);

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

async function login() {
    console.log("login called");
    await signInWithEmailAndPassword(Auth.auth, email._value, password._value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(Auth.auth.currentUser);
            console.log(
                `logged in account ${email} pswd: ******`
            );
        })
        .catch((error) => {
            console.log("an error occured");
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode);
            console.error(errorMessage);
        });
}
async function signup() {
    console.log("signup called!");
    //if(permissions._value && email.match(/@+.{2,}/g))
    await createUserWithEmailAndPassword(Auth.auth, email._value, password._value)
        .then(async (userCredential) => {
            // Signed up
            const user = userCredential.user;
            let documentStatus = await fetch("http://localhost:8080/auth/user/", {
                method: "POST",
                body: JSON.stringify({
                    id: user.uid,
                    permission: permissions._value
                })
            });
            console.log(`Created account ${email._value}`);
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
async function authCheck() {
    console.log("red button pushed");
    let id = "undefined";
    if (Auth.auth.currentUser) {
        id = await Auth.auth.currentUser.getIdToken(true);
        console.log(id);
    }
    let headersList = {
        "id": id
    }
    response.value = await fetch("http://localhost:8080/test/", {
        method: "GET",
        headers: headersList
    }).catch((error) => {
        console.log("an error occured");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
        console.error(errorMessage);
        // ..
    });
    console.log("----");
    response.value = await response.value.json();
    console.log("response from endpoint", response.value);
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
    <button id="authCheck" @click="authCheck">Check Authentication</button>
    <p>{{ response }}</p>
    <button @click="signout">signOut</button>
</template>
<style scoped>
button {
    width: 10vh;
    height: 2vh;
}

#authCheck {
    background-color: red;
    border-radius: 50%;
    width: 8vh;
    height: 8vh;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    font-size: x-small;
    font-weight: bold;
    border-style: ridge;
}

#authCheck:hover {
    background-color: rgb(225, 0, 0);
}

#authCheck:active {
    border-style: inset;
}
</style>