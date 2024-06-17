import { GameObject } from "../game-object/GameObject";
import { Input } from "../input/Input";

export abstract class Scene {
    protected _gameObjects: GameObject[];
    constructor() {
        this._gameObjects = [];
    }
    abstract update(deltaTime: number , input : Input): void;
    abstract render(): void;
    abstract addGameObject(gameObject: GameObject): void;
    public get gameObjects(): GameObject[] {
        return this._gameObjects;
    }
}