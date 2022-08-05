import { defineStore } from "pinia"

export const useScoreStoreEver = defineStore("scoreEver",{
    state:() => {
        return {
            scoreEver:0,
            winEver:0,
            lostEver:0
        }
    },
    actions : {
        incrementWinEver(){
            this.scoreEver += 1
            this.winEver += 1
        },
        incrementLostEver(){
            this.lostEver += 1
        },
        resetScoreEver(){
            this.scoreEver = 0
            this.winEver = 0
            this.lostEver = 0
        }
    }
})