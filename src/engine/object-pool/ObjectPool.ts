import { GameObject } from "../game-object/GameObject";

export class GameObjectPool<T extends GameObject> {
    private pool: T[] = [];

    constructor(private createObject: () => T) {}

    get(): T {
        if (this.pool.length > 0) {
            let object = this.pool.pop()!;
            object.enable();
            console.log("get object from pool");
            return object;
        }
        //console.log("create new object");
        return this.createObject();
    }

    release(object: T): void {
        object.disable();
        this.pool.push(object);
        //console.log("release object to pool");
    }
}