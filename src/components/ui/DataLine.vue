<script setup>
let props = defineProps({
    type: String,
    target: Object
});

</script>
<template>
    <div class="items" id="teacher">
        {{ props.target.name }}
    </div>
    <div class="items" id="student">
    </div>
    <div class="items" id="group">
    </div>
    <div class="items" id="classroom">
    </div>
    <div class="items" id="subject">
    </div>
    <div class="items" id="course">
    </div>
    </template>
<style scoped>
.items {
    display: grid;
    grid-row: 1fr;
    grid-column: 1fr 1fr 1fr 1fr;
}
</style>