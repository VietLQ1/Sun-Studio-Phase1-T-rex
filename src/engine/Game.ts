
import { Input } from './input/Input';
import { Renderer } from './components/Renderer';
import { AudioManager } from './manager/AudioManager';
import { SceneManager } from './scene/SceneManager';
import { CollisionManager } from './manager/CollisionManager';
export class Game {
    renderer : Renderer;
    input: Input;
    lastFrameTime: number;
    constructor(canvas: HTMLCanvasElement) {
        console.log('Game created')
        this.renderer = new Renderer(canvas);
        this.input = new Input();
        this.lastFrameTime = 0;
        // this._audioManager.addAudioClip('bgm', 'assets/audios/BGM.wav');
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
}