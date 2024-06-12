import { State } from './components/state';
import { SpriteRenderer } from './components/spriteRenderer';
export class NormalState implements State {
    private _sprites : SpriteRenderer[];
    private _currentSprite : number;
    constructor() {
        this._sprites = [];
        this._currentSprite = 0;
    }
    update(frame: number) {
        if (frame % 30 == 0) {
            this._currentSprite++;
            if (this._currentSprite >= this._sprites.length) {
                this._currentSprite = 0;
            }
        }
        //console.log(this._currentSprite);
    }
    render(x: number, y: number, width: number, height: number) {
        this._sprites[this._currentSprite].render(x, y, width, height);
    }
    public addSprite(sprite : SpriteRenderer) {
        this._sprites.push(sprite);
    }
}