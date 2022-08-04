<template>
        <div class="answer">
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
export default {
  name: 'AnswerEverHandler',

  props:["element"],

  data(){
      return{
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
          this.emitter.emit('score',"1")
      }else if(dataAnswer == 50){
          this.message = "Ex aequo mais Bonne réponse !"
          this.emitter.emit('score',"1")
      }else{
          this.message = "Mauvaise réponse !"
          this.emitter.emit('score',"0")
      }
    }
  }
}

</script>
