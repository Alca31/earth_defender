import { Assets } from "./Assets.js"
import { GameObject } from "./GameObject.js"
import { Player } from "./Player.js";

export class Alien extends GameObject {
    private speed: number = 1;

    protected posRandX():number{
        let rand=Math.floor(Math.random() * (this.getGame().CANVAS_WIDTH/2)*this.speed);
        if (rand+this.getImage().width>this.getGame().CANVAS_WIDTH/2){
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

    protected collide(other : GameObject) {
        // logique de collision à implémenter dans les classes enfants
        if(other instanceof Player){
            console.log("player lose");
            this.getGame().gameover();
        }
    }
}