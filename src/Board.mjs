import { Tetromino } from "./Tetromino.mjs";

export class Board {
  width;
  height;
  board;
  fallingFlag;
  tetromino;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = Array.from({ length: height }, () => new Array(width).fill('.'));
    this.frozen = Array.from({ length: height }, () => new Array(width).fill('.'));
    this.fallingPos = null;
  }

  toString() {
    let str = '';
    if (this.fallingFlag) {
      this.paintTetromino();
    } else {
      this.board = structuredClone(this.frozen);
    }
    this.board.forEach(h => {
      h.forEach(item => {
        str += item;
      })
      str += '\n'
    })
    return str;
  }

  drop(symbol) {
    if (this.fallingFlag) throw "already falling";
    this.tetromino = symbol instanceof Tetromino ? symbol : Tetromino.fromSymbol(symbol);
    const size = this.tetromino.size;
    const x = Math.floor((this.width - size) / 2);
    const firstRow = this.tetromino.cube.findIndex(row => row.some(c => c !== '.'));
    this.fallingPos = { x, y: 0 - firstRow };
    this.fallingFlag = true;
  }

  paintTetromino() {
    this.board = structuredClone(this.frozen);
    const { x, y } = this.fallingPos;
    const cube = this.tetromino.cube;
    for (let r = 0; r < cube.length; r++) {
      for (let c = 0; c < cube[r].length; c++) {
        const bY = y + r, bX = x + c;
        const inBounds = bY >= 0 && bY < this.height && bX >= 0 && bX < this.width;
        if (cube[r][c] !== '.' && inBounds) this.board[bY][bX] = cube[r][c];
      }
    }
  }

  paintFrozen(t) {
    const { x, y } = this.fallingPos;
    const cube = t.cube;
    for (let r = 0; r < cube.length; r++) {
      for (let c = 0; c < cube[r].length; c++) {
        const boardY = y + r;
        if (cube[r][c] !== '.' && boardY >= 0) {
          this.frozen[boardY][x + c] = cube[r][c];
        }
      }
    }
  }

  moveDown() {
    if (!this.fallingFlag) return;
    this.fallingPos.y++;
    if (!this.detectCollision(this.tetromino)) {
      this.fallingPos.y--;
      this.paintFrozen(this.tetromino);
      this.fallingFlag = false;
    }
  }

  moveLeft() {
    this.fallingPos.x--;
    if (!this.detectCollision(this.tetromino)) {
      this.fallingPos.x++;
    }
  }

  moveRight() {
    this.fallingPos.x++;
    if (!this.detectCollision(this.tetromino)) {
      this.fallingPos.x--;
    }
  }

  detectCollision(t) {
    const { x, y } = this.fallingPos;
    for (let r = 0; r < t.size; r++) {
      for (let c = 0; c < t.size; c++) {
        if (t.cube[r][c] === '.') continue;
        const row = y + r, col = x + c;
        const isOut = col < 0 || col >= this.width || row >= this.height;
        if (isOut || (row >= 0 && this.frozen[row][col] !== '.')) return false;
      }
    }
    return true;
  }

  rotateRight() {
    const next = this.tetromino.rotateRight();
    const oldX = this.fallingPos.x;
    const oldY = this.fallingPos.y;
    
    if(oldY < 0) this.fallingPos.y = 0;
    if(oldY + next.height > this.height - 1) this.fallingPos.y -= this.fallingPos.y + next.height - this.height;
    for (let dx of [0, 1, -1, 2, -2]) {
      this.fallingPos.x = oldX + dx;
      if (this.detectCollision(next)) return (this.tetromino = next);
    }
    this.fallingPos.x = oldX;
    this.fallingPos.y = oldY;
  }

  rotateLeft() {
    const next = this.tetromino.rotateLeft();
    const oldX = this.fallingPos.x;
    const oldY = this.fallingPos.y;
    
    if(oldY < 0) this.fallingPos.y = 0;
    if(oldY + next.height > this.height - 1) this.fallingPos.y -= this.fallingPos.y + next.height - this.height;
    for (let dx of [0, -1, 1, -2, 2]) {
      this.fallingPos.x = oldX + dx;
      if (this.detectCollision(next)) {
        this.tetromino = next;
        return;
      }
    }
    this.fallingPos.x = oldX;
    this.fallingPos.y = oldY;
  }

  tick() {
    this.moveDown();
  }

  hasFalling() {
    return this.fallingFlag;
  }
}
