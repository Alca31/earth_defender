import { GameObject } from "./GameObject.js";
export class Game {
    //attribut de la classe, qui correspond à la déclaration des variables
    private context: CanvasRenderingContext2D;
    public readonly CANVAS_WIDTH: number = 900;
    public readonly CANVAS_HEIGHT: number = 600;
    constructor() { //vu sur le corrigé, car je n'ai pas su remettre la syntaxe en syntaxe objet
        //affectation des variables des attributs, this permet d'accèder aux variables de la classe
        // Init Game canvas
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.height = this.CANVAS_HEIGHT;//on affecte l'attribut height du canvas avec l'attribut canvas_height de la classe game
        canvas.width = this.CANVAS_WIDTH;
        this.context = canvas.getContext("2d");//on affecte l'attribut context de la classe game avec le context du canvas
    }
    public draw(GameObject: GameObject) {
        this.context.drawImage(GameObject.getImage(), GameObject.getPosition().x, GameObject.getPosition().y, GameObject.getImage().width, GameObject.getImage().height);
    }
    private loop(){
    setInterval(()=>{
        //console.log("Frame!");
    },10);
    // 1 frame/10ms ---> 100 frames/1000ms ---> 100 frames/1s
}

    public start(): void {
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);//cette ligne a été vue sur le corrigé
        this.context.fillStyle = "#141414";  // HexaDecimal Gris foncé
        this.context.fillRect(
            0, 0,            // [x,y] supérieur gauche
            this.CANVAS_WIDTH, this.CANVAS_HEIGHT // [x,y] inférieur droit
        );
        // J'instancie un GameObject
        const gameObject = new GameObject();
        // Je le dessine
        this.draw(gameObject);
        this.loop();
    }

}