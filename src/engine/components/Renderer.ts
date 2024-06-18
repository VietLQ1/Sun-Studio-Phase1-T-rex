import { Scene } from "../scene/Scene";

export class Renderer {
    canvas: HTMLCanvasElement;
    BG : HTMLImageElement;
    BGX : number = 0;
    constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;
        this.BG = new Image();
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    public resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
    }
    public render(gameScene : Scene)
    {
        gameScene.render();
    }
    public setBG(path : string) {
        this.BG.src = path;
    }
    public clear() {
        this.canvas.getContext('2d')?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.getContext('2d')?.drawImage(this.BG, this.BGX, 0, this.canvas.width, this.canvas.height);
        this.canvas.getContext('2d')?.drawImage(this.BG, this.BGX + this.canvas.width, 0, this.canvas.width, this.canvas.height);
        this.BGX--;
        if (this.BGX < -this.canvas.width) {
            this.BGX = 0;
        }
    }
}