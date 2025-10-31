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

    protected Adapt(): number {
        //repris sur javier

        const movement = this.speed * Input.getAxisX();

        // entre 0 (à gauche) et l'espace dispo à droit
        if (this.getPosition().x >= this.getGame().CANVAS_WIDTH - this.getImage().width) {
            return this.getGame().CANVAS_WIDTH - this.getImage().width - 5;
        }
        if (this.getPosition().x <= 0) {
            return this.getPosition().x + this.getImage().width + 5;
        }
        return this.getPosition().x + movement;
    }

    protected update(): void {


        console.log("player isShooting:", Input.getIsShooting());

        if (
            Input.getIsShooting() &&
            (
                (Date.now() - this.lastShootTime) >= this.shootInterval_ms
            )
        ) {
            this.getGame().instanciate(new Laser(this.getGame()));
            this.lastShootTime = Date.now();
        }

        this.setPosition({
            x: this.Adapt(),
            y: this.getPosition().y
        })

    }
}
