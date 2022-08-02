<template>
    <div class="card">
      <div class="card__inner">
        <div class="card__intro">
          <h2 class="card__title">J'AI DÉJÀ {{this.lengthGame}} / {{this.limitGame}}</h2>
          <h3 class="card__subtitle">Sur un total de {{(this.elementEver.result1+this.elementEver.result2)}} votes.</h3>
        </div>
        
        <div class="card__choice">
            <h3 class="choice__title">{{elementEver.proposition}}</h3>
              <ChoiceElement
                :result="this.elementEver.result1"
                :percentage="percentage1"
                title="J'ai déjà"
                keyChoice="1"
                colorBar="primary"
                imgIcon="number-1"
              />
              <ChoiceElement
                :result="this.elementEver.result2"
                :percentage="percentage2"
                title="Je n'ai jamais"
                keyChoice="2"
                colorBar="secondary"
                imgIcon="number-2"

              />
        </div>
      </div>
    </div>
</template>

<script>

import ChoiceElement from '@/components/ChoiceElement.vue'

export default {
  name: 'CardelementEver',
  components: {
    ChoiceElement
  },

  props:["elementEver","lengthGame","limitGame"],

  data() {
    return {
      percentage1: Math.round(100*this.elementEver.result1/(this.elementEver.result1+this.elementEver.result2)).toString(),
      percentage2:Math.round(100*this.elementEver.result2/(this.elementEver.result1+this.elementEver.result2)).toString(),
    } 
  }

}
</script>

