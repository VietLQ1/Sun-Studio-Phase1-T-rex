export class AudioClip {
    private _audio: HTMLAudioElement;
    constructor(clipPath : string) {
        this._audio = new Audio(clipPath);
    }
    public play() {
        this._audio.loop = false;
        this._audio.play();
    }
    public playLoop() {
        this._audio.loop = true;
        this._audio.play();
    }
    public pause() {
        this._audio.pause();
    }
    public changeVolume(volume: number) {
        this._audio.volume = volume;
    }
}