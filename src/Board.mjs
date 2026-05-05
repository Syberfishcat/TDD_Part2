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
    this.board = Array.from({ length: height }, () => new Array(width).fill('.'))
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
    this.tetromino = Tetromino.from(symbol);
    if(!this.fallingFlag){
      const x = parseInt((this.width - this.tetromino.width) / 2);
      for(let i = 0; i < this.tetromino.height; i++) {
        for(let j = 0; j < this.tetromino.width; j++) {
          this.board[i][x + j] = [...this.tetromino.rows[i]][j];
        }
      }
      this.fallingFlag = true;
      this.tetromino.location = { x, y: 0 };
    }else{
      throw "already falling";
    }
  }

  canMove() {
    let bottomEdge = this.tetromino.location.y + this.tetromino.height - 1;
    if(bottomEdge === this.height - 1) {
      this.fallingFlag = false;
      return false;
    }

    for(let i = this.tetromino.location.x; i < this.tetromino.location.x + this.tetromino.width; i++){
      if(this.board[bottomEdge + 1][i] !== '.'){
        this.fallingFlag = false;
        return false;
      }
    }
    return true;
  }

  moveDown() {
    let bottomEdge = this.tetromino.location.y + this.tetromino.height - 1;
    for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
      for (let j = this.tetromino.location.x; j <= this.tetromino.location.x + this.tetromino.width - 1; j++) {
        this.board[i + 1][j] = this.board[i][j];
        this.board[i][j] = '.';
      }
    }
    this.tetromino.location.y += 1;
  }

  moveLeft() {
    let bottomEdge = this.tetromino.location.y + this.tetromino.height - 1;
    for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
      for (let j = this.tetromino.location.x; j <= this.tetromino.location.x + this.tetromino.width - 1; j++) {
        this.board[i][j - 1] = this.board[i][j];
        this.board[i][j] = '.';
      }
    }
    this.tetromino.location.x -= 1;
  }

  moveRight() {
    let bottomEdge = this.tetromino.location.y + this.tetromino.height - 1;
    for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
      for (let j = this.tetromino.location.x + this.tetromino.width - 1; j >= this.tetromino.location.x; j--) {
        this.board[i][j + 1] = this.board[i][j];
        this.board[i][j] = '.';
      }
    }this.tetromino.location.x += 1;
  }

  tick() {
    let bottomEdge = this.tetromino.location.y + this.tetromino.height - 1;
    if(!this.canMove()) return;

    this.moveDown();
  }

  hasFalling() {
    return this.fallingFlag;
  }
}
