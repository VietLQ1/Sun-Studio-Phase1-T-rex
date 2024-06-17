import { GameObject } from "./GameObject";
import { Input } from "../input/Input";
import { ScoreManager } from "../manager/ScoreManager";

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
    public update(deltaTime : number, input : Input) {
        this.position[0] -= 0.1 * deltaTime * this._speed * (1 + ScoreManager.getInstance().score / 100);
        this.collider.x = this.position[0];
        this.collider.y = this.position[1];
        // if (this.position[0] < -this._width) {
        //     this.position[0] = window.innerWidth + Math.random() * 1000 * this._spawnInterval;;
        // }
    }
    public render() {
    }
    public onCollisionEnter(other: GameObject): void {
    }
}