<script setup>
import { ref, onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/store';
import { signInWithEmailAndPassword, signInWithPopup, linkWithPopup, GoogleAuthProvider } from 'firebase/auth';


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
    try {
        returnProfile = await fetch("http://localhost:8080/admin/profile", {
            method: "GET",
            headers: headersList
        });
        returnProfile = await returnProfile.json();
    } catch (error) {
        console.log(error.message);
    }
    Auth.Inject();
    return returnProfile;
}
//TODO 
// NOT DONE
async function submitForm() {
    let id = "undefined";
    if (Auth.auth.currentUser) {
        id = await Auth.auth.currentUser.getIdToken(true);
    }
    let headersList = {
        "id": id
    }
    let bodyList = {
        "profile": profile.value.profile[profileSelector.value],
        "profileNumber": profileSelector.value
    }
    console.log("trying to patch profile", profile.value.profile[profileSelector.value]);
    console.log(profileSelector.value);
    try {
        await fetch("http://localhost:8080/admin/profile", {
            method: "PATCH",
            headers: headersList,
            body: JSON.stringify(bodyList)
        });
    } catch (error) {
        console.log(error.message);
    }
    await getProfile();
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

async function linkGooglePopup() {
    console.log("Logging in with google")
    await linkWithPopup(Auth.auth.currentUser, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log("Accounts successfully linked.");
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
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
            console.log("logged in with google");
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
        <v-btn type="submit" @click="login">login</v-btn>
        <br>
        <v-btn @click="loginGooglePopup">logga in med Google</v-btn>
    </div>
    <div v-else>
        <v-btn @click="linkGooglePopup">länka Google med konto</v-btn>
        <div v-if="profile.profileType.length > 1">
            profil
            <v-btn @click="profileSelector = 0">{{ profile.profileType[0] }}</v-btn>
            <v-btn @click="profileSelector = 1">{{ profile.profileType[1] }}</v-btn>
            <v-btn @click="profileSelector = 2" v-if="profile.profileType.length > 2">{{ profile.profileType[2]
                }}</v-btn>
        </div>
        <v-form>
            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field readonly v-model="profile.profile[profileSelector].name"
                            label="Namn"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field readonly v-model="profile.profile[profileSelector].socialSecurityNumber"
                            Placeholder="YYYYMMDD-XXXX" label="person nummer"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field v-model="profile.profile[profileSelector].email" label=" email"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field v-model="profile.profile[profileSelector].phoneNumber"
                            label="telefon nummer"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field readonly v-model="profile.profile[profileSelector].group"
                            label="klass"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field readonly v-model="profile.profile[profileSelector].adress"
                            label="adress"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field readonly v-model="profile.profile[profileSelector].zip"
                            label="postkod"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field readonly v-model="profile.profile[profileSelector].guardian"
                            label="Vårdnashavare"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <div v-if="profile.profileType[profileSelector] === 'Elev'">
                <p>Elev</p>
            </div>
            <div v-else-if="profile.profileType[profileSelector] === 'Vårdnashavare'">
                <p>Vårdnashavare</p>
            </div>
            <div v-else-if="profile.profileType[profileSelector] === 'Lärare'">
                <p>Lärare</p>
            </div>

        </v-form>
        <v-btn @click="submitForm">Spara ändringar</v-btn>
    </div>
</template>