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

watch(() => adminStore.selected, () => {
    console.log("hej");

    // Hide all options
    document.getElementById('list-teachers').style.display = 'none';
    document.getElementById('list-students').style.display = 'none';
    document.getElementById('list-groups').style.display = 'none';
    document.getElementById('list-classrooms').style.display = 'none';
    document.getElementById('list-subjects').style.display = 'none';
    document.getElementById('list-tags').style.display = 'none';

    // Display the selected option
    if (adminStore.selected === 'teacher') {
        document.getElementById('list-teachers').style.display = 'grid';
    } else if (adminStore.selected === 'student') {
        document.getElementById('list-students').style.display = 'grid';
    } else if (adminStore.selected === 'group') 
    {   document.getElementById('list-groups').style.display = 'grid'; 
    } else if (adminStore.selected === 'classroom') {
        document.getElementById('list-classrooms').style.display = 'grid';
    } else if (adminStore.selected === 'subject') {
        document.getElementById('list-subjects').style.display = 'grid';
    } else if (adminStore.selected === 'tag') {
        document.getElementById('list-tags').style.display = 'grid';
    }
});

</script>
<template>

    <div id="list-teachers" class="rowler">
        <div v-for="teacher in teachers">
            <DataLine type="teacher" :target="teacher" />
        </div>
    </div>

    <div id="list-students" class="rowler">
        <div v-for="student in students">
            <DataLine type="student" :target="student" />
        </div>
    </div>

    <div id="list-groups" class="rowler">
        <div v-for="group in groups">
            <DataLine type="group" :target="group"/>
        </div>
    </div>

    <div id="list-classrooms" class="rowler">
        <div v-for="classroom in classrooms">
            <DataLine type="classroom" :target="classroom" />
        </div>
    </div>

    <div id="list-subjects" class="rowler">
        <div v-for="subject in subjects">
            <DataLine type="subject" :target="subject" />
        </div>
    </div>

    <div id="list-tags" class="rowler">
        <div v-for="tag in tags">
            <DataLine type="tag" :target="tag" />
        </div>
    </div>

</template>
<style scoped>
.rowler { 
    max-height: 100%;
    overflow-y: auto;
 }
#list-teachers   { display: none; }
#list-students   { display: none; }
#list-groups     { display: none; }
#list-classrooms { display: none; }
#list-subjects   { display: none; }
#list-tags       { display: none; }
</style>