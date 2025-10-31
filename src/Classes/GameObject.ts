import { Position } from "./Position.js";
import { Assets } from "./Assets.js";
import { Game } from "./Game.js";
import { Alien } from "./Alien.js";

export class GameObject {

    private position: Position;
    private image: HTMLImageElement;
    private game: Game;
    constructor(game: Game) {//il s'agit d'une injection de dépendance, c'est quand on passe une classe en paramètre
        this.position = {
            x: 0,
            y: 0
        };
        this.image = Assets.getDefaultImage();
        this.game = game;//permet aux enfants d'accèder au game en cours grâce à la dépendance
    }


    public overlap(obj1: GameObject, obj2: GameObject=null):boolean {
        if(obj2==null)obj2 = this;
        //math.abs sort la valeur absolue d'un nombre, ensuite on vérifie si la distance entre les deux objets 
        // est inférieure à la somme de leur largeur et hauteur respectives pour toucher les bords
        //si on veut faire une collision entre deux objets dont la position est centré 
        // il faut diviser par 2 la largeur et la hauteur pour obtenir le rayon
           if (Math.abs(obj1.position.x - obj2.position.x) <= (obj1.image.width + obj2.image.width) &&
            Math.abs(obj1.position.y - obj2.position.y) <= (obj1.image.height + obj2.image.height)) {
                return true;
           } 
           if (obj1 instanceof Alien && obj1.position.y >= this.game.CANVAS_HEIGHT - obj1.image.height) {
              return true;
           }
           return false;
    }

    protected start() { }//méthode vide car appellée dans les classes enfants
    public callStart() { this.start(); }
    protected update() { }//méthode vide car appellée dans les classes enfants
    public callUpdate() { this.update(); }

    public getImage(): HTMLImageElement {
        return this.image;
    }
    public getPosition(): Position {
        return this.position;
    }
    public getGame(): Game {
        return this.game;
    }
    public setImage(image: HTMLImageElement) {
        this.image = image;
    }
    public setPosition(position: Position) {
        this.position = position;
    }


    protected collide(other : GameObject) {
        // logique de collision à implémenter dans les classes enfants
    }
    public callCollide(other : GameObject) {
        this.collide(other);
    }

}