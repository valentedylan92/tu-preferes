<template>
    <div class="card">
      <div class="card__inner">
        <div class="card__intro">
          <h2 class="card__title">TU PRÉFÈRES {{lengthGame}} / {{limitGame}}</h2>
          <h3 class="card__subtitle">Sur un total de {{(elementRather.result1+elementRather.result2)}} votes.</h3>
        </div>
        <div class="card__choice">
          <ChoiceElement
            :result="elementRather.result1"
            :percentage="percentage1"
            :title="elementRather.choice1"
            keyChoice="1"
            colorBar="primary"
          />
          <ChoiceElement
            :result="elementRather.result2"
            :percentage="percentage2"
            :title="elementRather.choice2"
            keyChoice="2"
            colorBar="secondary"
          />
        </div>
      </div>
    </div>
</template>

<script>
// import anime from 'animejs'
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
    // const targetsTitle = document.querySelectorAll(".js-choice-title")

  }
}
</script>

