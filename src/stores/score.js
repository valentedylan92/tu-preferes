import { defineStore } from "pinia"

export const useScoreStore = defineStore("score",{
    state:() => {
        return {
            score:0,
            win:0,
            lost:0,
            perfectWin:0
        }
    },
    actions : {
        incrementWin(){
            this.score += 1
            this.win += 1
        },
        incrementPerfectWin(){
            this.score += 2
            this.perfectWin += 1
        },
        incrementLost(){
            this.lost += 1
        },
        resetScore(){
            this.score = 0,
            this.win = 0,
            this.lost = 0,
            this.perfectWin = 0
        }
    }
})