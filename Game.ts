import { Card } from "./Card";
import { Deck } from "./Deck";
import { Player } from "./Player";

export class Game {
    private player1: Player;
    private player2: Player;
    private round: number;
    private field: Deck;

    private hasWinner(): Player | undefined {
        return;
    }

    public run() {}

    public dealCards() {}

    private gameloop(): Player {
        return;
    }
}