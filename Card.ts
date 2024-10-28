import { CardColor } from "./CardColor";
import { CardValue } from "./CardValue";

export class Card {
    color: CardColor;
    value: CardValue;

    constructor(color: CardColor, value: CardValue) {
        this.color = color,
        this.value = value
    }

    public getColor(): CardColor {
        return this.color;
    }

    public getValue(): CardValue {
        return this.value;
    }
}