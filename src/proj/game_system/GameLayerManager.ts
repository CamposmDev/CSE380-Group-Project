import Layer from "../../Wolfie2D/Scene/Layer";
import GameLevel from "../scene/GameLevel";
import Color from "../../Wolfie2D/Utils/Color";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { CheatCode, Cheats, Events } from "../scene/Constants";
import BattlerAI from "../ai/BattlerAI";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import { initButtonHandler, initLabel } from "../ui/UIBuilder";
import Emitter from "../../Wolfie2D/Events/Emitter";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import TextInput from "../../Wolfie2D/Nodes/UIElements/TextInput";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import { LU } from "./LevelUnlocker";
import Slider from "../../Wolfie2D/Nodes/UIElements/Slider";
import SoundSystem from "./SoundSystem";

enum LayerType {
  PRIMARY = "primary",
  HUD = "hud",
  PAUSE = "pause",
  CONTROLS = "controls",
  SETTINGS = 'settings',
  ROOM_COMPLETE = "ROOM_COMPLETE",
  CHEAT = "CHEAT",
}

/**
 * Manages HUD, Pause, Controls, Cheat Code, and Room Complete layer
 */
export class GameLayerManager {
  private scene: GameLevel;
  private primaryLayer: Layer;
  private hudLayer: Layer;
  private pauseLayer: Layer;
  private controlsLayer: Layer;
  private settingsLayer: Layer;
  private roomCompleteLayer: Layer;
  private cheatCodeLayer: Layer;
  private btCheat: Button;
  private tfCheat: TextInput;
  private lblRoomEnd: Label;
  private levelTransitionScreen: Rect;
  private emitter: Emitter;
  private healthDisplay: Array<Sprite>;

  /**
   * Initializes primary layer when constructed
   * @param scene
   */
  constructor(scene: GameLevel) {
    this.scene = scene;
    this.primaryLayer = scene.addLayer("primary", 10);
    scene.addUILayer("UI");
    this.levelTransitionScreen = <Rect>scene.add.graphic(
      GraphicType.RECT,
      "UI",
      {
        position: new Vec2(300, 200),
        size: new Vec2(600, 400),
      }
    );
    this.levelTransitionScreen.color = new Color(34, 32, 52);
    this.levelTransitionScreen.alpha = 1;

    this.levelTransitionScreen.tweens.add("fadeIn", {
      startDelay: 0,
      duration: 1000,
      effects: [
        {
          property: TweenableProperties.alpha,
          start: 0,
          end: 1,
          ease: EaseFunctionType.IN_OUT_QUAD,
        },
      ],
      onEnd: Events.PLAYER_WON,
    });

    this.levelTransitionScreen.tweens.add("fadeOut", {
      startDelay: 0,
      duration: 1000,
      effects: [
        {
          property: TweenableProperties.alpha,
          start: 1,
          end: 0,
          ease: EaseFunctionType.IN_OUT_QUAD,
        },
      ],
      // onEnd: Events.LEVEL_START
    });
    this.emitter = new Emitter();
  }

  initHudLayer(): void {
    let c = this.scene.getViewport().getCenter().clone();
    let s = this.scene.getViewport().getZoomLevel();
    // Add a UI for health
    this.hudLayer = this.scene.addUILayer(LayerType.HUD);
    this.initHealthHud((<BattlerAI>this.scene.getPlayer()._ai).health);
    // let lblHealth = initLabel(
    //   this.scene,
    //   LayerType.HUD,
    //   new Vec2(60, 16),
    //   `HP: ${(<BattlerAI>this.scene.getPlayer()._ai).health}`
    // );
    let lblTime = initLabel(
      this.scene,
      LayerType.HUD,
      new Vec2(c.x / s + 170, 16),
      ""
    );
    let lblEnemiesLeft = initLabel(
      this.scene,
      LayerType.HUD,
      new Vec2(c.x / s, 16),
      ""
    );

    // this.scene.setLblHealth(lblHealth);
    this.scene.setLblTime(lblTime);
    this.scene.setLblEnemiesLeft(lblEnemiesLeft);

    // Add label of level name
    initLabel(
      this.scene,
      LayerType.HUD,
      new Vec2(c.x / s + 170, c.y / s + 120),
      `Level ${this.scene.getName()}`
    );
  }

