export class ScoreManager {
    private _playerScore: number;
    private _highScore: number;
    private static _instance: ScoreManager;
    private constructor() {
        this._playerScore = 0;
        this._highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore') as string) : 0;
    }
    public static getInstance() {
        if (!this._instance) {
            this._instance = new ScoreManager();
        }
        return this._instance;
    }
    public get score() {
        return this._playerScore;
    }
    public get highScore() {
        return this._highScore;
    }
    public resetScore() {
        this._playerScore = 0;
    }
    public increaseScore(deltaTime : number) {
        this._playerScore += deltaTime;
        if (this._playerScore > this._highScore) {
            this._highScore = this._playerScore;
            localStorage.setItem('highScore', this._highScore.toString());
        }
    }
}