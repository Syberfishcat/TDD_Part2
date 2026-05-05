export class RotatingShape {
    shape;
    constructor(fomatStr) {
        this.shape = fomatStr;
    }

    static fromString(itemStr) {
        let str = [...itemStr].filter(item => /^[a-zA-Z\n]$/.test(item)).join('') + '\n'
        return new RotatingShape(str);
    }
    
    toString() {
        return this.shape.toString();
    }
}