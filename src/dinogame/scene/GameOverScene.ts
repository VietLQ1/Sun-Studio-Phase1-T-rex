import { Input } from "../../engine/input/Input";
import { GameManager } from "../manager/GameManager";
import { ScoreManager } from "../../engine/manager/ScoreManager";
import { Scene } from "../../engine/scene/Scene";
import { SceneManager } from "../../engine/scene/SceneManager";
import { RestartButton } from "../user-interface/RestartButton";
import { Text } from "../../engine/user-interface/Text";
import { UIObject } from "../../engine/user-interface/UIObject";

export class GameOverScene extends Scene {
    public onSceneLoad(): void {
        this._delay = 0;
        this.addGameObject(SceneManager.getInstance().currentScene.gameObjects[0]);
        this.addUIObject(new Text( window.innerWidth/2, 50, 'Your Score: ' + Math.floor(ScoreManager.getInstance().score),
        'center','middle',true, 50, 'Arial', 'black'));
        this.addUIObject(new Text( window.innerWidth/2, 100, 'High Score: ' + Math.floor(ScoreManager.getInstance().highScore),
        'center','middle',true, 50, 'Arial', 'black'));
    }
    public onSceneUnload(): void {
        this._gameObjects = [];
        this._uiObjects = [];
        this._delay = 0;
    }
    public update(deltaTime: number , input: Input): void {
        super.update(deltaTime, input);
        this._delay += deltaTime*10;
        // console.log(this._delay, this.gameObjects.length)
        if(this._delay > 10 && this.uiObjects.find((element) => element instanceof RestartButton) == undefined)
        {
            this.addUIObject(new RestartButton());
        }
        if(this._delay > 10 && input.isKeyPressed('Escape'))
        {
            // console.log('Escape Pressed');
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
    }
}