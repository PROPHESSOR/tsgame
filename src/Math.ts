export class Vec2 {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    [this.x, this.y] = [x, y];
  }

  map(callback): Vec2 {
    return Vec2.fromArray([this.x, this.y].map(callback));
  }

  toArray(): Array<number> {
    return [this.x, this.y];
  }

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }

  static fromArray(array: Array<number>): Vec2 {
    return new Vec2(...array);
  }

  static notZero(vec: Vec2) {
    if (vec.x === 0 && vec.y === 0)
      throw new Error(`Vec2 mustn't be (0, 0)!`);
  }
}
