export class RotatingShape {
    cube;
    size;
    constructor(str) {
        if(str.map){}else{
            let fomatStr = [...str].filter(item => /^[a-zA-Z\n]$/.test(item)).join('') + '\n';
            this.size = fomatStr.split('\n')[0].length;
            this.cube = Array.from({ length: this.size }, () => new Array(this.size).fill(''));
            let formatArr = [...fomatStr].filter(c => c !== '\n');
            for (let i = 0; i < this.size; i++){
                for (let j = 0; j < this.size; j++) {
                    this.cube[i][j] = formatArr[i * this.size + j];
                }
            }
        }
    }

    static fromString(str) {
        return new RotatingShape(str);
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
        return new RotatingShape(
            `GDA
            HEB
            IFC`
        );
    }

    rotateLeft() {
        return new RotatingShape(
            `CFI
            BEH
            ADG`
        )
    }
}