import Entity, { Direction } from '../Entity';
import { Vec2 } from '../Math';
import Game from '../Game';
import Board from '../Board';
import Obstacle from './Obstacle';

const ARROW_SPEED: number = 2;

export default class Arrow extends Entity {
  color: string;
  direction: Direction;
  board: Board;

  constructor(game: Game, position: Vec2 = new Vec2()) {
    super(game, position, new Vec2(50, 15));
    this.board = game.board;
    this.direction = Direction.LEFT;
  }

  tick() {
    switch (this.direction) {
      case Direction.UP:
        this.position.y -= ARROW_SPEED;
        break;
      case Direction.DOWN:
        this.position.y += ARROW_SPEED;
        break;
      case Direction.LEFT:
        this.position.x -= ARROW_SPEED;
        break;
      case Direction.RIGHT:
        this.position.x += ARROW_SPEED;
        break;
      default:
        throw new Error(`Unknown direction ${this.direction}`);
    }

    const obstacles = []; // TODO:

    obstacles.push(
      new Obstacle(
        this.game,
        new Vec2(0, 0),
        new Vec2(0, this.board.size.y),
      ),
    );

    if (
      (this.direction === Direction.LEFT && this.right < 0) ||
      (this.direction === Direction.DOWN &&
        this.top >= this.board.bottom) ||
      (this.direction === Direction.UP && this.bottom < 0) ||
      (this.direction === Direction.RIGHT && this.left >= this.board.right)
    )
      this.emit('destroy');
  }

  render() {
    const { ctx } = this;

    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(this.position.x - this.size.x / 2, this.position.y);
    ctx.lineTo(this.position.x + this.size.x / 2, this.position.y);
    ctx.moveTo(this.position.x - this.size.x / 2, this.position.y);
    ctx.lineTo(this.position.x, this.position.y + this.size.y / 2);
    ctx.moveTo(this.position.x - this.size.x / 2, this.position.y);
    ctx.lineTo(this.position.x, this.position.y - this.size.y / 2);
    ctx.moveTo(
      this.position.x + this.size.x / 2 - this.size.x / 4,
      this.position.y,
    );
    ctx.lineTo(
      this.position.x + this.size.x / 2,
      this.position.y - this.size.y / 2,
    );
    ctx.moveTo(
      this.position.x + this.size.x / 2 - this.size.x / 4,
      this.position.y,
    );
    ctx.lineTo(
      this.position.x + this.size.x / 2,
      this.position.y + this.size.y / 2,
    );
    ctx.stroke();
  }
}
