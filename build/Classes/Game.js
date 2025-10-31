import { Player } from "./Player.js";
import { Input } from "./Inputs.js";
import { Star } from "./Star.js";
var Game = /** @class */ (function () {
    function Game() {
        // Public attributs
        this.CANVAS_WIDTH = 900;
        this.CANVAS_HEIGHT = 600;
        this.nbAliens = 10;
        this.nbStar = 100;
        this.gameObjects = [];
        // Init Game canvas
        var canvas = document.querySelector("canvas");
        canvas.height = this.CANVAS_HEIGHT;
        canvas.width = this.CANVAS_WIDTH;
        this.context = canvas.getContext("2d");
    }
    Game.prototype.getPlayer = function () {
        return this.player;
    };
    Game.prototype.instanciate = function (gameObject) {
        this.gameObjects.push(gameObject);
    };
    Game.prototype.gameContext = function () {
        // Clear context
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#000000b7";
        this.context.fillRect(this.CANVAS_WIDTH / 2, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    };
    Game.prototype.start = function () {
        this.gameContext();
        this.player = new Player(this);
        this.player.callStart();
        this.instanciate(this.player);
        /*for (let i = 0; i < this.nbAliens; i++) {
            const alien = new Alien(this);
            alien.callStart();
            this.instanciate(alien);
        } */
        for (var i = 0; i < this.nbStar; i++) {
            var star = new Star(this);
            star.callStart();
            this.instanciate(star);
        }
        // Listen to input
        Input.listen();
        // Start game loop
        this.loop();
    };
    Game.prototype.draw = function (gameObject) {
        this.context.drawImage(gameObject.getImage(), gameObject.getPosition().x, gameObject.getPosition().y, gameObject.getImage().width, gameObject.getImage().height);
    };
    Game.prototype.destroy = function (gameObject) {
        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
    };
    Game.prototype.loop = function () {
        var _this = this;
        this.gameInterval = setInterval(function () {
            console.log("Frame!");
            _this.gameContext();
            _this.gameObjects.forEach(function (gameObject) {
                gameObject.callUpdate();
                _this.draw(gameObject);
                _this.gameObjects.forEach(function (other) {
                    if (gameObject.overlap(other) && gameObject !== other) {
                        gameObject.callCollide(other);
                    }
                });
                // if (gameObject instanceof Alien) {
                //     if (gameObject.overlap(gameObject, this.player)) {
                //         console.log("player lose");
                //         clearInterval(gameInterval);
                //         return;
                //     }
                //     if (gameObject.overlap(gameObject, this.laser)) {
                //         this.destroy(gameObject);
                //     }
                // }
                // if (gameObject instanceof Laser) {
                //     if (gameObject.overlap(gameObject, this.alien)) {
                //         this.destroy(gameObject);
                //     }
                // }
            });
        }, 1000);
    };
    Game.prototype.gameover = function () {
        clearInterval(this.gameInterval);
    };
    return Game;
}());
export { Game };
