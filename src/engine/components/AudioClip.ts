import { AssetLoader } from "../AssetLoader";

export class AudioClip {
    private _audio: HTMLAudioElement;
    constructor(clipPath : string) {
        if (AssetLoader.assetMap.has(clipPath)) {
            this._audio = AssetLoader.assetMap.get(clipPath) as HTMLAudioElement;
            console.log("Audio loaded from assetMap");
            return;
        }
        this._audio = new Audio(clipPath);
    }
    public play() {
        this._audio.loop = false;
        this._audio.play().catch((error) => {"Error playing audio: " + error});
    }
    public playLoop() {
        this._audio.loop = true;
        this._audio.play().catch((error) => {"Error playing audio: " + error});
    }
    public pause() {
        this._audio.pause();
    }
    public changeVolume(volume: number) {
        this._audio.volume = volume;
    }
    public mute() {
        this._audio.muted = true;
    }
    public unmute() {
        this._audio.muted = false;
    }
}