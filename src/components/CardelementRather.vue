<template>
    <div class="card">
      <div class="card__inner">
        <h2 class="card__title">TU PRÉFÈRES #{{this.elementRather.id}}</h2>
        <h3 class="choice__title">Sur un total de {{(this.elementRather.result1+this.elementRather.result2)}} votes.</h3>
        <h3 class="choice__title">1. {{elementRather.choice1}}</h3>
        <h3 class="choice__title">2.{{elementRather.choice2}}</h3>
        <div class="choice__container">
          <ChoiceElement
            :result="this.elementRather.result1"
            :percentage="percentage1"
            keyChoice="1"
           />
           <ChoiceElement
            :result="this.elementRather.result2"
            :percentage="percentage2"
            keyChoice="2"
           />
        </div>
      </div>
    </div>
</template>

<script>

import ChoiceElement from '@/components/ChoiceElement.vue'

export default {
  name: 'CardelementRather',
  components: {
    ChoiceElement
  },

  props:["elementRather"],

  data() {
    return {
      percentage1: Math.round(100*this.elementRather.result1/(this.elementRather.result1+this.elementRather.result2)).toString(),
      percentage2:Math.round(100*this.elementRather.result2/(this.elementRather.result1+this.elementRather.result2)).toString(),
    } 
  }

}
</script>

