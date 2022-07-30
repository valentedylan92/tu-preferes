<template>
    <div class="choice">
        <div class="bar">
            <div ref="bar" :class="'bar__inner js-bar height-'+percentage">
            </div>
        </div>
        <p :id="'result'+keyChoice" ref="resultElement" class="choice__result js-result">0</p>
        <p ref="percentage" class="choice__result js-percentage">{{percentage}} %</p>
        <h4>{{keyChoice}} .</h4>
    </div>
</template>
<script>
import anime from 'animejs'

export default {
    name: 'ChoiceElement',
    props:["percentage","result","keyChoice"],
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
        transformOrigin:"50% 100%",
        scaleY: 0,
        duration:0,
      })     
      // this.emitter.on('launchTheAnimation',e => console.log('foo', e))
      
    },
    
}
</script>
