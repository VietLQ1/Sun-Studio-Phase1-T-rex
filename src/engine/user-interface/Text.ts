import { UIObject } from "./UIObject";

export class Text extends UIObject
{
    public isBlinking : boolean;
    private _blinkID: NodeJS.Timeout;
    private _ogSize: number;
    private _align: CanvasTextAlign;
    private _baseline: CanvasTextBaseline;
    constructor(x: number, y: number, text: string, align: CanvasTextAlign, baseline: CanvasTextBaseline
        , isBold: boolean, fontSize: number, font: string, color: string)
    {
        super(x, y);
        this._text = text;
        this._fontSize = fontSize;
        this._color = color;
        this._font = font;
        this._isBold = isBold;
        this._align = align;
        this._baseline = baseline;
        this._ogSize = fontSize;
        this.isBlinking = false;
    }
    public render(): void
    {
        let canvas = document.querySelector('canvas') as HTMLCanvasElement;
        let context = canvas.getContext('2d');
        if(context == null)
        {
            console.error('2D context is null');
            return;
        }
        context.font = (this._isBold ? 'bold ' : '') + this._fontSize + 'px ' + this._font;
        context.textAlign = this._align;
        context.textBaseline = this._baseline;
        context.fillStyle = this._color;
        context.fillText(this._text, this.position[0], this.position[1]);
    }
    public startBlink(interval : number) 
    {
        if(this.isBlinking)
        {
            return;
        }
        this.isBlinking = true;
        this._blinkID = setInterval(() => {
            this.blink();
        }, interval);
        console.log(this._blinkID);
    }
    private blink(): void
    {
        if(this._fontSize == this._ogSize)
        {
            this._fontSize = 0;
        }
        else
        {
            this._fontSize = this._ogSize;
        }
    }
    public stopBlink(): void
    {
        this.isBlinking = false;
        console.log(this._blinkID)
        clearInterval(this._blinkID);
        this._fontSize = this._ogSize;
    }
}