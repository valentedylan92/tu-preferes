<template>
  <div class="game__container">

    <div class="game__inner">
      <CardelementRather 
        :elementRather="listingRatherFinal[keyElement]"
        :key="keyElement"
        :lengthGame="ListingRatherCurrent.length"
        :limitGame="limitGame"
      />
      <AnswerHandler 
        :element="listingRatherFinal[keyElement]"
        :key="keyElement"
      />
      <button id="newGame" v-if="currentGame" @click="getNewRandom()" class="button">Tu préfères suivant</button>
      <p class="message">{{message}}</p>
    </div>
    <div class="game__score"  v-show="newGame">
      <div class="game__score__inner">
        <ScorePanel :session="session" />
        <button id="newGame" @click="getNewGame()" class="button">Nouvelle partie</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardelementRather from '@/components/youRather/CardelementRather.vue'
import AnswerHandler from '@/components/AnswerHandler.vue'
import ScorePanel from '@/components/ScorePanel.vue'
import listYouRather from "../listRather.json"



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
      currentGame:false,
      newGame:false
    }
  },
  components: {
    CardelementRather,
    AnswerHandler,
    ScorePanel
  },
  methods:{
    getNewRandom() {
      this.currentGame = false
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
        this.newGame =false
        this.currentGame =true
        this.ListingRatherCurrent = []
        this.getNewRandom()
        this.ListingRatherCurrent = [this.keyElement]
        this.emitter.emit('resetScore')
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
        this.newGame = true
      }else{
        this.currentGame = true
      }
      this.ListingRatherUsed.push(data-1)
    })
  },
  beforeMount(){
    const newNumber = Math.round(Math.random()*(this.listingRatherFinal.length-1));
    this.keyElement = newNumber
  }

}
</script>
