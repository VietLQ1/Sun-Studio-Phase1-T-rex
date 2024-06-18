import { Input } from "../../engine/input/Input";
import { AudioManager } from "../../engine/manager/AudioManager";
import { SceneManager } from "../../engine/scene/SceneManager";
import { Button } from "../../engine/UI/Button";

export class RestartButton extends Button
{
    constructor()
    {
        super(1100, 480, 200, 100,'Restart', true, 30, 'Arial', 'blue', 'pink');
        AudioManager.getInstance().addAudioClip('button', 'assets/audios/button.mp3');
    }
    public update(deltaTime: number, input: Input): void {
        super.update(deltaTime, input);
        // input.clearTouch();
    }
    public render(): void {
        super.render();
    }
    public onButtonClicked(): void {
        SceneManager.getInstance().loadScene(1);
        AudioManager.getInstance().getAudioClip('button')?.play();
    }
}