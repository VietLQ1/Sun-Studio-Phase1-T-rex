import { doc } from "prettier";
import { Input } from "../../engine/input/Input";
import { AudioManager } from "../../engine/manager/AudioManager";
import { GameManager } from "../manager/GameManager";
import { Scene } from "../../engine/scene/Scene";
import { SceneManager } from "../../engine/scene/SceneManager";

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
        // console.log('Menu Scene');
        if(input.isKeyPressed('Enter') || (input.getTouchStart() || GameManager.getInstance().isMobile) && document.hasFocus())
        {
            input.clearTouch();
            SceneManager.getInstance().loadScene(1);
        }
        else if(input.getTouchEnd() && document.hasFocus())
        {
            GameManager.getInstance().isMobile = true;
            input.clearTouch();
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