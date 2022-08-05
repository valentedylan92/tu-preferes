import { defineStore } from "pinia"

export const useScoreStoreRather = defineStore("scoreRather",{
    state:() => {
        return {
            scoreRather:0,
            winRather:0,
            lostRather:0,
            perfectWinRather:0
        }
    },
    actions : {
        incrementWinRather(){
            this.scoreRather += 1
            this.winRather += 1
        },
        incrementPerfectWinRather(){
            this.scoreRather += 2
            this.perfectWinRather += 1
        },
        incrementLostRather(){
            this.lostRather += 1
        },
        resetScoreRather(){
            this.scoreRather = 0,
            this.winRather = 0,
            this.lostRather = 0,
            this.perfectWinRather = 0
        }
    }
})