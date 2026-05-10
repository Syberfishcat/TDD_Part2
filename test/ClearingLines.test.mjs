import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Clearing lines", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a single full row is removed", () => {
    for (let j of [0, 1, 2, 7, 8, 9]) board.frozen[5][j] = 'X';
    board.drop(Tetromino.I_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("notifies the observer with the number of cleared rows", () => {
    const cleared = [];
    board.setObserver({ onLinesCleared: (n) => cleared.push(n) });
    for (let j of [0, 1, 2, 7, 8, 9]) board.frozen[5][j] = 'X';
    board.drop(Tetromino.I_SHAPE);
    fallToBottom(board);

    expect(cleared).to.deep.equal([1]);
  });

  test("rows above a cleared row move down", () => {
    board.frozen[4][0] = 'X';
    for (let j of [0, 1, 2, 7, 8, 9]) board.frozen[5][j] = 'X';
    board.drop(Tetromino.I_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       X.........`
    );
  });

  test("four full rows are removed at once (Tetris)", () => {
    for (let i = 2; i < 6; i++) {
      for (let j = 0; j < 10; j++) {
        if (j !== 4) board.frozen[i][j] = 'X';
      }
    }
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });
});
