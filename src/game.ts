import { SpriteRenderer } from './components/SpriteRenderer';
import { Input } from './input/Input';
import { GameObject } from './game-object/GameObject';
import { Renderer } from './Renderer';
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
    private _gameObjects: GameObject[];
    lastFrameTime: number;
    private _audioManager = AudioManager.getInstance();
    constructor() {
        this._touched = false;
        this._platform = Platform.PC;
        this._delay = 0;
        this._gameState = GameState.READY;
        console.log('Game created')
        this.renderer = new Renderer(canvas);
        this.input = new Input();
        this._gameObjects = [];
        this.lastFrameTime = 0;
        this._audioManager.addAudioClip('bgm', 'assets/audios/BGM.wav');
    }
    public start(currentTime: number) {
        // this.renderer.clear();
        // var ctx = canvas.getContext('2d');
        // if(!ctx)
        // {
        //     console.log('Failed to get 2d context');
        //     return;
        // }
        // ctx.font = 'bold 50px Arial';
        // ctx.textAlign = 'center';
        // ctx.textBaseline = 'middle';
        // ctx.fillStyle = 'black';
        // ctx.fillText('PRESS ENTER TO START!', window.innerWidth/2, window.innerHeight/2);
        // if((this.input.isKeyPressed('Enter') || (this.input.getTouchEnd() && this._touched && this._platform == Platform.Mobile))&& this._gameState === GameState.READY)
        // {
        //     ScoreManager.getInstance().resetScore();
        //     this._audioManager.playAudioClip('bgm', true);
        //     this._gameState = GameState.PLAYING;
        //     let player = new Player();
        //     this.addGameObject(player);
        //     this.addGameObject(new Cactus());
        //     if(this._platform === Platform.Mobile)
        //     {
        //         this.input.clearTouch();
        //         this._touched = false;
        //     }
        //     requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
        // }
        // else if (this.input.getTouchEnd() && !this._touched)
        // {
        //     this._platform = Platform.Mobile;
        //     this.input.clearTouch();
        //     this._touched = true;
        //     requestAnimationFrame((timestamp) => this.start(timestamp));
        // }
        // else if (this._gameState === GameState.READY)
        // {
        //     this.lastFrameTime = currentTime;
        //     requestAnimationFrame((timestamp) => this.start(timestamp));
        // }
        SceneManager.getInstance().addScene(new MenuScene(this.renderer, canvas));
        SceneManager.getInstance().addScene(new PlayScene(this.renderer, canvas));
        SceneManager.getInstance().addScene(new GameOverScene(this.renderer, canvas));
        SceneManager.getInstance().loadScene(0);
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
        }
    public addGameObject(gameObject: GameObject) {
        this._gameObjects.push(gameObject);
    }
    private gameLoop(currentTime: number) {
        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;
        SceneManager.getInstance().currentScene.update(deltaTime, this.input);
        // this.update(deltaTime);
        this.checkCollisions();
        SceneManager.getInstance().currentScene.render();
        // this.render();
        // if(this._gameState === GameState.PLAYING)
        //     requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
        // else if(this._gameState === GameState.GAMEOVER)
        //     console.log('Game Over');
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
    // private update(deltaTime: number) {
    //     this._gameObjects.forEach(obj => obj.update(deltaTime, this.input));
    //     if (this._gameState === GameState.PLAYING)
    //     {
    //         if (this._gameObjects[1].position[0] === this._gameObjects[0].position[0]) {
                
    //         }
    //         for (let i = 1; i < this._gameObjects.length; i++) {
    //             if (this._gameObjects[i].position[0] < -this._gameObjects[i].collider.width) {
    //                 let random = Math.random();
    //                 if (random < 0.75) {
    //                     this.addGameObject(new Cactus());
    //                 }
    //                 else {
    //                     this.addGameObject(new Bird());
    //                 }
    //                 this._gameObjects.splice(i, 1);
    //             }
    //         }
    //         ScoreManager.getInstance().increaseScore(deltaTime);   
    //     }
    // }

    // private render() {
    //     this.renderer.clear();
    //     this._gameObjects.forEach(obj => obj.render());
    //     var ctx = canvas.getContext('2d');
    //     if(!ctx)
    //     {
    //         console.log('Failed to get 2d context');
    //         return;
    //     }
    //     ctx.font = 'bold 50px Arial';
    //     ctx.textAlign = 'center';
    //     ctx.textBaseline = 'middle';
    //     ctx.fillText('Score: ' + Math.floor(ScoreManager.getInstance().score), window.innerWidth/2, 50);
    // }
    private checkCollisions() {
        //console.log('Checking collisions');
        let currentScene = SceneManager.getInstance().currentScene;
        for (let i = 0; i < currentScene.gameObjects.length; i++) {
            for (let j = i + 1; j < currentScene.gameObjects.length; j++) {
                const obj1 = currentScene.gameObjects[i];
                const obj2 = currentScene.gameObjects[j];

                // Check if obj1 and obj2 are colliding
                if (obj1.collider.isCollidingWith(obj2.collider)) {
                    // Handle the collision
                    this.handleCollision(obj1, obj2);
                }
            }
        }
    }
    private handleCollision(obj1: GameObject, obj2: GameObject) {
        console.log('Collision detected!');
        obj1.onCollisionEnter(obj2);
        obj2.onCollisionEnter(obj1);
        if(obj1.tag === 'player' || obj2.tag === 'player')
        {
            console.log('Player collided with obstacle');
            this.renderer.clear();
            this._delay = 0;
            SceneManager.getInstance().loadScene(2);
        }
    }
}


let game = new Game()
game.start(0);




