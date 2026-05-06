import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    static T_SHAPE = Tetromino.fromOrientations([
        ".T.\nTTT\n...",
        ".T.\n.TT\n.T.",
        "...\nTTT\n.T.",
        ".T.\nTT.\n.T.",
    ]);

    static I_SHAPE = Tetromino.fromOrientations([
        ".....\n.....\nIIII.\n.....\n.....",
        "..I..\n..I..\n..I..\n..I..\n.....",
    ]);

    static O_SHAPE = Tetromino.fromOrientations([
        ".OO\n.OO\n...",
    ]);

    constructor(shape, orientations, index = 0) {
        if (shape instanceof Tetromino) shape = shape.shape;
        this.shape = shape instanceof RotatingShape
            ? shape
            : RotatingShape.fromString(shape);
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
        return new Tetromino(shapes[0], shapes);
    }

    static from(shape) {
        return new Tetromino(shape);
    }

    rotateRight() {
        const next = (this.index + 1) % this.orientations.length;
        return new Tetromino(this.orientations[next], this.orientations, next);
    }

    rotateLeft() {
        const len = this.orientations.length;
        const next = (this.index - 1 + len) % len;
        return new Tetromino(this.orientations[next], this.orientations, next);
    }

    toString()    { return this.shape.toString(); }

}

