import { Input } from "../input/Input";
import { Scene } from "./Scene";

export class MenuScene extends Scene
{
    onSceneLoad(): void {
        this._gameObjects = [];
        this._renderer.clear();
        
    }
    onSceneUnload(): void {
        
    }
    update(deltaTime: number, input: Input): void {
        
    }
    render(): void {
        
    }
}