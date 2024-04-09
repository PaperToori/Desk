<script setup>
import { ref, onBeforeMount } from 'vue';
import NavBar from '../ui/NavBar.vue';
import ScheduleMenu from '../ui/ScheduleMenu.vue';
import ScheduleDisplay from '../ui/ScheduleDisplay.vue';

let filters_array = ref([]);

let filterType = ref("groups")
let week = ref(0)

let classes = ref([]);
let classrooms = ref([]);
let teachers = ref([]);

onBeforeMount(async () => {
    try {
        let response = await fetch("http://localhost:8080/groups/", {
            method: "GET",
        });
        let classObjects = await response.json();
        classObjects.forEach(element => {
            classes.value.push(element.name);
        });
    } catch (error) {
        console.log(error.message);
    }
    try {
        let response = await fetch("http://localhost:8080/teachers/", {
            method: "GET",
        });
        let teacherObjects = await response.json();
        teacherObjects.forEach(element => {
            teachers.value.push(element.name);
        });
    } catch (error) {
        console.log(error.message);
    }
    try {
        let response = await fetch("http://localhost:8080/classrooms/", {
            method: "GET",
        });
        let classroomObjects = await response.json();
        classroomObjects.forEach(element => {
            classrooms.value.push(element.name);
        });
    } catch (error) {
        console.log(error.message);
    }
});

function updateSchedule(event) {
    let val = event.target.value;
    let name = event.target.name;

    if (name === 'selectType') { filterType.value = val; }
    if (name === 'selectOption') {
        filters_array.value = [];

        filters_array.value.push({
            inclusive: true,
            type: filterType.value,
            text: val
        });
    }
    if (name === 'selectWeek'){ week.value = parseInt(val); }
}

</script>

<template>
    <div class="Screen">
        <div class="Bar">
            <NavBar />
            <ScheduleMenu @change="updateSchedule" />
        </div>
        <p>This is the edit view</p>
    </div>
</template>

<style scoped>
.Screen {
    display: grid;
    grid-template-columns: 15fr 85fr;
    width: 100vw;
    height: 100vh;
}

.Bar {
    display: grid;
    grid-template-rows: 1fr 5fr;
    background-color: rgb(180, 180, 180);
    width: 15vw;
}

.schedule {
    display: grid;
    grid-template-rows: repeat(144, 10px);
    grid-template-columns: repeat(5, 1fr);
    width: 85vw;
    background-color: rgb(80, 80, 80);
}
</style>