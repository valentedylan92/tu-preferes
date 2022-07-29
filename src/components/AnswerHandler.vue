<template>
        <div class="answer">
          <div class="answer__row">
            <div class="answer__column">
              <label class="answer__label" for="anwser1">% du 1</label>
              <input class="answer__input" id="#answer1" type="number" v-model="answerOne" name="answer1">
            </div>
            <div class="answer__column">
              <label class="answer__label" for="anwser2">% du 2</label>
              <input class="answer__input" id="#answer2" type="number" v-model="answerTwo" name="answer2">
            </div>
          </div>
          <div class="answer__row">
            <div class="answer__column">
            <button @click="revealAnswer()" class="button">Dévoiler le %</button>
            <p class="answer__message">
              {{message}}
            </p>
                <p class="answer__message">
              Votre Score : {{score}}
            </p>

            </div>

          </div>
        </div>
    
</template>


<script>
import anime from 'animejs'

export default {
    name: 'AnswerHandler',

    props:["elementRather"],

    data(){
        return{
            percentage1: Math.round(100*this.elementRather.result1/(this.elementRather.result1+this.elementRather.result2)).toString(),
            percentage2:Math.round(100*this.elementRather.result2/(this.elementRather.result1+this.elementRather.result2)).toString(),
            resultOne: this.elementRather.result1,
            resultTwo: this.elementRather.result2,
            answerOne: 0,
            answerTwo: 0,
            message:'',
            score:0
        }
    },
    methods:{
    revealAnswer(){
      const targetsBar = document.querySelectorAll('.js-bar')
      const targetsResult = document.querySelectorAll('.js-result')
      const targetsPercentage = document.querySelectorAll('.js-percentage')
      const targetOneResult = document.querySelectorAll('#result1')
      const targetTwoResult = document.querySelectorAll('#result2')
      const vm = this

      if(this.answerOne + this.answerTwo == 100){
        anime({
          targets:targetsBar,
          scaleY: 1,
          transformOrigin:"50% 100%",
          duration:2000,
          easing: 'linear',
        })
        anime({
              targets:targetsResult,
              opacity: 1,
              duration:0,
              easing: 'easeOutExpo',
              complete: function() {
                anime({
                  targets:targetOneResult,
                  textContent:  [0,vm.resultOne],
                  round: 1,
                  duration:1800,
                  easing: 'linear',
                  complete: function() {
                    anime({
                      targets:targetsPercentage,
                      opacity: 1,
                      duration:500,
                    })
                  }
                })
                anime({
                  targets:targetTwoResult,
                  textContent:  [0,vm.resultTwo],
                  round: 1,
                  duration:1800,
                  easing: 'linear',
                  complete: function() {
                    vm.handleAnswer()
                  }           
                })
              }
        })
      }
    },
    handleAnswer(){
      if(this.answerOne == this.percentage1){
        this.message = "Perfect Win"
        this.emitter.emit('score',"PerfectWin")
      }else if(this.answerOne >= (this.percentage1-5) && this.answerOne <= (this.percentage1+5)){
        this.message = "Win"
        this.emitter.emit('score',"Win")
      }else{
        this.message = "Lost"
        this.emitter.emit('score',"Lost")
      }
    }
  }
}

</script>
