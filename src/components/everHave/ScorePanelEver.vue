<template>
    <div class="score"  ref="container">
        <div id="score-current" class="score__element">
            <p class="score__text">Partie en cours <br> Score : {{scoreEver}}</p>
        </div>
        <hr>
        <div id="score-board" class="score__element">
        </div>

    </div>
</template>

<script>
import { mapState} from 'pinia'
import {useScoreStoreEver} from "@/stores/scoreEver"

export default {
    name:"ScorePanelEver",
    data(){
        return{
            currentSession: 1
        }
    },
    computed:{
        ...mapState(useScoreStoreEver,['scoreEver']),
    },
    mounted(){
        this.emitter.on("storeCurrentScoreEver", data => {
            console.log(data)
            let element = document.createElement('p'); // is a node
            element.classList.add('score__text')
            element.innerHTML = 'Partie ' +  this.currentSession + ' : ' + this.scoreEver;
            document.querySelector("#score-board").appendChild(element)
            this.currentSession += 1
        })  

    },
    beforeUnmount(){
        this.emitter.off("storeCurrentScoreEver")
    }

}
</script>