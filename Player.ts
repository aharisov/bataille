import { Card } from "./Card";

export class Player {
    name: string;
    cards: Card[];

    constructor(name: string, cards: Card[]) {
        this.name = name,
        this.cards = cards
    }

    public getName(): string {
        return this.name;
    }

    public getCards(): Card[] {
        return this.cards;
    }

    public addCards(newCards: Card[]): void {
        for (let card of newCards) {
            this.cards.unshift(card);
        }
    }

    public getTopCard(): Card {
        return this.cards.pop();
    }
}