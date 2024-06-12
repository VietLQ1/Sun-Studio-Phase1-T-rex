import { SpriteRenderer } from './components/spriteRenderer';
import { Input } from './input';
import { GameObject } from './gameObject';
import { Renderer } from './renderer';
import { Player } from './player';
import { Cactus } from './cactus';
import { Bird } from './bird';

enum GameState {'READY', 'PLAYING', 'GAMEOVER'};

const canvas = document.createElement('canvas') as HTMLCanvasElement;
document.body.appendChild(canvas);
const spriteRenderer = new SpriteRenderer('assets/images/phaser-logo.png');
export class Game {
    private _playerScore : number;
    private _gameState : GameState;
    private _highScore : number;
    renderer = new Renderer(canvas);
    input: Input;
    gameObjects: GameObject[];
    lastFrameTime: number;
    constructor() {
        this._gameState = GameState.READY;
        console.log('Game created')
        this.renderer = new Renderer(canvas);
        this.input = new Input();
        this.gameObjects = [];
        this.lastFrameTime = 0;
        this._playerScore = 0;
        this._highScore = 0;
    }
    start(currentTime: number) {
        this.renderer.clear();
        var ctx = canvas.getContext('2d');
        if(!ctx)
        {
            console.log('Failed to get 2d context');
            return;
        }
        ctx.font = 'bold 50px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.fillText('PRESS ENTER TO START!', window.innerWidth/2, window.innerHeight/2);
        if(this.input.isKeyPressed('Enter') && this._gameState === GameState.READY)
        {
            this._gameState = GameState.PLAYING;
            let player = new Player();
            game.addGameObject(player);
            let cactus = new Cactus();
            game.addGameObject(cactus);
            let bird = new Bird();
            game.addGameObject(bird);
            requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
        }
        else if (this._gameState === GameState.READY)
        {
            this.lastFrameTime = currentTime;
            requestAnimationFrame((timestamp) => this.start(timestamp));
        }
        }
    addGameObject(gameObject: GameObject) {
        this.gameObjects.push(gameObject);
    }
    gameLoop(currentTime: number) {
        const deltaTime = (currentTime - this.lastFrameTime) / 1000;
        this.lastFrameTime = currentTime;

        this.update(deltaTime);
        this.checkCollisions();
        this.render();
        //spriteRenderer.render(0, 200, 100, 100);
        if(this._gameState === GameState.PLAYING)
            requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
        else if(this._gameState === GameState.GAMEOVER)
            console.log('Game Over');
    }
    update(deltaTime: number) {
        this.gameObjects.forEach(obj => obj.update(deltaTime, this.input));
        if (this._gameState === GameState.PLAYING)
        {
            this._playerScore +=  deltaTime/2;   
            if(this._playerScore > this._highScore)
            {
                this._highScore = this._playerScore;
            }
        }
        console.log('Score: ' + this._playerScore);
    }

    render() {
        this.renderer.clear();
        //spriteRenderer.render(canvas.width-100, canvas.height-100, 100, 100);
        this.gameObjects.forEach(obj => obj.render());
        canvas.getContext('2d')?.fillText('Score: ' + Math.floor(this._playerScore), window.innerWidth/2, 50);
    }
    checkCollisions() {
        //console.log('Checking collisions');
        for (let i = 0; i < this.gameObjects.length; i++) {
            for (let j = i + 1; j < this.gameObjects.length; j++) {
                const obj1 = this.gameObjects[i];
                const obj2 = this.gameObjects[j];

                // Check if obj1 and obj2 are colliding
                if (obj1.collider.isCollidingWith(obj2.collider)) {
                    // Handle the collision
                    this.handleCollision(obj1, obj2);
                }
            }
        }
    }
    handleCollision(obj1: GameObject, obj2: GameObject) {
        console.log('Collision detected!');
        obj1.onCollisionEnter(obj2);
        obj2.onCollisionEnter(obj1);
        if(obj1.tag === 'player' || obj2.tag === 'player')
        {
            console.log('Player collided with obstacle');
            this.renderer.clear();
            this.gameOver(this.lastFrameTime);
        }
    }
    gameOver(currentTime: number) {
        this._gameState = GameState.GAMEOVER;
        this.renderer.clear();
        this.gameObjects[0].render();
        var ctx = canvas.getContext('2d');
        if(!ctx)
        {
            console.log('Failed to get 2d context');
            return;
        }
        ctx.fillText('Your Score: ' + Math.floor(this._playerScore), window.innerWidth/2, 50);
        ctx.fillText('High Score: ' + Math.floor(this._highScore), window.innerWidth/2, 100);
        ctx.fillText('PRESS ENTER TO PLAY AGAIN!', window.innerWidth/2, window.innerHeight/2);
        if(this.input.isKeyPressed('Enter') && this._gameState === GameState.GAMEOVER)
        {
            this.gameObjects = [];
            let player = new Player();
            game.addGameObject(player);
            let cactus = new Cactus();
            game.addGameObject(cactus);
            let bird = new Bird();
            game.addGameObject(bird);
            this._playerScore = 0;
            this._gameState = GameState.PLAYING;
            requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
        }
        else
        {
            this.lastFrameTime = currentTime;
            requestAnimationFrame((timestamp) => this.gameOver(timestamp));
        }
    }
}

let game = new Game()
game.start(0);


