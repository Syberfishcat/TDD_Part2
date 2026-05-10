import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Scoring } from "../src/Scoring.mjs";

describe("Scoring", () => {
  let scoring;
  beforeEach(() => {
    scoring = new Scoring();
  });

  test("starts at zero", () => {
    expect(scoring.score).to.equal(0);
  });

  test("a single line clear gives 40 points", () => {
    scoring.onLinesCleared(1);
    expect(scoring.score).to.equal(40);
  });

  test("a double line clear gives 100 points", () => {
    scoring.onLinesCleared(2);
    expect(scoring.score).to.equal(100);
  });

  test("a triple line clear gives 300 points", () => {
    scoring.onLinesCleared(3);
    expect(scoring.score).to.equal(300);
  });

  test("a tetris (4 lines) gives 1200 points", () => {
    scoring.onLinesCleared(4);
    expect(scoring.score).to.equal(1200);
  });
});
