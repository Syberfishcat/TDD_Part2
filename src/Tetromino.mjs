import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    static T_SHAPE = Tetromino.fromOrientations([
        "...\nTTT\n.T.",
        ".T.\nTT.\n.T.",
        ".T.\nTTT\n...",
        ".T.\n.TT\n.T.",
    ]);

    static I_SHAPE = Tetromino.fromOrientations([
        "....\nIIII\n....\n....",
        "..I.\n..I.\n..I.\n..I.",
    ]);

    static O_SHAPE = Tetromino.fromOrientations([
        "OO\nOO",
    ]);

    static S_SHAPE = Tetromino.fromOrientations([
        "...\n.SS\nSS.",
        "S..\nSS.\n.S.",
    ]);

    static Z_SHAPE = Tetromino.fromOrientations([
        "...\nZZ.\n.ZZ",
        ".Z.\nZZ.\nZ..",
    ]);

    static L_SHAPE = Tetromino.fromOrientations([
        "...\nLLL\nL..",
        "LL.\n.L.\n.L.",
        "..L\nLLL\n...",
        ".L.\n.L.\n.LL",
    ]);

    static J_SHAPE = Tetromino.fromOrientations([
        "...\nJJJ\n..J",
        ".J.\n.J.\nJJ.",
        "J..\nJJJ\n...",
        ".JJ\n.J.\n.J.",
    ]);

    constructor(orientations, index = 0) {
        this.shape = orientations[index];
        this.cube = this.shape.cube;
        this.size = this.shape.size;
        this.rows = this.cube
            .map(row => row.join(''))
            .filter(row => [...row].some(cell => cell !== '.'));
        this.width = this.rows[0].length;
        this.height = this.rows.length;

        this.orientations = orientations || [this.shape];
        this.index = index;
    }

    static fromOrientations(orientations) {
        return new Tetromino(orientations.map(Tetromino.parseShape));
    }

    static fromSymbol(symbol) {
        return new Tetromino([Tetromino.parseShape(symbol)]);
    }

    static parseShape(str) {
        const cube = str.trim().split('\n').map(row => [...row.trim()]);
        return { cube, size: cube.length, toString: () => cube.map(r => r.join('')).join('\n') + '\n' };
    }

    rotateRight() {
        const next = (this.index + 1) % this.orientations.length;
        return new Tetromino(this.orientations, next);
    }

    rotateLeft() {
        const len = this.orientations.length;
        const next = (this.index - 1 + len) % len;
        return new Tetromino(this.orientations, next);
    }

    toString()    { return this.shape.toString(); }

}

