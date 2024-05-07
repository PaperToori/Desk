<script setup>
import { useAdminStore } from '@/stores/store';

let adminStore = useAdminStore();

let props = defineProps({
    type: String,
    target: Object
});

async function DeleteTeacher() { // Doesn't work yet
    try {
        let url = "http://localhost:8080/teachers/";
        let response = await fetch(url, {
            method: "DELETE",
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
            body: JSON.stringify({ name: props.target.name })
        });
        console.log(await response.test());
    } catch (error) {
        console.log(error.message);
    }
}

function EditObject() { // This doesn't work yet
    console.log("button pressed!");
    adminStore.targetType = props.type;
    adminStore.editTarget = props.target;
    adminStore.edit = true;
    console.log(adminStore.edit);
    console.log(adminStore.editTarget);
}

</script>
<template>
    <div class="items" v-if="props.type === 'teacher'" id="item-teacher">
        <span> {{ props.target.name }} </span>
        <span> {{ props.target.email }} </span>
        <span> {{ props.target.phoneNumber }} </span>
        <div class="button-container">
            <button @click="EditObject" class="inline-button">Edit</button>
            <button @click="DeleteTeacher" class="inline-button">Delete</button>
        </div>
    </div>
    <div class="items" v-else-if="props.type === 'student'" id="item-student">
        <span> {{ props.target.name }} </span>
        <span> {{ props.target.email }} </span>
        <span> {{ props.target.phoneNumber }} </span>
        <div class="button-container">
            <button @click="EditObject" class="inline-button">Edit</button>
            <button @click="DeleteStudent" class="inline-button">Delete</button>
        </div>
    </div>
    <div class="items" v-else-if="props.type === 'group'" id="item-group">
        <span> {{ props.target.name }} </span>
        <span> {{ props.target.members.length }} Member(s)</span>
        <div class="button-container">
            <button @click="EditObject" class="inline-button">Edit</button>
            <button @click="DeleteGroup" class="inline-button">Delete</button>
        </div>
    </div>
    <div class="items" v-else-if="props.type === 'classroom'" id="item-classroom">
        <span> {{ props.target.name }} </span>
        <div class="button-container">
            <button @click="EditObject" class="inline-button">Edit</button>
            <button @click="DeleteClassroom" class="inline-button">Delete</button>
        </div>
    </div>
    <div class="items" v-else-if="props.type === 'subject'" id="item-subject">
        <span> {{ props.target.name }} </span>
        <div class="button-container">
            <button @click="EditObject" class="inline-button">Edit</button>
            <button @click="DeleteSubject" class="inline-button">Delete</button>
        </div>
    </div>
    <div class="items" v-else-if="props.type === 'tag'" id="item-tag">
        <span> {{ props.target.name }} </span>
        <div class="button-container">
            <button @click="EditObject" class="inline-button">Edit</button>
            <button @click="DeleteTag" class="inline-button">Delete</button>
        </div>
    </div>
</template>
<style scoped>

.items {
    display: grid;
    /* grid-auto-flow: column; */
    /* justify-content: space-between; */
    width: 95%;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    background-color: rgb(210, 210, 210);
}

.button-container {
    justify-self: right;
}

.inline-button {
    width: 50px;
}

#item-teacher {
    grid-template-columns: 1fr 1fr 1fr 1fr;
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