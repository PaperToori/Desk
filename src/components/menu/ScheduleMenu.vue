<script setup>
import WeekPicker from '../ui/WeekPicker.vue';
import FilterOption from '../ui/FilterOption.vue';
import { useFilterStore } from '@/stores/store';

const filterStore = useFilterStore();

function UpdateWeek(event) {
    filterStore.ChangeWeek(parseInt(event.target.value));
}
function UpdateOption(event) {
    if (event.target.name === 'selectType')   { filterStore.type = event.target.value; }
    if (event.target.name === 'selectOption') { filterStore.text = event.target.value; }
}

</script>
<template>
    <div>
        <WeekPicker   @change="UpdateWeek  " />
        <FilterOption @change="UpdateOption" />
    </div>
</template>
<style scoped></style>