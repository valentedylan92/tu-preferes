<template>
    <div class="card">
      <div class="card__inner">
        <h2>TU PRÉFÈRES {{id}}</h2>
        <div class="choice__container">
          <div class="choice">
            <h3 class="choice__title">{{element.choice1}}</h3>
            <p class="choice__result">{{element.result1}} </p>
            <p class="choice__result">{{Math.round(100*element.result1/(element.result1+element.result2))}} %</p>
          </div>
          <div class="choice">
            <h3 class="choice__title">{{element.choice2}}</h3>
            <p class="choice__result">{{element.result2}}</p>
            <p class="choice__result"> {{Math.round(100*element.result2/(element.result1+element.result2))}} %</p>
          </div>
        </div>
        <h3>Sur un total de {{(element.result1+element.result2)}} votes.</h3>

      </div>
    </div>
</template>

<script>
export default {
  name: 'CardElement',

  props:["element", "index", "id"]
}
</script>