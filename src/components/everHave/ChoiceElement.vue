<template>
  <div ref="item" :class="'choiceEver__element js-choiceEver-title choiceEver__element-'+keyChoice">
    <!-- <label  :class="'choiceEver__label choiceEver__label-'+keyChoice" :for="'element-'+keyChoice" > -->
      <div class="choiceEver__header">
      <img class="choiceEver__number" :src="require('@/assets/img/' + imgIcon + '.png')" alt="">
      <h3 ref="title" class="choiceEver__title">{{title}}</h3>
      </div>
    <!-- </label> -->
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
