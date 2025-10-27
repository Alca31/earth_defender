import { GameObject } from "./GameObject.js";
var Game = /** @class */ (function () {
    function Game() {
        this.CANVAS_WIDTH = 900;
        this.CANVAS_HEIGHT = 600;
        //affectation des variables des attributs, this permet d'accèder aux variables de la classe
        // Init Game canvas
        var canvas = document.querySelector("canvas");
        canvas.height = this.CANVAS_HEIGHT; //on affecte l'attribut height du canvas avec l'attribut canvas_height de la classe game
        canvas.width = this.CANVAS_WIDTH;
        this.context = canvas.getContext("2d"); //on affecte l'attribut context de la classe game avec le context du canvas
    }
    Game.prototype.draw = function (GameObject) {
        this.context.drawImage(GameObject.getImage(), GameObject.getPosition().x, GameObject.getPosition().y, GameObject.getImage().width, GameObject.getImage().height);
    };
    Game.prototype.loop = function () {
        setInterval(function () {
            //console.log("Frame!");
        }, 10);
        // 1 frame/10ms ---> 100 frames/1000ms ---> 100 frames/1s
    };
    Game.prototype.start = function () {
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT); //cette ligne a été vue sur le corrigé
        this.context.fillStyle = "#141414"; // HexaDecimal Gris foncé
        this.context.fillRect(0, 0, // [x,y] supérieur gauche
        this.CANVAS_WIDTH, this.CANVAS_HEIGHT // [x,y] inférieur droit
        );
        // J'instancie un GameObject
        var gameObject = new GameObject();
        // Je le dessine
        this.draw(gameObject);
        this.loop();
    };
    return Game;
}());
export { Game };
