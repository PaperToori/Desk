<script setup>

const props = defineProps({ newMembers: Array, students: Array });

</script>
<template>
    <div v-for="member in props.newMembers" class="items">
        <span>{{ member.name }}</span>
        <button @click="$emit('UpdateNewMembers', false, member)">Remove</button>
    </div>
    <!-- <select v-model="selectedStudent">
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
<style scoped>
.items {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    background-color: rgb(210, 210, 210);
}
</style>