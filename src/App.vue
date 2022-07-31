<template>
  <nav>
    <router-link to="/">Tu prèfères</router-link>
    <router-link to="/jai-deja">J'ai déjà</router-link>
  </nav>
  <div class="container">
    <router-view  />
  </div>
</template>


<script>

// import listYouRather from "./listRather.json"
// import listEverHave from "./listEverHave.json"
// import GameScreenRather from '@/views/GameScreenRather.vue'
  
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