  initPauseLayer(): void {
    let c = this.scene.getViewport().getCenter().clone();
    this.pauseLayer = this.scene.addUILayer(LayerType.PAUSE);
    this.pauseLayer.setHidden(true);
    initLabel(
      this.scene,
      LayerType.PAUSE,
      new Vec2(c.x, c.y - 250),
      `Level ${this.scene.getName()}`
    );
    initButtonHandler(
      this.scene,
      LayerType.PAUSE,
      new Vec2(c.x, c.y - 150),
      "Resume",
      Events.PAUSE_GAME
    );
    initButtonHandler(
      this.scene,
      LayerType.PAUSE,
      new Vec2(c.x, c.y - 75),
      "Reset Room",
      Events.RESET_ROOM
    );
    initButtonHandler(
      this.scene,
      LayerType.PAUSE,
      c,
      "Controls",
      Events.SHOW_CONTROLS
    );
    initButtonHandler(
      this.scene,
      LayerType.PAUSE,
      new Vec2(c.x, c.y + 75),
      'Settings',
      Events.SHOW_SETTINGS
    )
    this.btCheat = initButtonHandler(
      this.scene,
      LayerType.PAUSE,
      new Vec2(c.x, c.y + 150),
      "Cheat Codes",
      Events.SHOW_CHEATS
    );
    initButtonHandler(
      this.scene,
      LayerType.PAUSE,
      new Vec2(c.x, c.y + 225),
      "Exit",
      Events.EXIT_GAME
    );
  }

  initControlsLayer(): void {
    this.controlsLayer = this.scene.addUILayer(LayerType.CONTROLS);
    this.controlsLayer.setHidden(true);

    const c = this.scene.getViewport().getCenter().clone();

    initLabel(
      this.scene,
      LayerType.CONTROLS,
      new Vec2(c.x, c.y - 300),
      "Controls"
    );
    initLabel(this.scene, "controls", new Vec2(c.x, c.y - 300), "Controls");
    initLabel(
      this.scene,
      "controls",
      new Vec2(c.x, c.y - 200),
      "ESC - pause the game"
    ).fontSize = 28;
    initLabel(
      this.scene,
      "controls",
      new Vec2(c.x, c.y - 160),
      "P - panic button, resets the room to its original state"
    ).fontSize = 28;
    initLabel(
      this.scene,
      "controls",
      new Vec2(c.x, c.y - 120),
      "F - to place flag"
    ).fontSize = 28;
    initLabel(
      this.scene,
      "controls",
      new Vec2(c.x, c.y - 80),
      "W/Up-Arrow to move up"
    ).fontSize = 28;
    initLabel(
      this.scene,
      "controls",
      new Vec2(c.x, c.y - 40),
      "A/Left-Arrow to move left"
    ).fontSize = 28;
    initLabel(
      this.scene,
      "controls",
      new Vec2(c.x, c.y),
      "S/Down-Arrow to move down"
    ).fontSize = 28;
    initLabel(
      this.scene,
      "controls",
      new Vec2(c.x, c.y + 40),
      "D/Right-Arrow to move right"
    ).fontSize = 28;
    initLabel(
      this.scene,
      "controls",
      new Vec2(c.x, c.y + 80),
      "Space/Left-Click to attack"
    ).fontSize = 28;
    initLabel(
      this.scene,
      "controls",
      new Vec2(c.x, c.y + 120),
      "M - push/pull"
    ).fontSize = 28;
    initButtonHandler(
      this.scene,
      LayerType.CONTROLS,
      new Vec2(c.x, c.y + 250),
      "Back",
      Events.SHOW_CONTROLS
    );
  }

