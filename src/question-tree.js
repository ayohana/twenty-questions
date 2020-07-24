import { Node } from '../src/node';

export class QuestionTree {
    constructor() {
        this.root = new Node(null, "computer");
    }

    // Inserts two new nodes correctly into the tree
    insertNewQA(nodeToFind, newQ, yesOrNo, newA) {
        let newQuestionNode = new Node(newQ, null);
        let newAnswerNode = new Node(null, newA);

        if (this.isYes(yesOrNo)) {
            newQuestionNode.yes = newAnswerNode;
            newQuestionNode.no = nodeToFind;
        } else {
            newQuestionNode.no = newAnswerNode;
            newQuestionNode.yes = nodeToFind;
        }

        // Check if there is a root
        if (!this.root) return;
        if (this.root.answer == nodeToFind.answer) {
            this.root = newQuestionNode;
            return;
        }

        // Otherwise, traverse the tree, starting from the root
        let currentNode = this.root;
        let childNode;
        function traverse(currentNode) {
            if (!currentNode.yes && !currentNode.no) return;
            if (currentNode.yes == nodeToFind) {
                childNode = currentNode.yes;                
                currentNode.yes = newQuestionNode;
                return;
            } else if (currentNode.no == nodeToFind) {
                childNode = currentNode.no;                
                currentNode.no = newQuestionNode;
                return;
            }            
            if (currentNode.yes) traverse(currentNode.yes);
            if (currentNode.no) traverse(currentNode.no);
        }
        traverse(currentNode);
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