<script setup>
import NavBar from './components/menu/NavBar.vue';
import MenuOperator from './components/menu/MenuOperator.vue';
import Signout from './components/ui/Signout.vue'
</script>

<template>
  <div class="Screen">
    <div class="Bar">
      <NavBar />
      <div>
        <MenuOperator />
        <Suspense>
          <!-- main content -->
          <Signout />
          <!-- loading state -->
          <template #fallback>
            Loading...
          </template>
        </Suspense>
        
      </div>
    </div>
    <div>
      <Suspense>
        <!-- main content -->
        <router-view></router-view>
        <!-- loading state -->
        <template #fallback>
          Loading...
        </template>
      </Suspense>

    </div>
  </div>
</template>

<style scoped>
.Screen {
  display: grid;
  grid-template-columns: 15fr 85fr;
  max-width: 100vw;
  height: 100vh;
}

.Bar {
  display: grid;
  grid-template-rows: 15vh 85vh;
  background-color: rgb(180, 180, 180);
  width: 15vw;
  height: auto;
}

/* .schedule {
  display: grid;
  grid-template-rows: repeat(144, 10px);
  grid-template-columns: repeat(5, 1fr);
  width: 85vw;
  background-color: rgb(80, 80, 80);
} */
</style>
