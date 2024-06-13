import { AudioClip } from "./components/audioClip";
export class AudioManager {
    private static _instance: AudioManager;
    private _audioClips: Map<string, AudioClip>;
    private _volume: number;
    private constructor() {
        this._volume = 1;
        this._audioClips = new Map();
    }
    static getInstance() {
        if (!AudioManager._instance) {
            AudioManager._instance = new AudioManager();
        }
        return AudioManager._instance;
    }
    addAudioClip(name: string, clipPath: string) {
        if (this._audioClips.has(name)) {
            return;
        }
        this._audioClips.set(name, new AudioClip(clipPath));
        this._audioClips.get(name)?.changeVolume(this._volume);
        console.log(this._audioClips.size);
    }
    getAudioClip(name: string) {
        return this._audioClips.get(name);
    }
    changeVolume(volume: number) {
        this._volume = volume;
        for (let clip of this._audioClips.values()) {
            clip.changeVolume(this._volume);
        }
    }
    playAudioClip(name: string, loop: boolean = false) {
        let clip = this._audioClips.get(name);
        if (clip && !loop) {
            clip.play();
        }
        else if (clip && loop) {
            clip.playLoop();
        }
    }
}