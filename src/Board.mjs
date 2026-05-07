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
    if(this.tetromino) {
      this.paintTetromino();
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
    if(!this.fallingFlag){
      this.tetromino = symbol instanceof Tetromino ? symbol : Tetromino.fromSymbol(symbol);
      const x = parseInt((this.width - this.tetromino.width) / 2);
      this.fallingFlag = true;
      this.fallingPos = { x, y: 0 }
      this.paintTetromino();
    }else{
      throw "already falling";
    }
  }

  paintTetromino() {
    this.board = structuredClone(this.frozen);
    const { x, y } = this.fallingPos;
    const cube = this.tetromino.shape.cube;
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
    const cube = t.shape.cube;
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
    for (let r = 0; r < t.shape.size; r++) {
      for (let c = 0; c < t.shape.size; c++) {
        if (t.shape.cube[r][c] === '.') continue;
        const row = y + r, col = x + c;
        if (col < 0 || col >= this.width || row >= this.height) return false;
        if (row >= 0 && this.frozen[row][col] !== '.') return false;
      }
    }
    return true;
  }

  rotateRight() {
    const next = this.tetromino.rotateRight();
    if (this.detectCollision(next)) this.tetromino = next;
  }

  rotateLeft() {
    const next = this.tetromino.rotateLeft();
    if (this.detectCollision(next)) this.tetromino = next;
  }

  tick() {
    this.moveDown();
  }

  hasFalling() {
    return this.fallingFlag;
  }
}
