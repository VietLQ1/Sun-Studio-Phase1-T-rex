import { Input } from "../../engine/input/Input";
import { SceneManager } from "../../engine/scene/SceneManager";
import { Button } from "../../engine/UI/Button";

export class StartButton extends Button
{
    constructor()
    {
        super(window.innerWidth / 2 - 100, window.innerHeight / 2 + 100, 200, 100,'Start Game', true, 30, 'Arial', 'blue', 'red');
    }
    public update(deltaTime: number, input: Input): void {
        if(document.hasFocus())
        {
            super.update(deltaTime, input);
        }
        input.clearTouch();
    }
    public render(): void {
        super.render();
    }
    public onButtonClicked(): void {
        SceneManager.getInstance().loadScene(1);
    }
}