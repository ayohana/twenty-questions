import { QuestionTree } from '../src/question-tree';

export class Game {
    constructor() {
        this.questionTree = new QuestionTree(),
        this.computerWins = 0,
        this.playerWins = 0,
        this.currentNode = null
    }

    getPlayerWins() {
        return this.playerWins;
    }

    getComputerWins() {
        return this.computerWins;
    }

    getCurrentNode() {
        return this.currentNode;
    }

    setPlayerWinsGame() {
        this.playerWins += 1;
    }

    setCompWinsGame() {
        this.computerWins += 1;
    }

    setCurrentNode(yesOrNo = null) {
        // Check if there is a currentNode
        if (!yesOrNo && !this.currentNode) {
            this.currentNode = this.questionTree.root;
        } else if (this.isYes(yesOrNo) && this.currentNode) {
            this.currentNode = this.currentNode.yes;
        } else if (!this.isYes(yesOrNo) && this.currentNode) {
            this.currentNode = this.currentNode.no;
        } else {
            this.currentNode = null;
        }
    }

    setNewNodes(newQ, yesOrNo, newA) {
        if (this.currentNode) {
            this.questionTree.insertNewQA(this.getCurrentNode(), newQ, yesOrNo, newA)
            this.setCurrentNode();
        }
    }

    // Returns true if user inputs a yes, otherwise false
    isYes(yesOrNo) {
        if (yesOrNo == null) return null;
        
        let yesses = ["yes", "y"];
        return yesses.includes(yesOrNo.toLowerCase()) ? true : false;
    }
}