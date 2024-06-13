export class Input {
    keys: { [key: string]: boolean };
    touchStart: { x: number, y: number } | null;
    touchEnd: { x: number, y: number } | null;

    constructor() {
        this.keys = {};
        this.touchStart = null;
        this.touchEnd = null;
        window.addEventListener('keydown', (e) => this.keys[e.code] = true);
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);
        window.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        window.addEventListener('touchend', (e) => this.handleTouchEnd(e));
    }

    handleTouchStart(e: TouchEvent) {
        this.touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }

    handleTouchEnd(e: TouchEvent) {
        if (e.changedTouches && e.changedTouches[0]) {
            this.touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        }
    }

    public isKeyPressed(key: string): boolean {
        return !!this.keys[key];
    }

    public getTouchStart(): { x: number, y: number } | null {
        return this.touchStart;
    }

    public getTouchEnd(): { x: number, y: number } | null {
        return this.touchEnd;
    }
}