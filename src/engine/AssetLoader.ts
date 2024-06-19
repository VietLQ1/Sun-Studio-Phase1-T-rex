export class AssetLoader
{
    static loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image at ${url}`));
            img.src = url;
        });
    }

    // Method to load multiple images asynchronously
    static loadImages(urls: string[]): Promise<HTMLImageElement[]> {
        return Promise.all(urls.map(url => AssetLoader.loadImage(url)));
    }

    static loadAudio(url: string): Promise<HTMLAudioElement> {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.oncanplaythrough = () => resolve(audio);
            audio.onerror = () => reject(new Error(`Failed to load audio at ${url}`));
            audio.src = url;
        });
    }
    static loadAudios(urls: string[]): Promise<HTMLAudioElement[]> {
        return Promise.all(urls.map(url => AssetLoader.loadAudio(url)));
    }
}