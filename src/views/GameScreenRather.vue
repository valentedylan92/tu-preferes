<template>
  <div class="game__container">
    <div class="game__left"  >
      <nav>
        <router-link to="/">&lt; Choix du jeu</router-link>  
      </nav>
      <div class="game__score"  >
          <ScorePanelRather :limitGame="limitGame" />
      </div>
    </div>
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
      <p class="message">{{message}}</p>
    </div>
    <div class="game__right">
      <button ref="buttonNext" id="nextItem" disabled v-if="currentGame" @click="getNewRandom()" class="button">></button>
    </div>

    <div class="game__end"  v-if="gameOver">
      <div class="game__end__inner">
        <EndPanelRather :limitGame="limitGame" />
      </div>
    </div>

    <PopupRulesRather v-if="popupDisplay" />
  </div>
</template>

<script>
// @ is an alias to /src
import ScorePanelRather from '@/components/youRather/ScorePanelRather.vue'
import EndPanelRather from '@/components/youRather/EndPanelRather.vue'
import CardelementRather from '@/components/youRather/CardelementRather.vue'
import AnswerPercentageHandler from '@/components/youRather/AnswerPercentageHandler.vue'
import PopupRulesRather from '@/components/youRather/PopupRulesRather.vue'
import listYouRather from "../listRather.json"
import { mapActions } from 'pinia'
import {useScoreStoreRather} from "@/stores/scoreRather"

export default {
  name: 'GameScreenRather',
  data(){
    return{
      keyElement: 0,
      listingRatherFinal: listYouRather,
      ListingRatherUsed : [],
      ListingRatherCurrent: [],
      limitGame: 3,
      message:'',
      popupDisplay:false,
      currentGame:true,
      gameOver:false
    }
  },
  components: {
    CardelementRather,
    AnswerPercentageHandler,
    EndPanelRather,
    ScorePanelRather,
    PopupRulesRather
  },
  methods:{
    ...mapActions(useScoreStoreRather,['resetScoreRather']), 

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
        this.resetScoreRather()
      }else{
        this.message = "No more "
      }

    }
  },
  mounted(){
    this.ListingRatherCurrent.push(this.keyElement);
    this.emitter.on('updateListingRather', data => {
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
    this.emitter.on('endOfTheGameRather', data => {
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
  },
  beforeUnmount(){
    this.emitter.off('endOfTheGameRather')
    this.emitter.off('updateListingRather')
    this.emitter.off('hideThePopUp')
  }

}
</script>
