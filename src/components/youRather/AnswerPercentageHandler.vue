<template>
        <div class="answer">
          <div class="answer__row">
            <div class="answer__column">
              <!-- <label class="answer__label" for="anwser1">% du </label> -->
              <img class="answer__icon" answer__icon :src="require('@/assets/img/number-1.png')" />
              <input placeholder="%" class="answer__input" id="#answer1" ref="answerOne" type="number" v-model="answerOne" name="answer1">
            </div>
            <div class="answer__column">
              <!-- <label class="answer__label" for="anwser2">% du </label> -->
              <img class="answer__icon" answer__icon :src="require('@/assets/img/number-2.png')" />
              <input placeholder="%" class="answer__input" ref="answerTwo" id="#answer2" type="number" v-model="answerTwo" name="answer2">
            </div>
            <div class="answer__column">
              <button ref="button" disabled @click="revealAnswer()" class="button">Dévoiler le %</button>
            </div>

          </div>
          <div class="answer__row">
            <div class="answer__column">
            <p ref="message" class="answer__message">
              {{message}}
            </p>
            </div>
          </div>
        </div>
    
</template>


<script>
import anime from 'animejs'
import { mapActions } from 'pinia'
import {useScoreStoreRather} from "@/stores/scoreRather"

export default {
  name: 'AnswerPercentageHandler',

  props:["element"],

  data(){
      return{
          percentage1: Math.round(100*this.element.result1/(this.element.result1+this.element.result2)).toString(),
          percentage2:Math.round(100*this.element.result2/(this.element.result1+this.element.result2)).toString(),
          resultOne: this.element.result1,
          resultTwo: this.element.result2,
          answerOne: '',
          answerTwo: '',
          answerIsShown:false,
          answerIsCorrect:false,
          message:'',
      }
  },
  methods:{
    ...mapActions(useScoreStoreRather,['incrementWinRather','incrementPerfectWinRather','incrementLostRather']),

    revealAnswer(){
      this.checkAnswer(this.answerOne,this.answerTwo)
      const vm = this
      if(this.answerOne + this.answerTwo == 100 && !this.answerIsShown && this.answerIsCorrect){
        this.emitter.emit('updateListingRather',this.element.id)
        this.answerIsShown = true
        this.emitter.emit('launchTheAnimation',"launched")
        setTimeout(() => this.handleAnswer(), 2100);
        // this.handleAnswer()
        anime({
          targets:vm.$refs.message,
          opacity: [0,1],
          scale: [0.5,1],
          duration:800,
          delay:2100
        })       
      }
    },
    handleAnswer(){

      if(this.answerOne == this.percentage1){
        this.message = "Réponse Parfaite OMG !"
        this.incrementPerfectWinRather()
      }else if(this.answerOne >= (this.percentage1-5) && this.answerOne <= (this.percentage1+5) && this.answerTwo >= (this.percentage2-5) && this.answerTwo <= (this.percentage2+5)){
        this.message = "Bonne réponse !"
        this.incrementWinRather()
      }else{
        this.message = "Mauvaise réponse :( !"
        this.incrementLostRather()
      }
    },
    checkAnswer(value1,value2){
      if( value1>=0 && value1 <= 100 && value2>=0 && value2 <= 100 ){
        this.answerIsCorrect = true
      }else{
        this.message = "La réponse doit être comprise entre 0 et 100"
      }
    }
  },

  updated(){
    const answerElemOne = this.$refs.answerOne
    const answerElemTwo = this.$refs.answerTwo
    if (answerElemOne === document.activeElement) {
      this.answerTwo = 100 - this.answerOne
      this.$refs.button.disabled = false
    } else if (answerElemTwo === document.activeElement) {
      this.answerOne = 100 - this.answerTwo
      this.$refs.button.disabled = false
    }
  }
}

</script>
