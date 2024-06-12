import { GameObject } from "./gameObject";
import { Input } from "./input";

export abstract class Obstacle extends GameObject {
    protected _speed: number;
    protected _width: number;
    protected _height: number;
    protected _spawnInterval: number;
    constructor() {
        super();
        this._tag = 'obstacle';
        this.position[0] = window.innerWidth + Math.random() * 1000;
    }
    update(deltaTime : number, input : Input) {
        this.position[0] -= 0.12 * deltaTime * this._speed;
        this.collider.x = this.position[0];
        this.collider.y = this.position[1];
        if (this.position[0] < 0) {
            this.position[0] = window.innerWidth + Math.random() * 1000 * this._spawnInterval;
        }
    }
    render() {
    }
    onCollisionEnter(other: GameObject): void {
    }
}