<template>
  <div class="container">
    <CardElement 
      :id="listingRather[getRandom].id"
      :element="listingRather[getRandom]"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import CardElement from '@/components/CardElement.vue'


export default {
  name: 'GameScreen',
  props:["listingRather","getRandom"],
  components: {
    CardElement
  },

  methods: {
    // getRandom(){
    //     this.randomNumber= Math.round(Math.random()*this.listing.length-1);
    //     console.log(this.randomNumber)
    //     return this.randomNumber
    // }
  }
}
</script>
