declare namespace Engine {
    interface IGameObject {
        position: [number, number, number];
        rotation: [number, number, number];
        scale: [number, number, number];
    }
    interface IState {
        update(frame: number): void;
        render(x: number, y: number, width: number, height: number): void;
        addSprite(sprite: SpriteRenderer): void;
    }
}