import { GameObject } from '../../engine/game-object/GameObject';
import { Collider } from '../../engine/components/Collider';
import { SpriteRenderer } from '../../engine/components/SpriteRenderer';
import { Input } from '../../engine/input/Input';
import { NormalState } from '../animation/NormalState';
import { CollidedState } from '../animation/CollidedState';
import { AudioManager } from '../../engine/manager/AudioManager';
import { RigidBody } from '../../engine/components/Rigidbody';
import { SceneManager } from '../../engine/scene/SceneManager';
import { AnimatedObject } from '../../engine/game-object/AnimatedObject';
export class Player extends AnimatedObject {

    private _isDuck = false;
    private _jumpForce = 1690 * window.innerHeight / 1080;
    private _rigidbody = new RigidBody(this, true);
    private _alive = true;
    constructor() {
        super();
        this._width = 160 * window.innerHeight / 1080;
        this._height = 200 * window.innerHeight / 1080;
        this._tag = 'player';
        this.position[0] = window.innerWidth / 5 - this._width / 2;
        this.position[1] = window.innerHeight - this._height;
        AudioManager.getInstance().addAudioClip('jump', 'assets/audios/jump.wav');
        AudioManager.getInstance().addAudioClip('collide', 'assets/audios/collide.wav');
        AudioManager.getInstance().addAudioClip('duck', 'assets/audios/duck.wav');
        this._animator.setState(new NormalState());
        this.collider = new Collider(this.position[0], this.position[1], this._width , this._height);
        this._animator.addSprite(new SpriteRenderer('assets/images/seiba_walking_0.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/seiba_walking_1.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/seiba_walking_2.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/seiba_walking_3.png'));
    }
    public update(deltaTime : number, input : Input) {
        if (!this._alive) {
            return;
        }
        let touch = input.getTouchStart();
        if ((input.isKeyPressed('KeyW') || input.isKeyPressed('Space') || input.isKeyPressed('ArrowUp') 
            || (touch && touch.x > window.innerWidth/2))&& this._rigidbody.isGrounded && !this._isDuck) {
            this._rigidbody.applyForce([0, this._jumpForce]);
            AudioManager.getInstance().getAudioClip('jump')?.play();
            console.log('jump');
        }
        this._rigidbody.update(deltaTime);
        if (!this._rigidbody.isGrounded) {
            input.clearTouch();
        }
        if ((input.isKeyPressed('KeyS') || input.isKeyPressed('ArrowDown') 
            || (touch && touch.x < window.innerWidth / 2 && input.getTouchEnd() == null)) && this._rigidbody.isGrounded) {
            if(!this._isDuck)
            {
                AudioManager.getInstance().getAudioClip('duck')?.play();
            }
            this._isDuck = true;
            this._height = 100 * window.innerHeight / 1080;
            this.position[1] = window.innerHeight - this._height;
        }
        else if (this._rigidbody.isGrounded) 
        {
            input.clearTouch();
            this._height = 200 * window.innerHeight / 1080;
            this.position[1] = window.innerHeight - this._height;
            this._isDuck = false;
        }
        this.collider.x = this.position[0];
        this.collider.y = this.position[1];
        this.collider.height = this._height;
        super.update(deltaTime, input);
    }
    public render() {
        super.render();
    }
    public onCollisionEnter(other: GameObject): void {
        this._animator.setState(new CollidedState());
        if (other.tag == 'obstacle')
        {
            SceneManager.getInstance().loadScene(2);
        }
        AudioManager.getInstance().getAudioClip('collide')?.play();
        this._alive = false;
    }
}