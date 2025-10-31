var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Assets } from "./Assets.js";
import { GameObject } from "./GameObject.js";
var Alien = /** @class */ (function (_super) {
    __extends(Alien, _super);
    function Alien() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 1;
        return _this;
    }
    Alien.prototype.posRandX = function () {
        var rand = Math.floor(Math.random() * (this.getGame().CANVAS_WIDTH) * this.speed);
        if (rand + this.getImage().width > this.getGame().CANVAS_WIDTH) {
            rand = rand - this.getImage().width;
        }
        if (rand - this.getImage().width < 0) {
            rand = rand + this.getImage().width;
        }
        return rand;
    };
    Alien.prototype.posRandY = function () {
        return Math.floor(Math.random() * (this.getGame().CANVAS_HEIGHT / 2 + this.getImage().height) * this.speed);
    };
    Alien.prototype.start = function () {
        // Définissez l'image de l'alien
        this.setImage(Assets.getAlienImage());
        this.setPosition({
            x: this.posRandX(),
            y: this.posRandY()
        });
    };
    Alien.prototype.update = function () {
        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y + this.speed
        });
    };
    return Alien;
}(GameObject));
export { Alien };
