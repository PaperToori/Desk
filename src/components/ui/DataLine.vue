<script setup>
import {  useAuthStore, useAdminStore } from '@/stores/store';

// Pinia Stores
const Auth = useAuthStore();
Auth.Inject();

let adminStore = useAdminStore();

let id = "undefined";
if (Auth.auth.currentUser) {
    id = await Auth.auth.currentUser.getIdToken(true);
}
let headersList = {
    "id": id,
}

let props = defineProps({
    type: String,
    target: Object
});

async function DeleteTeacher() { // Doesn't work yet
    try {
        let url = "http://localhost:8080/teachers/";
        let response = await fetch(url, {
            method: "DELETE",
            headers: headersList,
            body: JSON.stringify({})
        });
        console.log(await response.text());
    } catch (error) {
        console.log(error.message);
    }
}

async function DeleteStudent() { // Doesn't work yet
    try {
        let url = "http://localhost:8080/students/";
        let response = await fetch(url, {
            method: "DELETE",
            headers: headersList,
            body: JSON.stringify({})
        });
        console.log(await response.text());
    } catch (error) {
        console.log(error.message);
    }
}

async function DeleteGroup() {
    try {
        let url = "http://localhost:8080/groups/";
        let response = await fetch(url, {
            method: "DELETE",
            headers: headersList,
            body: JSON.stringify({ name: props.target.name })
        });
        console.log(await response.text());
    } catch (error) {
        console.log(error.message);
    }
}

async function DeleteClassroom() {
    try {
        let url = "http://localhost:8080/classrooms/";
        let response = await fetch(url, {
            method: "DELETE",
            headers: headersList,
            body: JSON.stringify({ name: props.target.name })
        });
        console.log(await response.text());
    } catch (error) {
        console.log(error.message);
    }
}

async function DeleteSubject() {
    try {
        let url = "http://localhost:8080/subjects/";
        let response = await fetch(url, {
            method: "DELETE",
            headers: headersList,
            body: JSON.stringify({ name: props.target.name })
        });
        console.log(await response.text());
    } catch (error) {
        console.log(error.message);
    }
}

async function DeleteTag() {
    try {
        let url = "http://localhost:8080/tags/";
        let response = await fetch(url, {
            method: "DELETE",
            headers: headersList,
            body: JSON.stringify({ name: props.target.name })
        });
        console.log(await response.text());
    } catch (error) {
        console.log(error.message);
    }
}
async function DeleteCourse() {
    try {
        let url = "http://localhost:8080/course/";
        let response = await fetch(url, {
            method: "DELETE",
            headers: headersList,
            body: JSON.stringify({ name: props.target.name })
        });
        console.log(await response.text());
    } catch (error) {
        console.log(error.message);
    }
}

function EditObject() {
    adminStore.targetType = props.type;
    adminStore.editTarget = props.target;
    adminStore.edit = true;
}

</script>
<template>
    <div class="items" v-if="props.type === 'teacher'" id="item-teacher">
        <span> {{ props.target.name }} </span>
        <span> {{ props.target.email }} </span>
        <span> {{ props.target.phoneNumber }} </span>
        <div class="button-container">
            <v-btn @click="EditObject" class="inline-button">Edit</v-btn>
            <v-btn @click="DeleteTeacher" class="inline-button">Delete</v-btn>
        </div>
    </div>
    <div class="items" v-else-if="props.type === 'student'" id="item-student">
        <span> {{ props.target.name }} </span>
        <span> {{ props.target.email }} </span>
        <span> {{ props.target.phoneNumber }} </span>
        <div class="button-container">
            <v-btn @click="EditObject" class="inline-button">Edit</v-btn>
            <v-btn @click="DeleteStudent" class="inline-button">Delete</v-btn>
        </div>
    </div>
    <div class="items" v-else-if="props.type === 'group'" id="item-group">
        <span> {{ props.target.name }} </span>
        <span> {{ props.target.members.length }} Member(s)</span>
        <div class="button-container">
            <v-btn @click="EditObject" class="inline-button">Edit</v-btn>
            <v-btn @click="DeleteGroup" class="inline-button">Delete</v-btn>
        </div>
    </div>
    <div class="items" v-else-if="props.type === 'classroom'" id="item-classroom">
        <span> {{ props.target.name }} </span>
        <div class="button-container">
            <v-btn @click="EditObject" class="inline-button">Edit</v-btn>
            <v-btn @click="DeleteClassroom" class="inline-button">Delete</v-btn>
        </div>
    </div>
    <div class="items" v-else-if="props.type === 'subject'" id="item-subject">
        <span> {{ props.target.name }} </span>
        <div class="button-container">
            <v-btn @click="EditObject" class="inline-button">Edit</v-btn>
            <v-btn @click="DeleteSubject" class="inline-button">Delete</v-btn>
        </div>
    </div>
    <div class="items" v-else-if="props.type === 'tag'" id="item-tag">
        <span> {{ props.target.name }} </span>
        <div class="button-container">
            <v-btn @click="EditObject" class="inline-button">Edit</v-btn>
            <v-btn @click="DeleteTag" class="inline-button">Delete</v-btn>
        </div>
    </div>
    <div class="items" v-else-if="props.type === 'course'" id="item-course">
        <span> {{ props.target.name }} </span>
        <div class="button-container">
            <v-btn @click="EditObject" class="inline-button">Edit</v-btn>
            <v-btn @click="DeleteCourse" class="inline-button">Delete</v-btn>
        </div>
    </div>
</template>
<style scoped>
.items {
    display: grid;
    width: 95%;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    background-color: rgb(210, 210, 210);
}

.button-container {
    justify-self: right;
}

/* .inline-button {
    width: 50px;
} */

#item-teacher {
    grid-template-columns: 4fr 4fr 4fr 3fr;
}

#item-student {
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

#item-group {
    grid-template-columns: 1fr 1fr 1fr;
}

#item-classroom {
    grid-template-columns: 1fr 1fr;
}

#item-subject {
    grid-template-columns: 1fr 1fr;
}

#item-tag {
    grid-template-columns: 1fr 1fr;
}
</style>