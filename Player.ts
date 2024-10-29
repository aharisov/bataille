import { Card } from "./Card";
import { Deck } from "./Deck";

export class Player {
    private name: string;
    private hand: Card[];
    private deck: Deck;

    public getName(): string {
        return this.name;
    }

    public play() {}

    public retreiveCards(d: Deck): Deck {
        return;
    }

    public getNbCards(): number {
        return 0;
    }


}