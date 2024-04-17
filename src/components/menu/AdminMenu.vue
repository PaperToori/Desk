<script setup>
import { ref } from 'vue'
import { useAdminStore } from '@/stores/store';

const adminStore = useAdminStore();
let selectedSchema = ref('teacher');

</script>
<template>
    <div @change="(event) => adminStore.UpdateSelected(event.target.value)">
            <p> <label>
                    <input type="radio" v-model="selectedSchema" value="teacher" name="selectSchema" default>
                    Lärare
            </label> </p>
            <p> <label>
                    <input type="radio" v-model="selectedSchema" value="student" name="selectSchema">
                    Elev
            </label> </p>
            <p> <label>
                    <input type="radio" v-model="selectedSchema" value="group" name="selectSchema">
                    Klass
            </label> </p>
            <p> <label>
                    <input type="radio" v-model="selectedSchema" value="classroom" name="selectSchema">
                    Klassrum
            </label> </p>
            <p> <label>
                    <input type="radio" v-model="selectedSchema" value="subject" name="selectSchema">
                    Ämne
            </label> </p>
            <p> <label>
                    <input type="radio" v-model="selectedSchema" value="course" name="selectSchema">
                    Kurs
            </label> </p>
        </div>
</template>
<style scoped>
input[type="radio"]{
    display: inline;
    margin: 2%
}
input[type="radio"]:checked {
    margin: 10%;
}
</style>