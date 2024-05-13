<script setup>
import { ref, onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/store';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();

const Auth = useAuthStore();
Auth.Inject();
let profile = ref(await getProfile());
let profileSelector = ref(0);

let email = ref();
let password = ref();

async function getProfile() {
    let returnProfile;
    // fetch everything from db...
    let id = "undefined";
    if (Auth.auth.currentUser) {
        id = await Auth.auth.currentUser.getIdToken(true);
    }
    let headersList = {
        "id": id
    }
    // Attempt POST request
    try {
        returnProfile = await fetch("http://localhost:8080/admin/profile", {
            method: "GET",
            headers: headersList
        });
        returnProfile = await returnProfile.json();
    } catch (error) {
        console.log(error.message);
    }
    console.log(returnProfile);
    return returnProfile;
}
//TODO 
// NOT DONE
async function submitForm() {
    let response;
    let id = "undefined";
    if (Auth.auth.currentUser) {
        id = await Auth.auth.currentUser.getIdToken(true);
    }
    let headersList = {
        "id": id
    }
    // Attempt POST request
    try {
        response = await fetch("http://localhost:8080/admin/profile", {
            method: "POST",
            headers: headersList,
            body: profile.profile[profileSelector]
        });
    } catch (error) {
        console.log(error.message);
    }
}

async function login() {
    console.log("login called");
    await signInWithEmailAndPassword(Auth.auth, email.value, password.value)
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
    profile.value = await getProfile();
}

async function loginGooglePopup() {
    console.log("Logging in with google")
    await signInWithPopup(Auth.auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log("logged in with", credential);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log(errorCode);
            console.log(errorMessage);
            console.log(email);
            console.log(credential);
        });
    profile.value = await getProfile();

}

</script>

<template>
    <div v-if="profile === 'Not logged in'">
        <p>profile: {{ profile }}</p>
        <input type="email" placeholder="example@email.com" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <button type="submit" @click="login">login</button>
        <button @click="loginGooglePopup">logga in med Google</button>
    </div>
    <div v-else>
        <button @click="loginGooglePopup">länka Google med konto</button>
        <div v-if="profile.profileType.length > 1">
            profil
            <button @click="profileSelector = 0">{{ profile.profileType[0] }}</button>
            <button @click="profileSelector = 1">{{ profile.profileType[1] }}</button>
            <button @click="profileSelector = 2" v-if="profile.profileType.length > 2">{{ profile.profileType[2]
                }}</button>
        </div>
        <p>profile: {{ profile.profile[profileSelector].name }}</p>
        <form method="POST" @submit:prevent="submitForm">
            <label>
                Namn: <input type="text" v-model="profile.profile[profileSelector].name">
            </label>
            <label>
                person nummer: <input type="text" Placeholder="YYYYMMDD-XXXX"
                    v-model="profile.profile[profileSelector].socialSecurityNumber">
            </label>
            <label>
                email: <input type="text" v-model="profile.profile[profileSelector].email">
            </label>
            <label>
                telefon nummer: <input type="text" v-model="profile.profile[profileSelector].phoneNumber">
            </label>
            <label>
                klass: <input type="" v-model="profile.profile[profileSelector].group" c>
            </label>
            <label>
                adress: <input type="text" v-model="profile.profile[profileSelector].adress" readonly>
            </label>
            <label>
                poskod: <input type="text" v-model="profile.profile[profileSelector].zip">
            </label>
            <label>
                Vårdnashavare: <input type="text" v-model="profile.profile[profileSelector].guardian">
            </label>
            <button type="submit">Spara ändringar</button>
        </form>
    </div>
</template>