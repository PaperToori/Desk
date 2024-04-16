<script setup>
import NavBar from './components/menu/NavBar.vue';
import MenuOperator from './components/menu/MenuOperator.vue';
</script>

<template>
  <div class="Screen">
      <div class="Bar">
          <NavBar/>
          <div>
            <MenuOperator/>
          </div>
      </div>
      <div>
        <router-view></router-view>
      </div>
  </div>
</template>

<style scoped>
.Screen {
  display: grid;
  grid-template-columns: 15fr 85fr;
  width: 100vw;
  height: 100vh;
}

.Bar {
  display: grid;
  grid-template-rows: 1fr 6fr;
  background-color: rgb(180, 180, 180);
  width: 15vw;
}

.schedule {
  display: grid;
  grid-template-rows: repeat(144, 10px);
  grid-template-columns: repeat(5, 1fr);
  width: 85vw;
  background-color: rgb(80, 80, 80);
}
</style>
