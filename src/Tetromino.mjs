import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    static T_SHAPE = new Tetromino(`.T.\nTTT\n...`);

    static I_SHAPE = new Tetromino(`.....\n.....\nIIII.\n.....\n.....`);

    static O_SHAPE = RotatingShape.fromString(
      `.OO
       .OO
       ...`
    );

    constructor(shape) {
        if (shape instanceof Tetromino) shape = shape.shape;
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

    rotateRight() { return new Tetromino(this.shape.rotateRight()); }
    rotateLeft()  { return new Tetromino(this.shape.rotateLeft()); }
    toString()    { return this.shape.toString(); }

}

class Tetromino1 {
    static T_SHAPE = new Tetromino1([".T.\nTTT\n...", ".T.\n.TT\n.T.", "...\nTTT\n.T.", ".T.\nTT.\n.T."], 0);
    static I_SHAPE = new Tetromino1([".....\n.....\nIIII.\n.....\n.....", "..I../..I../..I../..I../....."], 0);
    static O_SHAPE = new Tetromino1([".OO\n.OO\n..."], 0);
}
