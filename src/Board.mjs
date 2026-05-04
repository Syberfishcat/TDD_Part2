export class Board {
  width;
  height;
  board;
  fallingFlag = true;

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

  isFalling() {
    return this.board.flat().filter(item => item !== '.').length === 0;
  }

  drop(symbol) {
    if(this.isFalling()){
      this.board[0][1] = symbol;
    }else{
      throw "already falling";
    }
  }

  tick() {
    let board_copy = structuredClone(this.board);
    for(let i = 0; i < this.width; i++) {
        if (this.board[this.height - 1][i] !== '.'){
          this.fallingFlag = false;
        }
    }
    for(let i=0; i<this.height - 1; i++) {
      for(let j=0; j<this.width; j++) {
        if(this.board[i][j] !== '.') {
          board_copy[i + 1][j] = board_copy[i][j];
          board_copy[i][j] = '.';
        }
      }
    }
    this.board = board_copy;
  }

  hasFalling() {
    return this.fallingFlag;
  }
}
