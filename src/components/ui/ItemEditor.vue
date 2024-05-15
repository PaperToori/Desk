<script setup>
import { useAdminStore, useAuthStore } from '@/stores/store';
import { watch, ref } from 'vue';
import GroupMembers from './GroupMembers.vue';

const props = defineProps({ students: Array });

let Auth = useAuthStore();
let adminStore = useAdminStore();

watch(() => adminStore.selected, () => {
    adminStore.HideEdit();
});
watch(() => adminStore.editTarget, () => {
    newSocialSecurityNumber.value = adminStore.editTarget.socialSecurityNumber;
    newName.value                 = adminStore.editTarget.name;
    newEmail.value                = adminStore.editTarget.email;
    newPhoneNumber.value          = adminStore.editTarget.phoneNumber;
    newGroup.value                = adminStore.editTarget.group;
    newAdress.value               = adminStore.editTarget.adress;
    newZip.value                  = adminStore.editTarget.zip;
    newCity.value                 = adminStore.editTarget.city;
    newTags.value                 = adminStore.editTarget.tags;             // ARRAY
    newGuardian.value             = adminStore.editTarget.guardian;     // ARRAY
    newChild.value                = adminStore.editTarget.child;           // ARRAY
    newMembers.value              = adminStore.editTarget.members;       // ARRAY
});

let newSocialSecurityNumber = ref(adminStore.editTarget.socialSecurityNumber);
let newName                 = ref(adminStore.editTarget.name);
let newEmail                = ref(adminStore.editTarget.email);
let newPhoneNumber          = ref(adminStore.editTarget.phoneNumber);
let newGroup                = ref(adminStore.editTarget.group);
let newAdress               = ref(adminStore.editTarget.adress);
let newZip                  = ref(adminStore.editTarget.zip);
let newCity                 = ref(adminStore.editTarget.city);
let newTags                 = ref(adminStore.editTarget.tags);      // ARRAY
let newGuardian             = ref(adminStore.editTarget.guardian);  // ARRAY
let newChild                = ref(adminStore.editTarget.child);     // ARRAY
let newMembers              = ref(adminStore.editTarget.members);   // ARRAY

async function PatchRequest() {
    let url;
    let response;
    let id = "undefined";
    if (Auth.auth.currentUser) {
        id = await Auth.auth.currentUser.getIdToken(true);
    }
    let headersList = {
        "id": id
    }
    if (adminStore.selected === 'teacher') { }
    else if (adminStore.selected === 'student') { }
    else if (adminStore.selected === 'group') { }
    else if (adminStore.selected === 'classroom') {
        try {
            url = "http://localhost:8080/classrooms/";
            response = await fetch(url, {
                method: "PATCH",
                headers: headersList,
                body: JSON.stringify({
                    newName: newName.value,
                    target: adminStore.editTarget.name
                })
            });
        }
        catch (error) { console.log(error.message); }
    }
    else if (adminStore.selected === 'subject') {
        try {
            url = "http://localhost:8080/subjects/";
            response = await fetch(url, {
                method: "PATCH",
                headers: headersList,
                body: JSON.stringify({
                    newName: newName.value,
                    target: adminStore.editTarget.name
                })
            });
        }
        catch (error) { console.log(error.message); }
    }
    else if (adminStore.selected === 'tag') {
        try {
            url = "http://localhost:8080/tags/";
            response = await fetch(url, {
                method: "PATCH",
                headers: headersList,
                body: JSON.stringify({
                    newName: newName.value,
                    target: adminStore.editTarget.name
                })
            });
        }
        catch (error) { console.log(error.message); }
    }
    if (await response.text() === "Patch: Success") {
        adminStore.HideEdit();
    }
}

function UpdateNewMembers(removal, member){
    if (removal){
        // splice member out of array
        return;
    }
    console.log(newMembers.value);
    newMembers.value.push({ name : member.name, id : member._id });
    console.log(newMembers.value);
}

</script>
<template>
    <div class="boxedit" v-if="adminStore.targetType === 'teacher'">
        <input type="text" v-model="newName">
        more to come when the pull arrives
    </div>
    <div class="boxedit" v-if="adminStore.targetType === 'student'">
        <div>
            <input type="text" v-model="newSocialSecurityNumber">
            <input type="text" v-model="newName">
            <input type="text" v-model="newEmail">
            <input type="text" v-model="newPhoneNumber">
            <input type="text" v-model="newGroup">
            <input type="text" v-model="newAdress">
            <input type="text" v-model="newZip">
            <input type="text" v-model="newCity">
        </div>
        code to add/remove guardians & tags
    </div>
    <div class="boxedit" v-if="adminStore.targetType === 'group'">
        <div>
            <input type="text" v-model="newName">
        </div>
        <div >
          <GroupMembers
          :newMembers="newMembers"
          :students="props.students"
          @updatenewmembers="UpdateNewMembers"/>
        </div>
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

.boxedit {
    display: grid;
    grid-auto-flow: column;
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