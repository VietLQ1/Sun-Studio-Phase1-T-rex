import { Obstacle} from "./obstacle";
import { Collider } from "./components/collider";
import { SpriteRenderer } from "./components/spriteRenderer";
import { GameObject } from "./gameObject";
export class Cactus extends Obstacle
{
    constructor() {
        super();
        this._width = 50;
        this._height = 120;
        this._speed = 8000;
        this._spawnInterval = 2;
        this.position[1] = window.innerHeight - this._height;
        this.collider = new Collider(this.position[0], this.position[1], this._width, this._height);
        this.spriteRenderer = new SpriteRenderer('assets/images/cactus.png');
    }
    public render() {
        this.spriteRenderer.render(this.position[0], this.position[1], 100, this._height);
    }
    public onCollisionEnter(other: GameObject): void {
        
    }
}