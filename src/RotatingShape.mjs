export class RotatingShape {
    static fromString(itemStr) {
        let str = [...itemStr].filter(item => /^[a-zA-Z\n]$/.test(item)).join('') + '\n'
        return str;
    }
}