export class Scoring {
  constructor() {
    this.score = 0;
  }

  onLinesCleared(n) {
    const points = [0, 40, 100, 300, 1200];
    this.score += points[n];
  }
}
