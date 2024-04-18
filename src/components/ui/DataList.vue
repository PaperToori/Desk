<script setup>
import { watch } from 'vue';
import { useAdminStore } from '@/stores/store';
import DataLine from './DataLine.vue';

const props = defineProps({
    teachers: Array,
    students: Array,
    classrooms: Array,
    subjects: Array,
    courses: Array
})

let adminStore = useAdminStore();

watch(() => adminStore.selected, () => {
    // Hide all options
    document.getElementById('teacher'  ).style.display = 'none';
    document.getElementById('student'  ).style.display = 'none';
    // document.getElementById('group'    ).style.display = 'none';
    document.getElementById('classroom').style.display = 'none';
    document.getElementById('subject'  ).style.display = 'none';
    document.getElementById('course'   ).style.display = 'none';

    // Display the selected option
    if (adminStore.selected === 'teacher') {
        document.getElementById('teacher').style.display = 'inline';
    } else if (adminStore.selected === 'student') {
        document.getElementById('student').style.display = 'inline';
    } // else if (adminStore.selected === 'group') {
        // document.getElementById('group').style.display = 'inline'; } 
    else if (adminStore.selected === 'classroom') {
        document.getElementById('classroom').style.display = 'inline';
    } else if (adminStore.selected === 'subject') {
        document.getElementById('subject').style.display = 'inline';
    } else if (adminStore.selected === 'course') {
        document.getElementById('course').style.display = 'inline';
    }
});

</script>
<template>
    <div id="teachers">
        <DataLine v-for="teacher in teachers" type="teacher" :target="teacher" />
    </div>
    <div id="students">
        <DataLine v-for="student in students" type="student" :target="student" />
    </div>
    <!-- <div id="group">
        <DataLine v-for="group in groups" type="group" :target="group"/>
    </div> -->
    <div id="classrooms">
        <DataLine v-for="classroom in classrooms" type="classroom" :target="classroom" />
    </div>
    <div id="subject">
        <DataLine v-for="subject in subjects" type="subject" :target="subject" />
    </div>
    <div id="course">
        <DataLine v-for="course in courses" type="course" :target="course" />
    </div>
</template>
<style scoped>

#student   { display: none; }
#group     { display: none; }
#classroom { display: none; }
#subject   { display: none; }
#course    { display: none; }
</style>