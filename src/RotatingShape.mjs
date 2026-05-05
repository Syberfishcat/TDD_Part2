export class RotatingShape {
    cube;
    size;
    constructor(obj) {
        this.cube = obj.cube;
        this.size = obj.size;
    }

    static fromString(str) {
        const rows = str
            .trim()
            .split('\n')
            .map(row => row.trim());
        
        const size = rows[0].length;
        const cube = rows.map(row => [...row]);
        return new RotatingShape({ size, cube });
    }
    
    toString() {
        let res = "";
        for (let i = 0; i < this.size; i++){
            for (let j = 0; j < this.size; j++) {
                res += this.cube[i][j];
            }
            res += '\n'
        }
        return res;
    }

    rotateRight() {
        let newCube = Array.from({ length: this.size }, () => new Array(this.size).fill(''));
        for (let i = 0; i < this.size; i++){
            for (let j = 0; j < this.size; j++) {
                newCube[j][this.size - 1 - i] = this.cube[i][j];
            }
        }
        return new RotatingShape({size: this.size, cube: newCube});
    }

    rotateLeft() {
        let newCube = Array.from({ length: this.size }, () => new Array(this.size).fill(''));
        for (let i = 0; i < this.size; i++){
            for (let j = 0; j < this.size; j++) {
                newCube[this.size - 1 - j][i] = this.cube[i][j];
            }
        }
        return new RotatingShape({size: this.size, cube: newCube});
    }
}