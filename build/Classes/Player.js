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
import { Input } from "./Inputs.js";
import { Laser } from "./Laser.js";
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 10;
        _this.shootInterval_ms = 200;
        _this.lastShootTime = Date.now();
        return _this;
    }
    Player.prototype.start = function () {
        this.setImage(Assets.getPlayerImage());
        this.setPosition({
            x: this.getGame().CANVAS_WIDTH / 2,
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height
        });
    };
    Player.prototype.update = function () {
        //repris sur javier
        var rightBoundary = this.getGame().CANVAS_WIDTH - this.getImage().width;
        var movement = this.speed * Input.getAxisX();
        var availableSpace = rightBoundary - this.getPosition().x;
        var clampedMovement = Math.max(0, Math.min(movement, availableSpace)); // entre 0 (à gauche) et l'espace dispo à droite
        this.setPosition({
            x: this.getPosition().x + clampedMovement,
            y: this.getPosition().y
        });
        if (Input.getIsShooting() &&
            ((Date.now() - this.lastShootTime) >= this.shootInterval_ms)) {
            this.getGame().instanciate(new Laser(this.getGame()));
            this.lastShootTime = Date.now();
        }
    };
    return Player;
}(GameObject));
export { Player };
