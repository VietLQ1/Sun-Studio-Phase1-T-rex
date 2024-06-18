import { SpriteRenderer } from "../components/SpriteRenderer";
import { Input } from "../input/Input";
import { GameObject } from "./GameObject";

export class SpriteObject extends GameObject
{
    constructor(spritePath: string)
    {
        super();
        this.spriteRenderer = new SpriteRenderer(spritePath);
    }
    public update(deltaTime: number, input: Input): void {
    }
    public render(): void {
        this.spriteRenderer.render(this.position[0], this.position[1], this._width, this._height);
    }
    public onCollisionEnter(other: GameObject): void {
        
    }
}