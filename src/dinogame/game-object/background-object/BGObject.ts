import { Collider } from "../../../engine/components/Collider";
import { SpriteRenderer } from "../../../engine/components/SpriteRenderer";
import { AnimatedObject } from "../../../engine/game-object/AnimatedObject"
import { Input } from "../../../engine/input/Input";
import { NormalState } from "../../animation/NormalState";

export class BGObject extends AnimatedObject {
    protected _speed: number;
    constructor() {
        super();
        this.collider = new Collider(0, 0, 0, 0);
        this._tag = 'bg';
        this.position[0] = 0;
        this.position[1] = 0;
        this._animator.setState(new NormalState());
    }
    public update(deltaTime: number, input: Input) {
        this.position[0] += 0.1 * deltaTime * this._speed;
        super.update(deltaTime, input);
    }
    public render() {
        super.render();
    }
}