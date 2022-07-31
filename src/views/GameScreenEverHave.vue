<template>
  <div class="game__container">
    <div class="game__score">
     <ScorePanel />
    </div>
    <div class="game__inner">
      <CardelementEverHave 
        :elementEverHave="listingEverHaveFinal[keyElement]"
        :key="keyElement"
      />
      <AnswerHandler 
        :element="listingEverHaveFinal[keyElement]"
        :key="keyElement"
      />
      <button id="newGame" @click="getNewRandom()" class="button">Nouveau tu préfères</button>
      <p class="message">{{message}}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardelementEverHave from '@/components/everHave/CardelementEverHave.vue'
import AnswerHandler from '@/components/AnswerHandler.vue'
import ScorePanel from '@/components/ScorePanel.vue'
import listEverHave from "../listEverHave.json"



export default {
  name: 'GameScreenEverHave',
  data(){
    return{
      keyElement: 0,
      listingEverHaveFinal: listEverHave,
      ListingEverHaveUsed : [],
      message:''
    }
  },
  components: {
    CardelementEverHave,
    AnswerHandler,
    ScorePanel
  },

  methods:{
    getNewRandom() {
      if(this.listingEverHaveFinal.length != this.ListingEverHaveUsed.length){
            var notInArray = true
            while (notInArray) {
              this.keyElement = Math.round(Math.random()*(this.listingEverHaveFinal.length-1))
              if(!this.ListingEverHaveUsed.includes(this.keyElement)){
                console.log(this.keyElement,this.ListingEverHaveUsed)
                notInArray = false
              }
            }
      }else{
        this.message = "No more "
      }
    },
  },
  mounted(){
    this.emitter.on('updateListing', data => {
      this.ListingEverHaveUsed.push(data-1);
    })
  },
  beforeMount(){
    const newNumber = Math.round(Math.random()*(this.listingEverHaveFinal.length-1));
    this.keyElement = newNumber
  }

}
</script>
