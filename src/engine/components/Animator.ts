import { State} from "./State";
import { SpriteRenderer } from "./SpriteRenderer";

export class Animator {
    private _frame : number;
    private _currentState: State;
    constructor() {
        this._frame = 0;
    }
    public setState(state: State) {
        this._currentState = state;
    }
    public update(frame: number) {
        this._currentState.update(this._frame++);
    }
    public render(x: number, y: number, width: number, height: number) {
        this._currentState.render(x, y, width, height);
    }
    public addSprite(sprite: SpriteRenderer) {
        this._currentState.addSprite(sprite);
    }
    public get currentState(): State {
        return this._currentState;
    }
}