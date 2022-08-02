<template>
    <div class="cardRather">
      <div class="cardRather__inner">
        <div class="cardRather__intro">
          <h2 class="cardRather__title">TU PRÉFÈRES {{lengthGame}} / {{limitGame}}</h2>
          <h3 class="cardRather__subtitle">Sur un total de {{(elementRather.result1+elementRather.result2)}} votes.<br>
            Quel pourcentage a voté pour : 
          </h3>
        </div>
        <div class="cardRather__choice">
          <ChoiceElementBar
            :result="elementRather.result1"
            :percentage="percentage1"
            :title="elementRather.choice1"
            keyChoice="1"
            colorBar="primary"
            imgIcon="number-1"
          />
          <ChoiceElementBar
            :result="elementRather.result2"
            :percentage="percentage2"
            :title="elementRather.choice2"
            keyChoice="2"
            colorBar="secondary"
            imgIcon="number-2"
          />
        </div>
      </div>
    </div>
</template>

<script>
// import anime from 'animejs'
import ChoiceElementBar from '@/components/youRather/ChoiceElementBar.vue'

export default {
  name: 'CardelementRather',
  components: {
    ChoiceElementBar
  },

  props:["elementRather","lengthGame","limitGame"],

  data() {
    return {
      percentage1: Math.round(100*this.elementRather.result1/(this.elementRather.result1+this.elementRather.result2)).toString(),
      percentage2:Math.round(100*this.elementRather.result2/(this.elementRather.result1+this.elementRather.result2)).toString(),
    } 
  },
  mounted(){
  }
}
</script>

