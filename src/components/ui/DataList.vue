<script setup>
import { watch } from 'vue';
import { onBeforeMount } from 'vue';
import { useAdminStore } from '@/stores/store';

let adminStore = useAdminStore();

watch(() => adminStore.selected, () => { 

});

let teachers   = [];
let students   = [];
let groups     = [];
let classrooms = [];
let subjects   = [];
let courses    = [];

onBeforeMount(async () => {
    // fetch everything from db...
    // try {
    //     let response = await fetch("http://localhost:8080/teachers/", {
    //         method: "GET",
    //     });
    //     teachers = await response.json();
    // } catch (error) {
    //     console.log(error.message);
    // }
    // try {
    //     let response = await fetch("http://localhost:8080/students/", {
    //         method: "GET",
    //     });
    //     students = await response.json();
    // } catch (error) {
    //     console.log(error.message);
    // }
    // try {
    //     let response = await fetch("http://localhost:8080/groups/", {
    //         method: "GET",
    //     });
    //     groups = await response.json();
    // } catch (error) {
    //     console.log(error.message);
    // }
    // try {
    //     let response = await fetch("http://localhost:8080/classrooms/", {
    //         method: "GET",
    //     });
    //     classrooms = await response.json();
    // } catch (error) {
    //     console.log(error.message);
    // }
    // try {
    //     let response = await fetch("http://localhost:8080/subjects/", {
    //         method: "GET",
    //     });
    //     subjects = await response.json();
    // } catch (error) {
    //     console.log(error.message);
    // }
    // try {
    //     let response = await fetch("http://localhost:8080/courses/", {
    //         method: "GET",
    //     });
    //     courses = await response.json();
    // } catch (error) {
    //     console.log(error.message);
    // }
});

</script>
<template>
    <div class="displayteachers" v-for="teacher in teachers">
        <DataLine type="teacher" :target="teacher"/>
    </div>
    <div class="displaystudents">
    </div>
    <div class="displayclassrooms">
    </div>
    <div class="displaysubject">
    </div>
    <div class="displaycourse">
    </div>
</template>
<style scoped></style>