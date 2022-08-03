<template>
        <div class="answer">
          <div class="answer__row">
            <div class="answer__column">
              <button @click="revealAnswer()" class="button">Dévoiler le %</button>
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
export default {
  name: 'AnswerEverHandler',

  props:["element"],

  data(){
      return{
          // percentage1: Math.round(100*this.element.result1/(this.element.result1+this.element.result2)).toString(),
          // percentage2:Math.round(100*this.element.result2/(this.element.result1+this.element.result2)).toString(),
          answerSelected: '',
          answerIsShown:false,
          message:'',
      }
  },
  mounted(){
      this.emitter.on('answerSend', data => {
        console.log(data)
        this.answerSelected = data
      })
  },
  methods:{
    revealAnswer(){
      const vm = this
      const checkedElement = document.querySelector('input[name="answer"]:checked');
      if( !this.answerIsShown && checkedElement != null){
        const valueLength = checkedElement.value;
        this.emitter.emit('updateListing',this.element.id)
        this.answerIsShown = true
        this.handleAnswer(valueLength)
        anime({
          targets:vm.$refs.message,
          opacity: [0,1],
          duration:10,
          delay:2500
        })       
      }
    },
    handleAnswer(dataAnswer){
            
      if(dataAnswer > 50){        
          this.message = "Bonne réponse !"
          this.emitter.emit('score',"Win")
      }else if(dataAnswer == 50){
          this.message = "Ex aequo mais Bonne réponse !"
          this.emitter.emit('score',"Win")
      }else{
          this.message = "Mauvaise réponse !"
          this.emitter.emit('score',"Lost")
      }
    }
  }
}

</script>
