<script setup>
const props = defineProps({ newMembers: Array, students: Array });
</script>
<template>
    List of students goes here
    <!-- <div v-for="member in props.newMembers">
        <span>{{ member }}</span>
        <button>Edit</button>
        <button>Remove</button>
    </div>
    <select v-model="selectedStudent">
        <option v-for="student in props.students" :value="student._id">{{ student.name }}</option>
    </select> -->






    <!-- <div>
    <div v-for="member in newMembers">
        {{ member }}
    </div>
    <div>
        <select>
            <option v-for="student in props.students" value="student">{{ student.name }}</option>
        </select>
        <button @click="addStudent()">+</button>
    </div>
</div> -->
</template>
<style scoped></style>