export class Tetromino {
    static T_SHAPE = '.T.\nTTT';

    constructor(symbol) {
        this.symbol = symbol;
        this.rows = symbol.split('\n');
        this.width = this.rows[0].length;
        this.height = this.rows.length;
    }
}