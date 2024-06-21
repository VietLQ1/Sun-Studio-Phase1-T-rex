import { Bird } from "../game-object/obstacle-object/Bird";
import { Cactus } from "../game-object/obstacle-object/Cactus";
import { Player } from "../game-object/Player";
import { Input } from "../../engine/input/Input";
import { ScoreManager } from "../../engine/manager/ScoreManager";
import { Scene } from "../../engine/scene/Scene";
import { SceneManager } from "../../engine/scene/SceneManager";
import { GroundBird } from "../game-object/obstacle-object/GroundBird";
import { BGDragon } from "../game-object/background-object/BGDragon";
import { HighBird } from "../game-object/obstacle-object/HighBird";
import { BigCactus } from "../game-object/obstacle-object/BigCactus";
import { Text } from "../../engine/user-interface/Text";
import { AudioManager } from "../../engine/manager/AudioManager";
import { GameManager } from "../manager/GameManager";
import { GameObjectPool } from "../../engine/object-pool/ObjectPool";
import { Renderer } from "../../engine/components/Renderer";
import { CollisionManager } from "../../engine/manager/CollisionManager";

export class PlayScene extends Scene
{
    protected _delay: number;
    protected _cactusPool: GameObjectPool<Cactus>;
    protected _birdPool: GameObjectPool<Bird>;
    protected _bigCactusPool: GameObjectPool<BigCactus>;
    protected _highBirdPool: GameObjectPool<HighBird>;
    protected _groundBirdPool: GameObjectPool<GroundBird>;
    public constructor(renderer: Renderer, canvas : HTMLCanvasElement){
        super(renderer, canvas);
        this._cactusPool = new GameObjectPool(() => new Cactus());
        this._birdPool = new GameObjectPool(() => new Bird());
        this._bigCactusPool = new GameObjectPool(() => new BigCactus());
        this._highBirdPool = new GameObjectPool(() => new HighBird());
        this._groundBirdPool = new GameObjectPool(() => new GroundBird());
    }
    public onSceneLoad(): void {
        this._renderer.startBGLoop();
        GameManager.getInstance().isGameOver = false;
        this._delay = 0;
        ScoreManager.getInstance().resetScore();
        this.addGameObject(new Player())
        this.addGameObject(new BGDragon())
        let obstacle = this._cactusPool.get();
        this.addGameObject(obstacle);
        this.addUIObject(new Text( window.innerWidth/2, 50, 'Score: ' + Math.floor(ScoreManager.getInstance().score), 'center','middle',true, 50, 'Arial', 'black'));
        AudioManager.getInstance().addAudioClip('up', 'assets/audios/up.wav');
        this._renderer.clear();
        
    }
    public onSceneUnload(): void {
        this._renderer.stopBGLoop();
        GameManager.getInstance().isGameOver = true;
        this._gameObjects = [];
        this._uiObjects = [];
    }
    public update(deltaTime: number, input: Input): void {
        super.update(deltaTime, input);
        if (this.gameObjects.length == 2 || (this._gameObjects[2].position[0] <= window.innerWidth/3 && this.gameObjects.length < 4)) {
            let random = Math.random();
            let obstacle = null;
            if (random < 0.3) {
                obstacle = this._cactusPool.get();
            }
            else if (random < 0.55) {
                obstacle = this._bigCactusPool.get();
            }
            else if (random < 0.7) {
                obstacle = this._highBirdPool.get();
            }
            else if (random < 0.85) {
                obstacle = this._groundBirdPool.get();
            }
            else {
                obstacle = this._birdPool.get();
            }
            this.addGameObject(obstacle);
        }

        for (let i = 2; i < this._gameObjects.length; i++) {
            if (this._gameObjects[i].position[0] < -this._gameObjects[i].collider.width) {
                if(this._gameObjects[i] instanceof Cactus)
                {
                    this._cactusPool.release(this._gameObjects[i] as Cactus);
                }
                else if(this._gameObjects[i] instanceof Bird)
                {
                    this._birdPool.release(this._gameObjects[i] as Bird);
                }
                else if(this._gameObjects[i] instanceof BigCactus)
                {
                    this._bigCactusPool.release(this._gameObjects[i] as BigCactus);
                }
                else if(this._gameObjects[i] instanceof HighBird)
                {
                    this._highBirdPool.release(this._gameObjects[i] as HighBird);
                }
                else if(this._gameObjects[i] instanceof GroundBird)
                {
                    this._groundBirdPool.release(this._gameObjects[i] as GroundBird);
                }
                this._gameObjects.splice(i, 1);
            }
        }
        if(!document.hasFocus())
        {
            SceneManager.getInstance().loadScene(0);
        }
        else
        {
            ScoreManager.getInstance().increaseScore(deltaTime);   
            this._uiObjects[0].text = 'Score: ' + Math.floor(ScoreManager.getInstance().score);
            if(Math.floor(ScoreManager.getInstance().score) % 100 == 0 && Math.floor(ScoreManager.getInstance().score) != 0)
            {
                AudioManager.getInstance().getAudioClip('up')?.play();
                this._uiObjects[0].startBlink(200);
            }
            else if (Math.floor(ScoreManager.getInstance().score) % 100 == 15 && Math.floor(ScoreManager.getInstance().score) > 100)
            {
                this._uiObjects[0].stopBlink();
            }
        }
        CollisionManager.getInstance().checkCollisions(this);
    }
    public render(): void {
        super.render();
        var ctx = this._canvas.getContext('2d');
        if(!ctx)
        {
            console.log('Failed to get 2d context');
            return;
        }
    }
}