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