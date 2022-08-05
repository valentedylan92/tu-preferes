<template>
  <div ref="item" :class="'choiceEver__element js-choiceEver-title choiceEver__element-'+keyChoice">
    <input  class="choiceEver__radio" type="radio" :id="'element-'+keyChoice" name="answer" :value="percentage">
    <label  :class="'choiceEver__label choiceEver__label-'+keyChoice" :for="'element-'+keyChoice" >
      <div class="choiceEver__header">
      <img class="choiceEver__number" :src="require('@/assets/img/' + imgIcon + '.png')" alt="">
      <h3 ref="title" class="choiceEver__title">{{title}}</h3>
      </div>
        <!-- <div class="choiceEver__container">
          <div class="choiceEver">
            <p ref="percentage" class="choiceEver__percentage js-percentage">{{percentage}} %</p>
            <p :id="'result'+keyChoice" ref="resultElement" class="choiceEver__result js-result">{{result}} votes</p>
          </div>
        </div> -->
    </label>
  </div>
</template>
<script>

export default {
    name: 'ChoiceElement',
    props:["percentage","result","keyChoice","colorBar","title","imgIcon"],
    data(){
      return{
        valueChecked : ""
      }
    }    
}
</script>
