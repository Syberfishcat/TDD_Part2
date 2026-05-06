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
    this.board.forEach(h => {
      h.forEach(item => {
        str += item;
      })
      str += '\n'
    })
    return str;
  }

  drop(symbol) {
    this.tetromino = symbol instanceof Tetromino ? symbol : Tetromino.fromSymbol(symbol);
    
    if(!this.fallingFlag){
      const x = parseInt((this.width - this.tetromino.width) / 2);
      for(let i = 0; i < this.tetromino.height; i++) {
        for(let j = 0; j < this.tetromino.width; j++) {
          this.board[i][x + j] = [...this.tetromino.rows[i]][j];
        }
      }
      this.fallingFlag = true;
      this.tetromino.location = { x, y: 0 };
      this.fallingPos = { x, y: 0 }
    }else{
      throw "already falling";
    }
  }

  moveDown() {
    let bottomEdge = this.tetromino.location.y + this.tetromino.height - 1;
    if(bottomEdge === this.height - 1) {
      this.fallingFlag = false;
      return;
    }

    for (let j = this.tetromino.location.x; j <= this.tetromino.location.x + this.tetromino.width - 1; j++) {
      if(this.board[bottomEdge + 1][j] !== '.') {
        this.fallingFlag = false;
        return;
      }
    }

    for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
      for (let j = this.tetromino.location.x; j <= this.tetromino.location.x + this.tetromino.width - 1; j++) {
        this.board[i + 1][j] = this.board[i][j];
        this.board[i][j] = '.';
      }
    }
    this.tetromino.location.y += 1;
    this.fallingPos.y += 1;
  }

  moveLeft() {
    let leftEdge = this.tetromino.location.x;
    if(leftEdge === 0) return;

    let bottomEdge = this.tetromino.location.y + this.tetromino.height - 1;
    for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
      if(this.board[i][leftEdge - 1] !== '.') return;
    }

    for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
      for (let j = this.tetromino.location.x; j <= this.tetromino.location.x + this.tetromino.width - 1; j++) {
        this.board[i][j - 1] = this.board[i][j];
        this.board[i][j] = '.';
      }
    }
    this.tetromino.location.x -= 1;
    this.fallingPos.y -= 1;
  }

  moveRight() {
    let rightEdge = this.tetromino.location.x + this.tetromino.width - 1;
    if(rightEdge === this.width - 1) return;

    let bottomEdge = this.tetromino.location.y + this.tetromino.height - 1;
    for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
      if(this.board[i][rightEdge + 1] !== '.') return;
    }

    for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
      for (let j = this.tetromino.location.x + this.tetromino.width - 1; j >= this.tetromino.location.x; j--) {
        this.board[i][j + 1] = this.board[i][j];
        this.board[i][j] = '.';
      }
    }
    this.tetromino.location.x += 1;
    this.fallingPos.x += 1;
  }

  rotateRight() {
    this.tetromino = this.tetromino.rotateRight();
    let fallingXPos = this.fallingPos.x;
    let fallingYPos = this.fallingPos.y;
    let fallingSize = this.tetromino.shape.size;
    for(let y = fallingYPos; y < fallingYPos + fallingSize; y++) {
      for(let x = fallingXPos; x < fallingXPos + fallingSize; x++) {
        this.board[y][x] = this.tetromino.shape.cube.flat()[(y - fallingYPos) * fallingSize + x - fallingXPos];
      }
    }
  }

  tick() {
    this.moveDown();
  }

  hasFalling() {
    return this.fallingFlag;
  }
}
