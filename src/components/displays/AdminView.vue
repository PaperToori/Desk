<script setup>
import { watch } from 'vue';
import { useAdminStore } from '@/stores/store';
import DataList from '../ui/DataList.vue';
import ItemCreator from '../ui/ItemCreator.vue';

const adminStore = useAdminStore();

watch(() => adminStore.selected, () => { 

});

</script>
<template>
    <div class="title"> {{ adminStore.SelectedUpperCase() }} </div>
    <div class="datalist">
        <DataList/> <!-- this has to wait until after ItemCreator is done -->
    </div>
    <div class="itemcreator">
        <ItemCreator/>
    </div>
</template>

<style scoped>
</style>