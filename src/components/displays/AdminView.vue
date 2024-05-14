<script setup>
import { onBeforeMount, ref } from 'vue';
import DataList from '../ui/DataList.vue';
import ItemCreator from '../ui/ItemCreator.vue';
import ItemEditor from '../ui/ItemEditor.vue';
import { useAdminStore, useAuthStore } from '@/stores/store';

let adminStore = useAdminStore();
const Auth = useAuthStore();
Auth.Inject();

let teachers = ref([]);
let students = ref([]);
let groups = ref([]);
let classrooms = ref([]);
let subjects = ref([]);
let tags = ref([]);

onBeforeMount(async () => {
    try {
        let id = "undefined";
        if (Auth.auth.currentUser) {
            id = await Auth.auth.currentUser.getIdToken(true);
            console.log(id);
        }
        let headersList = {
            "id": id
        }
        // fetch everything from db...
        let teacherResponse = await fetch("http://localhost:8080/teachers/", {
            method: "GET",
            headers: headersList
        });
        let studentResponse = await fetch("http://localhost:8080/students/", {
            method: "GET",
            headers: headersList
        });
        let groupResponse = await fetch("http://localhost:8080/groups/", {
            method: "GET",
            headers: headersList
        });
        let classroomResponse = await fetch("http://localhost:8080/classrooms/", {
            method: "GET",
            headers: headersList
        });
        let subjectResponse = await fetch("http://localhost:8080/subjects/", {
            method: "GET",
            headers: headersList
        });
        let tagResponse = await fetch("http://localhost:8080/tags/", {
            method: "GET",
            headers: headersList
        });
        // Input into local variables
        teachers.value = await teacherResponse.json();
        students.value = await studentResponse.json();
        groups.value = await groupResponse.json();
        classrooms.value = await classroomResponse.json();
        subjects.value = await subjectResponse.json();
        tags.value = await tagResponse.json();
    } catch (error) {
        console.log(error.message);
    }
});

</script>
<template>
    <div class="datalist">
        <DataList :teachers="teachers" :students="students" :groups="groups" :classrooms="classrooms"
            :subjects="subjects" :tags="tags" />
    </div>
    <div class="itemaspect" v-if="adminStore.edit === true">
        <ItemEditor :students="students" />
    </div>
    <div class="itemaspect">
        <ItemCreator :tags="tags" :students="students" :groups="groups" />
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

.itemaspect {
    height: auto;
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