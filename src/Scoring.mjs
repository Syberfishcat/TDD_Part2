export class Scoring {
  constructor() {
    this.score = 0;
  }

  onLinesCleared(n) {
    this.score += 40;
  }
}
