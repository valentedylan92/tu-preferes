<template>
  <div class="game__container">

    <div class="game__inner">
      <CardelementEver 
        :elementEver="listingEverFinal[keyElement]"
        :key="keyElement"
        :lengthGame="ListingEverCurrent.length"
        :limitGame="limitGame"
      />
      <AnswerHandler 
        :element="listingEverFinal[keyElement]"
        :key="keyElement"
      />
      <button id="newGame" v-if="currentGame" @click="getNewRandom()" class="button">Nouveau tu préfères</button>
      <button id="newGame" v-if="newGame" @click="getNewGame()" class="button">Nouveau jeu</button>
      <p class="message">{{message}}</p>
    </div>
    <div class="game__score">
      <ScorePanel />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardelementEver from '@/components/everHave/CardelementEver.vue'
import AnswerHandler from '@/components/AnswerHandler.vue'
import ScorePanel from '@/components/ScorePanel.vue'
import listEver from "../listEver.json"



export default {
  name: 'GameScreenEver',
  data(){
    return{
      keyElement: 0,
      listingEverFinal: listEver,
      ListingEverUsed : [],
      ListingEverCurrent: [],
      limitGame:15,
      message:'',
      currentGame:false,
      newGame:false
    }
  },
  components: {
    CardelementEver,
    AnswerHandler,
    ScorePanel
  },
  methods:{
    getNewRandom() {
      this.currentGame = false
      if(this.listingEverFinal.length != this.ListingEverUsed.length){
      this.ListingEverCurrent.push(this.keyElement);

        if(this.ListingEverCurrent.length <= this.limitGame){
            var notInArray = true
            while (notInArray) {
              this.keyElement = Math.round(Math.random()*(this.listingEverFinal.length-1))
              if(!this.ListingEverUsed.includes(this.keyElement)){
                console.log(this.keyElement,this.ListingEverUsed)
                notInArray = false
              }
            }
        }else{
          this.message = "Game finished"
        }
      }else{
        this.message = "No more "
      }
    },
    getNewGame(){
      if(this.listingEverFinal.length != this.ListingEverUsed.length){
        this.newGame =false
        this.currentGame =true
        this.ListingEverCurrent = []
        this.getNewRandom()
        this.ListingEverCurrent = [this.keyElement]
      }else{
        this.message = "No more "
      }

    }
  },
  mounted(){
    this.ListingEverCurrent.push(this.keyElement);
    this.emitter.on('updateListing', data => {
      if(this.ListingEverCurrent.length == this.limitGame){
        this.newGame = true
      }else{
        this.currentGame = true
      }
      this.ListingEverUsed.push(data-1)
    })
  },
  beforeMount(){
    const newNumber = Math.round(Math.random()*(this.listingEverFinal.length-1));
    this.keyElement = newNumber
  }

}
</script>
