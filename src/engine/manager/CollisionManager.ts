import { GameObject } from "../GameObject";
import { Scene } from "../scene/Scene";
import { SceneManager } from "../scene/SceneManager";

export class CollisionManager {
    private static _instance: CollisionManager;
    private constructor() {}
    public static getInstance() {
        if (!this._instance) {
            this._instance = new CollisionManager();
        }
        return this._instance;
    }
    public checkCollisions(currentScene : Scene): void {
        let gameObjects = currentScene.gameObjects;
        for(let i = 0; i < gameObjects.length; i++) {
            for(let j = i + 1; j < gameObjects.length; j++) {
                const obj1 = gameObjects[i];
                const obj2 = gameObjects[j];
                if(obj1.collider.isCollidingWith(obj2.collider)) {
                    this.handleCollision(obj1, obj2);
                }
            }
        }
    }
    private handleCollision(obj1: GameObject, obj2: GameObject): void {
        obj1.onCollisionEnter(obj2);
        obj2.onCollisionEnter(obj1);
    }
}