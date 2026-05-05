export class RotatingShape {
    cube;
    size;
    constructor(obj) {
        this.cube = obj.cube;
        this.size = obj.size;
    }

    static fromString(str) {
        let fomatStr = [...str].filter(item => /^[a-zA-Z\n]$/.test(item)).join('') + '\n';
        let size = fomatStr.split('\n')[0].length;
        let cube = Array.from({ length: size }, () => new Array(size).fill(''));
        let formatArr = [...fomatStr].filter(c => c !== '\n');
        for (let i = 0; i < size; i++){
            for (let j = 0; j < size; j++) {
                cube[i][j] = formatArr[i * size + j];
            }
        }
        return new RotatingShape({size: size, cube: cube});
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
        return new RotatingShape({cube: [['G','D','A'], ['H','E','B'], ['I','F','C']], size: 3});
    }

    rotateLeft() {
        return new RotatingShape({cube: [['C','F','I'], ['B','E','H'], ['A','D','G']], size: 3});
    }
}