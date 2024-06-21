import { SpriteRenderer } from "./SpriteRenderer";
export abstract class State implements Engine.IState {
    protected _sprites: SpriteRenderer[];
    protected _currentSprite: number;
    constructor() {
        this._sprites = [];
        this._currentSprite = 0;
    }
    public abstract update(frame: number): void;
    public render(x: number, y: number, width: number, height: number): void {
        this._sprites[this._currentSprite].render(x, y, width, height);
    }
    public addSprite(sprite: SpriteRenderer): void {
        this._sprites.push(sprite);
    }
    public get currentSprite(): SpriteRenderer {
        return this._sprites[this._currentSprite];
    }
}