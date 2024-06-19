import { Input } from "../../engine/input/Input";
import { GameManager } from "../manager/GameManager";
import { Scene } from "../../engine/scene/Scene";
import { SceneManager } from "../../engine/scene/SceneManager";
import { StartButton } from "../user-interface/StartButton";
import { ScoreManager } from "../../engine/manager/ScoreManager";

export class MenuScene extends Scene
{
    public onSceneLoad(): void {
        this._gameObjects = [];
        this._renderer.clear();
        this.addGameObject(new StartButton());
    }
    public onSceneUnload(): void {
        
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
        var ctx = this._canvas.getContext('2d');
        if(!ctx)
        {
            console.log('Failed to get 2d context');
            return;
        }
        ctx.font = 'bold 50px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.fillText('Record: ' + Math.floor(ScoreManager.getInstance().highScore), window.innerWidth/2, window.innerHeight/2 - 100);
        // ctx.fillText(GameManager.getInstance().menuText, window.innerWidth/2, window.innerHeight/2);
    }
}