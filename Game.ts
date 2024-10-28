import { Card } from "./Card";
import { CardColor } from "./CardColor";
import { CardValue } from "./CardValue";
import { Player } from "./Player";

export class Game {
    cards: Card[];
    player1: Player;
    player2: Player;
    winner: Player;

    constructor() {
        this.cards = [];
        this.createDeck();
    }

    public generateCard(color: CardColor, value: CardValue): Card {
        console.log(`${CardValue[value]} de ${CardColor[color]}`);
        
        return new Card(color, value);
    }

    public createDeck(): void {
        for (let i = 0; i < Object.values(CardColor).length; i++) {
            for (let j = 0; j < Object.values(CardValue).length; j++) {
                if (CardColor[CardColor[i]] != undefined && CardValue[CardValue[j]] != undefined)
                this.cards.push(new Card(CardColor[CardColor[i]], CardValue[CardValue[j]]))
            }
        }
    }

    public showDeck(): void {
        for (let card of this.cards) {
            console.log(`${CardValue[card.value]} de ${CardColor[card.color]}`);
        }
    }

    public shuffleCards(): void {
        let deckTmp: Card[] = [];
        let usedIndex: number[] = [];

        while (deckTmp.length < 52) {
            let ind: number = Math.floor(Math.random() * 52);

            if (!usedIndex.includes(ind)) {
                deckTmp.push(this.cards[ind]);
            }
        }

        this.cards = deckTmp;
    }

    public createPlayers(): void {
        let player1Cards: Card[] = [];
        let player2Cards: Card[] = [];

        this.cards.forEach((card, index) => {
            if (index % 2 == 0) {
                player2Cards.push(card);
            } else {
                player1Cards.push(card);
            }
        })

        this.player1 = new Player('Player 1', player1Cards);
        this.player2 = new Player('Player 2', player2Cards);
    }

    public updatePlayer(player: Player, cards: Card[]): void {
        player.addCards(cards);
    }

    public makeMove(player: Player): Card {
        const playerCard: Card = player.getTopCard();

        console.log(`${player.getName()} joue : ${CardValue[playerCard.getValue()]} de ${CardColor[playerCard.getColor()]}`);

        return playerCard;
    }

    public isFirstWinner(card1: Card, card2: Card): boolean | undefined {
        if (card1.getValue() != card2.getValue()) {
            return card1.getValue() > card2.getValue();
        } 

        return undefined;
    }

    public startBattle(): Card[] {
        console.log('===========================================');
        console.log('                  BATAILLE !!!             ');
        console.log('Les deux joueurs jouent une carte face cachée.');
        console.log('===========================================');

        let player1CardHidden: Card = this.player1.getTopCard();
        let player2CardHidden: Card = this.player2.getTopCard();

        let player1CardNew: Card = this.player1.getTopCard();
        let player2CardNew: Card = this.player2.getTopCard();

        return [player1CardHidden, player2CardHidden, player1CardNew, player2CardNew];
    }

    public getWinner(): void {
        if (this.player1.getCards().length == 0) {
            this.winner = this.player2;
        } else {
            this.winner = this.player1;
        }
        
    }

    public playRound(counter: number): void {
        let player1Info: string = `------${this.player1.getName()} : ${this.player1.getCards().length} ------`;
        let player2Info: string = `------${this.player2.getName()} : ${this.player2.getCards().length} ------`;
        console.log(`${player1Info} Manche ${counter} ${player2Info}\n`);
        
        let player1Card: Card = this.makeMove(this.player1);
        let player2Card: Card = this.makeMove(this.player2);
        console.log('\n');

        let player1WinRound: boolean | undefined = this.isFirstWinner(player1Card, player2Card);
        
        if (player1WinRound == undefined) {
            let battleCards: Card[] = this.startBattle();
            player1WinRound = this.isFirstWinner(battleCards[battleCards.length - 1], battleCards[battleCards.length - 2]);

            if (player1WinRound) {
                this.player1.addCards(battleCards);
                console.log(`${this.player1.getName()} remporte la manche !`); 
            } else {
                this.player2.addCards(battleCards);
                console.log(`${this.player2.getName()} remporte la manche !`);
            }
        } else {
            if (player1WinRound) {
                this.player1.addCards([player1Card, player2Card]);
                console.log(`${this.player1.getName()} remporte la manche !`); 
            } else {
                this.player2.addCards([player2Card, player1Card]);
                console.log(`${this.player2.getName()} remporte la manche !`);
            }
        }

        console.log('\n\n');
    }

    startGame(): void {
        let roundCounter: number = 1;

        this.shuffleCards();
        this.createPlayers();
        
        while (this.player1.getCards().length > 0 || this.player2.getCards().length > 0) {

            if (this.player1.getCards().length > 0 && this.player2.getCards().length > 0) {
                this.playRound(roundCounter);
            } else {
                this.getWinner();
                break;
            }

            roundCounter++;
        }

        console.log(`${this.winner.getName()} a gagné !`);
    }
}