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
    Player.prototype.Adapt = function () {
        //repris sur javier
        var movement = this.speed * Input.getAxisX();
        // entre 0 (à gauche) et l'espace dispo à droit
        if (this.getPosition().x >= this.getGame().CANVAS_WIDTH - this.getImage().width) {
            return this.getGame().CANVAS_WIDTH - this.getImage().width - 5;
        }
        if (this.getPosition().x <= 0) {
            return this.getPosition().x + this.getImage().width + 5;
        }
        return this.getPosition().x + movement;
    };
    Player.prototype.update = function () {
        console.log("player isShooting:", Input.getIsShooting());
        if (Input.getIsShooting() &&
            ((Date.now() - this.lastShootTime) >= this.shootInterval_ms)) {
            this.getGame().instanciate(new Laser(this.getGame()));
            this.lastShootTime = Date.now();
        }
        this.setPosition({
            x: this.Adapt(),
            y: this.getPosition().y
        });
    };
    return Player;
}(GameObject));
export { Player };
