<script setup>
import { ref } from 'vue';
const props = defineProps({ newMembers: Array, students: Array });
const emits = defineEmits(['updatenewmembers']);

let addonStudent = ref();

</script>
<template>
    <div class="itemswrapper">
        <div v-for="member in props.newMembers" class="items">
            <span>{{ member.name }}</span>
            <v-btn @click="$emit('updatenewmembers', true, member)">Remove</v-btn>
        </div>
    </div>
    <div class="adder">
        <select v-model="addonStudent">
            <option v-for="student in props.students" :value="student">{{ student.name }}</option>
        </select>
        <v-btn @click="$emit('updatenewmembers', false, addonStudent)" class="adderbtn">Add</v-btn>
    </div>
</template>
<style scoped>
select {
    width: 70%;
    padding: 1%;
    background-color: rgb(210, 210, 210);
    border : none;
}
button {
    padding-left: 3px;
    padding-right: 3px;
}
.itemswrapper {
    max-height: 30vh;
    overflow-y: auto;
}
.items {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    background-color: rgb(210, 210, 210);
}
.adder {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 5px;
    margin-top: 20px;
    padding: 5px;
    border: 1px solid black;
    background-color: rgb(210, 210, 210);
}
</style>