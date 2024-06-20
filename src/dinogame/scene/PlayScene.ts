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

export class PlayScene extends Scene
{
    protected _delay: number;
    public onSceneLoad(): void {
        GameManager.getInstance().isGameOver = false;
        this._delay = 0;
        ScoreManager.getInstance().resetScore();
        this.addGameObject(new Player())
        this.addGameObject(new BGDragon())
        this.addGameObject(new Cactus())
        this.addUIObject(new Text( window.innerWidth/2, 50, 'Score: ' + Math.floor(ScoreManager.getInstance().score), 'center','middle',true, 50, 'Arial', 'black'));
        AudioManager.getInstance().addAudioClip('up', 'assets/audios/up.wav');
        this._renderer.clear();
        
    }
    public onSceneUnload(): void {
        GameManager.getInstance().isGameOver = true;
        this._gameObjects = [];
        this._uiObjects = [];
    }
    public update(deltaTime: number, input: Input): void {
        super.update(deltaTime, input);
        if (this.gameObjects.length == 2 || (this._gameObjects[2].position[0] <= window.innerWidth/3 && this.gameObjects.length < 4)) {
            let random = Math.random();
            if (random < 0.3) {
                this.addGameObject(new Cactus());
            }
            else if (random < 0.55) {
                this.addGameObject(new BigCactus());
            }
            else if (random < 0.7) {
                this.addGameObject(new HighBird());
            }
            else if (random < 0.85) {
                this.addGameObject(new GroundBird());
            }
            else {
                this.addGameObject(new Bird());
            }
        }
        for (let i = 2; i < this._gameObjects.length; i++) {
            if (this._gameObjects[i].position[0] < -this._gameObjects[i].collider.width) {
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