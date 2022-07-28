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

import listYouRather from "../list.json"

export default {
  name: 'GameScreen',
  data(){
    return{
      listing : listYouRather
    }
  },
  components: {
    CardElement
  }
}
</script>
