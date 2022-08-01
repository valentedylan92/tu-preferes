<template> 
    <div class="popup">
        <div class="popup__inner">
            <p class="popup__text">
                Bienvenue sur le jeu du Tu préfères inspiré du salon eponyme de chez <a href="http://twitch.tv/kowab" target="_blank">Kowab</a>.<br>
                Le but du jeu est de voir si vous connaissez bien la communauté dont vous faites partie.
            </p>
            <p class="popup__text">
                Vous retrouverez ici l'ensemble des 365 "Tu préfères" proposé l'année passée et votre but sera de déterminer , selon vous , le pourcentage des réponses votés.<br>
                (Vous avez une marge d'erreur de 5%)
            </p>
            <p class="popup__text">
                Vous gagnerez 1 point par bonne réponse et 2 point par bonne réponse parfaite.<br>
                Chaque partie est composé de 15 propositions.
            </p>
            <p class="popup__text">
                BONNE CHANCE À VOUS !
            </p>


            <button @click="hidePopup()">Lets go</button>
              <p class="popup__disclaimer">
                Ce jeu est un projet en cours de développement, d'autres features seront prévues. Si vous remarquer des bugs n'hésitez pas à m'en faire part sur Discord !
            </p>
            <p class="popup__disclaimer">
                (Il n'est pas prévue pour être jouer sur mobile pour le moment , sorry les bros)
            </p>

        </div>
    </div>
</template>
<script>
    export default {
        name: 'PopupRules',
        methods:{
            hidePopup(){
                this.emitter.emit("hideThePopUp")
            }
        }
    }
</script>