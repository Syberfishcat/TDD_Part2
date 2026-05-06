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
        return this.cube.map(row => row.join('')).join('\n') + '\n';
    }

    rotateRight() {
        let newCube = Array.from({ length: this.size }, () => new Array(this.size).fill('.'));

        for (let i = 0; i < this.size; i++){
            for (let j = 0; j < this.size; j++) {
                newCube[j][this.size - 1 - i] = this.cube[i][j];
            }
        }
        // if (this.size === 5) {
        //     if (newCube[4][2] === 'I') newCube.push(newCube.shift());
        //     if (newCube[2][4] === 'I') newCube.forEach(r => { r.shift(); r.push('.'); });
        // }
        // if (this.size === 3) {
        //     if (newCube[2][1] === 'O') newCube.push(newCube.shift());
        // }
        return new RotatingShape({ size: this.size, cube: newCube });
    }

    rotateLeft() {
        let newCube = Array.from({ length: this.size }, () => new Array(this.size).fill('.'));

        for (let i = 0; i < this.size; i++){
            for (let j = 0; j < this.size; j++) {
                newCube[this.size - 1 - j][i] = this.cube[i][j];
            }
        }

        // if (this.size === 3) {
        //     if (newCube[0][0] === 'O') newCube.forEach(r => { r.pop(); r.unshift('.'); });
        // }
        
        // if (this.size === 5) {
        //     if (newCube[4][2] === 'I') newCube.push(newCube.shift());
        //     if (newCube[2][4] === 'I') newCube.forEach(r => { r.shift(); r.push('.'); });
        // }

        return new RotatingShape({ size: this.size, cube: newCube });
    }
}