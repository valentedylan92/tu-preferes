<template> 
    <div class="popup">
        <div class="popup__inner">
            <p class="popup__text">
                Bienvenue sur le jeu du J'ai déjà inspiré du salon eponyme de chez <a href="http://twitch.tv/kowab" target="_blank">Kowab</a>.<br>
                Le but du jeu est de voir si vous connaissez bien la communauté dont vous faites partie.
            </p>
            <p class="popup__text">
                Chaque "J'ai déjà" proposé sera illustré par un groupement de Crocs, chacune de ces Crocs représentant 1 vote.<br>
                Votre but sera donc de sélectionner laquel de ces 2 team a obtenu le plus de votes.
            </p>
            <p class="popup__text">
                Vous gagnerez 1 point par bonne réponse <br>
            </p>
            <p class="popup__text">
                BONNE CHANCE À VOUS !
            </p>
            <div class="radio__list">
                <div class="radio__element">
                    <input type="radio" id="rapide" name="lengthGameEverInit" value="15">
                    <label for="rapide">Rapide(15)</label>
                </div>
                <div class="radio__element">
                    <input type="radio" id="moyenne" name="lengthGameEverInit" value="30" checked>
                    <label for="moyenne">Moyenne(30)</label>
                </div>
                <div class="radio__element">
                    <input type="radio" id="longue" name="lengthGameEverInit" value="45">
                    <label for="longue">Longue(45)</label>
                </div>
                <div class="radio__element">
                    <input type="radio" id="complete" name="lengthGameEverInit" value="135">
                    <label for="complete">Complète(135)</label>
                </div>
            </div>

            <button @click="hidePopup()">Lets go</button>
              <p class="popup__disclaimer">
                Ce jeu est un projet en cours de développement, d'autres features seront prévues. Si vous remarquez des bugs n'hésitez pas à m'en faire part sur Discord !
            </p>
            <p class="popup__disclaimer">
                (Il n'est pas prévue pour être jouer sur mobile pour le moment , sorry les bros)
            </p>

        </div>
    </div>
</template>
<script>
    export default {
        name: 'PopupRulesEver',
        methods:{
            hidePopup(){
                const valueLength = document.querySelector('input[name="lengthGameEverInit"]:checked').value;
                this.emitter.emit("hidePopupEver",valueLength)
            }
        }
    }
</script>