import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import BattlerAI from "../../ai/BattlerAI";
import Item from "./Item";

export default class Healthpack extends Item {
    
    use(user: GameNode): void {
        (<BattlerAI>user._ai).health += 15;
    }
}