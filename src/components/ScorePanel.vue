<template> 
    <div class="score">
        <div class="score__inner">
            <p class="score__text">Votre Score : {{score}}</p>
            <p class="score__text">Bonnes réponses parfaites : {{perfectWin}}</p>
            <p class="score__text">Bonnes réponses : {{win}}</p>
            <p class="score__text">Mauvaises réponses : {{lost}}</p>
        </div>
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
        computed:{
            // console.log(this.scoreStatus)
        },
        methods:{
            handleScore(){
                
            },
        },
        mounted () {
             this.emitter.on('score', data => {
                if(data == 'Lost'){
                    this.lost += 1
                }else if(data == 'Win'){
                    this.win += 1
                    this.score += 1
                }else{
                    this.perfectWin += 1
                    this.score += 2
                }
            })
        },
    }
</script>