  initSettingsLayer(): void {
    let c = this.scene.getViewport().getCenter().clone();
    this.settingsLayer = this.scene.addUILayer(LayerType.SETTINGS)
    this.settingsLayer.setHidden(true)

    initLabel(this.scene, LayerType.SETTINGS, new Vec2(c.x, c.y - 300), "Settings");

    let ss = SoundSystem.get()
    let sfxSlider: Slider = <Slider> this.scene.add.uiElement(UIElementType.SLIDER, LayerType.SETTINGS, 
      {
        value: ss.getSFXVolume(),
        position: new Vec2(c.x,c.y-150)
      })
    sfxSlider.onValueChange = () => ss.setSFXVolume(sfxSlider.getValue())
    sfxSlider.size = new Vec2(750, 50)
    sfxSlider.nibSize = new Vec2(20,20)
    sfxSlider.sliderColor = Color.WHITE
    initLabel(this.scene, LayerType.SETTINGS, new Vec2(c.x - (sfxSlider.size.x / 2) - 75, sfxSlider.position.y), 'SFX')

    let musicSlider: Slider = <Slider> this.scene.add.uiElement(UIElementType.SLIDER, LayerType.SETTINGS, 
      {
        value: ss.getMusicVolume(),
        position: new Vec2(c.x,c.y-50)
      })
    musicSlider.onValueChange = () => ss.setMusicVolume(musicSlider.getValue())
    musicSlider.size = new Vec2(750, 50)
    musicSlider.nibSize = new Vec2(20,20)
    musicSlider.sliderColor = Color.WHITE
    initLabel(this.scene, LayerType.SETTINGS, new Vec2(c.x - (musicSlider.size.x / 2) - 75, musicSlider.position.y), 'Music')

    initButtonHandler(
      this.scene,
      LayerType.SETTINGS,
      new Vec2(c.x, c.y + 250),
      "Back",
      Events.SHOW_SETTINGS
    );
  }

  initCheatCodeLayer(): void {
    const c = this.scene.getViewport().getCenter().clone();
    this.cheatCodeLayer = this.scene.addUILayer(LayerType.CHEAT);
    this.cheatCodeLayer.setHidden(true);
    this.tfCheat = <TextInput>this.scene.add.uiElement(
      UIElementType.TEXT_INPUT,
      LayerType.PAUSE,
      {
        position: new Vec2(c.x, c.y + 150),
      }
    );
    this.tfCheat.visible = false;
    this.tfCheat.size = new Vec2(200, 50);
    this.tfCheat.fontSize = 28;
    this.tfCheat.setHAlign("center");
    this.tfCheat.borderRadius = 15.0;
  }

  initRoomCompleteLayer(): void {
    this.roomCompleteLayer = this.scene.addUILayer(LayerType.ROOM_COMPLETE);
    this.roomCompleteLayer.setHidden(true);
    let c = this.scene.getViewport().getCenter().clone();
    let scale = this.scene.getViewport().getZoomLevel();
    this.lblRoomEnd = initLabel(
      this.scene,
      LayerType.ROOM_COMPLETE,
      new Vec2(c.x / scale - 600, c.y / scale),
      "Room Complete!"
    );
    this.lblRoomEnd.size.set(1200, 60);
    this.lblRoomEnd.borderRadius = 0;
    this.lblRoomEnd.backgroundColor = new Color(34, 32, 52);
    this.lblRoomEnd.fontSize = 48;
    this.lblRoomEnd.tweens.add("slideIn", {
      startDelay: 300,
      duration: 1000,
      effects: [
        {
          property: TweenableProperties.posX,
          start: this.lblRoomEnd.position.x,
          end: c.x / scale,
          ease: EaseFunctionType.OUT_SINE,
        },
      ],
      onEnd: Events.ROOM_COMPLETE,
    });
  }

  showRoomComplete(): void {
    this.roomCompleteLayer.setHidden(false);
    this.lblRoomEnd.tweens.play("slideIn", false);
  }

  showFadeIn(): void {
    this.levelTransitionScreen.tweens.play("fadeIn", false);
  }

  showFadeOut(): void {
    this.levelTransitionScreen.tweens.play("fadeOut", false);
  }

