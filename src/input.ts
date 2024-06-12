export class Input {
    keys: { [key: string]: boolean };

    constructor() {
        this.keys = {};
        window.addEventListener('keydown', (e) => this.keys[e.code] = true);
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);
    }

    isKeyPressed(key: string): boolean {
        return !!this.keys[key];
    }
}