<template>
    <div class="score"  ref="container">
        <div id="score-current" class="score__element">
            <p class="score__text">Partie en cours <br> Score : {{scoreRather}}</p>
        </div>
        <hr>
        <div id="score-board" class="score__element">
        </div>

    </div>
</template>

<script>
import { mapState} from 'pinia'
import {useScoreStoreRather} from "@/stores/scoreRather"

export default {
    name:"ScorePanelRather",
    data(){
        return{
            currentSession: 1
        }
    },
    computed:{
        ...mapState(useScoreStoreRather,['scoreRather']),
    },
    mounted(){
        this.emitter.on("storeCurrentScore", data => {
            console.log(data)
            let element = document.createElement('p'); // is a node
            element.classList.add('score__text')
            element.innerHTML = 'Partie ' +  this.currentSession + ' : ' + this.scoreRather;
            document.querySelector("#score-board").appendChild(element)
            this.currentSession += 1
        })  

    }

}
</script>