import { AnimatedObject } from "../../../engine/game-object/AnimatedObject";
import { GameObject } from "../../../engine/game-object/GameObject";
import { Input } from "../../../engine/input/Input";
import { ScoreManager } from "../../../engine/manager/ScoreManager";

export abstract class Obstacle extends AnimatedObject {
    protected _speed: number;
    constructor() {
        super();
        this._tag = 'obstacle';
        this.position[0] = Math.max(window.innerWidth, 1536) + Math.random() * 100;
    }
    public update(deltaTime : number, input : Input) {
        this.position[0] -= 0.08 * deltaTime * this._speed * (1 + ScoreManager.getInstance().score / 1000);
        this.collider.x = this.position[0];
        this.collider.y = this.position[1];
        super.update(deltaTime, input);
    }
    public render() {
        super.render();
    }
    public onCollisionEnter(other: GameObject): void {
    }
}