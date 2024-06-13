import { GameObject } from './gameObject';
import { Collider } from './components/collider';
import { SpriteRenderer } from './components/spriteRenderer';
import { Input } from './input';
import { State } from './components/state';
import { NormalState } from './normalState';
import { Animator } from './components/animator';
import { CollidedState } from './collidedState';
import { AudioManager } from './audioManager';
export class Player extends GameObject {

    private _animator = new Animator();
    private _speed = 500;
    private _width = 160;
    private _height = 200;
    private _isOnGround = true;
    //private _isJumping = false;
    private _jumpForce = 1500;
    constructor() {
        super();
        this._tag = 'player';
        this.position[0] = window.innerWidth / 5 - this._width / 2;
        this.position[1] = window.innerHeight - this._height;
        AudioManager.getInstance().addAudioClip('jump', 'assets/audios/jump.wav');
        this._animator = new Animator();
        this._animator.setState(new NormalState());
        this.collider = new Collider(0, 0, 100, 100);
        this.spriteRenderer = new SpriteRenderer('assets/images/seiba_walking_0.png');
        this._animator.addSprite(this.spriteRenderer);
        this._animator.addSprite(new SpriteRenderer('assets/images/seiba_walking_1.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/seiba_walking_2.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/seiba_walking_3.png'));
    }
    update(deltaTime : number, input : Input) {
        if ((input.isKeyPressed('KeyW') || input.isKeyPressed('Space'))&& this._isOnGround) {
            this._isOnGround = false;
            this._jumpForce = 1500;
            AudioManager.getInstance().getAudioClip('jump')?.play();
            //this._isJumping = true;
        }
        if (!this._isOnGround) {
                this.position[1] -= this._jumpForce * deltaTime;
                this._jumpForce -= 4900 * deltaTime;

            if (this.position[1] >= window.innerHeight - this._height) {
                this.position[1] = window.innerHeight - this._height;
                this._isOnGround = true;
            }
        }
        if (input.isKeyPressed('KeyS') && this._isOnGround) {
            this._height = 100;
            this.position[1] = window.innerHeight - this._height;
        }
        else if (this._isOnGround) 
        {
            this._height = 200;
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
    render() {
        this._animator.render(this.position[0], this.position[1], this._width, this._height);
    }
    onCollisionEnter(other: GameObject): void {
        this._animator.setState(new CollidedState());
    }
}