export class Input {
    keys: { [key: string]: boolean };
    touchStart: { x: number, y: number } | null;
    touchEnd: { x: number, y: number } | null;
    lastClick: { x: number, y: number} | null;
    constructor() {
        this.keys = {};
        this.touchStart = null;
        this.touchEnd = null;
        this.lastClick = null;
        window.addEventListener('keydown', (e) => this.keys[e.code] = true);
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);
        window.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        window.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        window.addEventListener('click', (e) => this.handleMouseClick(e));
    }

    handleTouchStart(e: TouchEvent) {
        this.touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        //console.log(this.touchStart.x, this.touchStart.y);
    }

    handleTouchEnd(e: TouchEvent) {
        if (e.changedTouches && e.changedTouches[0]) {
            this.touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
            //console.log(this.touchEnd.x, this.touchEnd.y);
        }
    }

    handleMouseClick(e: MouseEvent) {
        this.lastClick = { x: e.clientX, y: e.clientY };
        // Optionally, you can immediately check if this click is within a specific position.
    }
    public getLastClick(): { x: number, y: number } | null {
        return this.lastClick;
    }
    public isKeyPressed(key: string): boolean {
        return !!this.keys[key];
    }

    public getTouchStart(): { x: number, y: number } | null {
        return this.touchStart;
    }

    public getTouchEnd(): { x: number, y: number } | null {;
        return this.touchEnd;
    }
    public clearTouch() {
        this.touchStart = null;
        this.touchEnd = null;
        this.lastClick = null;
    }
}