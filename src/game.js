import { QuestionTree } from '../src/question-tree';

export class Game {
    constructor() {
        this.questionTree = new QuestionTree();
        this.computerWins = 0;
        this.playerWins = 0;
    }

    setPlayerWinsGame() {
        this.playerWins++;
    }

    setCompWinsGame() {
        this.computerWins++;
    }

    getPlayerWins() {
        return this.playerWins;
    }

    getComputerWins() {
        return this.computerWins;
    }
}