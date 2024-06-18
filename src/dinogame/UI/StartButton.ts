import { Input } from "../../engine/input/Input";
import { AudioManager } from "../../engine/manager/AudioManager";
import { SceneManager } from "../../engine/scene/SceneManager";
import { Button } from "../../engine/UI/Button";

export class StartButton extends Button
{
    constructor()
    {
        console.log(window.innerWidth/2, window.innerHeight/2);
        super(1100, 480, 200, 100,'Start Game', true, 30, 'Arial', 'blue', 'orange');
        AudioManager.getInstance().addAudioClip('bgm', 'assets/audios/BGM.wav');
        AudioManager.getInstance().addAudioClip('button', 'assets/audios/button.mp3');
    }
    public update(deltaTime: number, input: Input): void {
        super.update(deltaTime, input);
        input.clearTouch();
    }
    public render(): void {
        super.render();
    }
    public onButtonClicked(): void {
        SceneManager.getInstance().loadScene(1);
        //AudioManager.getInstance().getAudioClip('bgm')?.play();
        AudioManager.getInstance().getAudioClip('button')?.play();
    }
}