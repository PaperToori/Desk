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
        let response = await fetch("http://localhost:8080/teachers/", {
            method: "GET",
        });
        teachers = await response.json();
        console.log(teachers);
    } catch (error) {
        console.log(error.message);
    }
    try {
        let response = await fetch("http://localhost:8080/students/", {
            method: "GET",
        });
        students = await response.json();
        console.log(students);
    } catch (error) {
        console.log(error.message);
    }
    try {
        let response = await fetch("http://localhost:8080/groups/", {
            method: "GET",
        });
        groups = await response.json();
        console.log(groups);
    } catch (error) {
        console.log(error.message);
    }
    try {
        let response = await fetch("http://localhost:8080/classrooms/", {
            method: "GET",
        });
        classrooms = await response.json();
        console.log(classrooms);
    } catch (error) {
        console.log(error.message);
    }
    try {
        let response = await fetch("http://localhost:8080/subjects/", {
            method: "GET",
        });
        subjects = await response.json();
        console.log(subjects);
    } catch (error) {
        console.log(error.message);
    }
    try {
        let response = await fetch("http://localhost:8080/tags/", {
            method: "GET",
        });
        tags = await response.json();
        console.log(tags);
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
        :tags      ="tags">
        </DataList>
    </div>
    <ItemEditor/>
    <div class="itemcreator">
        <ItemCreator :tags="tags" :students="students"/>
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
</style>