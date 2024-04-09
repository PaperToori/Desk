<script setup>
import { router } from '@/routes';
import FilterOption from '../ui/FilterOption.vue';
import WeekPicker from './WeekPicker.vue';
import { useRouter } from 'vue-router';

</script>

<template>
    <div>
        <WeekPicker/>
        <FilterOption/>
        <button @click="router.push('/editschedule')">Click me!</button>
    </div>
</template>

<style scoped>

</style>