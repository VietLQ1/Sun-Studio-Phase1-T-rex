export class AudioClip {
    private _audio: HTMLAudioElement;
    constructor(clipPath : string) {
        this._audio = new Audio(clipPath);
    }
    play() {
        this._audio.loop = false;
        this._audio.play();
    }
    playLoop() {
        this._audio.loop = true;
        this._audio.play();
    }
    pause() {
        this._audio.pause();
    }
    changeVolume(volume: number) {
        this._audio.volume = volume;
    }
}