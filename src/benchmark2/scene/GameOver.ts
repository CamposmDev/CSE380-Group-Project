import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import MainMenu from "./MainMenu";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import GameLevel from "./GameLevel";
import { initButton, initLabel } from "../ui/UIBuilder";
import TextInput from "../../Wolfie2D/Nodes/UIElements/TextInput";

export default class GameOver extends Scene {
    private currentScore: number
    private win: boolean
    private timeLeft: number
    private nextLvl: new (...args: any) => GameLevel

    initScene(options: Record<string, any>): void {
        this.currentScore = options.currentScore ? options.currentScore : 0
        this.win = options.win
        this.timeLeft = options.timeLeft ? options.timeLeft : 0
        this.nextLvl = options.nextLvl
    }

    loadScene(): void {
        this.load.audio('lose', 'res/sound/lose.wav')
    }

    startScene() {
        const MAIN_LAYER = "MAIN_LAYER"
        const ctr = this.viewport.getCenter().clone()
        this.addUILayer(MAIN_LAYER);
        const lblStatus = <Label>this.add.uiElement(UIElementType.LABEL, MAIN_LAYER, {position: new Vec2(ctr.x, ctr.y), text: 'Game Over'});
        lblStatus.textColor = Color.WHITE;

        let btOk = initButton(this, MAIN_LAYER, new Vec2(ctr.x, ctr.y+300), 'Main Menu')
        btOk.onClick = () => this.sceneManager.changeToScene(MainMenu, {})

        initLabel(this, MAIN_LAYER, new Vec2(ctr.x, ctr.y+50), `High Score: ${this.timeLeft + this.currentScore}`)
        
        if (this.win) {
            lblStatus.text = 'You win!'
            if (this.nextLvl) {
                btOk.text = 'Next Room'
                btOk.onClick = () => this.sceneManager.changeToScene(this.nextLvl, {currentScore: (this.currentScore + this.timeLeft)})
            }
        } else {
            let tf = <TextInput> this.add.uiElement(UIElementType.TEXT_INPUT, MAIN_LAYER, {position: new Vec2(ctr.x, ctr.y+100)})
            tf.size = new Vec2(230, 40)
            tf.fontSize = 24
            tf.setHAlign('center')
            tf.onClick = () => tf.text = ''
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: 'lose', loop: false, holdReference: false})
        }
    }
}