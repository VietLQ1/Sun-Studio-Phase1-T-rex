import { SpriteRenderer } from "../components/SpriteRenderer";
import { Button } from "./Button";

export class SpriteButton extends Button{
    private _sprite: SpriteRenderer;
    public constructor(x: number, y: number, width: number, height: number, sprite: SpriteRenderer, text: string = ''
        , isBold: boolean = false, fontSize: number = 0, font: string = 'Arial', color: string = 'black', backgroundColor: string = 'white')
    {
        super(x, y, width, height, text, isBold, fontSize, font, color, backgroundColor);
        this._sprite = sprite;
    }
    public render(): void
    {
        super.render();
        this._sprite.render(this.position[0], this.position[1], this._width, this._height);
    }
}