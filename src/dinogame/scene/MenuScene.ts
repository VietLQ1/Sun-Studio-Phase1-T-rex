import { Input } from "../../engine/input/Input";
import { GameManager } from "../manager/GameManager";
import { Scene } from "../../engine/scene/Scene";
import { StartButton } from "../user-interface/StartButton";
import { Text } from "../../engine/user-interface/Text";
import { ScoreManager } from "../../engine/manager/ScoreManager";
import { SettingButton } from "../user-interface/SettingButton";

export class MenuScene extends Scene
{
    public onSceneLoad(): void {
        this._gameObjects = [];
        this._renderer.clear();
        this.addUIObject(new StartButton());
        this.addUIObject(new Text(window.innerWidth/2, window.innerHeight/2 - 100, 'Record: ' + Math.floor(ScoreManager.getInstance().highScore), 
        'center', 'middle', true, 50, 'Arial', 'black'));
        this.addUIObject(new SettingButton());
    }
    public onSceneUnload(): void {
        this._gameObjects = [];
        this._uiObjects = [];
    }
    public update(deltaTime: number, input: Input): void {
        super.update(deltaTime, input);
        // console.log('Menu Scene');
        if(input.getTouchStart() && GameManager.getInstance().isMobile && document.hasFocus())
        {
            // input.clearTouch();
            // SceneManager.getInstance().loadScene(1);
        }
        else if(input.getTouchEnd() && document.hasFocus())
        {
            GameManager.getInstance().isMobile = true;
            input.clearTouch();
        }
    }
    public render(): void {
        super.render();
    }
}