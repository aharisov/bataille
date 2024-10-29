import { Symbol } from "./Symbol";
import { Value } from "./Value";

export class Card {
    private val: Value;
    private sign: Symbol;

    public display(): string {
        return '';
    }
}