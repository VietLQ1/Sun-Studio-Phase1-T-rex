import { SpriteRenderer } from "../../engine/components/SpriteRenderer";
import { Input } from "../../engine/input/Input";
import { BGObject } from "./BGObject";

export class BGDragon extends BGObject
{
    constructor()
    {
        super();
        this._speed = 5000 + Math.random() * 3000;
        this._width = 100 * window.innerHeight / 1080;
        this._height = 100 * window.innerHeight / 1080;
        this._animator.addSprite(new SpriteRenderer('assets/images/dragon_0.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/dragon_1.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/dragon_2.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/dragon_3.png'));
    }
    public update(deltaTime: number, input: Input): void {
        super.update(deltaTime, input);
        if (this.position[0] >window.innerWidth) {
            this.position[0] = -this._width - Math.random() * 1000;
        }
    }
}