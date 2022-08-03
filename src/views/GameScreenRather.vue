<template>
  <div class="game__container">
    <div class="game__inner">
      <CardelementRather 
        :elementRather="listingRatherFinal[keyElement]"
        :key="keyElement"
        :lengthGame="ListingRatherCurrent.length"
        :limitGame="limitGame"
      />
      <AnswerPercentageHandler 
        :element="listingRatherFinal[keyElement]"
        :key="keyElement"
      />
      <button ref="buttonNext" id="nextItem" disabled v-if="currentGame" @click="getNewRandom()" class="button">></button>
      <p class="message">{{message}}</p>
    </div>

    <div class="game__score"  v-if="gameOver">
      <div class="game__score__inner">
        <ScorePanel :limitGame="limitGame" :session="session" />
      </div>
    </div>
    
    <PopupRulesRather v-if="popupDisplay" />
  </div>
</template>

<script>
// @ is an alias to /src
import CardelementRather from '@/components/youRather/CardelementRather.vue'
import AnswerPercentageHandler from '@/components/youRather/AnswerPercentageHandler.vue'
import ScorePanel from '@/components/ScorePanel.vue'
import PopupRulesRather from '@/components/youRather/PopupRulesRather.vue'
import listYouRather from "../listRather.json"
import { mapActions } from 'pinia'
import {useScoreStore} from "@/stores/score"

export default {
  name: 'GameScreenRather',
  data(){
    return{
      keyElement: 0,
      listingRatherFinal: listYouRather,
      ListingRatherUsed : [],
      ListingRatherCurrent: [],
      limitGame: 15,
      session:1,
      message:'',
      popupDisplay:true,
      currentGame:true,
      gameOver:false
    }
  },
  components: {
    CardelementRather,
    AnswerPercentageHandler,
    ScorePanel,
    PopupRulesRather
  },
  methods:{
    ...mapActions(useScoreStore,['resetScore']), 

    getNewRandom() {
      this.$refs.buttonNext.disabled = true
      if(this.listingRatherFinal.length != this.ListingRatherUsed.length){
      this.ListingRatherCurrent.push(this.keyElement);

        if(this.ListingRatherCurrent.length <= this.limitGame){
            var notInArray = true
            while (notInArray) {
              this.keyElement = Math.round(Math.random()*(this.listingRatherFinal.length-1))
              if(!this.ListingRatherUsed.includes(this.keyElement)){
                console.log(this.keyElement,this.ListingRatherUsed)
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
      if(this.listingRatherFinal.length != this.ListingRatherUsed.length){
        this.ListingRatherCurrent = []
        this.getNewRandom()
        this.ListingRatherCurrent = [this.keyElement]
        this.resetScore()
        this.session =+ 1
      }else{
        this.message = "No more "
      }

    }
  },
  mounted(){
    this.ListingRatherCurrent.push(this.keyElement);
    this.emitter.on('updateListing', data => {
      if(this.ListingRatherCurrent.length == this.limitGame){
        setTimeout(() => this.gameOver = true, 4000);
      }else{
        this.$refs.buttonNext.disabled = false
      }
      this.ListingRatherUsed.push(data-1)
    }),
    this.emitter.on('hideThePopUp', data => {
        console.log(data)
        this.limitGame = data
        this.popupDisplay = false
    })
    this.emitter.on('endOfTheGame', data => {
        console.log(data)
        if(data=="361"){
          this.ListingRatherUsed = []
        }
        this.limitGame = data
        this.gameOver =false
        this.getNewGame()
    })
  },
  beforeMount(){
    const newNumber = Math.round(Math.random()*(this.listingRatherFinal.length-1));
    this.keyElement = newNumber
  }

}
</script>
