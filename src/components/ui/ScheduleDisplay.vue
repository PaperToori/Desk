<script setup>

import { computed, onBeforeMount } from 'vue';
import { ref } from 'vue'
import ALesson from '../ui/ALesson.vue';

const props = defineProps({
    filters: Array,
    week: Number
});

let fetchedLessons = [];

let displayedLessons = computed(() => {
    // Filter fetched lessons based on INCLUSIVE filters from ScheduleMenu
    let exclusiveFilters = [];
    let filteredLessons = [];
    let thisWeekLessons = [];
    props.filters.forEach((filter) => {
        let filteredLessonsPartial = fetchedLessons.filter((l) => {
            if (filter.inclusive) {
                if (filter.type === "classrooms") {
                    return l.classroom === filter.text;
                }
                else if (filter.type === "teachers") {
                    return l.teacher === filter.text;
                }
                else if (filter.type === "groups") {
                    return l.class === filter.text; // 'class' won't exist after next purge - replace with 'group'
                }
                else { console.error("Something went wrong\ninput value: " + filter.type); }
            } else {
                exlusiveFilters = exclusiveFilters.concat(filter);
            }
        });
        filteredLessons = filteredLessons.concat(filteredLessonsPartial);
    });

    // Same thing again, but for EXCLUSIVE filters         ---> Not needed right now, but good to retroactively test later <---
    // exclusiveFilters.forEach((filter) => {
    //     let filteredLessonsPartial = filteredLessons.filter((l) => {
    //         if (!filter.inclusive) {
    //             if (filter.type === "classroom") {
    //                 return !(l.classroom === filter.text);
    //             }
    //             else if (filter.type === "teacher") {
    //                 return !(l.teacher === filter.text);
    //             }
    //             else if (filter.type === "group") {
    //                 return !(l.group === filter.text);
    //             }
    //             else { console.log("Something went wrong\ninput value: " + filter.type); }
    //         }
    //     });
    //     filteredLessons = [...filteredLessons, filteredLessonsPartial];
    // });

    // Displays only the lessons for that week
    filteredLessons.forEach((lesson) => {
        if (lesson.week === props.week) { thisWeekLessons.push(lesson); console.log("weeks match") }
    });
    // console.log(filteredLessons);
    // return filteredLessons;
    return thisWeekLessons;
});

onBeforeMount(async () => {
    // fetch into lessons from db ...
    try {
        let response = await fetch("http://localhost:8080/lessons/", {
            method: "GET",
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
            :start_time="lesson.startTime" :end_time="lesson.endTime" :weekday="lesson.weekDay" :clAss="lesson.class"
            v-for="lesson in displayedLessons" />
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-rows: repeat(144, 10px);
    grid-template-columns: repeat(5, 1fr);
    background-color: rgb(90, 90, 90);
    width: 85vw;
    height: 100vh;
    overflow: hidden scroll;
}
</style>