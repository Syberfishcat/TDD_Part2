import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { RotatingShape } from "../src/RotatingShape.mjs";

describe("Rotating falling tetrominoes", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
    });
})