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
import { mapActions} from 'pinia'
import {useScoreStoreRather} from "@/stores/scoreRather"
import {useBoardHistoryStore} from "@/stores/boardHistory"

export default {
    name:"ScorePanelRather",
    data(){
        return{
            currentSession: 1
        }
    },
    computed:{
        ...mapState(useScoreStoreRather,['scoreRather']),
        ...mapState(useBoardHistoryStore,['sessionRather','scoreHistoryRather'])

    },
    methods:{
        ...mapActions(useBoardHistoryStore,['addScoreHistoryRather'])
    },
    mounted(){
        this.emitter.on("storeCurrentScoreRather", data => {
            console.log(data)
            let element = document.createElement('p'); // is a node
            element.classList.add('score__text')
            element.innerHTML = 'Partie ' +  this.sessionRather + ' : ' + this.scoreRather;
            document.querySelector("#score-board").appendChild(element)
            this.addScoreHistoryRather(this.sessionRather,this.scoreRather)
        })  

    },
    beforeUnmount(){
        this.emitter.off("storeCurrentScoreRather")
    }

}
</script>