import { Card } from "./Card";
import { Deck } from "./Deck";

export class Player {
    private name: string;
    private deck: Deck;

    constructor(name: string) {
        this.name = name;
        this.deck = new Deck();
    }

    public getName(): string {
        return this.name;
    }

    public play(): Card {
        return this.deck.draw();
    }

    public retreiveCards(d: Deck): void {
        if (this.deck.countCards() == 0) {
            this.deck = d;
        } else {
            while (d.countCards() > 0) {
                this.deck.addCard(d.draw());
            }
        }
    }

    public getNbCards(): number {
        return this.deck.countCards();
    }
}