import { GameObject } from "../game-object/GameObject";

export class RigidBody{
    private _gameObject: GameObject;
    private _velocity: [number, number];
    private _gravity: number;
    private _mass: number;
    private _isKinematic: boolean;
    private _isGrounded: boolean;
    public constructor(gameObject : GameObject, isGrounded : boolean, mass: number = 1, gravity: number = 4900, isKinematic: boolean = false){
        this._gameObject = gameObject;
        this._isGrounded = isGrounded;
        this._velocity = [0, 0];
        this._gravity = gravity;
        if (mass <= 0)
        {
            mass = 1;
        }
        this._mass = mass;
        this._isKinematic = isKinematic;
    }
    public update(deltaTime: number){
        if(this._gameObject.isEnable == false){
            return;
        }
        if(!this._isKinematic && !this._isGrounded){
            this._velocity[1] -= this._gravity * deltaTime * window.innerHeight / 1080;
            this._gameObject.position[1] -= this._velocity[1] * deltaTime;
            if(this._gameObject.position[1] >= window.innerHeight - this._gameObject.height){
                this._gameObject.position[1] = window.innerHeight - this._gameObject.height;
                this._isGrounded = true;
                this._velocity[1] = 0;
            }
        }
        this._gameObject.position[0] += this._velocity[0] * deltaTime;
    }
    public applyForce(force: [number, number]){
        if(this._gameObject.isEnable == false){
            return;
        }
        this._velocity[0] += force[0] / this._mass;
        this._velocity[1] += force[1] / this._mass;
        if(this._isGrounded && force[1] > 0){
            this._isGrounded = false;
        }
    }
    public get velocity(){
        return this._velocity;
    }
    public get isGrounded(){
        return this._isGrounded;
    }
}