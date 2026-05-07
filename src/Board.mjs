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

  paintTetromino1() {
    let fallingXPos = this.fallingPos.x;
    let fallingYPos = this.fallingPos.y;
    let fallingSize = this.tetromino.shape.size;
  }

  paintTetromino() {
    this.board = this.frozen.map(row => [...row]);
    const { x, y } = this.fallingPos;
    this.tetromino.shape.cube.forEach((row, r) => 
      row.forEach((cell, c) => { if (cell !== '.') this.board[y + r][x + c] = cell; })
    );
  }

  paintFrozen(tetromino) {
    const { x, y } = this.fallingPos;
    tetromino.shape.cube.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell !== '.') this.frozen[y + r][x + c] = cell;
      });
    });
  }

  moveDown() {
    let bottomEdge = this.fallingPos.y + this.tetromino.height - 1;
    if(bottomEdge === this.height - 1) {
      this.fallingFlag = false;
      this.paintFrozen(this.tetromino);
      return;
    }

    for (let j = this.fallingPos.x; j <= this.fallingPos.x + this.tetromino.width - 1; j++) {
      if(this.board[bottomEdge + 1][j] !== '.') {
        this.fallingFlag = false;
        this.paintFrozen(this.tetromino);
        return;
      }
    }

    for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
      for (let j = this.fallingPos.x; j <= this.fallingPos.x + this.tetromino.width - 1; j++) {
        this.board[i + 1][j] = this.board[i][j];
        this.board[i][j] = '.';
      }
    }
    this.fallingPos.y += 1;
  }

  moveLeft() {
    let leftEdge = this.fallingPos.x;
    if(leftEdge === 0) return;

    let bottomEdge = this.fallingPos.y + this.tetromino.height - 1;
    for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
      if(this.board[i][leftEdge - 1] !== '.') return;
    }

    for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
      for (let j = this.fallingPos.x; j <= this.fallingPos.x + this.tetromino.width - 1; j++) {
        this.board[i][j - 1] = this.board[i][j];
        this.board[i][j] = '.';
      }
    }
    this.fallingPos.x -= 1;
  }

  moveRight() {
    let rightEdge = this.fallingPos.x + this.tetromino.width - 1;
    if(rightEdge === this.width - 1) return;

    let bottomEdge = this.fallingPos.y + this.tetromino.height - 1;
    for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
      if(this.board[i][rightEdge + 1] !== '.') return;
    }

    for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
      for (let j = this.fallingPos.x + this.tetromino.width - 1; j >= this.fallingPos.x; j--) {
        this.board[i][j + 1] = this.board[i][j];
        this.board[i][j] = '.';
      }
    }
    this.fallingPos.x += 1;
  }

  doRotate(tetromino) {
    let fallingXPos = this.fallingPos.x;
    let fallingYPos = this.fallingPos.y;
    let fallingSize = tetromino.shape.size;
    for(let y = fallingYPos; y < fallingYPos + fallingSize; y++) {
      for(let x = fallingXPos; x < fallingXPos + fallingSize; x++) {
        this.board[y][x] = tetromino.shape.cube.flat()[(y - fallingYPos) * fallingSize + x - fallingXPos];
      }
    }
  }

  detectCollision(tetromino) {
    let fallingXPos = this.fallingPos.x;
    let fallingYPos = this.fallingPos.y;
    for(let y = fallingYPos; y < fallingYPos + tetromino.height; y++) {
      for(let x = fallingXPos; x < fallingXPos + tetromino.shape.size; x++) {
        if(this.frozen[y][x] !== '.') return false;
      }
    }
    return true;
  }

  rotateRight() {
    let tetromino = this.tetromino.rotateRight();
    if(this.detectCollision(tetromino)) {
      this.tetromino = tetromino;
      this.doRotate(this.tetromino);
    }
  }

  rotateLeft() {
    let tetromino = this.tetromino.rotateLeft();
    if(this.detectCollision(tetromino)) {
      this.tetromino = tetromino;
      this.doRotate(this.tetromino);
    }
  }

  tick() {
    this.moveDown();
  }

  hasFalling() {
    return this.fallingFlag;
  }
}
