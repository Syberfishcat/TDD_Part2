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
        let bottomEdge = this.tetromino.location.y + this.tetromino.height - 1;
        for (let i = bottomEdge; i >= bottomEdge - this.tetromino.height + 1; i--) {
        for (let j = this.tetromino.location.x; j <= this.tetromino.location.x + this.tetromino.width - 1; j++) {
            this.board[i + 1][j] = this.board[i][j];
            this.board[i][j] = '.';
        }
        }
        this.tetromino.location.y += 1;
    }

    canMove() {
        let bottomEdge = this.tetromino.location.y + this.tetromino.height - 1;
        if(bottomEdge === this.height - 1) {
        this.fallingFlag = false;
        return false;
        }

        
    }
}