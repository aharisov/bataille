import { Card } from "./Card";
import { Deck } from "./Deck";
import { Player } from "./Player";

export class Game {
    private player1: Player;
    private player2: Player;
    private round: number;
    private field: Deck;

    constructor() {
        this.player1 = new Player('Player1');
        this.player2 = new Player('Player2');
        this.round = 0;
        this.field = new Deck();
    }

    private hasWinner(): Player | undefined {
        if (this.player1.getNbCards() == 0) {
            return this.player2;
        } else if (this.player2.getNbCards() == 0) {
            return this.player1;
        } else {
            return undefined;
        }
    }

    private gameloop(): Player {
        // draw players info in console
        let player1Info: string = `------${this.player1.getName()} : ${this.player1.getNbCards()} ------`;
        let player2Info: string = `------${this.player2.getName()} : ${this.player2.getNbCards()} ------`;
        console.log(`${player1Info} Manche ${this.round} ${player2Info}\n`);
        
        // get players cards for this round
        let player1Card: Card = this.player1.play();
        let player2Card: Card = this.player2.play();
        // show what cards players got
        console.log(`${this.player1.getName()} joue : ${player1Card.display()}`);
        console.log(`${this.player2.getName()} joue : ${player2Card.display()}`);

        // create round deck
        let roundDeck: Deck = new Deck();
        roundDeck.addCard(player1Card);
        roundDeck.addCard(player2Card);

        // find round winner, add cards to winner's deck, return winner
        if (player1Card.getVal() > player2Card.getVal()) {
            
            this.player1.retreiveCards(roundDeck);
            return this.player1;
        } else if (player1Card.getVal() < player2Card.getVal()) {

            this.player2.retreiveCards(roundDeck);
            return this.player2;
        } else {

            console.log('\n===========================================');
            console.log('                  BATAILLE !!!             ');
            console.log('Les deux joueurs jouent une carte face cachée.');
            console.log('===========================================');

            let battleWinner = this.battleRound(roundDeck);
            return battleWinner;
        }
    }

    private battleRound(roundDeck: Deck): Player {
        if (this.player1.getNbCards() > 2 && this.player2.getNbCards() > 2) {
            // add hidden cards to round deck
            roundDeck.addCard(this.player1.play());
            roundDeck.addCard(this.player2.play());
        }
        
        // get additional cards for play this battle
        let player1Card: Card = this.player1.play();
        let player2Card: Card = this.player2.play();

        console.log('check', player1Card, player2Card, roundDeck, this.player1.getNbCards(), this.player2.getNbCards());

        // show what additional cards players got
        console.log(`${this.player1.getName()} joue : ${player1Card.display()}`);
        console.log(`${this.player2.getName()} joue : ${player2Card.display()}`);

        // add additional cards to round deck
        roundDeck.addCard(player1Card);
        roundDeck.addCard(player2Card);

        // find round winner, add cards to winner's deck, return winner
        if (player1Card.getVal() > player2Card.getVal()) {
            
            this.player1.retreiveCards(roundDeck);
            return this.player1;
        } else if (player1Card.getVal() < player2Card.getVal()) {

            this.player2.retreiveCards(roundDeck);
            return this.player2;
        } else {
            return this.battleRound(roundDeck);
        }
    }

    public run() {
        this.dealCards();
        
        while (this.hasWinner() == undefined) {
            this.round++;
            let currentWinner = this.gameloop();

            // show round winner
            console.log(`\n${currentWinner.getName()} remporte la manche !\n`);
        }

        console.log(`${this.hasWinner().getName()} gagne !`);
    }

    public dealCards() {
        this.field.createDeck();
        this.field.shuffle();
        
        // create decks for players
        let player1Deck: Deck = new Deck();
        let player2Deck: Deck = new Deck();

        // distribute cards one by one for every player's deck
        for (let i = 0; i < 52; i++) {
            let card: Card = this.field.draw();
            
            if (i % 2 == 0) {
                player2Deck.addCard(card);
            } else {
                player1Deck.addCard(card);
            }
        }

        // add decks to players instances
        this.player1.retreiveCards(player1Deck);
        this.player2.retreiveCards(player2Deck);
    }
}