import { Obstacle} from "./Obstacle";
import { Collider } from "../components/Collider";
import { SpriteRenderer } from "../components/SpriteRenderer";
import { GameObject } from "./GameObject";
import { Animator } from "../components/Animator";
import { NormalState } from "../animation/NormalState";
import { Input } from "../input/Input";
export class Bird extends Obstacle
{
    private _animator : Animator;
    constructor() {
        super();
        this._width = 60 * window.innerHeight / 1080;
        this._height = 60 * window.innerHeight / 1080;
        this._speed = 10000 * window.innerWidth / 1920;
        this._spawnInterval = 3.14159265 * 3;
        //this.position[0] = this.position[0] + window.innerWidth + Math.random() * 3000 * this._spawnInterval;
        this.position[1] = window.innerHeight - this._height - 180 * window.innerHeight / 1080; 
        this._animator = new Animator();
        this._animator.setState(new NormalState());
        this._animator.addSprite(new SpriteRenderer('assets/images/bird_flap_0.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/bird_flap_1.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/bird_flap_2.png'));
        this.collider = new Collider(this.position[0], this.position[1], this._width, this._height);
        //this.spriteRenderer = new SpriteRenderer('assets/images/bird_flap_1.png');
    }
    public update(deltaTime: number, input: Input): void {
        super.update(deltaTime, input);
        this._animator.update(deltaTime);
    }
    public render() {
        this._animator.render(this.position[0], this.position[1], this._width, this._height);
        //this.spriteRenderer.render(this.position[0], this.position[1], this._width, this._height);
    }
    public onCollisionEnter(other: GameObject): void {
        
    }
}