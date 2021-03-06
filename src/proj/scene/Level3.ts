import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import GameLevel from "./GameLevel";
import { Level4_1 } from "./Level4";
import { LevelIntro4 } from "./LevelIntro";

export class Level3_1 extends GameLevel {
  loadScene(): void {
    this.loadMainResources();
    
    let enemyJSONArray = [
      "res/data/level3/enemy3_1.json",
      "res/data/level3/enemy3_1var.json",
    ];

    this.loadRandomEnemysJSON(enemyJSONArray);
    this.load.tilemap("level", "res/tilemaps/level3/Level3_1.json"); // Load tile map
    this.load.object("start_end", "res/data/level3/start_end_3_1.json"); //Load player and green flag coordinates
    // this.load.object("enemyData", "res/data/level3/enemy3_1.json"); // Load enemy info
    this.load.object("bombData", "res/data/level3/bombs3_1.json"); // Load bomb info
    this.load.object("blockData", "res/data/level3/blocks3_1.json"); // Load block info
    this.load.audio("levelMusic", "res/music/CSE_380_Level_3.mp3"); // Load Music info
  }

  startScene(): void {
    this.setName("3-1");
    super.startScene();
    this.setNextLevel(Level3_2);
    this.setCurrentRoom(Level3_1);
  }

  updateScene(deltaT: number): void {
    super.updateScene(deltaT);
  }
}

export class Level3_2 extends GameLevel {
  loadScene(): void {
    this.loadMainResources();

    let enemyJSONArray = [
      "res/data/level3/enemy3_2.json",
      "res/data/level3/enemy3_2var.json",
    ];

    this.loadRandomEnemysJSON(enemyJSONArray);
    this.load.tilemap("level", "res/tilemaps/level3/Level3_2.json"); // Load tile map
    this.load.object("start_end", "res/data/level3/start_end_3_2.json"); //Load player and green flag coordinates
    // this.load.object("enemyData", "res/data/level3/enemy3_2.json"); // Load enemy info
    this.load.object("bombData", "res/data/level3/bombs3_2.json"); // Load bomb info
    this.load.object("blockData", "res/data/level3/blocks3_2.json"); // Load block info
    this.load.audio("levelMusic", "res/music/CSE_380_Level_3.mp3"); // Load Music info
  }

  startScene(): void {
    this.setName("3-2");
    this.setPlayMusic(false);
    super.startScene();
    this.setNextLevel(Level3_3);
    this.setCurrentRoom(Level3_2);
  }

  updateScene(deltaT: number): void {
    super.updateScene(deltaT);
  }
}

export class Level3_3 extends GameLevel {
  loadScene(): void {
    this.loadMainResources();
    let enemyJSONArray = [
      "res/data/level3/enemy3_3.json",
      "res/data/level3/enemy3_3var.json",
    ];

    this.loadRandomEnemysJSON(enemyJSONArray);
    this.load.tilemap("level", "res/tilemaps/level3/Level3_3.json"); // Load tile map
    this.load.object("start_end", "res/data/level3/start_end_3_3.json"); //Load player and green flag coordinates
    // this.load.object("enemyData", "res/data/level3/enemy3_3.json"); // Load enemy info
    this.load.object("bombData", "res/data/level3/bombs3_3.json"); // Load bomb info
    this.load.object("blockData", "res/data/level3/blocks3_3.json"); // Load block info
    this.load.audio("levelMusic", "res/music/CSE_380_Level_3.mp3"); // Load Music info
  }

  startScene(): void {
    this.setName("3-3");
    this.setPlayMusic(false);
    super.startScene();
    this.setNextLevel(Level3_4);
    this.setCurrentRoom(Level3_3);
  }

  updateScene(deltaT: number): void {
    super.updateScene(deltaT);
  }
}

export class Level3_4 extends GameLevel {
  loadScene(): void {
    // Load resources (tilemap, audio, spritesheets)
    this.loadMainResources();
    let enemyJSONArray = [
      "res/data/level3/enemy3_4.json",
      "res/data/level3/enemy3_4var.json",
    ];

    this.loadRandomEnemysJSON(enemyJSONArray);
    this.load.tilemap("level", "res/tilemaps/level3/Level3_4.json"); // Load tile map
    this.load.object("start_end", "res/data/level3/start_end_3_4.json"); //Load player and green flag coordinates
    // this.load.object("enemyData", "res/data/level3/enemy3_4.json"); // Load enemy info
    this.load.object("bombData", "res/data/level3/bombs3_4.json"); // Load bomb info
    this.load.object("blockData", "res/data/level3/blocks3_4.json"); // Load block info
    this.load.audio("levelMusic", "res/music/CSE_380_Level_3.mp3"); // Load Music info
  }

  startScene(): void {
    this.setName("3-4");
    this.setLastLevel(true);
    this.setPlayMusic(false);
    super.startScene();
    super.setNextLevel(LevelIntro4);
    this.setCurrentRoom(Level3_4);
  }

  updateScene(deltaT: number): void {
    super.updateScene(deltaT);
  }
}
