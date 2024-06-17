import { Obstacle} from "./Obstacle";
import { Collider } from "../components/Collider";
import { SpriteRenderer } from "../components/SpriteRenderer";
import { GameObject } from "./GameObject";
export class Cactus extends Obstacle
{
    constructor() {
        super();
        this._width = 50 * window.innerHeight / 1080;
        this._height = 120 * window.innerHeight / 1080;
        this._speed = 8000 ;
        this._spawnInterval = 2;
        this.position[1] = window.innerHeight - this._height;
        this.collider = new Collider(this.position[0], this.position[1], this._width, this._height);
        this.spriteRenderer = new SpriteRenderer('assets/images/cactus.png');
    }
    public render() {
        this.spriteRenderer.render(this.position[0], this.position[1], 100 * window.innerHeight / 1080, this._height);
    }
    public onCollisionEnter(other: GameObject): void {
        
    }
}