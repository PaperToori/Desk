<script setup>
import { watch } from 'vue';
import { useAdminStore } from '@/stores/store';
import DataLine from './DataLine.vue';

const props = defineProps({
    teachers  : Array,
    students  : Array,
    groups    : Array,
    classrooms: Array,
    subjects  : Array,
    tags      : Array
})

let adminStore = useAdminStore();

</script>
<template>

    <div v-if="adminStore.selected==='teacher'" class="rowler">
        <div v-for="teacher in teachers">
            <DataLine type="teacher" :target="teacher" />
        </div>
    </div>

    <div v-if="adminStore.selected==='student'" class="rowler">
        <div v-for="student in students">
            <DataLine type="student" :target="student" />
        </div>
    </div>

    <div v-if="adminStore.selected==='group'" class="rowler">
        <div v-for="group in groups">
            <DataLine type="group" :target="group"/>
        </div>
    </div>

    <div v-if="adminStore.selected==='classroom'" class="rowler">
        <div v-for="classroom in classrooms">
            <DataLine type="classroom" :target="classroom" />
        </div>
    </div>

    <div v-if="adminStore.selected==='subject'" class="rowler">
        <div v-for="subject in subjects">
            <DataLine type="subject" :target="subject" />
        </div>
    </div>

    <div v-if="adminStore.selected==='tag'" class="rowler">
        <div v-for="tag in tags">
            <DataLine type="tag" :target="tag" />
        </div>
    </div>

</template>
<style scoped>
.rowler { 
    display: grid;
    max-height: 100%;
    overflow-y: auto;
 }
</style>