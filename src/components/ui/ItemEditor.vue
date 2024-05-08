<script setup>
import { useAdminStore } from '@/stores/store';
import { watch, ref } from 'vue';

let adminStore = useAdminStore();

watch(() => adminStore.selected, () => {
    adminStore.HideEdit();
});
watch(() => adminStore.edit, () => {
    if (adminStore.edit === false) { return; }

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
    if (await response.text() === "Patch: Success") {
        adminStore.HideEdit();
    }
}

</script>
<template>
    <div class="boxedit" v-if="adminStore.targetType === 'teacher'">
        <input type="text" v-model="newName">
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
    <div v-if="adminStore.targetType === 'classroom'">
        <input type="text" v-model="newName">
    </div>
    <div v-if="adminStore.targetType === 'subject'">
        <input type="text" v-model="newName">
    </div>
    <div v-if="adminStore.targetType === 'tag'">
        <input type="text" v-model="newName">
    </div>
    <button @click="PatchRequest">Save</button>
</template>
<style scoped>
input {
    display: block;
    min-width: 200px;
    margin-left: 2vw;
    margin-top: 2vh;
    margin-bottom: 2vh;
}

select {
    display: block;
    min-width: 200px;
    margin-left: 2vw;
    margin-top: 2vh;
    margin-bottom: 2vh;
}

button {
    margin-top: 1vh;
    margin-left: 4vw;
    margin-bottom: 3vh;
    padding: 3px;
}

.bunch-of-stuff {
    height: auto;
    max-height: 38.5vh;
    overflow-y: auto;
}

.box-edit {
    display: inline;
    grid-column: 1fr 1fr;
    height: 100%;
}

.oneinput {
    display: inline;
}

#status-message {
    display: inline-block;
    text-align: center;
    width: 130px;
    margin-left: 2vw;
    padding: 1vw;
    border-radius: 20px;
    background-color: rgb(180, 180, 180);
}
</style>