export class Tetromino {
    static T_SHAPE = new Tetromino('.T.\nTTT');
    tetromino;
    location;
    height;
    width;
    constructor(pattern){
        this.tetromino = pattern.split('\n');
        this.width = this.tetromino[0].length;
        this.height = this.tetromino.length;
    }
}