<template> 
    <div class="popup">
        <div class="popup__inner">
            <p class="popup__text">
                Bienvenue sur le jeu du J'ai déjà inspiré du salon eponyme de chez <a href="http://twitch.tv/kowab" target="_blank">Kowab</a>.<br>
                Le but du jeu est de voir si vous connaissez bien la communauté dont vous faites partie.
            </p>
            <p class="popup__text">
                Vous retrouverez ici l'ensemble des "J'ai déjà" proposé cette année et votre but sera de déterminer , selon vous , le pourcentage des réponses votées.<br>
                (Vous avez une marge d'erreur de 5%)
            </p>
            <p class="popup__text">
                Vous gagnerez 1 point par bonne réponse et 2 point par bonne réponse parfaite.<br>
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
                    <input type="radio" id="complete" name="lengthGameEverInit" value="361">
                    <label for="complete">Complète(361)</label>
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