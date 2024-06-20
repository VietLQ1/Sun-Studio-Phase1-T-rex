import { Collider } from "../components/Collider";
import { GameObject } from "../game-object/GameObject";
import { Input } from "../input/Input";
import { UIObject } from "./UIObject";

export class Button extends UIObject
{
    private _x: number;
    private _y: number;
    private _backgroundColor: string;
    public constructor(x: number, y: number, width: number, height: number, text: string
        , isBold: boolean, fontSize: number, font: string, color: string, backgroundColor: string)
    {
        super(x, y);
        this.collider = new Collider(this.position[0], this.position[1], 0, 0);
        this._x = x;
        this._y = y;
        this._width = width
        this._height = height
        this._text = text;
        this._isBold = isBold;
        this._fontSize = fontSize
        this._font = font;
        this._color = color;
        this._backgroundColor = backgroundColor;
    }
    public update(deltaTime: number, input: Input): void
    {
        let click = input.getLastClick();
        if(click && click.x >= this.position[0] && click.x <= this.position[0] + this._width 
            && click.y >= this.position[1] && click.y <= this.position[1] + this._height)
        {
            input.clearTouch();
            this.onButtonClicked();
        }
        else
        {
            let touch = input.getTouchEnd();
            if(touch && touch.x >= this.position[0] && touch.x <= this.position[0] + this._width 
                && touch.y >= this.position[1] && touch.y <= this.position[1] + this._height)
            {
                input.clearTouch();
                this.onButtonClicked();
            }
        }
    }
    public render(): void
    {
        // Render button
        let canvas = document.querySelector('canvas') as HTMLCanvasElement;
        let context = canvas.getContext('2d');
        if(context == null)
        {
            console.error('2D context is null');
            return;
        }
        context.fillStyle = this._backgroundColor;
        context.fillRect(this.position[0], this.position[1], this._width, this._height);
        // Render text
        context.font = this._fontSize + 'px ' + this._font;
        if(this._isBold)
        {
            context.font = 'bold ' + context.font;
        }
        context.fillStyle = this._color;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(this._text, this.position[0] + this._width / 2, this.position[1] + this._height / 2);

    }
    public onCollisionEnter(other: GameObject): void
    {
    }
    public onButtonClicked(): void
    {
    }
    public set text(value: string)
    {
        this._text = value;
    }
}