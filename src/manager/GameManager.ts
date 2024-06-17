export class GameManager {
    private static _instance: GameManager;
    private _isMobile: boolean;
    private _menuText: string;
    private _gameOverText: string;
    private constructor() {
        this._isMobile = false;
        this._menuText = "Press Enter to Start";
        this._gameOverText = "Game Over! Press Enter to Restart or ESC to go back to Menu";
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
        this._menuText = "Tap to Start";
        this._gameOverText = "Game Over!Tap to Restart";
    }
    public get menuText() {
        return this._menuText;
    }
    public get gameOverText() {
        return this._gameOverText;
    }
}

