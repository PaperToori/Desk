<script setup>
import { useAdminStore } from '@/stores/store';
import { watch } from 'vue';

let adminStore = useAdminStore();

watch(() => adminStore.edit, () => { });

let newSocialSecurityNumber = ref(adminStore.editTarget.socialSecurityNumber);
let newName = ref(adminStore.editTarget.name);
let newEmail = ref(adminStore.editTarget.email);
let newPhoneNumber = ref(adminStore.editTarget.phoneNumber);
let newGroup = ref(adminStore.editTarget.group);
let newAdress = ref(adminStore.editTarget.adress);
let newZip = ref(adminStore.editTarget.zip);
let newCity = ref(adminStore.editTarget.city);
let newTags = ref(adminStore.editTarget.tags);         // ARRAY
let newGuardian = ref(adminStore.editTarget.guardian);     // ARRAY
let newChild = ref(adminStore.editTarget.child);        // ARRAY
let newMembers = ref(adminStore.editTarget.members);      // ARRAY


async function PatchRequest() {
    let url;
    let response;
    if (adminStore.edit === 'teacher') { }
    else if (adminStore.edit === 'student') { }
    else if (adminStore.edit === 'group') { }
    else if (adminStore.edit === 'classroom') { 
        try {
            url = "http://localhost:8080/classrooms/";
            response = fetch(url, {
                method: "PATCH",
                body: JSON.stringify({ name: newName.value })
            });
            console.log((await response).text());
        }
        catch (error) { console.log(error.message); }
    }
    else if (adminStore.edit === 'subject') { 
        try {
            url = "http://localhost:8080/subjects/";
            response = fetch(url, {
                method: "PATCH",
                body: JSON.stringify({ name: newName.value })
            });
            console.log((await response).text());
        }
        catch (error) { console.log(error.message); }
    }
    else if (adminStore.edit === 'tag') {
        try {
            url = "http://localhost:8080/tags/";
            response = fetch(url, {
                method: "PATCH",
                body: JSON.stringify({ name: newName.value })
            });
            console.log((await response).text());
        }
        catch (error) { console.log(error.message); }
    }
    if (await response.text()==="Patch: Success"){
        adminStore.HideEdit();
    }
}

</script>
<template>
    <div id="container-edit" v-if="adminStore.edit === true">
        <div class="box-edit" v-if="adminStore.editTarget === 'teacher'">
            <input type="text" v-model="name">
            <!-- more to come when the pull arrives -->
        </div>
        <div class="box-edit" v-if="adminStore.editTarget === 'student'">
            <input type="text" v-model="newSocialSecurityNumber">
            <input type="text" v-model="newName">
            <input type="text" v-model="newEmail">
            <input type="text" v-model="newPhoneNumber">
            <input type="text" v-model="newGroup">
            <input type="text" v-model="newAdress">
            <input type="text" v-model="newZip">
            <input type="text" v-model="newCity">
            <!-- code to add/remove guardians & tags -->
        </div>
        <div class="box-edit" v-if="adminStore.editTarget === 'group'">
            <input type="text" v-model="newName">
            <!-- Code to add/remove members -->
        </div>
        <div class="box-edit" v-if="adminStore.editTarget === 'classroom'">
            <input type="text" v-model="newName">
        </div>
        <div class="box-edit" v-if="adminStore.editTarget === 'subject'">
            <input type="text" v-model="newName">
        </div>
        <div class="box-edit" v-if="adminStore.editTarget === 'tag'">
            <input type="text" v-model="newName">
        </div>
        <button @click="PatchRequest">Save</button>
    </div>
</template>
<style scoped></style>