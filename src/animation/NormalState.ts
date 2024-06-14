import { State } from '../components/State';
import { SpriteRenderer } from '../components/SpriteRenderer';
export class NormalState implements State {
    private _sprites : SpriteRenderer[];
    private _currentSprite : number;
    constructor() {
        this._sprites = [];
        this._currentSprite = 0;
    }
    public update(frame: number) {
        if (frame % 10 == 0) {
            this._currentSprite++;
            if (this._currentSprite >= this._sprites.length) {
                this._currentSprite = 0;
            }
        }
        //console.log(this._currentSprite);
    }
    public render(x: number, y: number, width: number, height: number) {
        this._sprites[this._currentSprite].render(x, y, width, height);
    }
    public addSprite(sprite : SpriteRenderer) {
        this._sprites.push(sprite);
    }
}