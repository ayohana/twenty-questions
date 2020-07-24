import { QuestionTree } from '../src/question-tree';

export class Game {
    constructor() {
        this.questionTree = new QuestionTree();
        this.currentNode = null;
        this.computerWins = 0;
        this.playerWins = 0;
    }

    setPlayerWinsGame() {
        this.playerWins += 1;
    }

    setCompWinsGame() {
        this.computerWins += 1;
    }

    getPlayerWins() {
        return this.playerWins;
    }

    getComputerWins() {
        return this.computerWins;
    }
}