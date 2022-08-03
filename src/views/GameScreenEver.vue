<template>
  <div class="game__container">
    <div class="game__inner">
      <CardelementEver 
        :elementEver="listingEverFinal[keyElement]"
        :key="keyElement"
        :lengthGame="ListingEverCurrent.length"
        :limitGame="limitGame"
      />
      <!-- <AnswerEverHandler 
        :element="listingEverFinal[keyElement]"
        :key="keyElement"
      /> -->
      <button id="newGame" v-if="currentGame" @click="getNewRandom()" class="button">J'ai déjà suivant</button>
      <p class="message">{{message}}</p>
    </div>
    <div class="game__score"  v-if="gameOver">
      <div class="game__score__inner">
        <ScorePanel :limitGame="limitGame" :session="session" />
      </div>
    </div>
    <PopupRulesEver v-if="popupDisplay" />
  </div>
</template>

<script>
// @ is an alias to /src
import CardelementEver from '@/components/everHave/CardelementEver.vue'
import PopupRulesEver from '@/components/everHave/PopupRulesEver.vue'
// import AnswerEverHandler from '@/components/everHave/AnswerEverHandler.vue'
import ScorePanel from '@/components/ScorePanel.vue'
import listYouEver from "../listEver.json"



export default {
  name: 'GameScreenEver',
  data(){
    return{
      keyElement: 0,
      listingEverFinal: listYouEver,
      ListingEverUsed : [],
      ListingEverCurrent: [],
      limitGame: 15,
      session:1,
      message:'',
      popupDisplay:true,
      currentGame:false,
      gameOver:false
    }
  },
  components: {
    CardelementEver,
    // AnswerEverHandler,
    ScorePanel,
    PopupRulesEver
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
        this.ListingEverCurrent = []
        this.getNewRandom()
        this.ListingEverCurrent = [this.keyElement]
        this.emitter.emit('resetScore')
        this.session =+ 1
      }else{
        this.message = "No more "
      }

    }
  },
  mounted(){
    this.ListingEverCurrent.push(this.keyElement);
    this.emitter.on('updateListing', data => {
      if(this.ListingEverCurrent.length == this.limitGame){
        this.gameOver = true
      }else{
        this.currentGame = true
      }
      this.ListingEverUsed.push(data-1)
    }),
    this.emitter.on('hidePopupEver', data => {
        console.log(data)
        this.limitGame = data
        this.popupDisplay = false
    }),
    this.emitter.on('endOfTheGame', data => {
        console.log(data)
        if(data=="361"){
          this.ListingEverUsed = []
        }
        this.limitGame = data
        this.gameOver =false
        this.getNewGame()
    })
  },
  beforeMount(){
    const newNumber = Math.round(Math.random()*(this.listingEverFinal.length-1));
    this.keyElement = newNumber
  }

}
</script>
