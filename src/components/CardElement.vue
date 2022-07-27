<template>
    <div class="card-element">
        <h3>{{element.choice1}}</h3>
        <h3>{{element.choice2}}</h3>
        <p>{{element.result1}}</p>
        <p>{{element.result2}}</p>
    </div>
</template>

<script>
export default {
  name: 'CardElement',
  
  props:["element", "index"]
}
</script>