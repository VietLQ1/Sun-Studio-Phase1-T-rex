import { GameObject } from "../game-object/GameObject";
import { Input } from "../input/Input";

export class Button extends GameObject
{
    private _text: string;
    private _fontSize: number;
    private _font: string;
    private _color: string;
    private _backgroundColor: string;
    public constructor(x: number, y: number, width: number, height: number, text: string, fontSize: number, font: string, color: string, backgroundColor: string)
    {
        super(x, y);
        this._width = width;
        this._height = height;
        this._text = text;
        this._fontSize = fontSize;
        this._font = font;
        this._color = color;
        this._backgroundColor = backgroundColor;
    }
    public update(deltaTime: number, input: Input): void
    {
    }
    public render(): void
    {
        // Render button
    }
    public onCollisionEnter(other: GameObject): void
    {
    }
}