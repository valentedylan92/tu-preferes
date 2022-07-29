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
  }

}
</script>

