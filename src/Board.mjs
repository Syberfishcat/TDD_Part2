export class Board {
  width;
  height;
  board;
  fallingFlag;
  symbol;
  location;

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
    if(!this.fallingFlag){
      this.board[0][1] = symbol;
      this.fallingFlag = true;
      this.symbol = symbol;
      this.location = { x: 1, y: 0};
    }else{
      throw "already falling";
    }
  }

  tick() {
    let board_copy = structuredClone(this.board);
    for(let i = 0; i < this.width; i++) {
      if (this.board[this.height - 1][i] === this.symbol){
        this.fallingFlag = false;
      }
    }
    for(let i=0; i<this.height - 1; i++) {
      for(let j=0; j<this.width; j++) {
        if(this.board[i][j] === this.symbol) {
          if(this.board[i + 1][j] === '.'){
            board_copy[i + 1][j] = board_copy[i][j];
            board_copy[i][j] = '.';
            this.location.y++;
          }else{
            this.fallingFlag = false;
          }
        }
      }
    }
    this.board = board_copy;
  }

  hasFalling() {
    return this.fallingFlag;
  }
}
