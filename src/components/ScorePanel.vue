<template>
    <div class="score"  ref="container">
        <div id="score-current" class="score__element">
            <p class="score__text">Partie en cours <br> Score : {{score}}</p>
        </div>
        <div id="score-board" class="score__element">
        </div>

    </div>
</template>

<script>
import { mapState} from 'pinia'
import {useScoreStore} from "@/stores/score"

export default {
    name:"ScorePanel",
    data(){
        return{
            currentSession: 1
        }
    },
    computed:{
        ...mapState(useScoreStore,['score']),
    },
    mounted(){
        this.emitter.on("storeCurrentScore", data => {
            console.log(data)
            let element = document.createElement('p'); // is a node
            element.classList.add('score__text')
            element.innerHTML = 'Partie ' +  this.currentSession + ' : ' + this.score;
            document.querySelector("#score-board").appendChild(element)
            this.currentSession += 1
        })  

    }

}
</script>