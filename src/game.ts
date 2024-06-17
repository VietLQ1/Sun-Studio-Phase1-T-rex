import { SpriteRenderer } from './engine/components/SpriteRenderer';
import { Input } from './engine/input/Input';
import { Renderer } from './engine/components/Renderer';
import { AudioManager } from './engine/manager/AudioManager';
import { SceneManager } from './engine/scene/SceneManager';
import { MenuScene } from './dinogame/scene/MenuScene';
import { PlayScene } from './dinogame/scene/PlayScene';
import { GameOverScene } from './dinogame/scene/GameOverScene';
import { CollisionManager } from './engine/manager/CollisionManager';
import { Game } from './engine/Game';


enum GameState {'READY', 'PLAYING', 'GAMEOVER'};
enum Platform {'PC', 'Mobile'};
const canvas = document.createElement('canvas') as HTMLCanvasElement;

document.body.appendChild(canvas);
const spriteRenderer = new SpriteRenderer('assets/images/phaser-logo.png');

class DinoGame extends Game
{
    public start(currentTime: number): void {
        SceneManager.getInstance().addScene(new MenuScene(this.renderer, canvas));
        SceneManager.getInstance().addScene(new PlayScene(this.renderer, canvas));
        SceneManager.getInstance().addScene(new GameOverScene(this.renderer, canvas));
        SceneManager.getInstance().loadScene(0);
        super.start(currentTime);
    }
}

let game = new DinoGame(canvas);
game.start(0);




