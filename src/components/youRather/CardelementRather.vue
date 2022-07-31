<template>
    <div class="card">
      <div class="card__inner">
        <div class="card__intro">
          <h2 class="card__title">TU PRÉFÈRES {{this.lengthGame}} / {{this.limitGame}}</h2>
          <h3 class="card__subtitle">Sur un total de {{(this.elementRather.result1+this.elementRather.result2)}} votes.</h3>
        </div>
        <div class="card__choice">
          <div class="choice__element js-choice-title">
            <h3 class="choice__title">{{elementRather.choice1}}</h3>
                <div class="choice__container">
                  <ChoiceElement
                    :result="this.elementRather.result1"
                    :percentage="percentage1"
                    keyChoice="1"
                    colorBar="primary"
                  />
                </div>
          </div>
          <div class="choice__element js-choice-title">
            <h3 class="choice__title">{{elementRather.choice2}}</h3>
                <div class="choice__container">
                  <ChoiceElement
                    :result="this.elementRather.result2"
                    :percentage="percentage2"
                    keyChoice="2"
                    colorBar="secondary"
                  />
                </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import anime from 'animejs'
import ChoiceElement from '@/components/ChoiceElement.vue'

export default {
  name: 'CardelementRather',
  components: {
    ChoiceElement
  },

  props:["elementRather","lengthGame","limitGame"],

  data() {
    return {
      percentage1: Math.round(100*this.elementRather.result1/(this.elementRather.result1+this.elementRather.result2)).toString(),
      percentage2:Math.round(100*this.elementRather.result2/(this.elementRather.result1+this.elementRather.result2)).toString(),
    } 
  },
  mounted(){
      const targetsTitle = document.querySelectorAll(".js-choice-title")
      anime({
        targets:targetsTitle,
        opacity: [0,1],
        scale: [0.8,1],
        duration:1500,
        delay: anime.stagger(500),
        easing: 'easeOutElastic(1, .6)'
      })
  }
}
</script>

