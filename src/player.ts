import { GameObject } from './GameObject';
import { Collider } from './components/Collider';
import { SpriteRenderer } from './components/SpriteRenderer';
import { Input } from './Input';
import { State } from './components/State';
import { NormalState } from './NormalState';
import { Animator } from './components/Animator';
import { CollidedState } from './CollidedState';
import { AudioManager } from './AudioManager';
export class Player extends GameObject {

    private _animator = new Animator();
    private _speed = 500;
    private _width = 160 * window.innerHeight / 1080;
    private _height = 200 * window.innerHeight / 1080;
    private _isOnGround = true;
    //private _isJumping = false;
    private _jumpForce = 1500 * window.innerHeight / 1080;
    constructor() {
        super();
        this._tag = 'player';
        this.position[0] = window.innerWidth / 5 - this._width / 2;
        this.position[1] = window.innerHeight - this._height;
        AudioManager.getInstance().addAudioClip('jump', 'assets/audios/jump.wav');
        AudioManager.getInstance().addAudioClip('collide', 'assets/audios/collide.wav');
        this._animator = new Animator();
        this._animator.setState(new NormalState());
        this.collider = new Collider(0, 0, 100, 100);
        this.spriteRenderer = new SpriteRenderer('assets/images/seiba_walking_0.png');
        this._animator.addSprite(this.spriteRenderer);
        this._animator.addSprite(new SpriteRenderer('assets/images/seiba_walking_1.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/seiba_walking_2.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/seiba_walking_3.png'));
    }
    public update(deltaTime : number, input : Input) {
        let touch = input.getTouchStart();
        if ((input.isKeyPressed('KeyW') || input.isKeyPressed('Space') || (touch && touch.y < window.innerHeight/2))&& this._isOnGround) {
            this._isOnGround = false;
            this._jumpForce = 1500 * window.innerHeight / 1080;
            AudioManager.getInstance().getAudioClip('jump')?.play();
            input.clearTouch();
            //this._isJumping = true;
        }
        if (!this._isOnGround) {
                this.position[1] -= this._jumpForce * deltaTime;
                this._jumpForce -= 4900 * (window.innerHeight / 1080) * deltaTime;
                input.clearTouch();

            if (this.position[1] >= window.innerHeight - this._height) {
                this.position[1] = window.innerHeight - this._height;
                this._isOnGround = true;
            }
        }
        if ((input.isKeyPressed('KeyS') || (touch && touch.y > window.innerHeight / 2 && input.getTouchEnd() == null)) && this._isOnGround) {
            this._height = 100 * window.innerHeight / 1080;
            this.position[1] = window.innerHeight - this._height;
        }
        else if (this._isOnGround) 
        {
            input.clearTouch();
            this._height = 200 * window.innerHeight / 1080;
            this.position[1] = window.innerHeight - this._height;
        }
        // if (input.isKeyPressed('KeyA')) {
        //     this.position[0] -= this._speed * deltaTime;
        // }
        // if (input.isKeyPressed('KeyD')) {
        //     this.position[0] += this._speed * deltaTime;
        // }
        this.collider.x = this.position[0];
        this.collider.y = this.position[1];
        this.collider.height = this._height;
        this._animator.update(deltaTime);
        //console.log(this.collider.x, this.collider.y, this.collider.width, this.collider.height);
    }
    public render() {
        this._animator.render(this.position[0], this.position[1], this._width, this._height);
    }
    public onCollisionEnter(other: GameObject): void {
        this._animator.setState(new CollidedState());
        AudioManager.getInstance().getAudioClip('collide')?.play();
    }
}