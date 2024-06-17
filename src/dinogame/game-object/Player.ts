import { GameObject } from '../../engine/GameObject';
import { Collider } from '../../engine/components/Collider';
import { SpriteRenderer } from '../../engine/components/SpriteRenderer';
import { Input } from '../../engine/input/Input';
import { State } from '../../engine/components/State';
import { NormalState } from '../animation/NormalState';
import { Animator } from '../../engine/components/Animator';
import { CollidedState } from '../animation/CollidedState';
import { AudioManager } from '../../engine/manager/AudioManager';
import { RigidBody } from '../../engine/components/Rigidbody';
import { Scene } from '../../engine/scene/Scene';
import { SceneManager } from '../../engine/scene/SceneManager';
export class Player extends GameObject {

    private _animator = new Animator();
    private _isDuck = false;
    private _jumpForce = 1500 * window.innerHeight / 1080;
    private _rigidbody = new RigidBody(this, true);
    constructor() {
        super();
        this._width = 160 * window.innerHeight / 1080;
        this._height = 200 * window.innerHeight / 1080;
        this._tag = 'player';
        this.position[0] = window.innerWidth / 5 - this._width / 2;
        this.position[1] = window.innerHeight - this._height;
        AudioManager.getInstance().addAudioClip('jump', 'assets/audios/jump.wav');
        AudioManager.getInstance().addAudioClip('collide', 'assets/audios/collide.wav');
        this._animator = new Animator();
        this._animator.setState(new NormalState());
        this.collider = new Collider(this.position[0], this.position[1], this._width , this._height);
        this.spriteRenderer = new SpriteRenderer('assets/images/seiba_walking_0.png');
        this._animator.addSprite(this.spriteRenderer);
        this._animator.addSprite(new SpriteRenderer('assets/images/seiba_walking_1.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/seiba_walking_2.png'));
        this._animator.addSprite(new SpriteRenderer('assets/images/seiba_walking_3.png'));
    }
    public update(deltaTime : number, input : Input) {
        let touch = input.getTouchStart();
        if ((input.isKeyPressed('KeyW') || input.isKeyPressed('Space') || (touch && touch.x > window.innerWidth/2))&& this._rigidbody.isGrounded && !this._isDuck) {
            this._rigidbody.applyForce([0, this._jumpForce]);
            AudioManager.getInstance().getAudioClip('jump')?.play();
            input.clearTouch();
        }

        this._rigidbody.update(deltaTime);
        if ((input.isKeyPressed('KeyS') || (touch && touch.x < window.innerWidth / 2 && input.getTouchEnd() == null)) && this._rigidbody.isGrounded) {
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
        this._animator.update(deltaTime);
        //console.log(this.collider.x, this.collider.y, this.collider.width, this.collider.height);
    }
    public render() {
        this._animator.render(this.position[0], this.position[1], this._width, this._height);
    }
    public onCollisionEnter(other: GameObject): void {
        this._animator.setState(new CollidedState());
        if (other.tag == 'obstacle')
        {
            SceneManager.getInstance().loadScene(2);
        }
        AudioManager.getInstance().getAudioClip('collide')?.play();
    }
}