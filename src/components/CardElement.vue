<template>
    <div class="card-element">
        <h3>{{element.choice1}}</h3>
        <h3>{{element.choice2}}</h3>
        <p>{{element.result1}} = {{Math.round(100*element.result1/(element.result1+element.result2))}} %</p>
        <p>{{element.result2}} = {{Math.round(100*element.result2/(element.result1+element.result2))}} %</p>
        <!-- <p>{{element.result1 + element.result2}}</p> -->
    </div>
</template>

<script>
export default {
  name: 'CardElement',

  props:["element", "index"]
}
</script>