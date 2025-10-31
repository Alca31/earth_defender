import { Assets } from "./Assets.js"
import { GameObject } from "./GameObject.js"

export class Alien extends GameObject {
    private speed: number = 1;

    protected posRandX():number{
        let rand=Math.floor(Math.random() * (this.getGame().CANVAS_WIDTH)*this.speed);
        if (rand+this.getImage().width>this.getGame().CANVAS_WIDTH){
            rand=rand-this.getImage().width;
        }
        if (rand-this.getImage().width<0){
            rand=rand+this.getImage().width;
        }
        return rand;
    }

    protected posRandY():number{
         
        return Math.floor(Math.random() * (this.getGame().CANVAS_HEIGHT/2 + this.getImage().height)*this.speed);
    }

    protected start(): void {
        // Définissez l'image de l'alien
        this.setImage(Assets.getAlienImage());
        this.setPosition({
            x: this.posRandX(),
            y: this.posRandY()
        });
    }

    protected update(): void {
        this.setPosition({
            x: this.getPosition().x ,
            y: this.getPosition().y+this.speed
        })
    }
}