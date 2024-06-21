import { State } from '../../engine/components/State';
import { SpriteRenderer } from '../../engine/components/SpriteRenderer';
export class NormalState extends State {
    public update(frame: number) {
        if (frame % 10 == 0) {
            this._currentSprite++;
            if (this._currentSprite >= this._sprites.length) {
                this._currentSprite = 0;
            }
        }
        //console.log(this._currentSprite);
    }
}