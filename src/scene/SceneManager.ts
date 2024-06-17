import { Scene } from "./Scene";

export class SceneManager{
    private static _instance: SceneManager;
    private _scenes: Scene[];
    private _currentScene: Scene;
    private constructor() {
        this._scenes = [];
    }
    public addScene(scene: Scene): void {
        this._scenes.push(scene);
    }
    public loadScene(index: number): void {
        this._currentScene?.onSceneUnload();
        this._currentScene = this._scenes[index];
        this._currentScene.onSceneLoad();
    }
    public get currentScene(): Scene {
        return this._currentScene;
    }
    public static getInstance() {
        if (!this._instance) {
            this._instance = new SceneManager();
        }
        return this._instance;
    }
}