export class Board {
  width;
  height;
  board;

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
    this.board[0][1] = symbol;
  }

  tick() {
    for(let i=this.board.length - 1; i > 0; i--){
      this.board[i] = this.board[i - 1];
    }
    this.board[0] = new Array(this.width).fill('.');
  }
}
