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
    let tetromino = symbol.split('\n');
    let width = tetromino[0].length;
    let height = tetromino.length;
    if(!this.fallingFlag){
      for(let i = 0; i < height; i++) {
        for(let j = 0; j < width; j++) {
          this.board[i][parseInt((this.width - width) / 2) + j] = [...tetromino[i]][j];
        }
      }
      this.fallingFlag = true;
      this.symbol = symbol;
      this.location = { x: 1, y: 0};
    }else{
      throw "already falling";
    }
  }

  tick() {
    if(this.location.y === this.height - 1) {
      this.fallingFlag = false;
      return;
    }else {
      if(this.board[this.location.y + 1][this.location.x] === '.'){
        this.board[this.location.y + 1][this.location.x] = this.symbol;
        this.board[this.location.y][this.location.x] = '.';
        this.location.y += 1;
      }else{
        this.fallingFlag = false;
      }
    }
  }

  hasFalling() {
    return this.fallingFlag;
  }
}
