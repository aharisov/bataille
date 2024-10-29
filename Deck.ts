import { Card } from "./Card";
import { Symbol } from "./Symbol";
import { Value } from "./Value";

export class Deck {
    private cards: Card[];

    constructor() {
        this.cards = [];
    }

    public createDeck(): void {
        for (let i = 0; i < Object.values(Symbol).length; i++) {
            for (let j = 0; j < Object.values(Value).length; j++) {
                if (Symbol[Symbol[i]] != undefined && Value[Value[j]] != undefined)
                this.cards.push(new Card(Value[Value[j]], Symbol[Symbol[i]]))
            }
        }
    }

    public shuffle(): void {
        let deckTmp: Card[] = [];
        let usedIndex: number[] = [];

        while (deckTmp.length < 52) {
            let indTmp: number = Math.floor(Math.random() * 52);

            if (!usedIndex.includes(indTmp)) {
                usedIndex.push(indTmp);
                deckTmp.push(this.cards[indTmp]);
            }
        }

        this.cards = deckTmp;
        
        // this.display();
    }

    public addCard(card: Card): void {
        this.cards.unshift(card);
    }

    public draw(): Card {
        return this.cards.pop();
    }

    public display(): void {
        let i = 0;
        for (let card of this.cards) {
            console.log(i, card.display());
            i++;
        }
    }

    public countCards(): number {
        return this.cards.length;
    }
}