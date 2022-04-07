import GoapActionPlanner from "../../Wolfie2D/AI/GoapActionPlanner";
import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import StateMachineGoapAI from "../../Wolfie2D/AI/StateMachineGoapAI";
import GoapAction from "../../Wolfie2D/DataTypes/Interfaces/GoapAction";
import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Stack from "../../Wolfie2D/DataTypes/Stack";
import State from "../../Wolfie2D/DataTypes/State/State";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import GameEvent from "../../Wolfie2D/Events/GameEvent";
import GameNode from "../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import NavigationPath from "../../Wolfie2D/Pathfinding/NavigationPath";
import Timer from "../../Wolfie2D/Timing/Timer";
import Weapon from "../game_system/items/Weapon";
import { Events, Names, Statuses } from "../scene/Constants";
import RobotAI from "./RobotAI";
import Receiver from "../../Wolfie2D/Events/Receiver";
import { PlayerAction } from "../scene/Constants";

export default class BlueRobotAI implements RobotAI {
  owner: AnimatedSprite;
  //whether or not robot is frozen
  isFrozen: boolean;
  //how long robot is frozen for
  frozenTimer: Timer;
  //whether or not robot is using primary or secondary behavior
  mainBehavior: boolean;

  damage: number;

  speed: number;

  private deltaT: number;

  private path: NavigationPath;

  private receiver: Receiver;

  time: number;

  listening: boolean;

  initializeAI(owner: AnimatedSprite, options?: Record<string, any>): void {
    this.owner = owner;

    this.listening = true;

    console.log(this.owner);
    this.owner.scale = new Vec2(0.125, 0.125);
    this.time = 5000;
    this.speed = 100;
    this.mainBehavior = true;
    this.damage = 1;
    if (options) {
      if (options.behavior === "secondary") {
        this.mainBehavior = false;
      }
      if (options.time) {
        this.time = options.time;
      }
      if (options.damage) {
        this.damage = options.damage;
      }
    }
    this.frozenTimer = new Timer(this.time);

    this.isFrozen = false;
    this.receiver = new Receiver();
    this.receiver.subscribe(PlayerAction.WALK_DOWN);
    this.receiver.subscribe(PlayerAction.WALK_LEFT);
    this.receiver.subscribe(PlayerAction.WALK_UP);
    this.receiver.subscribe(PlayerAction.WALK_RIGHT);
  }

  hit(): void {
    if (!this.isFrozen) {
      this.isFrozen = true;
      this.frozenTimer.start(this.time);
      this.mainBehavior = !this.mainBehavior;
    }
  }
  destroy(): void {
    // throw new Error("Method not implemented.");
  }
  activate(options: Record<string, any>): void {
    // throw new Error("Method not implemented.");
  }
  handleEvent(event: GameEvent): void {
    let movement = null;
    let newPos = null;
    switch (event.type) {
      case PlayerAction.WALK_DOWN:
        if (this.mainBehavior) movement = Vec2.UP.scaled(this.speed);
        else movement = Vec2.DOWN.scaled(this.speed);
        newPos = this.owner.position.clone().add(movement.scaled(this.deltaT));
        this.path = this.owner
          .getScene()
          .getNavigationManager()
          .getPath(Names.NAVMESH, this.owner.position, newPos, true);
        break;
      case PlayerAction.WALK_UP:
        if (this.mainBehavior) movement = Vec2.DOWN.scaled(this.speed);
        else movement = Vec2.UP.scaled(this.speed);
        newPos = this.owner.position.clone().add(movement.scaled(this.deltaT));
        this.path = this.owner
          .getScene()
          .getNavigationManager()
          .getPath(Names.NAVMESH, this.owner.position, newPos, true);
        break;
      case PlayerAction.WALK_LEFT:
        if (this.mainBehavior) movement = Vec2.RIGHT.scaled(this.speed);
        else movement = Vec2.LEFT.scaled(this.speed);
        newPos = this.owner.position.clone().add(movement.scaled(this.deltaT));
        this.path = this.owner
          .getScene()
          .getNavigationManager()
          .getPath(Names.NAVMESH, this.owner.position, newPos, true);
        break;
      case PlayerAction.WALK_RIGHT:
        if (this.mainBehavior) movement = Vec2.LEFT.scaled(this.speed);
        else movement = Vec2.RIGHT.scaled(this.speed);
        newPos = this.owner.position.clone().add(movement.scaled(this.deltaT));
        this.path = this.owner
          .getScene()
          .getNavigationManager()
          .getPath(Names.NAVMESH, this.owner.position, newPos, true);
        break;
      default:
        break;
    }
  }
  update(deltaT: number): void {
    this.deltaT = deltaT;
    if (this.frozenTimer.isStopped()) {
      this.isFrozen = false;
    }

    while (this.receiver.hasNextEvent()) {
      this.handleEvent(this.receiver.getNextEvent());
    }

    if (this.isFrozen) this.path = null;

    if (this.path != null && !this.isFrozen) {
      //Move on path if selected
      if (this.path.isDone()) {
        this.path = null;
      } else {
        this.owner.moveOnPath(this.speed * deltaT, this.path);
      }
    }
  }
}
