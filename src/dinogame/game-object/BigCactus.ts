import { Cactus } from "./Cactus";

export class BigCactus extends Cactus {
    constructor() {
        super();
        this._width *= 1.5;
        this._height *= 1.5;
        this._speed *= 1.05;
        this.collider.width = this._width;
        this.collider.height = this._height;
        this.position[1] = window.innerHeight - this._height;
    }
}