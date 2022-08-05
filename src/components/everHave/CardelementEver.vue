<template>
    <div class="cardEver">
      <div class="cardEver__inner">
        <div class="cardEver__intro">
          <h2 class="cardEver__title">J'AI DÉJÀ {{this.lengthGame}} / {{this.limitGame}}</h2>
          <!-- <h3 class="cardEver__subtitle">Sur un total de {{(elementEver.result1+this.elementEver.result2)}} votes.</h3> -->
        </div>
        <h3 class="choiceEver__title">{{elementEver.proposition}}</h3>
        <div class="result__container">
          <PictoEver v-for="n in this.elementEver.result1" :key="n" :class="'result1__element'" />
          <PictoEver v-for="n in this.elementEver.result2" :key="n" :class="'result2__element'" />
        </div>
        <div class="cardEver__choice">
              <ChoiceElement
                :result="elementEver.result1"
                :percentage="percentage1"
                title="J'ai déjà"
                keyChoice="1"
                colorBar="primary"
                imgIcon="number-1"
              />
              <ChoiceElement
                :result="elementEver.result2"
                :percentage="percentage2"
                title="Je n'ai jamais"
                keyChoice="2"
                colorBar="secondary"
                imgIcon="number-2"
              />
            <AnswerEverHandler 
              :element="elementEver"
            />
        </div>   
      </div>
    </div>
</template>

<script>

import ChoiceElement from '@/components/everHave/ChoiceElement.vue'
import PictoEver from '@/components/everHave/PictoEver.vue'
import AnswerEverHandler from '@/components/everHave/AnswerEverHandler.vue'
import anime from 'animejs'


export default {
  name: 'cardEverelementEver',
  components: {
    AnswerEverHandler,
    PictoEver,
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
      anime({
        targets:'#stat1',
        round: 1,
        textContent:  ["0"],
        duration: 0,
        easing: 'linear',
      })
      anime({
        targets:'#stat2',
        round: 1,
        textContent:  ["0"],
        duration: 0,
        easing: 'linear',
      })
  }

}
</script>

