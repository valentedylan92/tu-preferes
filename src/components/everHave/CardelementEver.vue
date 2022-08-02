<template>
    <div class="cardEver">
      <div class="cardEver__inner">
        <div class="cardEver__intro">
          <h2 class="cardEver__title">J'AI DÉJÀ {{this.lengthGame}} / {{this.limitGame}}</h2>
          <h3 class="cardEver__subtitle">Sur un total de {{(this.elementEver.result1+this.elementEver.result2)}} votes.</h3>
        </div>
        <h3 class="choiceEver__title">{{elementEver.proposition}}</h3>
        <div class="cardEver__choice">
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
        <AnswerEverHandler 
          :element="elementEver"
        />

      </div>
    </div>
</template>

<script>

// import anime from 'animejs'
import ChoiceElement from '@/components/everHave/ChoiceElement.vue'
import AnswerEverHandler from '@/components/everHave/AnswerEverHandler.vue'


export default {
  name: 'cardEverelementEver',
  components: {
    AnswerEverHandler,
    ChoiceElement
  },

  props:["elementEver","lengthGame","limitGame"],

  data() {
    return {
      percentage1: Math.round(100*this.elementEver.result1/(this.elementEver.result1+this.elementEver.result2)).toString(),
      percentage2:Math.round(100*this.elementEver.result2/(this.elementEver.result1+this.elementEver.result2)).toString(),
    } 
  },
  mounted(){
  }

}
</script>

