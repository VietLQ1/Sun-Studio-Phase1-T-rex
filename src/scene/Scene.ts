import { GameObject } from "../game-object/GameObject";

export abstract class Scene {
    protected _gameObjects: GameObject[] = [];
    abstract update(deltaTime: number): void;
    abstract render(): void;
    abstract addGameObject(gameObject: GameObject): void;
    public get gameObjects(): GameObject[] {
        return this._gameObjects;
    }
}