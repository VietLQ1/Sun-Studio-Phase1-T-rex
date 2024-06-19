
import { Input } from './input/Input';
import { Renderer } from './components/Renderer';
import { SceneManager } from './scene/SceneManager';
import { CollisionManager } from './manager/CollisionManager';
import { AssetLoader } from './AssetLoader';
import { GameManager } from '../dinogame/manager/GameManager';
export class Game {
    renderer : Renderer;
    input: Input;
    lastFrameTime: number;
    protected _iPath: string[];
    protected _aPath: string[];
    constructor(canvas: HTMLCanvasElement) {
        console.log('Game created')
        this.renderer = new Renderer(canvas);
        this.input = new Input();
        this.lastFrameTime = 0;
        // this.loadAssets().then(() => {
        //     this.start(0);
        // }).catch(error => {
        //     console.error("Failed to load assets:", error);
        // });
    }
    protected async loadAssets() {
        // Load assets here
        if (!this._iPath || !this._aPath) {
            throw new Error("Paths not set");
        }
        const images = await AssetLoader.loadImages(this._iPath);
        if(!GameManager.getInstance().isMobile)    
        {
            const audios = await AssetLoader.loadAudios(this._aPath);
        }
    }
    public start(currentTime: number) {
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
    private gameLoop(currentTime: number) {
        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;
        let currentScene = SceneManager.getInstance().currentScene;
        currentScene.update(deltaTime, this.input);
        CollisionManager.getInstance().checkCollisions(currentScene);
        this.renderer.render(currentScene);
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
    public get iPath() {
        return this._iPath;
    }
    public get aPath() {
        return this._aPath;
    }
}