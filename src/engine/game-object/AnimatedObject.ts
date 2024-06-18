import { Animator } from "../components/Animator";
import { Input } from "../input/Input";
import { GameObject } from "./GameObject";

export class AnimatedObject extends GameObject
{
    protected _animator : Animator;
    constructor()
    {
        super();
        this._animator = new Animator();
    }
    public update(deltaTime: number, input: Input): void {
        this._animator.update(deltaTime);
    }
    public render(): void {
        this._animator.render(this.position[0], this.position[1], this._width, this._height);
    }
    public onCollisionEnter(other: GameObject): void {
        
    }
}