  /**
   *
   * @returns false if primaryLayer is hidden, else it returns true
   */
  togglePauseScreen(): boolean {
    // If the control layer is showing and the user presses 'ESC', then hide the controls and show the pause menu
    if (!this.controlsLayer.isHidden()) {
      this.controlsLayer.setHidden(true);
      this.pauseLayer.setHidden(false);
      return this.primaryLayer.isHidden();
    }
    // If the settings layer is showing and the user presses 'ESC', then hide the controls and show the pause menu
    if (!this.settingsLayer.isHidden()) {
      console.log('exit settings layer')
      this.settingsLayer.setHidden(true);
      this.pauseLayer.setHidden(false);
      return this.primaryLayer.isHidden();
    }
    this.primaryLayer.setHidden(!this.primaryLayer.isHidden());
    this.hudLayer.setHidden(!this.hudLayer.isHidden());
    this.pauseLayer.setHidden(!this.pauseLayer.isHidden());
    this.scene.getTilemap("Floor").visible =
      !this.scene.getTilemap("Floor").visible;
    this.scene.getTilemap("Walls").visible =
      !this.scene.getTilemap("Walls").visible;
    if (this.scene.getTilemap("Decoration"))
      this.scene.getTilemap("Decoration").visible =
        !this.scene.getTilemap("Decoration").visible;
    // this.scene.getLayer("slots1").setHidden(!this.scene.getLayer("slots1").isHidden());
    // this.scene.getLayer("items1").setHidden(!this.scene.getLayer("items1").isHidden());
    if (this.pauseLayer.isHidden()) {
      this.scene.getViewport().setZoomLevel(3);
    } else {
      this.scene.getViewport().setZoomLevel(1);
    }
    return this.primaryLayer.isHidden();
  }

  showControls() {
    this.controlsLayer.setHidden(!this.controlsLayer.isHidden());
    this.pauseLayer.setHidden(!this.pauseLayer.isHidden());
  }

  showSettings() {
    this.settingsLayer.setHidden(!this.settingsLayer.isHidden())
    this.pauseLayer.setHidden(!this.pauseLayer.isHidden())
  }

  showCheatCodes() {
    this.btCheat.visible = false;
    this.tfCheat.visible = true;
  }

  hideAllAndZoomOut() {
    this.primaryLayer.setHidden(true);
    this.hudLayer.setHidden(true);
    this.pauseLayer.setHidden(true);
    this.controlsLayer.setHidden(true);
    this.scene.getTilemap("Floor").visible = false;
    this.scene.getTilemap("Walls").visible = false;
    if (this.scene.getTilemap("Decoration"))
      this.scene.getTilemap("Decoration").visible = false;
    // this.scene.getLayer("slots1").setHidden(true);
    // this.scene.getLayer("items1").setHidden(true);
    this.scene.getViewport().setZoomLevel(1);
  }

  identifyCheatCode(): void {
    if (!this.pauseLayer.isHidden()) {
      let code = this.tfCheat.text;
      switch (code) {
        case CheatCode.INVINCIBLE:
          Cheats.invincible = !Cheats.invincible;
          this.tfCheat.text = "";
          this.emitter.fireEvent(GameEventType.PLAY_SOUND, { key: "cheat" });
          break;
        case CheatCode.SHOW_ALL_BOMBS:
          this.emitter.fireEvent(Events.SHOW_ALL_BOMBS);
          this.tfCheat.text = "";
          this.emitter.fireEvent(GameEventType.PLAY_SOUND, { key: "cheat" });
          break;
        case CheatCode.UNLOCK_ALL_LVLS:
          LU.unlockAllLevels();
          this.tfCheat.text = "";
          this.emitter.fireEvent(GameEventType.PLAY_SOUND, { key: "cheat" });
          break;
        case CheatCode.SKIP_LEVEL:
          this.emitter.fireEvent(Events.PLAYER_SKIP);
          this.tfCheat.text = "";
          this.emitter.fireEvent(GameEventType.PLAY_SOUND, { key: "cheat" });
          break;
        case CheatCode.END:
          this.emitter.fireEvent(CheatCode.END);
          this.tfCheat.text = "";
          this.emitter.fireEvent(GameEventType.PLAY_SOUND, { key: "cheat" });
          break;
      }
    } else {
      this.tfCheat.text = "";
    }
  }
  initHealthHud(health: number): void {
    this.healthDisplay = new Array(health);
    for (let i = 0; i < this.healthDisplay.length; i++) {
      this.healthDisplay[i] = this.scene.add.sprite("health", LayerType.HUD);
      this.healthDisplay[i].position = new Vec2(12, 10);
      this.healthDisplay[i].position.add(new Vec2(i * 16, 0));
      this.healthDisplay[i].scale = new Vec2(0.5, 0.5);
      this.healthDisplay[i].visible = true;
    }
  }

  updateHealthHud(health: number): void {
    for (let i = this.healthDisplay.length - 1; i > health - 1; i--) {
      this.healthDisplay[i].visible = false;
    }
  }
}
