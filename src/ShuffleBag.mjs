import { Tetromino } from "./Tetromino.mjs";

const ALL_PIECES = [
  Tetromino.T_SHAPE,
  Tetromino.I_SHAPE,
  Tetromino.O_SHAPE,
  Tetromino.S_SHAPE,
  Tetromino.Z_SHAPE,
  Tetromino.L_SHAPE,
  Tetromino.J_SHAPE,
];

export class ShuffleBag {
  constructor(rng = Math.random) {
    this.rng = rng;
    this.bag = [];
  }

  next() {
    if (this.bag.length === 0) this.refill();
    return this.bag.pop();
  }

  refill() {
    this.bag = [...ALL_PIECES];
    for (let i = this.bag.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng() * (i + 1));
      [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
    }
  }
}
