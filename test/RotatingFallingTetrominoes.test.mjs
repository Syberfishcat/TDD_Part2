import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { RotatingShape } from "../src/RotatingShape.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Rotating falling tetrominoes", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });

    describe("T shape", () => {
        test("a falling tetromino can be rotated right", () => {
            board.drop(Tetromino.T_SHAPE);
            board.rotateRight();
    
            expect(board.toString()).to.equalShape(
                `....T.....
                 ....TT....
                 ....T.....
                 ..........
                 ..........
                 ..........`
            );
        });

        test("a falling tetromino can be rotated left", () => {
            board.drop(Tetromino.T_SHAPE);
            board.rotateLeft();
    
            expect(board.toString()).to.equalShape(
                `....T.....
                 ...TT.....
                 ....T.....
                 ..........
                 ..........
                 ..........`
            );
        })

        test("it cannot be rotated right when there is no room (blocked by other blocks)", () => {
            board.drop(Tetromino.T_SHAPE);
            fallToBottom(board);
            board.drop(Tetromino.T_SHAPE);
            board.tick();
            board.tick();
            board.rotateRight();
            
            expect(board.toString()).to.equalShape(
                `..........
                 ..........
                 ....T.....
                 ...TTT....
                 ....T.....
                 ...TTT....`
            );
        })
    
        test("it cannot be rotated left when there is no room (blocked by other blocks)", () => {
            board.drop(Tetromino.T_SHAPE);
            fallToBottom(board);
            board.drop(Tetromino.T_SHAPE);
            board.tick();
            board.tick();
            board.rotateLeft();
            
            expect(board.toString()).to.equalShape(
                `..........
                 ..........
                 ....T.....
                 ...TTT....
                 ....T.....
                 ...TTT....`
            );
        })
    })

    describe("I shape", () => {
        test("a falling tetromino can be rotated right", () => {
            board.drop(Tetromino.I_SHAPE);
            board.rotateRight();
    
            expect(board.toString()).to.equalShape(
                `....I.....
                 ....I.....
                 ....I.....
                 ....I.....
                 ..........
                 ..........`
            );
        });
    })
})