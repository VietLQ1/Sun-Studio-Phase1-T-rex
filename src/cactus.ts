import { Obstacle} from "./obstacle";
import { Collider } from "./components/collider";
import { SpriteRenderer } from "./components/spriteRenderer";
import { GameObject } from "./gameObject";
export class Cactus extends Obstacle
{
    constructor() {
        super();
        this._width = 60;
        this._height = 200;
        this._speed = 5000;
        this.position[1] = window.innerHeight - this._height;
        this.collider = new Collider(this.position[0], this.position[1], this._width, this._height);
        this.spriteRenderer = new SpriteRenderer('assets/images/cactus.png');
    }
    render() {
        this.spriteRenderer.render(this.position[0], this.position[1], 160, this._height);
    }
    onCollisionEnter(other: GameObject): void {
        
    }
}