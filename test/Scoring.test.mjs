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
});
