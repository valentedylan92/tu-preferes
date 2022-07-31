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
          </div>
          <div class="answer__row">
            <div class="answer__column">
            <button @click="revealAnswer()" class="button">Dévoiler le %</button>
            <p class="answer__message">
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
            answerOne: 0,
            answerTwo: 0,
            answerIsShown:false,
            message:'',
        }
    },

    methods:{
    revealAnswer(){
      const targetBarOne = document.querySelector('#bar-result1')
      const targetBarTwo = document.querySelector('#bar-result2')
      const targetOnePercentage = document.querySelector('#bar-percentage1')
      const targetTwoPercentage = document.querySelector('#bar-percentage2')
      const targetsResult = document.querySelectorAll('.js-result')
      const targetsPercentage = document.querySelectorAll('.js-percentage')
      // const targetOneResult = document.querySelectorAll('#result1')
      // const targetTwoResult = document.querySelectorAll('#result2')
      const vm = this

      if(this.answerOne + this.answerTwo == 100 && !this.answerIsShown){
        this.emitter.emit('updateListing',vm.element.id)
        this.answerIsShown = true
        anime({
          targets:targetBarOne,
          width: vm.percentage1+"%",
          transformOrigin:"0% 50%",
          duration:2000,
          easing: 'linear',
        })
        anime({
          targets:targetBarTwo,
          width: vm.percentage2+"%",
          transformOrigin:"0% 50%",
          duration:2000,
          easing: 'linear',
        })
        anime({
              targets:targetsPercentage,
              opacity: 1,
              duration:0,
              easing: 'easeOutExpo',
              complete: function() {
                anime({
                  targets:targetOnePercentage,
                  textContent:  ["0%",vm.percentage1+"%"],
                  round: 1,
                  duration:1800,
                  easing: 'linear',
                  complete: function() {
                    anime({
                      targets:targetsResult,
                      opacity: 1,
                      duration:500,
                    })
                  }
                })
                anime({
                  targets:targetTwoPercentage,
                  textContent:  ["0%",vm.percentage2+"%"],
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
      }else if(this.answerOne >= (this.percentage1-5) && this.answerOne <= (this.percentage1+5) && this.answerTwo >= (this.percentage2-5) && this.answerTwo <= (this.percentage2+5)){
        this.message = "Win"
        this.emitter.emit('score',"Win")
      }else{
        this.message = "Lost"
        this.emitter.emit('score',"Lost")
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
