import { Assets } from "./Assets.js";
import { GameObject } from "./GameObject.js";
import { Player } from "./Player.js";
export class Laser extends GameObject {
    private speed: number = 10;
    private player: Player = this.getGame().getPlayer();

    protected start(): void {
        this.setImage(Assets.getPlayerImage());
        this.setPosition({
            x: this.player.getPosition().x + this.player.getImage().width / 2 - this.getImage().width / 2,
            y: this.player.getPosition().y - this.getImage().height + this.player.getImage().height
        });
    }
    protected update(): void {

        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y - this.speed
        })
    }
}