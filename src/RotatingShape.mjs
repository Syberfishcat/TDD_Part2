export class RotatingShape {
    cube;
    size;
    constructor(fomatStr) {
        this.size = fomatStr.split('\n')[0].length;
        for (let i = 0; i < this.size; i++){
            for (let j = 0; j < this.size; j++) {
            }
        }
        this.cube = fomatStr;
    }

    static fromString(itemStr) {
        let str = [...itemStr].filter(item => /^[a-zA-Z\n]$/.test(item)).join('') + '\n'
        return new RotatingShape(str);
    }
    
    toString() {
        return this.cube.toString();
    }
}