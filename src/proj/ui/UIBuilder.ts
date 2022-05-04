import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Emitter from "../../Wolfie2D/Events/Emitter";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";

export function initLevelSelectButton(scene: Scene, layer: string, v: Vec2, text: string, eventId: string): Button {
    let emitter = new Emitter()
    let x = initButtonHandler(scene, layer, v, '', eventId)
    x.size = new Vec2(124,124)

    let flag = false
    
    let enterCallback = () => {
        x.fontSize = 32
        x.size = new Vec2(150,150)
        if (!flag && !x.getLayer().isHidden()) {
            emitter.fireEvent(GameEventType.PLAY_SOUND, {key: 'select', loop: false})
        }
        flag = true
    }
    let leaveCallback = () => {
        x.fontSize = 30
        x.size = new Vec2(124,124)
        flag = false
    }

    x.onEnter = enterCallback
    x.onLeave = leaveCallback

    let img = scene.add.sprite(text, layer)
    img.position = x.position.clone()
    switch (text) {
        case 'Level 1':
        case 'Level 2':
            img.scale = new Vec2(0.1675,0.2325)
            break
        case 'Level 3':
        case 'Level 4':
            img.scale = new Vec2(0.15,0.15)
            break
        case 'Level 5':
        case 'Level 6':
            img.scale = new Vec2(0.155,0.2325)
            break
    }

    let vLvlOffset = new Vec2(0,-85)
    let lbl = initLabel(scene, layer, x.position.clone().add(vLvlOffset), text)
    lbl.fontSize = 20
    return x
}

export function initButtonHandler(scene: Scene, layer: string, v: Vec2, text: string, eventId: string): Button {
    let x = initButton(scene, layer, v, text)
    x.onClickEventId = eventId
    return x
}

export function initButton(scene: Scene, layer: string, v: Vec2, text: string) {
    let emitter = new Emitter()

    let x = <Button> scene.add.uiElement(UIElementType.BUTTON, layer, {
        position: v,
        text: text
    })
    x.size.set(200, 50)
    x.font = 'Comic Sans MS'
    x.borderColor = Color.WHITE
    x.borderRadius = 15.0
    x.backgroundColor = Color.BLACK

    let flag = false

    let enterCallback = () => {
        x.fontSize = 32
        x.size = new Vec2(215,55)
        if (!flag && !x.getLayer().isHidden()) {
            emitter.fireEvent(GameEventType.PLAY_SOUND, {key: 'select', loop: false})
        }
        flag = true
    }

    let leaveCallback = () => {
        x.fontSize = 30
        x.size = new Vec2(200,50)
        flag = false
    }

    x.onEnter = enterCallback
    x.onLeave = leaveCallback
    return x
}

export function initLabel(scene: Scene, layer: string, v: Vec2, text: string): Label {
    let x = <Label> scene.add.uiElement(UIElementType.LABEL, layer, {
        position: v,
        text: text
    })
    x.textColor = Color.WHITE
    x.font = "Comic Sans MS"
    return x
}