import { GameObject } from "../game-object/GameObject";
import { Input } from "../input/Input";
import { Renderer } from "../Renderer";

export abstract class Scene {
    protected _canvas: HTMLCanvasElement;
    protected _gameObjects: GameObject[];
    protected _renderer: Renderer;
    protected _delay : number;
    constructor(renderer: Renderer, canvas : HTMLCanvasElement) {
        this._renderer = renderer;
        this._gameObjects = [];
        this._canvas = canvas;
    }
    abstract onSceneLoad(): void;
    abstract onSceneUnload(): void;
    public update(deltaTime: number , input : Input): void
    {
        for (let i = 0; i < this._gameObjects.length; i++) {
            this._gameObjects[i].update(deltaTime, input);
        }
    
    }
    public render(): void
    {
        this._renderer.clear();
        for (let i = 0; i < this._gameObjects.length; i++) {
            this._gameObjects[i].render();
        }
    
    }
    public addGameObject(gameObject: GameObject): void
    {
        this._gameObjects.push(gameObject);
    }
    public get gameObjects(): GameObject[] {
        return this._gameObjects;
    }
}