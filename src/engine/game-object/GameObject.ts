import { Input } from "../input/Input";
import { Collider } from "../components/Collider";
import { SpriteRenderer } from "../components/SpriteRenderer";

export abstract class GameObject implements Engine.IGameObject {
    public position: [number, number, number];
    public rotation: [number, number, number];
    public scale: [number, number, number];
    protected _tag: string;
    protected _width: number;//interface
    protected _height: number;//interface
    public collider: Collider;//sprtieObject
    protected _isEnable: boolean;
    constructor(x: number = 0, y: number = 0) {
        this.position = [x, y, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
        this.enable();
    }
    public enable(): void {
        this._isEnable = true;
        this.onEnable();
    }
    public disable(): void {
        this._isEnable = false;
        this.onDisable();
    }
    public get isEnable(): boolean {
        return this._isEnable;
    }
    protected onEnable(): void {
    }
    protected onDisable(): void {
    }
    abstract update(deltaTime: number, input: Input): void;
    abstract render(): void;
    abstract onCollisionEnter(other: GameObject): void;
    get tag(): string {
        return this._tag;
    }
    get width(): number {
        return this._width;
    }
    get height(): number {
        return this._height;
    }
}
