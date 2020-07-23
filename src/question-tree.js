import { Node } from '../src/node';

export class QuestionTree {
    constructor() {
        this.root = new Node(null, "computer")
    }

    // Inserts two new nodes correctly into the tree
    insertNewQA(currentNode, newQ, yesOrNo, newA) {
        let newQuestionNode = new Node(newQ, null);
        let newAnswerNode = new Node(null, newA);

        // Check if there is a root
        if (!this.root) return;
        if (this.root == currentNode) {
            this.root = newQuestionNode;
            if (this.isYes(yesOrNo)) {
                this.root.yes = newAnswerNode;
                this.root.no = currentNode;
            } else {
                this.root.no = newAnswerNode;
                this.root.yes = currentNode;
            }
            return;
        }

        
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
        // Check if there is a root
        if (!nodeToPop || !this.root) return null;
        if (this.root == nodeToPop) {
            this.root = null;
            return nodeToPop;
        }

        // Traverse the tree, starting from the root
        let currentNode = this.root;        
        function traverse(currentNode) {
            if (currentNode.yes == nodeToPop) {
                currentNode.yes = null;
                return currentNode;
            } else if (currentNode.no == nodeToPop) {
                currentNode.no = null;
                return currentNode;
            }
            if (!currentNode.yes && !currentNode.no) return;
            if (currentNode.yes) traverse(currentNode.yes);
            if (currentNode.no) traverse(currentNode.no);
        }

        traverse(currentNode);        
        return nodeToPop;
    }

    // Returns true if user inputs a yes, otherwise false
    isYes(yesOrNo) {
        let yesses = ["yes", "y"];
        return yesses.includes(yesOrNo.toLowerCase()) ? true : false;
    }
}