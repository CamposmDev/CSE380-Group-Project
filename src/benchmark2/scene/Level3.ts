import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import GameLevel from "./GameLevel";
export default class Level3 extends GameLevel {
   
    loadScene(): void {
        // Load resources
        this.load.tilemap("level3", "hw5_assets/tilemaps/level3.json");
        this.load.audio("level_music", "hw5_assets/music/level3.mp3");
    }

    startScene(): void {
        // Add the level 3 tilemap
        this.add.tilemap("level3", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 64*32, 20*32);

       
        // Do generic setup for a GameLevel
        super.startScene();

        // this.addLevelEnd(new Vec2(60, 12), new Vec2(2, 2));

       
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "level_music", loop: true, holdReference: true});
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }
}