import { Vec2 } from './Math';

import Entity from './Entity';
import Game from './Game';
import Board from './Board';

export default abstract class Cell extends Entity {
  board: Board;

  constructor(game: Game, board: Board, position: Vec2, size: Vec2) {
    super(game, position, size);
    this.board = board;
  }

  get coords(): Vec2 {
    return new Vec2(
      this.board.left + this.position.x * this.board.cellsize.x,
      this.board.top + this.position.y * this.board.cellsize.y,
    );
  }

  get screenSize(): Vec2 {
    return new Vec2(
      this.board.cellsize.x * this.size.x,
      this.board.cellsize.y * this.size.y,
    );
  }
}
