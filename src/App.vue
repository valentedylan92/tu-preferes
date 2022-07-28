<template>
  <!-- <nav> -->
    <!-- <router-link to="/">Tu prèfères</router-link> | -->
    <!-- <router-link to="/about">About</router-link> -->
  <!-- </nav> -->
  <!-- <router-view :listingRather="listingRather" :getRandom="getRandom" /> -->
  <div class="container">
    <GameScreen :listingRather="listingRather" :keyRandom="getRandom"  />
  </div>
</template>


<script>

import listYouRather from "./list.json"
import GameScreen from '@/views/GameScreen.vue'


export default {
  data(){
    return{
      listingRather : listYouRather,
      randomNumber : 0
    }
  },
  computed:{
    getRandom(){
        const newNumber = Math.round(Math.random()*(this.listingRather.length-1));
        return  newNumber
    },
  },
  components: {
    GameScreen
  },

}

  
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
