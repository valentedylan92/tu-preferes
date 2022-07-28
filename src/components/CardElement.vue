<template>
    <div class="card">
      <div class="card__inner">
        <h2 class="card__title">TU PRÉFÈRES #{{this.elementRather.id}}</h2>
        <h3 class="choice__title">Sur un total de {{(this.elementRather.result1+this.elementRather.result2)}} votes.</h3>
        <h3 class="choice__title">1. {{elementRather.choice1}}</h3>
        <h3 class="choice__title">2.{{elementRather.choice2}}</h3>
        <div class="choice__container">
          <div class="choice">
            <div class="bar">
              <div :class="'bar__inner js-bar height-'+percentage1">
              </div>
            </div>
            <p id="result1" class="choice__result js-result">0 </p>
            <p class="choice__result js-percentage">{{percentage1}} %</p>
            <h4>1.</h4>
          </div>
          <div class="choice">
            <div class="bar">
              <div :class="'bar__inner js-bar height-'+percentage2">
              </div>
            </div>
            <p id="result2" class="choice__result js-result">0</p>
            <p class="choice__result js-percentage"> {{percentage2}} %</p>
            <h4>2.</h4>

          </div>
        </div>
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
            <button @click="revealAnswer()" class="button">Dévoiler le %</button>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import anime from 'animejs'

export default {
  name: 'CardelementRather',

  props:["elementRather"],

  data() {
    return {
      percentage1: Math.round(100*this.elementRather.result1/(this.elementRather.result1+this.elementRather.result2)).toString(),
      percentage2:Math.round(100*this.elementRather.result2/(this.elementRather.result1+this.elementRather.result2)).toString(),
      resultOne: this.elementRather.result1,
      resultTwo: this.elementRather.result2,
      answerOne: '',
      answerTwo: ''
    } 
  },

  mounted(){
    const targetsResult = document.querySelectorAll('.js-result')
    const targetsPercentage = document.querySelectorAll('.js-percentage')
    const targetsBar = document.querySelectorAll('.js-bar')
      anime({
        targets:[targetsResult,targetsPercentage],
        opacity: 0,
        duration:0,
      })

      anime({
        targets:targetsBar,
        transformOrigin:"50% 100%",
        scaleY: 0,
        duration:0,
      })
  },
  methods:{
    revealAnswer(){
      const targetsBar = document.querySelectorAll('.js-bar')
      const targetsResult = document.querySelectorAll('.js-result')
      const targetsPercentage = document.querySelectorAll('.js-percentage')
      const targetOneResult = document.querySelectorAll('#result1')
      const targetTwoResult = document.querySelectorAll('#result2')
   
      const vm = this

      console.log(this.answerOne,this.answerTwo,this.answerOne + this.answerTwo, this.percentage1)
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
                    if(vm.answerOne == vm.percentage1){
                      // console.log("PERFECT WIN")
                    }else if(vm.answerOne > (vm.percentage1-5) && vm.answerOne < (vm.percentage1+5)){
                      // console.log("WIN")
                    }else{
                      // console.log("LOST")
                    }
                  }           
                })
              }
        })
      }
    }
  }

}
</script>

