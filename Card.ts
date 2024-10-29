import { Symbol } from "./Symbol";
import { Value } from "./Value";

export class Card {
    private val: Value;
    private sign: Symbol;

    constructor(val: Value, sign: Symbol) {
        this.val = val;
        this.sign = sign;
    }

    public getVal(): Value {
        return this.val;
    }

    public display(): string {
        return `${Value[this.val]} de ${Symbol[this.sign]}`;
    }
}