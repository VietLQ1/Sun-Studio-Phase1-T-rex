import { GameObject } from "../game-object/GameObject";
import { Input } from "../input/Input";
import { Renderer } from "../Renderer";

export abstract class Scene {
    protected _gameObjects: GameObject[];
    protected _renderer: Renderer;
    constructor(renderer: Renderer) {
        this._renderer = renderer;
        this._gameObjects = [];;
    }
    abstract onSceneLoad(): void;
    abstract onSceneUnload(): void;
    abstract update(deltaTime: number , input : Input): void;
    abstract render(): void;
    public addGameObject(gameObject: GameObject): void
    {
        this._gameObjects.push(gameObject);
    }
    public get gameObjects(): GameObject[] {
        return this._gameObjects;
    }
}