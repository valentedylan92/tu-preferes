<template>
  <div class="game__container">
    <CardelementRather 
      :elementRather="listingRather[keyElement]"
      :key="keyElement"
    />
    <AnswerHandler 
      :elementRather="listingRather[keyElement]"
      :key="keyElement"
    />
    <ScorePanel />
  </div>
  <button id="newGame" @click="getNewRandom()" class="button">Nouveau tu préfères</button>

</template>

<script>
// @ is an alias to /src
import CardelementRather from '@/components/CardelementRather.vue'
import AnswerHandler from '@/components/AnswerHandler.vue'
import ScorePanel from '@/components/ScorePanel.vue'


export default {
  name: 'GameScreen',
  props:["listingRather","keyRandom"],
  data(){
    return{
      keyElement: this.keyRandom,
    }
  },
  components: {
    CardelementRather,
    AnswerHandler,
    ScorePanel
  },

  methods:{
    getNewRandom() {
      this.keyElement = Math.round(Math.random()*(this.listingRather.length-1))
    },
  }

}
</script>
