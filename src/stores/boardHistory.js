import { defineStore } from "pinia"

export const useBoardHistoryStore = defineStore("boardHistory",{
    state:() => {
        return {
            scoreHistoryEver:[],
            scoreHistoryRather:[],
            sessionEver:1,
            sessionRather:1
        }
    },
    actions : {
        addScoreHistoryEver(sessionValue,scoreValue){
            const historyElement = {
                sessionId : sessionValue,
                scoreSession: scoreValue
            }
            this.scoreHistoryEver.push(historyElement)
            this.sessionEver += 1
        },
        addScoreHistoryRather(sessionValue,scoreValue){
            const historyElement = {
                sessionId : sessionValue,
                scoreSession: scoreValue
            }
            this.scoreHistoryRather.push(historyElement)
            this.sessionRather += 1
        },
        // updateSessionEver(){
        // },
        // updateSessionRather(){
        // }
    }
})