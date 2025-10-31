import { Assets } from "./Assets";
import { GameObject } from "./GameObject";

export class Star extends GameObject {
    private speed: number = 10;

    protected posRandX(): number {
        let rand = Math.floor(Math.random() * (this.getGame().CANVAS_WIDTH) * this.speed);
        if (rand + this.getImage().width > this.getGame().CANVAS_WIDTH) {
            rand = rand - this.getImage().width;
        }
        if (rand - this.getImage().width < 0) {
            rand = rand + this.getImage().width;
        }
        return rand;
    }

    protected posRandY(): number {

        return Math.floor(Math.random() * (this.getGame().CANVAS_HEIGHT / 2 + this.getImage().height) * this.speed);
    }

    protected start(): void {
        this.setImage(Assets.getStarImage());
        this.setPosition({
            x: this.posRandX(),
            y: this.posRandY()
        });
    }
    protected update(): void {
        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y + this.speed
        })
    }

}