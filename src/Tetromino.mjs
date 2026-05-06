import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    static T_SHAPE = RotatingShape.fromString(
        `.T.
         TTT
         ...`);

    static I_SHAPE = RotatingShape.fromString(
      `.....
       .....
       IIII.
       .....
       .....`
    );

    static O_SHAPE = RotatingShape.fromString(
      `.OO
       .OO
       ...`
    );
    
    constructor(shape) {
        this.shape = shape instanceof RotatingShape
            ? shape
            : RotatingShape.fromString(shape);
        this.rows = this.shape.cube
            .map(row => row.join(''))
            .filter(row => [...row].some(cell => cell !== '.'));
        this.width = this.rows[0].length;
        this.height = this.rows.length;
    }

    static from(shape) {
        return new Tetromino(shape);
    }

}

class Tetromino1 {
    static T_SHAPE = new Tetromino1([".T.\nTTT\n...", ".T.\n.TT\n.T.", "...\nTTT\n.T.", ".T.\nTT.\n.T."], 0);
    static I_SHAPE = new Tetromino1(["...../...../IIII./...../.....", "..I../..I../..I../..I../....."], 0);
    static O_SHAPE = new Tetromino1([".OO\n.OO\n..."], 0);

    constructor(orientations, index) {
        this.orientations = orientations;
        this.index = index;
    };

    rotateRight() { return new Tetromino1(this.orientations, (this.index + 1) % this.orientations.length); }
    rotateLeft()  { return new Tetromino1(this.orientations, (this.index - 1 + this.orientations.length) % this.orientations.length); }
    toString()    { return this.orientations[this.index]; }
}
