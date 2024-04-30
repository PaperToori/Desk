<script setup>
import { onBeforeMount, watch } from 'vue';
import { useAdminStore } from '@/stores/store';
import DataList from '../ui/DataList.vue';
import ItemCreator from '../ui/ItemCreator.vue';

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
    } catch (error) {
        console.log(error.message);
    }
    try {
        let response = await fetch("http://localhost:8080/students/", {
            method: "GET",
        });
        students = await response.json();
    } catch (error) {
        console.log(error.message);
    }
    try {
        let response = await fetch("http://localhost:8080/groups/", {
            method: "GET",
        });
        groups = await response.json();
    } catch (error) {
        console.log(error.message);
    }
    try {
        let response = await fetch("http://localhost:8080/classrooms/", {
            method: "GET",
        });
        classrooms = await response.json();
    } catch (error) {
        console.log(error.message);
    }
    try {
        let response = await fetch("http://localhost:8080/subjects/", {
            method: "GET",
        });
        subjects = await response.json();
    } catch (error) {
        console.log(error.message);
    }
    try {
        let response = await fetch("http://localhost:8080/tags/", {
            method: "GET",
        });
        tags = await response.json();
    } catch (error) {
        console.log(error.message);
    }
});

</script>
<template>
    <h2>{{ adminStore.SelectedUpperCase() }}</h2>
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
    margin: 1%;
}

.itemcreator {
    height: 40vh;
    background-color: rgb(130, 130, 130);
    border: 2px;
    padding: 1%;
    margin: 1%;
}
</style>