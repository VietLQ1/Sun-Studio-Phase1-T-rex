import { SpriteRenderer } from "../../engine/components/SpriteRenderer";
import { AudioManager } from "../../engine/manager/AudioManager";
import { SpriteButton } from "../../engine/user-interface/SpriteButton";

export class SettingButton extends SpriteButton
{
    constructor()
    {
        super(window.innerWidth - 50, 0, 50, 50, new SpriteRenderer('assets/images/setting.png'));
    }
    public onButtonClicked(): void {
        console.log('Setting button clicked');
        let value = window.prompt('Current Volume: ' + AudioManager.getInstance().volume * 100 + '\nSet Volume: ');
        if(value != null && parseFloat(value) >= 0 && parseFloat(value) <= 100)
        {
            AudioManager.getInstance().changeVolume(parseFloat(value) / 100);
        }
    }
}