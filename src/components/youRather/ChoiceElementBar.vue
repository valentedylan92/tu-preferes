<template>
  <div ref="item" class="choiceRather__element js-choiceRather-title">
    <div class="choiceRather__header">
    <img class="choiceRather__number" :src="require('@/assets/img/' + imgIcon + '.png')" alt="">
    <h3 ref="title" class="choiceRather__title">{{title}}</h3>
    </div>
      <div class="choiceRather__container">
        <div class="choiceRather">
          <div class="bar__container">
            <div class="bar">
              <div :id="'bar-result'+keyChoice" ref="bar" :class="'bar__inner js-bar height-'+percentage +' bar-'+colorBar">
              </div>
              <p :id="'bar-percentage'+keyChoice" ref="percentage" class="choiceRather__percentage js-percentage">{{percentage}} %</p>
            </div>
          </div>
          <p :id="'result'+keyChoice" ref="resultElement" class="choiceRather__result js-result">{{result}} votes</p>
        </div>
      </div>
  </div>
</template>
<script>
import anime from 'animejs'

export default {
    name: 'ChoiceElementBar',
    props:["percentage","result","keyChoice","colorBar","title","imgIcon"],
    data(){
      return{
      }
    },
    beforeMount(){
      this.emitter.off("launchTheAnimation")
    },
    mounted(){

      if(this.title.length > 100){
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
