<script setup>
const props = defineProps(["subject", "teacher", "classroom", "start_time", "end_time", "weekday", "clAss", "isEditing"]); // This whole page is currently in renedition

let originalClassroom = props.classroom;

let newStartTime = ref(props.start_time);

function submitChanges() {
    // send query to actually change in database
    isEditing = false;
}

</script>

<template>
    <div class="lesson-bubble">
        
        <div>
            <input v-if="isEditing" type="text" v-model="newStartTime">
            <span v-else>{{ start_time }}</span>
        </div>
        <div>{{ subject }}</div>
        <div>{{ teacher }}</div>
        <div>{{ clAss }}</div>
        <div>{{ classroom }}</div>
        <div>{{ end_time }}</div>
        <button v-if="isEditing" type="button" @click="submitChanges"> Save changes </button>
    </div>
</template>

<style scoped>
.lesson-bubble {
    grid-row-start: v-bind(start_time+1);
    grid-row-end: v-bind(end_time+1);
    grid-column-start: v-bind(weekday);
    background-color: white;
    position: relative;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    box-shadow: 2px 2px 4px rgba(117, 117, 117, 0.647);
}
</style>