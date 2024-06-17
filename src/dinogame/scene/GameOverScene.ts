import { GameObject } from "../../engine/GameObject";
import { Input } from "../../engine/input/Input";
import { GameManager } from "../manager/GameManager";
import { ScoreManager } from "../../engine/manager/ScoreManager";
import { Scene } from "../../engine/scene/Scene";
import { SceneManager } from "../../engine/scene/SceneManager";

export class GameOverScene extends Scene {
    public onSceneLoad(): void {
        this._delay = 0;
        this.addGameObject(SceneManager.getInstance().currentScene.gameObjects[0]);
    }
    public onSceneUnload(): void {
        this._gameObjects = [];
    }
    public update(deltaTime: number , input: Input): void {
        //super.update(deltaTime, input);
        this._delay += deltaTime*10;
        if(this._delay > 10 && (input.isKeyPressed('Enter') || input.getTouchEnd()))
        {
            this._delay = 0;
            SceneManager.getInstance().loadScene(1);
        }
        else if(this._delay > 10 && input.isKeyPressed('Escape'))
        {
            this._delay = 0;
            SceneManager.getInstance().loadScene(0);
        }
        else
        {
            input.clearTouch();
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
        localStorage.setItem('highScore', ScoreManager.getInstance().highScore.toString());
        ctx.font = 'bold 50px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Your Score: ' + Math.floor(ScoreManager.getInstance().score), window.innerWidth/2, 50);
        ctx.fillText('High Score: ' + Math.floor(ScoreManager.getInstance().highScore), window.innerWidth/2, 100);
        ctx.fillText(GameManager.getInstance().gameOverText, window.innerWidth/2, window.innerHeight/2);
    }
}