<template>
  <div class="game__container">
    <CardElement 
      :elementRather="listingRather[keyElement]"
      :key="keyElement"
    />
  </div>
  <button id="newGame" @click="getNewRandom()" class="button">Nouveau tu préfères</button>

</template>

<script>
// @ is an alias to /src
import CardElement from '@/components/CardElement.vue'


export default {
  name: 'GameScreen',
  props:["listingRather","keyRandom"],
  data(){
    return{
      keyElement: this.keyRandom
    }
  },
  components: {
    CardElement
  },

  methods:{

    getNewRandom() {
      this.keyElement = Math.round(Math.random()*(this.listingRather.length-1))
    }
  }

}
</script>
