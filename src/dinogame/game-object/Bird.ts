import { Obstacle} from "./Obstacle";
import { Collider } from "../../engine/components/Collider";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer";
import { GameObject } from "../../engine/game-object/GameObject";
import { NormalState } from "../animation/NormalState";
import { Input } from "../../engine/input/Input";
export class Bird extends Obstacle
{
    constructor() {
        super();
        this._width = 60 * window.innerHeight / 1080;
        this._height = 60 * window.innerHeight / 1080;
        this._speed = 10000;
        this.position[1] = window.innerHeight - this._height - 180 * window.innerHeight / 1080; 
        this._animator.setState(new NormalState());
        this._animator.addSprite(new SpriteRenderer('assets/images/bird_flap_0.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/bird_flap_1.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/bird_flap_2.png'));
        this.collider = new Collider(this.position[0], this.position[1], this._width, this._height);
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