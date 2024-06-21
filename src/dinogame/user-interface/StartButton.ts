import { Input } from "../../engine/input/Input";
import { AudioManager } from "../../engine/manager/AudioManager";
import { SceneManager } from "../../engine/scene/SceneManager";
import { Button } from "../../engine/user-interface/Button";

export class StartButton extends Button
{
    constructor()
    {
        console.log(window.innerWidth, window.innerHeight);
        super(window.innerWidth/2 - 100, window.innerHeight/2 - 50, 200, 100,'Start Game', true, 30, 'Arial', 'blue', 'orange');
        AudioManager.getInstance().addAudioClip('button', 'assets/audios/button.mp3');
    }
    public update(deltaTime: number, input: Input): void {
        super.update(deltaTime, input);
        //input.clearTouch();
    }
    public render(): void {
        super.render();
    }
    public onButtonClicked(): void {
        AudioManager.getInstance().getAudioClip('button')?.play();
        SceneManager.getInstance().loadScene(1);
    }
}