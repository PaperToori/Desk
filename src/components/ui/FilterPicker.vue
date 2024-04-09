<script setup>
import { ref, computed, onBeforeMount, watch } from 'vue';

let currentSelection = ref("");

let props = defineProps(['filter', 'eyes']);


watch(() => props.eyes, (newVal, oldVal) => { 
    document.getElementById('filterBox').value = 'default';
});

let groups = ref([]);
let teachers = ref([]);
let classrooms = ref([]);

let items = computed(() => {
    if (props.filter == 'groups') { return groups; }
    else if (props.filter == 'teachers') { return teachers; }
    else if (props.filter == 'classrooms') { return classrooms; }
});

onBeforeMount(async () => {
    try {
        let response = await fetch("http://localhost:8080/groups/", {
            method: "GET",
        });
        groups.value = await response.json();
    } catch (error) {
        console.log(error.message);
    }
    try {
        let response = await fetch("http://localhost:8080/teachers/", {
            method: "GET",
        });
        teachers.value = await response.json();
    } catch (error) {
        console.log(error.message);
    }
    try {
        let response = await fetch("http://localhost:8080/classrooms/", {
            method: "GET",
        });
        classrooms.value = await response.json();
    } catch (error) {
        console.log(error.message);
    }
});

</script>


<template>
    <label>
        <select class="SelectBox" id="filterBox" name="selectOption">
            <option value="default" disabled selected hidden>Select Option</option>
            <option v-for="item in items.value"> {{ item.name }}</option>
        </select>
    </label>
</template>

<style scoped>
.SelectBox {
    width: 80%;
    margin-left: 10%;
}
</style>