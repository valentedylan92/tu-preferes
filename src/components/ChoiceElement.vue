<template>
  <div ref="item" class="choice__element js-choice-title">
    <h3 id="choice2" ref="title" class="choice__title">{{title}}</h3>
      <div class="choice__container">
        <div class="choice">
          <div class="bar__container">
            <div class="bar">
              <div :id="'bar-result'+keyChoice" ref="bar" :class="'bar__inner js-bar height-'+percentage +' bar-'+colorBar">
              </div>
              <p :id="'bar-percentage'+keyChoice" ref="percentage" class="choice__percentage js-percentage">{{percentage}} %</p>
            </div>
          </div>
          <p :id="'result'+keyChoice" ref="resultElement" class="choice__result js-result">{{result}} votes</p>
        </div>
      </div>
  </div>
</template>
<script>
import anime from 'animejs'

export default {
    name: 'ChoiceElement',
    props:["percentage","result","keyChoice","colorBar","title"],
    beforeMount(){
      this.emitter.off("launchTheAnimation")
    },
    mounted(){

      if(this.title.length > 150){
        this.$refs.title.classList.add('small')
      }
      this.initAnimation()  
      this.emitter.on('launchTheAnimation',e => {
        console.log(e)
        this.barAnimation()
      })
      
    },
    methods:{
      barAnimation(){
        const targetBar = this.$refs.bar
        const targetPercentage = this.$refs.percentage
        const targetResult = this.$refs.resultElement
        const vm = this;
        anime({
          targets:targetBar,
          width: vm.percentage+"%",
          transformOrigin:"0% 50%",
          duration:2000,
          easing: 'linear',
        })
        anime({
          targets:targetPercentage,
          opacity: 1,
          duration:0,
          easing: 'easeOutExpo',
          complete: function() {
            anime({
              targets:targetPercentage,
              textContent:  ["0%",vm.percentage+"%"],
              round: 1,
              duration:1800,
              easing: 'linear',
              complete: function() {
                anime({
                  targets:targetResult,
                  opacity: 1,
                  duration:500,
                })
              }
            })
          }
        })
      },
      initAnimation(){
        const targetResult = this.$refs.resultElement
        const targetItem = this.$refs.item
        const targetPercentage = this.$refs.percentage
        const targetBar = this.$refs.bar
        anime({
          targets:targetItem,
          opacity: [0,1],
          scale: [0.8,1],
          duration:1500,
          delay:300,
          easing: 'easeOutElastic(1, .6)'
        })
        anime({
          targets:[targetResult,targetPercentage],
          opacity: 0,
          duration:0,
        })

        anime({
          targets:targetBar,
          transformOrigin:"0% 50%",
          width: 0,
          duration:0,
        })
      }

    }
    
}
</script>
