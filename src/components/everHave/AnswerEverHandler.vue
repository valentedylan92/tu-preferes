<template>
        <div class="answer__ever">
          <div class="answer__row">
            <div class="answer__column">
              <button @click="revealAnswer()" class="button">Validez</button>
            </div>
          </div>
          <div class="answer__row">
            <div class="answer__column">
            <p ref="message" class="answer__message">
              {{message}}
            </p>
            </div>

          </div>
        </div>
    
</template>


<script>
import anime from 'animejs'
import { mapActions } from 'pinia'
import {useScoreStoreEver} from "@/stores/scoreEver"

export default {
  name: 'AnswerEverHandler',

  props:["element"],

  data(){
      return{
          answerSelected: '',
          answerIsShown:false,
          message:'',
          firstStat:this.element.result1.toString(),
          secondStat:this.element.result2.toString(),
      }
  },
  mounted(){
    console.log(this.element.result1,this.element.result2)
      this.emitter.on('answerSend', data => {
        console.log(data)
        this.answerSelected = data
      })
  },
  methods:{
    ...mapActions(useScoreStoreEver,['incrementWinEver','incrementPerfectWinEver','incrementLostEver']),

    revealAnswer(){
      const vm = this
      const checkedElement = document.querySelector('input[name="answer"]:checked');
      if( !this.answerIsShown && checkedElement != null){
        const valueLength = checkedElement.value;
        this.emitter.emit('updateListing',this.element.id)
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
              textContent:  ["0",vm.secondStat],
              duration: vm.element.result2*40,
              easing: 'linear',
            })
          }
        })
        anime({
          targets:'#stat1',
          round: 1,
          textContent:  ["0",vm.firstStat],
          duration: vm.element.result1*40,
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
  }
}

</script>
