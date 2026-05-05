export class Tetromino {
    static T_SHAPE = '.T.\nTTT';

    constructor(symbol) {
        this.symbol = symbol;
        this.rows = symbol.split('\n');
        this.width = this.rows[0].length;
        this.height = this.rows.length;
    }

    static from(symbol) {
        return new Tetromino(symbol)
    }

    Move() {
        let bottomEdge = this.location.y + this.height - 1;
        for (let i = bottomEdge; i >= bottomEdge - this.height + 1; i--) {
        for (let j = this.location.x; j <= this.location.x + this.width - 1; j++) {
            this.board[i + 1][j] = this.board[i][j];
            this.board[i][j] = '.';
        }
        }
        this.location.y += 1;
    }

    canMove() {
        console.log(this.location)
        let bottomEdge = this.location.y + this.height - 1;
        if(bottomEdge === this.height - 1) {
        this.fallingFlag = false;
        return false;
        }
    }
}