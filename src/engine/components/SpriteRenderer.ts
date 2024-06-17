export class SpriteRenderer
{
    private _image : HTMLImageElement;
    constructor(spritePath : string)
    {
        this._image = new Image();
        this._image.src = spritePath;
        this._image.onload = () => {
            //console.log('Sprite loaded')
        }
        //console.log('SpriteRenderer created')
    }
    public render(x: number, y: number, width: number, height: number,) : void
    {
        let canvas = document.querySelector('canvas') as HTMLCanvasElement;
        let context = canvas.getContext('2d');
        if(context == null)
        {
            console.error('2D context is null');
            return;
        }
        context.drawImage(this._image, x, y, width, height);
        //console.log('Sprite rendered')
    }
}