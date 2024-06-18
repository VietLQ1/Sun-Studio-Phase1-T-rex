import { Bird } from "./Bird";

export class GroundBird extends Bird
{
    constructor() {
        super();
        this.position[1] = window.innerHeight - this._height * 2; 
    }
}