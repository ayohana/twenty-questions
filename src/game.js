import { QuestionTree } from '../src/question-tree';

export class Game {
    constructor() {
        this.questionTree = new QuestionTree(),
        this.computerWins = 0,
        this.playerWins = 0,
        this.currentNode = null,
        this.questionsCounter = 0;
        this.isLastQuestion = false;
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
    
    getIsLastQuestion() {
        return this.isLastQuestion;
    }

    getQuestionsCounter() {
        return this.questionsCounter;
    }

    getNextQuestion(yesOrNo = null) {
        this.setCurrentNode(yesOrNo);
        this.setQuestionsCounter();

        let currentNode = this.getCurrentNode();
        if (currentNode) {
            if (currentNode.question) {                
                return currentNode.question;
            } else if (currentNode.answer) {
                this.resetQuestionsCounter();
                return `Are you thinking of: ${currentNode.answer}?`;
            }
        }
        return null;
    }

    resetQuestionsCounter() {
        this.questionsCounter = 0;
    }

    setQuestionsCounter() {
        this.questionsCounter += 1;
    }

    setPlayerWinsGame() {
        this.playerWins += 1;
    }

    setCompWinsGame() {
        this.computerWins += 1;
    }

    setCurrentNode(yesOrNo = null) {
        // Check if there is a currentNode
        this.setIsLastQuestionFalse();
        if (!yesOrNo && !this.currentNode) {
            this.currentNode = this.questionTree.root;
        } else if (!this.currentNode.yes && !this.currentNode.no) {
            // If it's a leaf node, leave the current node be
            this.setIsLastQuestionTrue();
            return;
        } else if (this.isYes(yesOrNo) && this.currentNode) {
            this.currentNode = this.currentNode.yes;
        } else if (!this.isYes(yesOrNo) && this.currentNode) {
            this.currentNode = this.currentNode.no;
        }
    }

    setIsLastQuestionTrue() {
        this.isLastQuestion = true;
    }

    setIsLastQuestionFalse() {
        this.isLastQuestion = false;
    }

    resetCurrentNode() {
        this.currentNode = null;
    }

    setNewNodes(newQ, yesOrNo, newA) {
        this.questionTree.insertNewQA(this.getCurrentNode(), newQ, yesOrNo, newA);     
    }

    isComputerWinner(yesOrNo) {
        if (this.isYes(yesOrNo)) {
            this.setCompWinsGame();
            return true;
        } else {
            this.setPlayerWinsGame();
            return false;
        }
    }

    currentNodeIsLeafNode() {
        if (!this.currentNode) return false;
        if (!this.currentNode.yes && !this.currentNode.no) {
            return true;
        } else {
            return false;
        }
    }

    // Returns true if user inputs a yes, otherwise false
    isYes(yesOrNo) {
        if (yesOrNo == null) return null;
        
        let yesses = ["yes", "y"];
        return yesses.includes(yesOrNo.toLowerCase()) ? true : false;
    }
}