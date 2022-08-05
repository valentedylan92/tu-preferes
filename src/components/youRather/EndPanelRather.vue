<template> 
    <div class="end">
        <p class="end__text">Score final : {{scoreRather}}</p>

        <p class="end__subtext" v-if="perfectWinRather >= 1">Tu as trouvé {{answerFound}} bonne(s) réponse(s) sur {{limitGame}}<br>dont {{perfectWinRather}} réponse(s) parfaite(s) !</p>
        <p class="end__subtext" v-else-if="winRather > 1 && perfectWinRather ==0">Tu as trouvé {{answerFound}} bonne(s) réponse(s)</p>
        <p class="end__subtext" v-else>Tu n'as trouvé aucune réponse... Coup dur !</p>
        
        <div class="radio__list">
            <div class="radio__element">
                <input type="radio" id="rapideNew" name="lengthGameRatherNewGame" value="15">
                <label for="rapideNew">Rapide(15)</label>
            </div>
            <div class="radio__element">
                <input type="radio" id="moyenneNew" name="lengthGameRatherNewGame" value="30" checked>
                <label for="moyenneNew">Moyenne(30)</label>
            </div>
            <div class="radio__element">
                <input type="radio" id="longueNew" name="lengthGameRatherNewGame" value="45">
                <label for="longueNew">Longue(45)</label>
            </div>
            <div class="radio__element">
                <input type="radio" id="completeNew" name="lengthGameRatherNewGame" value="361">
                <label for="completeNew">Complète(361)</label>
            </div>
        </div>
        <button id="newGame" @click="hideScore()" class="button">Nouvelle partie</button>
    </div>
</template>

<script>
    import { mapState} from 'pinia'
    import {useScoreStoreRather} from "@/stores/scoreRather"


    export default {
        name: 'EndPanelRather',
        props:["limitGame"],
        data(){
            return{
                answerFound:0
            }
        },
        computed:{
            ...mapState(useScoreStoreRather,['scoreRather','winRather','perfectWinRather','lostRather']),
        },
        methods:{
            hideScore(){
                const valueLength = document.querySelector('input[name="lengthGameRatherNewGame"]:checked').value;
                this.emitter.emit("endOfTheGame",valueLength)
            }
        },
        beforeMount(){
            console.log(this.answerFound)
            this.answerFound = this.limitGame - this.lostRather
        },
        mounted(){
            this.emitter.emit("storeCurrentScore")
        }
    }
</script>