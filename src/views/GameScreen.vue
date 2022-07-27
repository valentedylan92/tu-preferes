<template>
  <div class="container">
    <CardElement 
      v-for="(element,index) in listing"
      :key="element.id"
      :index="index"
      :element="element"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import CardElement from '@/components/CardElement.vue'

import list from "../list.json"

export default {
  name: 'GameScreen',
  data(){
    return{
      listing : list
    }
  },
  components: {
    CardElement
  }
}
</script>
