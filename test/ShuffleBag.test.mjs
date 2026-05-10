import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

const ALL_PIECES = [
  Tetromino.T_SHAPE,
  Tetromino.I_SHAPE,
  Tetromino.O_SHAPE,
  Tetromino.S_SHAPE,
  Tetromino.Z_SHAPE,
  Tetromino.L_SHAPE,
  Tetromino.J_SHAPE,
];

describe("ShuffleBag", () => {
  let bag;
  beforeEach(() => {
    bag = new ShuffleBag();
  });

  test("every piece drawn is one of the 7 tetrominoes", () => {
    for (let i = 0; i < 14; i++) {
      const piece = bag.next();
      expect(ALL_PIECES).to.include(piece);
    }
  });

  test("each round of 7 draws contains all 7 pieces exactly once", () => {
    for (let round = 0; round < 3; round++) {
      const drawn = new Set();
      for (let i = 0; i < 7; i++) drawn.add(bag.next());
      expect(drawn.size).to.equal(7);
    }
  });
});
