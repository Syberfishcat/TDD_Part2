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
        if (cube[r][c] !== '.') {
          this.board[y + r][x + c] = cube[r][c];
        }
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

    this.fallingPos.y += 1;
  }

  moveLeft() {
    let leftEdge = this.fallingPos.x;

    if(leftEdge === 0) return;
    let bottomEdge = this.fallingPos.y + this.tetromino.height - 1;
    for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
      if(this.board[i][leftEdge - 1] !== '.') return;
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
