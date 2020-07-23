import { Node } from '../src/node';

export class QuestionTree {
    constructor() {
        this.root = new Node(null, "computer")
    }

    // insertNewQA method should replace the root/old leaf node with a new question node, then the new root should have the old leaf and the new answer node as its children
    insertNewQA(currentNode, newQ, yesOrNo, newA) {
        let newQuestionNode = new Node(newQ, null);
        let newAnswerNode = new Node(null, newA);
        let oldNode = new Node(null, currentNode.answer);

        if (this.isYes(yesOrNo)) {
            newQuestionNode.yes = newAnswerNode;
            newQuestionNode.no = oldNode;
        } else {
            newQuestionNode.no = newAnswerNode;
            newQuestionNode.yes = oldNode;
        }

        currentNode = newQuestionNode;

        // let newQuestionNode = new Node(newQ, null);
        // let newAnswerNode = new Node(null, newA);
        // let oldNode = currentNode;

        // currentNode = newQuestionNode;
        // if (this.isYes(yesOrNo)) {
        //     currentNode.yes = newAnswerNode;
        //     currentNode.no = oldNode;
        // } else {
        //     currentNode.no = newAnswerNode;
        //     currentNode.yes = oldNode;
        // }        
    }

    pop(nodeToPop) {
        // pop method should modify the tree and returns the popped leaf node
        return nodeToPop;
    }

    isYes(yesOrNo) {
        let yesses = ["yes", "y"];
        return yesses.includes(yesOrNo.toLowerCase()) ? true : false;
    }
}