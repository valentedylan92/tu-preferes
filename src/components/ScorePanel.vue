<template> 
    <div class="score">
        <p class="score__text">Votre Score : {{score}}</p>
        <p class="score__subtext">Bonnes réponses parfaites : {{perfectWin}}</p>
        <p class="score__subtext">Bonnes réponses : {{win}}</p>
        <p class="score__subtext">Mauvaises réponses : {{lost}}</p>
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
    export default {
        name: 'ScorePanel',
        props:["scoreStatus"],
        data(){
            return{
                score:0,
                win:0,
                perfectWin:0,
                lost:0
            }
        },
        methods:{
            handleScore(valueData){
                if(valueData == 'Lost'){
                    this.lost += 1
                }else if(valueData == 'Win'){
                    this.win += 1
                    this.score += 1
                }else{
                    this.perfectWin += 1
                    this.score += 2
                }
            },
            hideScore(){
                const valueLength = document.querySelector('input[name="lengthGameRatherNewGame"]:checked').value;
                this.emitter.emit("endOfTheGame",valueLength)
            }
        },
        mounted () {
             this.emitter.on('score', data => {
                console.log(data)
                this.handleScore(data)
                
            })
            this.emitter.on('resetScore', data => {
                console.log(data)
                this.lost = 0
                this.win = 0
                this.perfectWin = 0
                this.score = 0
            })
        },
    }
</script>