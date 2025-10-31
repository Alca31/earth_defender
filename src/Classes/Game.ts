import { Alien } from "./Alien.js";
import { GameObject } from "./GameObject.js";
import { Player } from "./Player.js";
import { Input } from "./Inputs.js";
import { Star } from "./Star.js";
import { Laser } from "./Laser.js";
export class Game {
    // Public attributs
    public readonly CANVAS_WIDTH: number = 900;
    public readonly CANVAS_HEIGHT: number = 600;

    // Private attributs
    private context: CanvasRenderingContext2D;
    private player: Player;
    private laser: Laser;
    private alien: Alien;
    private nbAliens: number = 10;
    private nbStar: number = 100;
    private gameObjects: GameObject[] = [];
    constructor() {
        // Init Game canvas
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.height = this.CANVAS_HEIGHT;
        canvas.width = this.CANVAS_WIDTH;
        this.context = canvas.getContext("2d");
    }
    public getPlayer(): Player {
        return this.player;
    }
    public instanciate(gameObject: GameObject): void {
        this.gameObjects.push(gameObject);
    }

    private gameContext(): void {
        // Clear context
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    }

    public start(): void {
        this.gameContext();
        this.player = new Player(this);
        this.player.callStart();
        this.instanciate(this.player);
        for (let i = 0; i < this.nbAliens; i++) {
            const alien = new Alien(this);
            alien.callStart();
            this.instanciate(alien);
        }
        for (let i = 0; i < this.nbStar; i++) {
            const star = new Star(this);
            star.callStart();
            this.instanciate(star);
        }

        // Listen to input
        Input.listen();
        // Start game loop
        this.loop();
    }

    private draw(gameObject: GameObject) {
        this.context.drawImage(
            gameObject.getImage(),
            gameObject.getPosition().x,
            gameObject.getPosition().y,
            gameObject.getImage().width,
            gameObject.getImage().height
        );
    }

    public destroy(gameObject: GameObject): void {
        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
    }

    private loop() {
        const gameInterval = setInterval(() => {
            console.log("Frame!");
            this.gameContext();
            this.gameObjects.forEach(gameObject => {
                gameObject.callUpdate();
                this.draw(gameObject);
                if (gameObject instanceof Alien) {
                    if (gameObject.overlap(gameObject, this.player)) {
                        console.log("player lose");
                        clearInterval(gameInterval);
                        return;
                    }
                    if (gameObject.overlap(this.laser, gameObject)) {
                        this.destroy(gameObject);
                    }
                }
                if (gameObject instanceof Laser) {
                    if (gameObject.overlap(gameObject, this.alien)) {
                        this.destroy(gameObject);
                    }
                }
            })
        }, 10);
    }
}