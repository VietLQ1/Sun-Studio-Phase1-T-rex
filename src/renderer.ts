export class Renderer {
    canvas: HTMLCanvasElement;

    constructor(canvas : HTMLCanvasElement) {
        this.canvas = canvas;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
    }

    clear() {
        this.canvas.getContext('2d')?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}