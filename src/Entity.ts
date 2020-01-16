import Game from './Game';

import { Vec2 } from './Math';
import { EventEmitter } from './Utils';

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export default abstract class Entity extends EventEmitter {
  game: Game;
  ctx: CanvasRenderingContext2D;
  position: Vec2;
  size: Vec2;
  waschanged: boolean;

  constructor(game, position: Vec2 = new Vec2(), size: Vec2 = new Vec2()) {
    super();
    this.game = game;
    this.ctx = game.ctx;
    this.position = position;
    this.size = size;
    this.waschanged = true;
  }

  get top() {
    return this.position.y;
  }

  get bottom() {
    return this.position.y + this.size.y;
  }

  get left() {
    return this.position.x;
  }

  get right() {
    return this.position.x + this.size.x;
  }

  get topleft() {
    return this.position;
  }

  get topright() {
    return new Vec2(this.right, this.top);
  }

  get bottomleft() {
    return new Vec2(this.left, this.bottom);
  }

  get bottomright() {
    return new Vec2(this.right, this.bottom);
  }

  abstract tick();

  abstract render();

  rerender() {
    if (!this.waschanged) return;
    this.render();
    this.waschanged = false;
  }
}
