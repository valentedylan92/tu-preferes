<template>
        <div class="answer">
          <div class="answer__row">
            <div class="answer__column">
              <label class="answer__label" for="anwser1">% du 1</label>
              <input class="answer__input" id="#answer1" ref="answerOne" type="number" v-model="answerOne" name="answer1">
            </div>
            <div class="answer__column">
              <label class="answer__label" for="anwser2">% du 2</label>
              <input class="answer__input" ref="answerTwo" id="#answer2" type="number" v-model="answerTwo" name="answer2">
            </div>
            <div class="answer__column">
              <button @click="revealAnswer()" class="button">Dévoiler le %</button>
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
export default {
  name: 'AnswerHandler',

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
    revealAnswer(){
      this.checkAnswer(this.answerOne,this.answerTwo)
      const vm = this
      if(this.answerOne + this.answerTwo == 100 && !this.answerIsShown && this.answerIsCorrect){
        this.emitter.emit('updateListing',this.element.id)
        this.answerIsShown = true
        this.emitter.emit('launchTheAnimation',"launched")
        this.handleAnswer()
        anime({
          targets:vm.$refs.message,
          opacity: [0,1],
          duration:10,
          delay:2500
        })       
      }
    },
    handleAnswer(){
      if(this.answerOne == this.percentage1){
        this.message = "Perfect Win"
        this.emitter.emit('score',"PerfectWin")
      }else if(this.answerOne >= (this.percentage1-5) && this.answerOne <= (this.percentage1+5) && this.answerTwo >= (this.percentage2-5) && this.answerTwo <= (this.percentage2+5)){
        this.message = "Win"
        this.emitter.emit('score',"Win")
      }else{
        this.message = "Lost"
        this.emitter.emit('score',"Lost")
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
    } else if (answerElemTwo === document.activeElement) {
      this.answerOne = 100 - this.answerTwo
    }
  }
}

</script>
