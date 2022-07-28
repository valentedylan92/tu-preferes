<template>
    <div class="card">
      <div class="card__inner">
        <h2>TU PRÉFÈRES #{{id}}</h2>
        <div class="choice__container">
          <div class="choice">
            <div class="bar">
              <div :class="'bar__inner height-'+percentage1">
                <p class="choice__result">{{percentage1}} %</p>
              </div>
            </div>
            <p class="choice__result">{{element.result1}} </p>
            <h3 class="choice__title">{{element.choice1}}</h3>
          </div>
          <div class="choice">
            <div class="bar">
              <div :class="'bar__inner height-'+percentage2">
                <p class="choice__result"> {{percentage2}} %</p>
              </div>
            </div>
            <p class="choice__result">{{element.result2}}</p>
            <h3 class="choice__title">{{element.choice2}}</h3>
          </div>
        </div>
        <h3>Sur un total de {{(element.result1+element.result2)}} votes.</h3>

      </div>
    </div>
</template>

<script>
export default {
  name: 'CardElement',
  props:["element", "index", "id"],
  data() {
    return {
      percentage1: Math.round(100*this.element.result1/(this.element.result1+this.element.result2)).toString(),
      percentage2:Math.round(100*this.element.result2/(this.element.result1+this.element.result2)).toString()
    } 
  }
}
</script>