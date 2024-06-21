import { AssetLoader } from "../AssetLoader";
import { Scene } from "../scene/Scene";

export class Renderer {
    canvas: HTMLCanvasElement;
    BG : HTMLImageElement;
    BGX : number = 0;
    private _renderingScene : Scene;
    private _isBGLoop : boolean = false;
    constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;
        this.BG = new Image();
        this.resizeCanvas();
        //window.addEventListener('resize', () => this.resizeCanvas());
    }

    public resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
    }
    public render(gameScene : Scene)
    {
        if (gameScene == null) {
            return;
        }
        else if (this._renderingScene != gameScene) {
            this.resizeCanvas();
            this._renderingScene = gameScene;
        }
        gameScene.render();
    }
    public setBG(path : string) {
        if (AssetLoader.assetMap.has(path) && AssetLoader.assetMap.get(path) instanceof HTMLImageElement) {
            this.BG = AssetLoader.assetMap.get(path) as HTMLImageElement;
            console.log('BG set from asset map');
            return;
        }
        this.BG.src = path;
    }
    public clear() {
        this.canvas.getContext('2d')?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.getContext('2d')?.drawImage(this.BG, this.BGX, 0, this.canvas.width, this.canvas.height);
        this.canvas.getContext('2d')?.drawImage(this.BG, this.BGX + this.canvas.width, 0, this.canvas.width, this.canvas.height);
        if (this._isBGLoop) {
            this.BGX--;
            if (this.BGX < -this.canvas.width) {
                this.BGX = 0;
            }
        }
    }
    public startBGLoop() {
        this._isBGLoop = true;
    }
    public stopBGLoop() {
        this._isBGLoop = false;
    }
}