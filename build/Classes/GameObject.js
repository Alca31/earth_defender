import { Assets } from "./Assets.js";
import { Alien } from "./Alien.js";
var GameObject = /** @class */ (function () {
    function GameObject(game) {
        this.position = {
            x: 0,
            y: 0
        };
        this.image = Assets.getDefaultImage();
        this.game = game; //permet aux enfants d'accèder au game en cours grâce à la dépendance
    }
    GameObject.prototype.overlap = function (obj1, obj2) {
        if (obj2 === void 0) { obj2 = null; }
        if (obj2 == null)
            obj2 = this;
        //math.abs sort la valeur absolue d'un nombre, ensuite on vérifie si la distance entre les deux objets 
        // est inférieure à la somme de leur largeur et hauteur respectives pour toucher les bords
        //si on veut faire une collision entre deux objets dont la position est centré 
        // il faut diviser par 2 la largeur et la hauteur pour obtenir le rayon
        if (Math.abs(obj1.position.x - obj2.position.x) <= (obj1.image.width + obj2.image.width) &&
            Math.abs(obj1.position.y - obj2.position.y) <= (obj1.image.height + obj2.image.height)) {
            return true;
        }
        if (obj1 instanceof Alien && obj1.position.y >= this.game.CANVAS_HEIGHT - obj1.image.height) {
            return true;
        }
        return false;
    };
    GameObject.prototype.start = function () { }; //méthode vide car appellée dans les classes enfants
    GameObject.prototype.callStart = function () { this.start(); };
    GameObject.prototype.update = function () { }; //méthode vide car appellée dans les classes enfants
    GameObject.prototype.callUpdate = function () { this.update(); };
    GameObject.prototype.getImage = function () {
        return this.image;
    };
    GameObject.prototype.getPosition = function () {
        return this.position;
    };
    GameObject.prototype.getGame = function () {
        return this.game;
    };
    GameObject.prototype.setImage = function (image) {
        this.image = image;
    };
    GameObject.prototype.setPosition = function (position) {
        this.position = position;
    };
    GameObject.prototype.collide = function (other) {
        // logique de collision à implémenter dans les classes enfants
    };
    GameObject.prototype.callCollide = function (other) {
        this.collide(other);
    };
    return GameObject;
}());
export { GameObject };
