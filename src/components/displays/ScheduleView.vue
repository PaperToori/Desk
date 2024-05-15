<script setup>
import { computed, onBeforeMount } from 'vue';
import { ref } from 'vue'
import ALesson from '../ui/ALesson.vue';
import {  useAuthStore, useFilterStore } from '@/stores/store'

// Pinia Stores
const Auth = useAuthStore();
Auth.Inject();


let id = "undefined";
if (Auth.auth.currentUser) {
    id = await Auth.auth.currentUser.getIdToken(true);
}
let headersList = {
    "id": id,
}

const filterStore = useFilterStore();

let fetchedLessons = [];

let displayedLessons = computed(() => {
    // Filter fetched lessons based on INCLUSIVE filters from ScheduleMenu
    let filteredLessons = [];
    let thisWeekLessons = [];

    filteredLessons = fetchedLessons.filter((l) => {
        if (filterStore.type === "classrooms") {
            return l.classroom === filterStore.text;
        }
        else if (filterStore.type === "teachers") {
            return l.teacher === filterStore.text;
        }
        else if (filterStore.type === "groups") {
            return l.group === filterStore.text; // 'class' won't exist after next purge - replace with 'group' // Already did :)
        }
        else { console.error("Something went wrong\ninput value: " + filter.type); }
    });

    // Displays only the lessons for that week
    filteredLessons.forEach((lesson) => {
        if (lesson.week === props.week) { thisWeekLessons.push(lesson); console.log("weeks match") }
    });
    return thisWeekLessons;
});

onBeforeMount(async () => {
    // fetch into lessons from db ...
    try {
        let response = await fetch("http://localhost:8080/lessons/", {
            method: "GET",
            headers: headersList,
        });
        fetchedLessons = await response.json();
    } catch (error) {
        console.log(error.message);
    }
});

</script>

<template>
    <div class="container">
        <ALesson :subject="lesson.subject" :teacher="lesson.teacher" :classroom="lesson.classroom"
            :start_time="lesson.startTime" :end_time="lesson.endTime" :weekday="lesson.weekDay" :clAss="lesson.group"
            v-for="lesson in displayedLessons" />
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-rows:    repeat(144, 10px);
    grid-template-columns: repeat(5, 1fr);
    background-color: rgb(90, 90, 90);
    width: 85vw;
    height: 100vh;
    overflow: hidden scroll;
}
</style>