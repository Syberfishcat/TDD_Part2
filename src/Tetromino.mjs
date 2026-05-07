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

    constructor(orientations, index = 0) {
        this.shape = orientations[index];
        this.rows = this.shape.cube
            .map(row => row.join(''))
            .filter(row => [...row].some(cell => cell !== '.'));
        this.width = this.rows[0].length;
        this.height = this.rows.length;

        this.orientations = orientations || [this.shape];
        this.index = index;
    }

    static fromOrientations(orientations) {
        const shapes = orientations.map(s => RotatingShape.fromString(s));
        return new Tetromino(shapes);
    }

    static fromSymbol(symbol) {
        let orientations = new Array(RotatingShape.fromString(symbol));
        return new Tetromino(orientations);
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

