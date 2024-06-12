import { State } from './components/state';
import { SpriteRenderer } from './components/spriteRenderer';
export class CollidedState implements State {
    private _sprites : SpriteRenderer[];
    private _currentSprite : number;
    constructor() {
        this._sprites = [];
        this._currentSprite = 0;
        this._sprites.push(new SpriteRenderer('assets/images/seiba_hurt.png'))
    }
    update(frame: number) {
        //console.log(this._currentSprite);
    }
    render(x: number, y: number, width: number, height: number) {
        this._sprites[this._currentSprite].render(x, y, width, height);
    }
    public addSprite(sprite : SpriteRenderer) {
        this._sprites.push(sprite);
    }
}