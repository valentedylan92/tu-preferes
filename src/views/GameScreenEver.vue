<template>
  <div class="game__container">
    <div class="game__left"  >
      <nav>
        <router-link to="/">&lt; Choix du jeu</router-link>  
      </nav>
      <div class="game__score"  >
        <ScorePanelEver :limitGame="limitGame" />
      </div>
    </div>
    <div class="game__inner">
      <CardelementEver 
        :elementEver="listingEverFinal[keyElement]"
        :key="keyElement"
        :lengthGame="ListingEverCurrent.length"
        :limitGame="limitGame"
      />
      <p class="message">{{message}}</p>
    </div>
    <div class="game__right">
      <button ref="buttonNextEver" id="nextItem" disabled v-if="currentGame" @click="getNewRandom()" class="button">&gt;</button>
      <div class="stat">
            <div class="stat__row">
              <div class="stat__column">
                <div id="color1" class="stat__color"></div>
                <p id="stat1" class="stat__number">0</p>
              </div>
              <div class="stat__column">
                <div id="color2" class="stat__color"></div>
                <p id="stat2" class="stat__number">0</p>
              </div>
            </div>
        </div>
    </div>
    <div class="game__end"  v-if="gameOver">
      <div class="game__end__inner">
        <EndPanelEver :limitGame="limitGame" />
      </div>
    </div>
    <PopupRulesEver v-if="popupDisplay" />
  </div>
</template>

<script>
// @ is an alias to /src
import CardelementEver from '@/components/everHave/CardelementEver.vue'
import PopupRulesEver from '@/components/everHave/PopupRulesEver.vue'
import ScorePanelEver from '@/components/everHave/ScorePanelEver.vue'
// import AnswerEverHandler from '@/components/everHave/AnswerEverHandler.vue'
import EndPanelEver from '@/components/everHave/EndPanelEver.vue'
import listYouEver from "../listEver.json"
import { mapActions } from 'pinia'
import {useScoreStoreEver} from "@/stores/scoreEver"



export default {
  name: 'GameScreenEver',
  data(){
    return{
      keyElement: 0,
      listingEverFinal: listYouEver,
      ListingEverUsed : [],
      ListingEverCurrent: [],
      limitGame: 3,
      message:'',
      popupDisplay:false,
      currentGame:true,
      gameOver:false
    }
  },
  components: {
    CardelementEver,
    EndPanelEver,
    ScorePanelEver,
    PopupRulesEver
  },
  methods:{
    ...mapActions(useScoreStoreEver,['resetScoreEver']), 

    getNewRandom() {
      this.$refs.buttonNextEver.disabled = true
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
        this.resetScoreEver()
      }else{
        this.message = "No more"
      }

    }
  },
  mounted(){
    this.ListingEverCurrent.push(this.keyElement);
    this.emitter.on('updateListingEver', data => {
      if(this.ListingEverCurrent.length == this.limitGame){
        setTimeout(() => this.gameOver = true, 4500);
      }else{
        setTimeout(() => this.$refs.buttonNextEver.disabled = false, 3000);
      }
      this.ListingEverUsed.push(data-1)
    }),
    this.emitter.on('hidePopupEver', data => {
        console.log(data)
        this.limitGame = data
        this.popupDisplay = false
    }),
    this.emitter.on('endOfTheGameEver', data => {
        console.log(data + "EOTG")
        if(data=="361"){
          this.ListingEverUsed = []
        }
        this.limitGame = data
        this.gameOver =false
        this.getNewGame()
    })
  },
  beforeMount(){
    // this.emitter.off('updateListingEver')
    const newNumber = Math.round(Math.random()*(this.listingEverFinal.length-1));
    this.keyElement = newNumber
  },
  beforeUnmount(){
      this.emitter.off('endOfTheGameEver')
      this.emitter.off('updateListingEver')
      this.emitter.off('hidePopupEver')
  }


}
</script>
