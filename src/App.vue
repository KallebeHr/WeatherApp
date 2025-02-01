<template>
  <v-app class="container">
    <header>
      <SearchHeader />
    </header>
    <div class="body">
      <Card />
      <World />
    </div>
  </v-app>
</template>

<script setup>
import Card from './components/Card.vue';
import SearchHeader from './components/searchHeader.vue';
import World from './components/world.vue';
</script>

<style scoped>
.container {
  background:  #4a6cf7; 
  height: auto ;
  display: flex;
  align-items: center;
}

header {
  width: 100%;
  margin-bottom: .5rem; 
}

.body {
  display: flex;
  justify-content: center;
  align-items: flex-start; 
  gap: 2rem; 
  padding: 1rem;
  flex-wrap: wrap;
  width: 100%;
}


@media (max-width: 768px) {
  .container {
  }

  .body {
    flex-direction: column; 
    align-items: center; 
    gap: 1rem;
    padding: 0;
  }
}

@media (max-width: 480px) {
  .body {
    gap: 0.5rem; 
}
}
</style>