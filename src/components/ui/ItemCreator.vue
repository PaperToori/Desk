<script setup>
import { watch } from 'vue';
import { useAdminStore } from '@/stores/store';

let adminStore = useAdminStore();

watch(() => adminStore.selected, () => { 
    // Hide all options
    document.getElementById('').style.display = 'none';
});

function PutRequest(){
    
}

</script>
<template>
    <div id="teacher">
        <input placeholder="Full Name"
        type="text"
        id="teacher-name">

        <input placeholder="Gmail"        
        type="text"
        id="teacher-gmail">

        <input placeholder="Phone Number" 
        type="tel" 
        inputmode="numeric"
        id="teacher-phonenumber">
    </div>
    <div id="">Missing</div>
    <div id="">Missing</div>
    <div id="">Missing</div>
    <div id="">Missing</div>
    <div id="">Missing</div>
    <button @click="PutRequest">Create</button>
</template>
<style scoped></style>