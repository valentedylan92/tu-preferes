<template>
  <div class="game__container">
    <div class="game__score">
     <ScorePanel />
    </div>
    <div class="game__inner">
      <CardelementRather 
        :elementRather="listingRatherFinal[keyElement]"
        :key="keyElement"
      />
      <AnswerHandler 
        :element="listingRatherFinal[keyElement]"
        :key="keyElement"
      />
      <button id="newGame" @click="getNewRandom()" class="button">Nouveau tu préfères</button>
      <p class="message">{{message}}</p>
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
      message:''
    }
  },
  components: {
    CardelementRather,
    AnswerHandler,
    ScorePanel
  },
  methods:{
    getNewRandom() {
      if(this.listingRatherFinal.length != this.ListingRatherUsed.length){
            var notInArray = true
            while (notInArray) {
              this.keyElement = Math.round(Math.random()*(this.listingRatherFinal.length-1))
              if(!this.ListingRatherUsed.includes(this.keyElement)){
                console.log(this.keyElement,this.ListingRatherUsed)
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
      this.ListingRatherUsed.push(data-1);
    })
  },
  beforeMount(){
    const newNumber = Math.round(Math.random()*(this.listingRatherFinal.length-1));
    this.keyElement = newNumber
  }

}
</script>
