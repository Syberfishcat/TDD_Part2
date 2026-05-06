import { RotatingShape } from "./RotatingShape.mjs";

function realign(rotated) {
    const cube = rotated.cube.map(r => [...r]);
    if (rotated.size === 3) {
        if (cube[2][1] === 'O') cube.push(cube.shift());
    }
    if (rotated.size === 5) {
        if (cube[4][2] === 'I') cube.push(cube.shift());
        if (cube[2][4] === 'I') cube.forEach(r => { r.shift(); r.push('.'); });
    }
    return new RotatingShape({ size: rotated.size, cube });
}


export class Tetromino {
    static T_SHAPE = Tetromino.fromOrientations([
        ".T.\nTTT\n...",
        ".T.\n.TT\n.T.",
        "...\nTTT\n.T.",
        ".T.\nTT.\n.T.",
    ]);

    static I_SHAPE = new Tetromino(`.....\n.....\nIIII.\n.....\n.....`);

    static O_SHAPE = new Tetromino(`.OO\n.OO\n...`);

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

        const seen = new Map();
        let cur = this.shape;
        while (!seen.has(cur.toString())) {
            seen.set(cur.toString(), cur);
            cur = realign(cur.rotateRight());
        }
        this.orientations = [...seen.values()];
        this.index = 0;
    }

    static fromOrientations(orientations) {
        return new Tetromino(orientations[0]);
    }

    static from(shape) {
        return new Tetromino(shape);
    }

    rotateRight() {
        const next = (this.index + 1) % this.orientations.length;
        return new Tetromino(this.orientations[next]);
    }
    
    rotateLeft() {
        const len = this.orientations.length;
        return new Tetromino(this.orientations[(this.index - 1 + len) % len]);
    }

    toString()    { return this.shape.toString(); }

}

