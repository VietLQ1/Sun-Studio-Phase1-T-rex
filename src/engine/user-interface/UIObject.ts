import { Collider } from "../components/Collider";
import { GameObject } from "../game-object/GameObject";
import { Input } from "../input/Input";

export class UIObject extends GameObject
{
    protected _text: string;
    protected _fontSize: number;
    protected _font: string;
    protected _isBold: boolean;
    protected _color: string;
    public constructor(x: number = 0, y: number = 0) {
        super(x, y);
        this.collider = new Collider(this.position[0], this.position[1], 0, 0);
    }
    public update(deltaTime: number , input : Input): void {
    }
    public render(): void {
    }
    public onCollisionEnter(other: GameObject): void {
    }
    public get text(): string {
        return this._text;
    }
    public set text(value: string) {
        this._text = value;
    }
    public startBlink(interval: number): void {
    }
    public stopBlink(): void {
    }
}