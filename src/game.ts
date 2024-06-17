import { SpriteRenderer } from './components/SpriteRenderer';
import { Input } from './input/Input';
import { GameObject } from './game-object/GameObject';
import { Renderer } from './components/Renderer';
import { Cactus } from './game-object/Cactus';
import { Bird } from './game-object/Bird';
import { Player } from './game-object/Player';
import { AudioManager } from './manager/AudioManager';
import { ScoreManager } from './manager/ScoreManager';
import { GameManager } from './manager/GameManager';
import { Scene } from './scene/Scene';
import { SceneManager } from './scene/SceneManager';
import { MenuScene } from './scene/MenuScene';
import { PlayScene } from './scene/PlayScene';
import { GameOverScene } from './scene/GameOverScene';
import { CollisionManager } from './manager/CollisionManager';


enum GameState {'READY', 'PLAYING', 'GAMEOVER'};
enum Platform {'PC', 'Mobile'};
const canvas = document.createElement('canvas') as HTMLCanvasElement;

document.body.appendChild(canvas);
const spriteRenderer = new SpriteRenderer('assets/images/phaser-logo.png');
export class Game {
    private _platform : Platform;
    private _gameState : GameState;
    private _delay : number;
    private _touched : boolean;
    renderer = new Renderer(canvas);
    input: Input;
    lastFrameTime: number;
    private _audioManager = AudioManager.getInstance();
    constructor() {
        this._touched = false;
        this._platform = Platform.PC;
        console.log('Game created')
        this.renderer = new Renderer(canvas);
        this.input = new Input();
        this.lastFrameTime = 0;
        this._audioManager.addAudioClip('bgm', 'assets/audios/BGM.wav');
    }
    public start(currentTime: number) {
        SceneManager.getInstance().addScene(new MenuScene(this.renderer, canvas));
        SceneManager.getInstance().addScene(new PlayScene(this.renderer, canvas));
        SceneManager.getInstance().addScene(new GameOverScene(this.renderer, canvas));
        SceneManager.getInstance().loadScene(0);
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
        }
    private gameLoop(currentTime: number) {
        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;
        let currentScene = SceneManager.getInstance().currentScene;
        currentScene.update(deltaTime, this.input);
        CollisionManager.getInstance().checkCollisions(currentScene);
        currentScene.render();
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
}


let game = new Game()
game.start(0);




