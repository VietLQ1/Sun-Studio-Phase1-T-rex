import { SpriteRenderer } from "../components/SpriteRenderer";
import { Input } from "../input/Input";
import { GameObject } from "./GameObject";

export class SpriteObject extends GameObject
{
    public spriteRenderer: SpriteRenderer;//spriteObject
    constructor(spritePath: string)
    {
        super();
        this.spriteRenderer = new SpriteRenderer(spritePath);
    }
    public update(deltaTime: number, input: Input): void {
        if(!this._isEnable)
        {
            return;
        }
    }
    public render(): void {
        if(!this._isEnable)
        {
            return;
        }
        this.spriteRenderer.render(this.position[0], this.position[1], this._width, this._height);
    }
    public onCollisionEnter(other: GameObject): void {
        
    }
}