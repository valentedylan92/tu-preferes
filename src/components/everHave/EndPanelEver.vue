<template> 
    <div class="end">
        <p class="end__text">Score final : {{scoreEver}}</p>
            <p class="end__subtext" v-if="winEver > 1">Tu as trouvé {{answerFound}} bonne(s) réponse(s)</p>
            <p class="end__subtext" v-else>Tu n'as trouvé aucune réponse... Coup dur !</p>
        <div class="radio__list">
            <div class="radio__element">
                <input type="radio" id="rapideNew" name="lengthGameEverNewGame" value="15">
                <label for="rapideNew">Rapide(15)</label>
            </div>
            <div class="radio__element">
                <input type="radio" id="moyenneNew" name="lengthGameEverNewGame" value="30" checked>
                <label for="moyenneNew">Moyenne(30)</label>
            </div>
            <div class="radio__element">
                <input type="radio" id="longueNew" name="lengthGameEverNewGame" value="45">
                <label for="longueNew">Longue(45)</label>
            </div>
            <div class="radio__element">
                <input type="radio" id="completeNew" name="lengthGameEverNewGame" value="135">
                <label for="completeNew">Complète(135)</label>
            </div>
        </div>
        <button id="newGame" @click="hideScore()" class="button">Nouvelle partie</button>
    </div>
</template>

<script>
    import { mapState} from 'pinia'
    import {useScoreStoreEver} from "@/stores/scoreEver"


    export default {
        name: 'EndPanelEver',
        props:["limitGame"],
        data(){
            return{
                answerFound:0
            }
        },
        computed:{
            ...mapState(useScoreStoreEver,['scoreEver','winEver','lostEver']),
        },
        methods:{
            hideScore(){
                const valueLength = document.querySelector('input[name="lengthGameEverNewGame"]:checked').value;
                this.emitter.emit("endOfTheGameEver",valueLength)
            }
        },
        beforeMount(){
            console.log(this.answerFound)
            this.answerFound = this.limitGame - this.lostEver
        },
        mounted(){
            this.emitter.emit("storeCurrentScoreEver")
        }
    }
</script>