import { Input } from "../input/Input";
import { GameManager } from "../manager/GameManager";
import { Scene } from "./Scene";
import { SceneManager } from "./SceneManager";

export class MenuScene extends Scene
{
    onSceneLoad(): void {
        this._gameObjects = [];
        this._renderer.clear();
    }
    onSceneUnload(): void {
        
    }
    update(deltaTime: number, input: Input): void {
        super.update(deltaTime, input);
        console.log('Menu Scene');
        if(input.isKeyPressed('Enter') || input.getTouchEnd())
        {
            input.clearTouch();
            SceneManager.getInstance().loadScene(1);
        }
    }
    render(): void {
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
        ctx.fillText(GameManager.getInstance().menuText, window.innerWidth/2, window.innerHeight/2);
    }
}