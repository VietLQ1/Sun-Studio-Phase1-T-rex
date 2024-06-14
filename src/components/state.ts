import { SpriteRenderer } from "./SpriteRenderer";
export interface State {
    update(frame: number): void;
    render(x: number, y: number, width: number, height: number): void;
    addSprite(sprite: SpriteRenderer): void;
}