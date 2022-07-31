<template>
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
</template>
<script>
import anime from 'animejs'

export default {
    name: 'ChoiceElement',
    props:["percentage","result","keyChoice","colorBar"],
    mounted(){
      const targetResult = this.$refs.resultElement
      const targetPercentage = this.$refs.percentage
      const targetBar = this.$refs.bar

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
           
      // this.emitter.on('launchTheAnimation',e => console.log('foo', e))
      
    },
    
}
</script>
