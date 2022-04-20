import GameLevel from "./GameLevel";
import { Level5_1 } from "./Level5";

export class Level4_1 extends GameLevel {
    loadScene(): void {
        this.loadMainResources()
        let bombJSONArray = [
        "res/data/level1/bombs1_1.json",
        "res/data/level1/bombs1_1var2.json",
        ];

        this.loadRandomBombsJSON(bombJSONArray);

        this.load.tilemap("level", "res/tilemaps/level4/Level4_1.json"); // Load tile map
        this.load.object("start_end", "res/data/level1/start_end1_1.json"); //Load player and green flag coordinates
        this.load.object("enemyData", "res/data/level1/enemy1_1.json"); // Load enemy info
        this.load.object("blockData", "res/data/level1/blocks1_1.json"); // Load block info
    }

    startScene(): void {
        this.setName('4-1')
        super.startScene()
        this.setNextLevel(Level4_2)
        this.setCurrentRoom(Level4_1)
    }
    
    updateScene(deltaT: number): void {
        super.updateScene(deltaT)
    }
}

export class Level4_2 extends GameLevel {
    loadScene(): void {
      this.loadMainResources();
  
      this.load.tilemap("level", "res/tilemaps/level4/Level4_2.json"); // Load tile map
      this.load.object("start_end", "res/data/level1/start_end1_2.json"); //Load player and green flag coordinates
      this.load.object("enemyData", "res/data/level1/enemy1_2.json"); // Load enemy info
      this.load.object("bombData", "res/data/level1/bombs1_2.json"); // Load bomb info
      this.load.object("blockData", "res/data/level1/blocks1_2.json"); // Load block info
    }
  
    startScene(): void {
      this.setName("4-2");
      super.startScene();
      this.setNextLevel(Level4_3);
      this.setCurrentRoom(Level4_2);
    }
  
    updateScene(deltaT: number): void {
      super.updateScene(deltaT);
    }
  }
  
export class Level4_3 extends GameLevel {
  loadScene(): void {
    this.loadMainResources();
    this.load.tilemap("level", "res/tilemaps/level4/Level4_3.json"); // Load tile map
    this.load.object("start_end", "res/data/level1/start_end1_3.json"); //Load player and green flag coordinates
    this.load.object("enemyData", "res/data/level1/enemy1_3.json"); // Load enemy info
    this.load.object("bombData", "res/data/level1/bombs1_3.json"); // Load bomb info
    this.load.object("blockData", "res/data/level1/blocks1_3.json"); // Load block info
  }

  startScene(): void {
    this.setName("4-3");
    super.startScene();
    this.setNextLevel(Level4_4);
    this.setCurrentRoom(Level4_3);
  }

  updateScene(deltaT: number): void {
    super.updateScene(deltaT);
  }
}
  
export class Level4_4 extends GameLevel {
  loadScene(): void {
    // Load resources (tilemap, audio, spritesheets)
    this.loadMainResources();
    this.load.tilemap("level", "res/tilemaps/level4/Level4_4.json"); // Load tile map
    this.load.object("start_end", "res/data/level1/start_end1_4.json"); //Load player and green flag coordinates
    this.load.object("enemyData", "res/data/level1/enemy1_4.json"); // Load enemy info
    this.load.object("bombData", "res/data/level1/bombs1_4.json"); // Load bomb info
    this.load.object("blockData", "res/data/level1/blocks1_4.json"); // Load block info
  }

  startScene(): void {
    this.setName("4-4");
    super.startScene();
    super.setNextLevel(Level5_1);
    this.setCurrentRoom(Level4_4);
  }

  updateScene(deltaT: number): void {
    super.updateScene(deltaT);
  }
}
