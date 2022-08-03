<template> 
    <div class="score">
        <p class="score__text">Votre Score : {{score}}</p>
        <p class="score__subtext" v-if="perfectWin >= 1">Tu as trouvé {{answerFound}} bonnes réponses dont {{perfectWin}} réponses parfaites !</p>
        <p class="score__subtext" v-else-if="win > 1 && perfectWin ==0">Tu as trouvé {{answerFound}} bonnes réponses</p>
        <p class="score__subtext" v-else>Tu n'as trouvé aucune réponse... Coup dur !</p>

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
    import {useScoreStore} from "@/stores/score"


    export default {
        name: 'ScorePanel',
        props:["limitGame"],
        data(){
            return{
                answerFound:0
            }
        },
        computed:{
            ...mapState(useScoreStore,['score','win','perfectWin','lost']),
        },
        methods:{
            hideScore(){
                const valueLength = document.querySelector('input[name="lengthGameRatherNewGame"]:checked').value;
                this.emitter.emit("endOfTheGame",valueLength)
            }
        },
        beforeMount(){
            console.log(this.answerFound)
            this.answerFound = this.limitGame - this.lost
        }
    }
</script>