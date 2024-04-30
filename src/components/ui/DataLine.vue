<script setup>
import { watch } from 'vue';


let props = defineProps({
    type: String,
    target: Object
});

async function DeleteObject(){
    if (props.type === 'teacher') {}
     else if (props.type === 'student') {}
     else if (props.type === 'group') {}
     else if (props.type === 'classroom') {}
     else if (props.type === 'subject') {
        try {
            let url = "http://localhost:8080/deleteSubject/"+props.target.name;
            let response = await fetch(url, { method: "GET" });
            console.log(await response.text);
        } catch (error) {
            console.log(error.message);
        }
     }
     else if (props.type === 'tag') {
        try {
            let url = "http://localhost:8080/tags/"+props.target.name;
            let response = await fetch(url, { method: "DELETE" });
            console.log(await response.text());
        } catch (error) {
            console.log(error.message);
        }

     }
} 

</script>
<template>
    <div class="items" id="item-teacher">
        {{ props.target.name }}
        <button @click="DeleteObject" class="inline-button">Delete</button>
    </div>
    <!-- <div class="items" id="item-student">
    </div>
    <div class="items" id="item-group">
    </div>
    <div class="items" id="item-classroom">
    </div>
    <div class="items" id="item-subject">
    </div>
    <div class="items" id="item-tag">
    </div> -->
    </template>
<style scoped>
.items {
    display: grid;
    grid-auto-flow: column;
    justify-content:space-between;
    width: 95%;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    background-color: rgb(210, 210, 210);
}
.inline-button {
    width: 50px;
}
#item-teacher {
}
</style>