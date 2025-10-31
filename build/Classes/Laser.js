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
var Laser = /** @class */ (function (_super) {
    __extends(Laser, _super);
    function Laser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 10;
        _this.player = _this.getGame().getPlayer();
        return _this;
    }
    Laser.prototype.start = function () {
        this.setImage(Assets.getPlayerImage());
        this.setPosition({
            x: this.player.getPosition().x + this.player.getImage().width / 2 - this.getImage().width / 2,
            y: this.player.getPosition().y - this.getImage().height + this.player.getImage().height
        });
    };
    Laser.prototype.update = function () {
        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y - this.speed
        });
    };
    return Laser;
}(GameObject));
export { Laser };
