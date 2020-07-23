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

    // Assume node will always be a leaf
    // Returns node to be removed and modifies the tree
    pop(nodeToPop) {
        // check if there is a root
        if (!nodeToPop || !this.root) return null;
        if (this.root == nodeToPop) {
            this.root = null;
            return nodeToPop;
        }

        // traverse the tree, starting from the root
        let currentNode = this.root;
        
        function traverse(currentNode) {
            if (currentNode.yes == nodeToPop || currentNode.no == nodeToPop) return currentNode;
            if (!currentNode.yes && !currentNode.no) return;
            if (currentNode.yes) traverse(currentNode.yes);
            if (currentNode.no) traverse(currentNode.no);
        }

        currentNode = traverse(currentNode);
        // console.log(currentNode);
        if (currentNode && currentNode.yes.answer === nodeToPop.answer) {
            currentNode.yes = null;
        } else if (currentNode && currentNode.no.answer === nodeToPop.answer) {
            currentNode.no = null;
        }
        
        return nodeToPop;
    }

    // Returns true if user inputs a yes, otherwise false
    isYes(yesOrNo) {
        let yesses = ["yes", "y"];
        return yesses.includes(yesOrNo.toLowerCase()) ? true : false;
    }
}