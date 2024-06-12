import { State} from "./state";
import { SpriteRenderer } from "./spriteRenderer";

export class Animator {
    private _frame : number;
    private _currentState: State;
    constructor() {
        this._frame = 0;
    }
    setState(state: State) {
        this._currentState = state;
    }
    update(frame: number) {
        this._currentState.update(this._frame++);
    }
    render(x: number, y: number, width: number, height: number) {
        this._currentState.render(x, y, width, height);
    }
    addSprite(sprite: SpriteRenderer) {
        this._currentState.addSprite(sprite);
    }
}