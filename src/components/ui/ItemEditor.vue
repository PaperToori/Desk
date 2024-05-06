<script setup>
import { useAdminStore } from '@/stores/store';
import { watch } from 'vue';

let adminStore = useAdminStore();

watch(() => adminStore.edit, () => { });

let socialSecurityNumber = ref(adminStore.editTarget.socialSecurityNumber);
let name                 = ref(adminStore.editTarget.name);
let email                = ref(adminStore.editTarget.email);
let phoneNumber          = ref(adminStore.editTarget.phoneNumber);
let group                = ref(adminStore.editTarget.group);
let adress               = ref(adminStore.editTarget.adress);
let zip                  = ref(adminStore.editTarget.zip);
let city                 = ref(adminStore.editTarget.city);
let tags                 = ref(adminStore.editTarget.tags);         // ARRAY
let guardian             = ref(adminStore.editTarget.guardian);     // ARRAY
let child                = ref(adminStore.editTarget.child);        // ARRAY
let members              = ref(adminStore.editTarget.members);      // ARRAY


async function PatchRequest() {
    if (adminStore.edit === 'teacher') { }
    else if (adminStore.edit === 'student') { }
    else if (adminStore.edit === 'group') { }
    else if (adminStore.edit === 'classroom') { }
    else if (adminStore.edit === 'subject') { }
    else if (adminStore.edit === 'tag') { }
}

</script>
<template>
    <div id="container-edit" v-if="adminStore.edit === true">
        <div class="box-edit" v-if="adminStore.editTarget === 'teacher'">
            <input type="text" v-model="name">
            <!-- more to come when the pull arrives -->
        </div>
        <div class="box-edit" v-if="adminStore.editTarget === 'student'">
            <input type="text" v-model="socialSecurityNumber">
            <input type="text" v-model="name">
            <input type="text" v-model="email">
            <input type="text" v-model="phoneNumber">
            <input type="text" v-model="group">
            <input type="text" v-model="adress">
            <input type="text" v-model="zip">
            <input type="text" v-model="city">
            <!-- code to add/remove guardians & tags -->
        </div>
        <div class="box-edit" v-if="adminStore.editTarget === 'group'">
            <input type="text" v-model="name">
            <!-- Code to add/remove members -->
        </div>
        <div class="box-edit" v-if="adminStore.editTarget === 'classroom'">
            <input type="text" v-model="name">
        </div>
        <div class="box-edit" v-if="adminStore.editTarget === 'subject'">
            <input type="text" v-model="name">
        </div>
        <div class="box-edit" v-if="adminStore.editTarget === 'tag'">
            <input type="text" v-model="name">
        </div>
        <button @click="PatchRequest">Save</button>
    </div>
</template>
<style scoped></style>