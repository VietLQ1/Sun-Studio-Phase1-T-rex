import { GameObject } from "../game-object/GameObject";
import { Input } from "../input/Input";
import { Renderer } from "../components/Renderer";
import { UIObject } from "../user-interface/UIObject";

export abstract class Scene {
    protected _canvas: HTMLCanvasElement;
    protected _gameObjects: GameObject[];
    protected _uiObjects: UIObject[];
    protected _renderer: Renderer;
    protected _delay : number;
    constructor(renderer: Renderer, canvas : HTMLCanvasElement) {
        this._renderer = renderer;
        this._gameObjects = [];
        this._uiObjects = [];
        this._canvas = canvas;
    }
    abstract onSceneLoad(): void;
    abstract onSceneUnload(): void;
    public update(deltaTime: number , input : Input): void
    {
        for (let i = 0; i < this._gameObjects.length; i++) {
            this._gameObjects[i].update(deltaTime, input);
        }
        for (let i = 0; i < this._uiObjects.length; i++) {
            this._uiObjects[i].update(deltaTime, input);
        }
    
    }
    public render(): void
    {
        this._renderer.clear();
        for (let i = 0; i < this._gameObjects.length; i++) {
            this._gameObjects[i].render();
        }
        for (let i = 0; i < this._uiObjects.length; i++) {
            this._uiObjects[i].render();
        }
    
    }
    public addGameObject(gameObject: GameObject): void
    {
        this._gameObjects.push(gameObject);
    }
    public addUIObject(uiObject: UIObject): void
    {
        this._uiObjects.push(uiObject);
    }
    public get gameObjects(): GameObject[] {
        return this._gameObjects;
    }
    public get uiObjects(): GameObject[] {
        return this._uiObjects;
    }
}