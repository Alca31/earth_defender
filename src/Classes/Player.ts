import { Assets } from "./Assets.js";
import { GameObject } from "./GameObject.js";
import { Input } from "./Inputs.js";
import { Laser } from "./Laser.js";
export class Player extends GameObject {
    private speed: number = 10;
    private shootInterval_ms: number = 200;
    private lastShootTime: number = Date.now();
    protected start(): void {
        this.setImage(Assets.getPlayerImage());
        this.setPosition({
            x: this.getGame().CANVAS_WIDTH / 2,
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height
        });
    }
    protected update(): void {
        //repris sur javier
        const rightBoundary = this.getGame().CANVAS_WIDTH - this.getImage().width;
        const movement = this.speed * Input.getAxisX();
        const availableSpace = rightBoundary - this.getPosition().x;
        const clampedMovement = Math.max(0, Math.min(movement, availableSpace));// entre 0 (à gauche) et l'espace dispo à droite
        this.setPosition({
            x: this.getPosition().x + clampedMovement,
            y: this.getPosition().y
        })

        if (
            Input.getIsShooting() &&
            (
                (Date.now() - this.lastShootTime) >= this.shootInterval_ms
            )
        ) {
            this.getGame().instanciate(new Laser(this.getGame()));
            this.lastShootTime = Date.now();
        }


    }
}
