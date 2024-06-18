import { Bird } from "../game-object/Bird";
import { Cactus } from "../game-object/Cactus";
import { Player } from "../game-object/Player";
import { Input } from "../../engine/input/Input";
import { ScoreManager } from "../../engine/manager/ScoreManager";
import { Scene } from "../../engine/scene/Scene";
import { SceneManager } from "../../engine/scene/SceneManager";
import { GroundBird } from "../game-object/GroundBird";

export class PlayScene extends Scene
{
    onSceneLoad(): void {
        ScoreManager.getInstance().resetScore();
        this.addGameObject(new Player())
        this.addGameObject(new Cactus())
        this._renderer.clear();
    }
    onSceneUnload(): void {
        this._gameObjects = [];
    }
    update(deltaTime: number, input: Input): void {
        super.update(deltaTime, input);
        if (this.gameObjects.length == 1 || (this._gameObjects[1].position[0] <= window.innerWidth/3 && this.gameObjects.length < 3)) {
            let random = Math.random();
            if (random < 0.4) {
                this.addGameObject(new Cactus());
            }
            else if (random < 0.7) {
                this.addGameObject(new GroundBird());
            }
            else {
                this.addGameObject(new Bird());
            }
        }
        for (let i = 1; i < this._gameObjects.length; i++) {
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
        ctx.fillText('Score: ' + Math.floor(ScoreManager.getInstance().score), window.innerWidth/2, 50);
    }
}