import { CardColor } from "./CardColor";
import { CardValue } from "./CardValue";
import { Game } from "./Game";

const game = new Game;

// game.generateCard(CardColor.CARREAU, CardValue.DEUX);
// console.log('--------- created deck ---------');
// game.showDeck();
// game.shuffleCards();
// console.log('--------- deck after chuffle ---------');
// game.showDeck();
game.createPlayers();
game.startGame();