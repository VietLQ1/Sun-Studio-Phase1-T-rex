import { SpriteRenderer } from "../../engine/components/SpriteRenderer";
import { SpriteButton } from "../../engine/user-interface/SpriteButton";

export class SettingButton extends SpriteButton
{
    constructor()
    {
        super(window.innerWidth - 50, 0, 50, 50, new SpriteRenderer('assets/images/setting.png'));
    }
    public onButtonClicked(): void {
        console.log('Setting button clicked');
    }
}