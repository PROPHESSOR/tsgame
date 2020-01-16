import Entity from '../Entity';
import { Switch } from '../Utils';
import { Vec2 } from '../Math';

export default class Placeful extends Entity {
  color: string;
  direction: Switch;

  constructor(ctx, position = new Vec2()) {
    super(ctx, position, new Vec2(8, 8));
    this.color = 'green';
    this.direction = new Switch('down', 'up');
  }

  tick() {
    switch (this.direction.case) {
      case 'up':
        this.position.y--;
        if (this.top <= 0) this.direction.switch('down');
        break;
      case 'down':
        this.position.y++;
        if (this.bottom >= this.game.window_size.y)
          this.direction.switch('up');
        break;
      default:
        throw new Error(`Unknown direction ${this.direction.case}`);
    }
  }

  render() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y,
    );
  }
}
