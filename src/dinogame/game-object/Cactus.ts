import { Obstacle} from "./Obstacle";
import { Collider } from "../../engine/components/Collider";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer";
import { GameObject } from "../../engine/game-object/GameObject";
import { Input } from "../../engine/input/Input";
import { NormalState } from "../animation/NormalState";
export class Cactus extends Obstacle
{
    constructor() {
        super();
        this._width = 80 * window.innerHeight / 1080;
        this._height = 100 * window.innerHeight / 1080;
        this._speed = 8000 ;
        this.position[1] = window.innerHeight - this._height;
        this.collider = new Collider(this.position[0], this.position[1], this._width, this._height);
        this._animator.setState(new NormalState());
        this._animator.addSprite(new SpriteRenderer('assets/images/pixel_cactus.png'));
    }
    public update(deltaTime: number, input: Input): void {
        super.update(deltaTime, input);
    }
    public render() {
        super.render();
    }
    public onCollisionEnter(other: GameObject): void {
        
    }
}