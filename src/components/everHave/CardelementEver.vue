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
          <div class="answer__row">
          <div class="answer__column">
            <p ref="message" class="answer__message answer__message--ever">
              {{message}}
            </p>
          </div>
        </div> 

        <div class="cardEver__choice">
              <ChoiceElement
                :result="elementEver.result1"
                :percentage="percentage1"
                title="TEAM J'ai déjà"
                keyChoice="1"
                colorBar="primary"
                imgIcon="number-1"
                @click="revealAnswer(percentage1)"
              />
              <ChoiceElement
                :result="elementEver.result2"
                :percentage="percentage2"
                title="TEAM Je n'ai jamais"
                keyChoice="2"
                colorBar="secondary"
                imgIcon="number-2"
                @click="revealAnswer(percentage2)"
              />
            <!-- <AnswerEverHandler 
              :element="elementEver"
            /> -->
        </div>
        <div class="answer__row">
          <div class="answer__column">
            <p id="question" class="answer__message answer__message--ever">
              Quel TEAM a eu le + de votes 
            </p>
          </div>
        </div> 
      
      </div>
    </div>
</template>

<script>

import ChoiceElement from '@/components/everHave/ChoiceElement.vue'
import PictoEver from '@/components/everHave/PictoEver.vue'
// import AnswerEverHandler from '@/components/everHave/AnswerEverHandler.vue'

import anime from 'animejs'
import { mapActions } from 'pinia'
import {useScoreStoreEver} from "@/stores/scoreEver"


export default {
  name: 'cardEverelementEver',
  components: {
    // AnswerEverHandler,
    PictoEver,
    ChoiceElement
  },

  props:["elementEver","lengthGame","limitGame"],

  data() {
    return {
      percentage1: Math.round(100*this.elementEver.result1/(this.elementEver.result1+this.elementEver.result2)).toString(),
      percentage2:Math.round(100*this.elementEver.result2/(this.elementEver.result1+this.elementEver.result2)).toString(),
      total:'',
      answerSelected: '',
      answerIsShown:false,
      message:''
    } 
  },
  methods:{
    ...mapActions(useScoreStoreEver,['incrementWinEver','incrementPerfectWinEver','incrementLostEver']),

    revealAnswer(valueToCheck){
      const vm = this
      if( !this.answerIsShown){
        const valueLength = valueToCheck;
        console.log(valueLength)
        this.emitter.emit('updateListingEver',this.elementEver.id)
        this.answerIsShown = true
        // this.handleAnswer(valueLength)
        // setTimeout(() => this.handleAnswer(valueLength), 2100);

        anime({
          targets:'.result1__element path',
          fill: '#fef677',
          duration: 100,
          delay: anime.stagger(40),
          complete: function() {
              anime({
              targets:'.result2__element path',
              fill: '#3dffc6',
              duration: 100,
              delay: anime.stagger(40),
              complete: function() {
                vm.handleAnswer(valueLength)
                anime({
                    targets:vm.$refs.message,
                    opacity: [0,1],
                    scale: [0.5,1],
                    duration:800,
                })  
              }
            })
            anime({
              targets:'#stat2',
              round: 1,
              textContent:  ["0",vm.elementEver.result2],
              duration: vm.elementEver.result2*40,
              easing: 'linear',
            })
          }
        })
        anime({
          targets:'#stat1',
          round: 1,
          textContent:  ["0",vm.elementEver.result1],
          duration: vm.elementEver.result1*40,
          easing: 'linear',
        })
        anime({
          targets:'.choiceEver__element',
          scale:[1,0],
          duration: 10,
          easing: 'linear',
        })
        anime({
          targets:'#question',
          opacity:0,
          duration: 10,
          easing: 'linear',
        })      
      }
    },
    handleAnswer(dataAnswer){
            
      if(dataAnswer > 50){        
          this.message = "Bonne réponse !"
          this.incrementWinEver()
      }else if(dataAnswer == 50){
          this.message = "Ex aequo mais Bonne réponse !"
          this.incrementWinEver()
      }else{
          this.message = "Mauvaise réponse !"
          this.incrementLostEver()
      }
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

