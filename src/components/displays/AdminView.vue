<script setup>
import { onBeforeMount, watch, ref } from 'vue';
import { useAdminStore } from '@/stores/store';
import DataList from '../ui/DataList.vue';
import ItemCreator from '../ui/ItemCreator.vue';
import ItemEditor from '../ui/ItemEditor.vue';

const adminStore = useAdminStore();

let teachers = [];
let students = [];
let groups = [];
let classrooms = [];
let subjects = [];
let tags = [];

watch(() => adminStore.selected, () => {

});

onBeforeMount(async () => {
    // fetch everything from db...
    
    try {
        let teacherResponse = await fetch("http://localhost:8080/teachers/", {
            method: "GET" });
        let studentResponse = await fetch("http://localhost:8080/students/", {
            method: "GET" });
        let groupResponse = await fetch("http://localhost:8080/groups/", {
            method: "GET" });
        let classroomResponse = await fetch("http://localhost:8080/classrooms/", {
            method: "GET" });
        let subjectResponse = await fetch("http://localhost:8080/subjects/", {
            method: "GET" });
        let tagResponse = await fetch("http://localhost:8080/tags/", {
            method: "GET" });

        teachers = await teacherResponse.json();
        students = await studentResponse.json();
        groups = await groupResponse.json();
        classrooms = await classroomResponse.json();
        subjects = await subjectResponse.json();
        tags = await tagResponse.json();

    } catch (error) {
        console.log(error.message);
    }
});

</script>
<template>
    <!-- <h2>{{ adminStore.SelectedUpperCase() }}</h2> -->
    <div class="datalist">
        <DataList
        :teachers  ="teachers" 
        :students  ="students" 
        :groups    ="groups"
        :classrooms="classrooms" 
        :subjects  ="subjects"
        :tags      ="tags"/>
    </div>
    <ItemEditor/>
    <div class="itemcreator">
        <ItemCreator :tags="tags" :students="students" :groups="groups"/>
    </div>
</template>

<style scoped>
h2 {
    margin-top: 2vh;
    margin-bottom: 2vh;
    margin-left: 2vw;
}

.datalist {
    height: 50vh;
    background-color: rgb(130, 130, 130);
    border: 2px;
    padding: 2%;
    margin-top: 1vh;
    margin-bottom: 1vh;
    margin-left: 1vw;
    margin-right: 1vw;
    max-width: 85vw;
}

.itemcreator {
    height: auto;
    background-color: rgb(130, 130, 130);
    border: 2px;
    padding-top: 1vh;
    margin-top: 1vh;
    margin-bottom: 1vh;
    margin-left: 1vw;
    margin-right: 1vw;
    max-width: 85vw;
}
</style>