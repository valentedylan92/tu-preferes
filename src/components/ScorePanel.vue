<template> 
    <div class="score">
        <p class="score__text">Votre Score : {{score}}</p>
        <p class="score__subtext">Bonnes réponses parfaites : {{perfectWin}}</p>
        <p class="score__subtext">Bonnes réponses : {{win}}</p>
        <p class="score__subtext">Mauvaises réponses : {{lost}}</p>
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