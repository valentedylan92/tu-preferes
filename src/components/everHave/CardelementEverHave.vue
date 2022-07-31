<template>
    <div class="card">
      <div class="card__inner">
        <h2 class="card__title">J'ai déjà #{{this.elementEverHave.id}}</h2>
        <h3 class="choice__title">Sur un total de {{(this.elementEverHave.result1+this.elementEverHave.result2)}} votes.</h3>
        <h3 class="choice__title">{{elementEverHave.proposition}}</h3>
        <div class="choice__container">
          <ChoiceElement
            :result="this.elementEverHave.result1"
            :percentage="percentage1"
            keyChoice="1"
            colorBar="primary"
           />
           <ChoiceElement
            :result="this.elementEverHave.result2"
            :percentage="percentage2"
            keyChoice="2"
            colorBar="secondary"
           />
        </div>
      </div>
    </div>
</template>

<script>

import ChoiceElement from '@/components/ChoiceElement.vue'

export default {
  name: 'CardelementEverHave',
  components: {
    ChoiceElement
  },

  props:["elementEverHave"],

  data() {
    return {
      percentage1: Math.round(100*this.elementEverHave.result1/(this.elementEverHave.result1+this.elementEverHave.result2)).toString(),
      percentage2:Math.round(100*this.elementEverHave.result2/(this.elementEverHave.result1+this.elementEverHave.result2)).toString(),
    } 
  }

}
</script>

