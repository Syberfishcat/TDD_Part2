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
    
        test("wall kick: rotated against another block, moves to the open side", () => {
            board.drop(Tetromino.T_SHAPE);
            fallToBottom(board);
            board.drop(Tetromino.T_SHAPE);
            board.tick();
            board.tick();
            board.rotateLeft();
            
            expect(board.toString()).to.equalShape(
                `..........
                 ..........
                 ...T......
                 ..TT......
                 ...TT.....
                 ...TTT....`
            );
        })
    })

    describe("I shape", () => {
        test("a falling tetromino can be rotated right", () => {
            board.drop(Tetromino.I_SHAPE);
            board.tick();
            board.tick();
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

        test("a falling tetromino can be rotated left", () => {
            board.drop(Tetromino.I_SHAPE);
            board.tick();
            board.tick();
            board.rotateLeft();

            expect(board.toString()).to.equalShape(
                `....I.....
                 ....I.....
                 ....I.....
                 ....I.....
                 ..........
                 ..........`
            );
        })

        test("wall kick: rotated against another block, moves to the open side", () => {
            board.drop(Tetromino.I_SHAPE);
            fallToBottom(board);
            board.drop(Tetromino.I_SHAPE);
            board.tick();
            board.tick();
            board.tick();
            board.tick();
            board.rotateRight();
            
            expect(board.toString()).to.equalShape(
                `..........
                 ..........
                 ......I...
                 ......I...
                 ......I...
                 ..IIIII...`
            );
        })

        test("wall kick: rotated against the left wall, moves right", () => {
            board.drop(Tetromino.I_SHAPE);
            board.rotateRight();
            board.tick();
            board.tick();
            board.moveLeft();
            board.moveLeft();
            board.moveLeft();
            board.rotateRight();

            expect(board.toString()).to.equalShape(
                `..........
                 ..........
                 IIII......
                 ..........
                 ..........
                 ..........`
            );
        })

        test("wall kick: rotated against the left wall, moves right, supplement", () => {
            board.drop(Tetromino.I_SHAPE);
            board.rotateRight();
            board.tick();
            board.tick();
            board.moveLeft();
            board.moveLeft();
            board.moveLeft();
            board.moveLeft();
            board.rotateRight();

            expect(board.toString()).to.equalShape(
                `..........
                 ..........
                 IIII......
                 ..........
                 ..........
                 ..........`
            );
        })

        test("wall kick: rotated against the right wall, moves left", () => {
            board.drop(Tetromino.I_SHAPE);
            board.rotateLeft();
            board.tick();
            board.tick();
            board.moveRight();
            board.moveRight();
            board.moveRight();
            board.moveRight();
            board.moveRight();
            board.rotateLeft();

            expect(board.toString()).to.equalShape(
                `..........
                 ..........
                 ......IIII
                 ..........
                 ..........
                 ..........`
            );
        })
        test("wall kick: rotated against the top wall, moves down", () => {
            board.drop(Tetromino.I_SHAPE);
            board.rotateLeft();

            expect(board.toString()).to.equalShape(
                `....I.....
                 ....I.....
                 ....I.....
                 ....I.....
                 ..........
                 ..........`
            );
        })
    })
})