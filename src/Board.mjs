export class Board {
  width;
  height;
  board;
  fallingFlag;
  location;
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

  parseSymbol(symbol) {
    return {
      tetrominoArr: symbol.split('\n'),
      tetrominoStr: symbol,
      width: symbol.split('\n')[0].length,
      height: symbol.split('\n').length
    }
  }

  drop(symbol) {
    this.tetromino = this.parseSymbol(symbol);
    if(!this.fallingFlag){
      const x = parseInt((this.width - this.tetromino.width) / 2);
      for(let i = 0; i < this.tetromino.height; i++) {
        for(let j = 0; j < this.tetromino.width; j++) {
          this.board[i][x + j] = [...this.tetromino.tetrominoArr[i]][j];
        }
      }
      this.fallingFlag = true;
      this.location = { x, y: 0};
    }else{
      throw "already falling";
    }
  }

  canMove() {
    let bottomEdge = this.location.y + this.tetromino.height - 1;
    if(bottomEdge === this.height - 1) {
      this.fallingFlag = false;
      return;
    }

    for(let i = this.location.x; i < this.location.x + this.tetromino.width; i++){
      if(this.board[bottomEdge + 1][i] !== '.'){
        this.fallingFlag = false;
        return;
      }
    }
  }

  tick() {
    let bottomEdge = this.location.y + this.tetromino.height - 1;
    this.canMove();
    if(!this.fallingFlag) return;
    if(bottomEdge === this.height - 1) {
      this.fallingFlag = false;
      return;
    }

    if(this.board[bottomEdge + 1][this.location.x] === '.'){
      this.board[this.location.y + 1][this.location.x] = this.tetromino.tetrominoStr;
      this.board[this.location.y][this.location.x] = '.';
      this.location.y += 1;
    }
  }

  hasFalling() {
    return this.fallingFlag;
  }
}
