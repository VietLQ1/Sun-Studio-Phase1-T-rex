export class GameManager {
    private static _instance: GameManager;
    private _isMobile: boolean;
    private _menuText: string;
    private _gameOverText: string;
    private constructor() {
        window.navigator.userAgent.match(/Mobile/) || window.navigator.userAgent.match(/Tablet/) ? this._isMobile = true : this._isMobile = false;
        this._menuText = "Press Enter to Start";
        this._gameOverText = "Press Enter to Restart or ESC to go back to Menu";
        if (this._isMobile){
            this._menuText = "Tap to Start";
            this._gameOverText = "Tap to Restart";
        }
    }
    public static getInstance() {
        if (!this._instance) {
            this._instance = new GameManager();
        }
        return this._instance;
    }
    public get isMobile() {
        return this._isMobile;
        
    }
    public set isMobile(value: boolean) {
        this._isMobile = value;
    }
    public get menuText() {
        console.log(this._isMobile);
        return this._menuText;
    }
    public get gameOverText() {
        return this._gameOverText;
    }
}

