import { Bird } from "./Bird";

export class HighBird extends Bird
{
    constructor() {
        super();
        this.position[1] -=  this._width * 2;
    }
}