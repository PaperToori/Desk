<script setup>
import FilterPicker from '../ui/FilterPicker.vue';
import { ref } from 'vue';

let filter = ref("groups");

let childUpdater = ref("groups")

function updateRef(event){
    childUpdater.value = event.target.value;
}

</script>

<template>
    <div>
        <div @change="updateRef">
            <p>
                <label>
                    <input type="radio" v-model="filter" value="groups" name="selectType">
                    Classes
                </label>
            </p>
            <p>
                <label>
                    <input type="radio" v-model="filter" value="classrooms" name="selectType">
                    Classrooms
                </label>
            </p>
            <p>
                <label>
                    <input type="radio" v-model="filter" value="teachers" name="selectType">
                    Teachers
                </label>
            </p>
        </div>
        <Suspense>
            <FilterPicker :filter="filter" :eyes="childUpdater" />
        </Suspense>
    </div>
</template>
<style scoped></style>