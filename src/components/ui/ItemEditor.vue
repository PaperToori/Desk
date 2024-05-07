<script setup>
import { useAdminStore } from '@/stores/store';
import { watch, ref } from 'vue';

let adminStore = useAdminStore();

watch(() => adminStore.edit, () => { 
    console.log(newName.value);
});

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
    <div class="containeredit" v-if="adminStore.edit === true">
        <!-- <div class="boxedit" v-if="adminStore.targetType === 'teacher'">
            <input type="text" v-model="name">
            more to come when the pull arrives
        </div>
        <div class="boxedit" v-if="adminStore.targetType === 'student'">
            <input type="text" v-model="newSocialSecurityNumber">
            <input type="text" v-model="newName">
            <input type="text" v-model="newEmail">
            <input type="text" v-model="newPhoneNumber">
            <input type="text" v-model="newGroup">
            <input type="text" v-model="newAdress">
            <input type="text" v-model="newZip">
            <input type="text" v-model="newCity">
            code to add/remove guardians & tags
        </div>
        <div class="boxedit" v-if="adminStore.targetType === 'group'">
            <input type="text" v-model="newName">
            Code to add/remove members
        </div>
        <div class="boxedit" v-if="adminStore.targetType === 'classroom'">
            <input type="text" v-model="newName">
        </div>
        <div class="boxedit" v-if="adminStore.targetType === 'subject'">
            <input type="text" v-model="newName">
        </div>
        <div class="boxedit" v-if="adminStore.targetType === 'tag'">
            <input type="text" v-model="newName">
        </div>
        <button @click="PatchRequest">Save</button> -->
    </div>
</template>
<style scoped>
.containeredit {
    height: 40vh;
    background-color: rgb(130, 130, 130);
    border: 2px;
    padding-top: 1vh;
    margin-top: 1vh;
    margin-bottom: 1vh;
    margin-left: 1vw;
    margin-right: 1vw;
    max-width: 85vw;
}
.box-edit{}
</style>