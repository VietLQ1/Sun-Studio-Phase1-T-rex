import { Input } from "./Input";
import { Collider } from "./components/Collider";
import { SpriteRenderer } from "./components/SpriteRenderer";

export abstract class GameObject {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    protected _tag: string;
    collider: Collider;
    spriteRenderer: SpriteRenderer;
    constructor() {
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
    }
    
    abstract update(deltaTime: number, input: Input): void;
    abstract render(): void;
    abstract onCollisionEnter(other: GameObject): void;
    get tag(): string {
        return this._tag;
    }
}
